require('dotenv').config();
const token = process.env.TRAHSR_TOKEN;
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors())

app.get('/api/timetable', async (req, res) => {
    const {start, end, time, op} = req.query;
    console.log(`正在查詢：${start} ➔ ${end}, 現在：${time}`);

    const traURL = "https://superiorapis-creator.cteam.com.tw/manager/feature/proxy/947f9a2f1102/pub_947f9af843e4";
    const hsrURL = "https://superiorapis-creator.cteam.com.tw/manager/feature/proxy/947f9a2f1102/pub_9482561d10b9";
    try{
        let finalResults = [];

        const getTRA = async () => {
            console.log(`臺鐵 API 請求中：${start} ➔ ${end}`);
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

        const getHSR = async () => {
            console.log(`高鐵 API 請求中：${start} ➔ ${end}`);
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
        
        if (op === 'tra'){
            finalResults = await getTRA();
        }
        else if (op === 'hsr'){
            finalResults = await getHSR();
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

app.listen(PORT, () => {
    console.log(`後端伺服器啟動在: http://localhost:${PORT}`)
});