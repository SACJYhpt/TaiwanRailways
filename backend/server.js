require('dotenv').config();
const token = process.env.TRAHSR_TOKEN;
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors())

const traURL = "https://superiorapis-creator.cteam.com.tw/manager/feature/proxy/947f9a2f1102/pub_947f9af843e4";
const hsrURL = "https://superiorapis-creator.cteam.com.tw/manager/feature/proxy/947f9a2f1102/pub_9482561d10b9";

const getTRA = async (start, end, time) => {
    console.log(`臺鐵 API 請求中：${start} -> ${end}`);
    const resData = {
        "start_station": start,
        "end_station": end,
        "datetime": time
    };
    console.log(resData);
    const res = await axios.post(traURL, resData, {
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    });
    console.log("台鐵原始回傳內容：", res.data);
    return res.data.map(item => ({...item, transport: 'TRA'}));
}

const getHSR = async (start, end, time) => {
    console.log(`高鐵 API 請求中：${start} -> ${end}`);
    const resData = {
        "start_station_no": parseInt(start, 10),
        "end_station_no": parseInt(end, 10),
        "datetime": time
    }
    console.log(resData);
    const res = await axios.post(hsrURL, resData, {
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    });

    if (!res.data.train_item) {
        console.log("查無班次。");
        return [];
    }
    
    return res.data.train_item.map(item => ({
        transport: 'HSR',
        train_type: '高鐵',
        train_code: item.id || 'HSR',
        departure_time: item.departure_time,
        arrival_time: item.destination_time,
        travel_time: item.duration,
        adult_price: 0 //無回傳價格
    }));
}

app.get('/api/timetable', async (req, res) => {
    const {start, end, time, op} = req.query;
    console.log(`正在查詢：${start} ➔ ${end}, 現在：${time}`);
    try{
        let finalResults = [];
        
        if (op === 'tra'){
            finalResults = await getTRA(start, end, time);
        }
        else if (op === 'hsr'){
            finalResults = await getHSR(start, end, time);
        }

        finalResults.sort((a, b) => a.departure_time.localeCompare(b.departure_time));
        res.json(finalResults);
    }
    catch(error){
        console.error('API Error:', error.response?.data || error.message);
        //testData
        res.json([
            {
                "train_type": "自強(模擬)",
                "train_code": "114514",
                "departure_time": "07:21",
                "arrival_time": "19:19",
                "travel_time": "8 小時 10 分",
                "adult_price": 632
            }
        ]);
    }
});

function addMinutes(isoTimeStr, minutes) {
    if (!isoTimeStr || !isoTimeStr.includes('T')) {
        console.error("addMinutes 收到無效格式:", isoTimeStr);
        return isoTimeStr; 
    }

    let date = new Date(isoTimeStr);
    
    if (isNaN(date.getTime())) {
        console.error("無法解析日期字串:", isoTimeStr);
        return isoTimeStr;
    }

    let adjustedTime = new Date(date.getTime() + (minutes * 60 * 1000));
    
    let taiwanTime = new Date(adjustedTime.getTime() + (8 * 60 * 60 * 1000));
    
    return taiwanTime.toISOString().replace('Z', '');
}

function findJoint(station){
    if (!station ||station[3] === '0') return null;
    if (station.substring(0, 3) === '120'){
        return '1210'; //內灣線特例
    }
    return station.substring(0, 3) + '0';
}

async function findHSR(start, end, time, waitTime, routeResults){
    const transferMap = { // 高鐵 - 臺鐵
        '0980': '1',       // 南港 - 南港
        '1000': '2',       // 臺北 - 臺北
        '1020': '3',       // 板橋 - 板橋
        '1094': '5',       // 六家 - 新竹
        '3150': '6',       // 豐富 - 苗栗
        '3340': '7',       // 新烏日 - 臺中
        '4272': '11',      // 沙崙 - 臺南
        '4340': '12'       // 新左營 - 左營
    };
    const hubIDs = Object.keys(transferMap).map(Number).sort((a, b) => a - b);
    let mainStart=null;
    let mainEnd=null;
    let nextTime = time;
    
    //北上 or 南下
    const isSouthBound = Number(start) < Number(end);
    if (isSouthBound) {
        mainStart = hubIDs.find(id => id >= Number(start));
        mainEnd = [...hubIDs].reverse().find(id => id <= Number(end));
    } else {
        mainStart = [...hubIDs].reverse().find(id => id <= Number(start));
        mainEnd = hubIDs.find(id => id >= Number(end));
    }

    if (!mainStart || !mainEnd || mainStart === mainEnd){
        console.log('無高鐵可以搭')
        nextTime = await findTRA('臺鐵主線', start, end, time, waitTime, routeResults);
        return nextTime;
    }

    const startKey = mainStart.toString().padStart(4, '0');
    const endKey = mainEnd.toString().padStart(4, '0');
    const hsrStartNo = transferMap[startKey];
    const hsrEndNo = transferMap[endKey];

    if (!hsrStartNo || !hsrEndNo) {
        console.log(`無法對應高鐵編號: ${startKey}(${hsrStartNo}) -> ${endKey}(${hsrEndNo})`);
        return time;
    }

    if (startKey !== start){
        time = await findTRA('前往搭乘高鐵', start, startKey, time, waitTime, routeResults);
    }

    console.log(`台鐵站 ${startKey} (高鐵 ${hsrStartNo}) -> 台鐵站 ${endKey} (高鐵 ${hsrEndNo})`);

    const legHSR = await getHSR(hsrStartNo, hsrEndNo, time);
    if (legHSR && legHSR.length > 0) {
        routeResults.push({
            title: '高鐵線路',
            from: startKey,
            to: endKey,
            data: legHSR[0]
        });
        
        const datePart = time.split('T')[0];
        const fullArrival = `${datePart}T${legHSR[0].arrival_time}:00`;
        nextTime = addMinutes(fullArrival, waitTime);
    }
    else{
        console.log(`${hsrStartNo} -> ${hsrEndNo} 沒車`);
        routeResults.push({
            title: '高鐵線路',
            from: startKey,
            to: endKey,
            data: {
                train_type: '高鐵',
                train_code: '查無班次',
                departure_time: "---",
                arrival_time: "---",
                isError: true
            }
        });
    }

    if (endKey !== end){
        nextTime = await findTRA('轉回臺鐵', endKey, end, nextTime, waitTime, routeResults);
    }

    return nextTime;
}

async function findTRA(title, start, end, time, waitTime, routeResults){
    const leg = await getTRA(start, end, time);
    let nextTime = time;
    if (leg && leg.length > 0){
        routeResults.push({
            title: title,
            from: start,
            to: end,
            data: leg[0]
        });
        // const fullArrival = formatToFullISO(leg[0].arrival_time);
        // if (fullArrival) {
        //     currentSearchTime = addMinutes(fullArrival, waitTime);
        // }
        const datePart = time.split('T')[0];
        const fullArrival = `${datePart}T${leg[0].arrival_time}:00`;
        nextTime = addMinutes(fullArrival, waitTime);
    }
    else{
        console.log(` ${start} -> ${end} 沒車`);
        routeResults.push({
            title: title,
            from: start,
            to: end,
            data: {
                train_type: '無',
                train_code: '查無班次',
                departure_time: "---",
                arrival_time: '----',
                isError: true
            }
        });
    }
    return nextTime;
}

app.get('/api/search', async (req, res) => {
    let {start, end, time, waitTime = 25, HSRok} = req.query;
    try{
        console.log('start:'+start);
        console.log('end:'+end);
        let hub1 = findJoint(start);
        let hub2 = findJoint(end);

        // if (hub1 === hub2){
        //     hub1 = null;
        //     hub2 = null;
        // }

        let currentSearchTime = time;
        let routeResults = [];

        console.log('hub1:'+hub1);
        console.log('hub2:'+hub2);
        if (hub1){
            currentSearchTime = await findTRA('前往臺鐵主線', start, hub1, currentSearchTime, waitTime, routeResults);
        }

        const mainStart = hub1 || start;
        const mainEnd = hub2 || end;

        if (mainStart !== mainEnd){
            if (HSRok === 'true'){
                currentSearchTime = await findHSR(mainStart, mainEnd, currentSearchTime, waitTime, routeResults);
            }
            else{
                currentSearchTime = await findTRA('臺鐵主線', mainStart, mainEnd, currentSearchTime, waitTime, routeResults);
            }
        }

        if (hub2){
            currentSearchTime = await findTRA('離開臺鐵主線', hub2, end, currentSearchTime, waitTime, routeResults);
        }

        res.json({
            success: true,
            path: routeResults
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({success: false, message: '失敗'});
    }
});

app.listen(PORT, () => {
    console.log(`後端伺服器啟動在: http://localhost:${PORT}`)
});
