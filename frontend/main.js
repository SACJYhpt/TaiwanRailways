const cityList = {
    "其他": ["常用", "高鐵"],
    "北部": ["基隆市", "新北市", "臺北市", "桃園市", "新竹縣", "新竹市"],
    "中部": ["苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣"],
    "南部": ["嘉義縣", "嘉義市", "臺南市", "高雄市", "屏東縣"],
    "東部": ["臺東縣", "花蓮縣", "宜蘭縣"]
}

const stationList = {
        "常用":[],
        "高鐵":["1|高鐵南港", "2|高鐵臺北", "3|高鐵板橋", "4|高鐵南港", "5|高鐵新竹", "6|高鐵苗栗", "7|高鐵臺中", "8|高鐵彰化", "9|高鐵雲林", "10|高鐵嘉義", "11|高鐵臺南", "12|高鐵左營"],
        "基隆市": ["0900|基隆", "0910|三坑", "0920|八堵", "0930|七堵", "0940|百福", "7361|海科館", "7390|暖暖"],
        "新北市": ["0950|五堵", "0960|汐止", "0970|汐科", "1020|板橋", "1030|浮洲", "1040|樹林", "1050|南樹林", "1060|山佳", "1070|鶯歌", "1075|鳳鳴", "7290|福隆", "7300|貢寮", "7310|雙溪", "7320|牡丹", "7330|三貂嶺", "7331|大華", "7332|十分", "7333|望古", "7334|嶺腳", "7335|平溪", "7336|菁桐", "7350|侯硐", "7360|瑞芳", "7362|八斗子", "7380|四腳亭"],
        "臺北市": ["0980|南港", "0990|松山", "1000|臺北", "1010|萬華"],
        "桃園市": ["1080|桃園", "1090|內壢", "1100|中壢", "1110|埔心", "1120|楊梅", "1130|富岡", "1140|新富"],
        "新竹縣": ["1050|北湖", "1060|湖口", "1070|新豐", "1080|竹北", "1193|竹中", "1194|六家", "1201|上員", "1202|榮華", "1203|竹東", "1204|橫山", "1205|九讚頭", "1206|合興", "1207|富貴", "1208|內灣"],
        "新竹市": ["1190|北新竹", "1191|千甲", "1192|新莊", "1210|新竹", "1220|三姓橋", "1230|香山"],
        "苗栗縣": ["1240|崎頂", "150|竹南", "2110|談文", "2120|大山", "2130|後龍", "2140|龍港", "2150|白沙屯", "2160|新埔", "2170|通宵", "2180|苑裡", "3140|造橋", "3150|豐富", "3160|苗栗", "3170|南勢", "3180|銅鑼", "3190|三義"],
        "臺中市": ["2190|日南", "2200|大甲", "2210|臺中港", "2220|清水", "2230|沙鹿", "2240|龍井", "2250|大肚", "2260|追分", "3210|泰安", "3220|后里", "3230|豐原", "3240|栗林", "3250|潭子", "3260|頭家厝", "3270|松竹", "3280|太原", "3290|精武", "3300|臺中", "3310|五權", "3320|大慶", "3330|烏日", "3340|新烏日", "3350|成功"],
        "彰化縣": ["3360|彰化", "3370|花壇", "3380|大村", "3390|員林", "3400|永靖", "3410|社頭", "3420|田中", "3430|二水", "3431|源泉"],
        "南投縣": ["3432|濁水", "3433|龍泉", "3434|集集", "3435|水里", "3436|車程"],
        "雲林縣": ["3450|林內", "3460|石榴", "3470|斗六", "3480|斗南", "3490|石龜"],
        "嘉義縣": ["4050|大林", "4060|民雄", "4090|水上", "4100|南靖"],
        "嘉義市": ["4070|嘉北", "4080|嘉義"],
        "臺南市": ["4110|後壁", "4120|新營", "4130|柳營", "4140|林鳳營", "4150|隆田", "4160|拔林", "4170|善化", "4180|南科", "4190|新市", "4200|永康", "4210|大橋", "4220|臺南", "4250|保安", "4260|仁德", "4270|中洲", "4271|長榮大學", "4272|沙崙"],
        "高雄市": ["4290|大湖", "4300|路竹", "4310|岡山", "4320|橋頭", "4330|楠梓", "4340|新左營", "4350|左營", "4360|內惟", "4370|美術館", "4380|鼓山", "4390|三塊厝", "4400|高雄", "4410|民族", "4420|科工館", "4430|正義", "4440|鳳山", "4450|後庄", "4460|九曲堂"],
        "屏東縣": ["4470|六塊厝", "5000|屏東", "5010|歸來", "5020|麟洛", "5030|西勢", "5040|竹田", "5050|潮州", "5060|崁頂", "5070|南州", "5080|鎮安", "5090|林邊", "5100|佳冬", "5110|東海", "5120|枋寮", "5130|加祿", "5140|內獅", "5150|枋山"],
        "臺東縣": ["5190|大武", "5200|瀧溪", "5210|金崙", "5220|太麻里", "5230|知本", "5240|康樂", "6000|臺東", "6010|山里", "6020|鹿野", "6030|瑞源", "6040|瑞和", "6050|關山", "6060|海端", "6070|池上"],
        "花蓮縣": ["6080|富里", "6090|東竹", "6100|東里", "6110|玉里", "6120|三民", "6130|瑞穗", "6140|富源", "6150|大富", "6160|光復", "6170|萬榮", "6180|鳳林", "6190|南平", "6200|新榮新光", "6210|豐田", "6220|壽豐", "6230|平和", "6240|志學", "6250|吉安", "7000|花蓮", "7010|北埔", "7020|景美", "7030|新城", "7040|崇德", "7050|和仁", "7060|和平"],
        "宜蘭縣": ["7070|漢本", "7080|武塔", "7090|南澳", "7100|東澳", "7110|永樂", "7120|蘇澳", "7130|蘇澳新", "7150|冬山", "7160|羅東", "7170|中里", "7180|二結", "7190|宜蘭", "7200|四城", "7210|礁溪", "7220|頂埔", "7230|頭城", "7240|外澳", "7250|龜山", "7260|大溪", "7270|大里", "7280|石城"]
    };

let stationNameMap = {};

function createStationNameMap(){
    for (let region in stationList){
        stationList[region].forEach(item => {
            const [id, name] = item.split('|');
            stationNameMap[id] = name;
        });
    }
}

function start(){
    const savedCommon = localStorage.getItem("myCommonStations");
    if (savedCommon) stationList["常用"] = JSON.parse(savedCommon);
    createStationNameMap();
    const startCity = document.getElementById("startCity");
    const endCity = document.getElementById("endCity");
    const panel = document.getElementById("controlPanel"); // 抓取面板

    setCity(startCity);
    setCity(endCity);
    setStation("常用", "start");
    setStation("常用", "end");

    const savedResult = localStorage.getItem("lastQueryResult");
    if (savedResult) {
        const lastQuery = JSON.parse(savedResult);
        if (lastQuery.mode === 'search') {
            renderResult(lastQuery.data, lastQuery.waitTime);
        } 
        else if (lastQuery.mode === 'timetable') {
            renderTable(lastQuery.data);
        }
    }

    if (panel) {
        panel.addEventListener("mouseenter", () => {
            panel.classList.add("open");
        });

        panel.addEventListener("mouseleave", () => {
            panel.classList.remove("open");
        });
    } else {
        console.error("找不到 ID 為 controlPanel 的元素");
    }

    startCity.addEventListener("change", function() {
        setStation(this.value, "start");
    }, false);
    endCity.addEventListener("change", function() {
        setStation(this.value, "end");
    }, false);

    document.getElementById("changeStation").addEventListener("click", changeStation, false);

    document.getElementById("addStartCommon").addEventListener("click", function() {
        addCommonStation(document.getElementById("startStation"));
    }, false);

    document.getElementById("addEndCommon").addEventListener("click", function () {
        addCommonStation(document.getElementById("endStation"));
    }, false);

    const timeNowRadio = document.getElementById("timeNow");
    const timeNotNowRadio = document.getElementById("timeNotNow");
    const chooseTimeDiv = document.getElementById("chooseTimeDiv");

    timeNotNowRadio.addEventListener("change", function() {
        if (this.checked) {
            chooseTimeDiv.innerHTML = '<p class="setThings">請選擇出發時間：</p><input type="datetime-local" id="queryTime">';
            const queryTimeInput = document.getElementById('queryTime');
    
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const defaultTime = `${year}-${month}-${day}T00:00`;

            queryTimeInput.value = defaultTime;
        }
    }, false);

    timeNowRadio.addEventListener("change", function() {
        if (this.checked) {
            chooseTimeDiv.innerHTML = '';
        }
    }, false);

    const searchRadio = document.getElementById("search");
    const timeTableRadio = document.getElementById("timeTable");
    const modeSetDiv = document.getElementById("modeSetDiv");

    searchRadio.addEventListener("change", function() {
        if (this.checked){
            modeSetDiv.innerHTML = `
                <p><input type="checkbox" name="noHSR" id="noHSR" checked>不搭高鐵</p>
                <p><input type="checkbox" name="noHSR" id="waitTime">設定轉乘時間(預設25分鐘)</p>
                <div id="waitTimeDiv"></div>
            `;
        }
    }, false);

    timeTableRadio.addEventListener("change", function() {
        if (this.checked){
            modeSetDiv.innerHTML = `
                <p>
                    查詢種類：
                    <input type="radio" name="op" value="tra" checked>臺鐵
                    <input type="radio" name="op" value="hsr">高鐵
                </p>
            `;
        }
    }, false);
    
    document.getElementById("waitTime").addEventListener("change", function() {
        const waitTimeDiv = document.getElementById("waitTimeDiv")
        if (this.checked) {
            waitTimeDiv.innerHTML = `
            <p>請輸入轉乘所需時間：</p>
                <p>
                    <input type="number" class="setWaitTime" id="waitTimeHr" min="1" max="23" step="1" value="0">小時
                    <input type="number" class="setWaitTime" id="waitTimeMin" min="1" max="59" step="1" value="25">分鐘
                </p>
            `;
        }
        else{
            waitTimeDiv.innerHTML = '';
        }
    }, false)


    const testBtn = document.getElementById('test');
    testBtn.addEventListener('click', () => {
        const startStation = document.getElementById("startStation").value;
        const endStation = document.getElementById("endStation").value;
        
        let finalISOString;
        const queryTimeInpus = document.getElementById("queryTime");
        const isNotNow = document.getElementById("timeNotNow").checked;
        
        if (isNotNow && queryTimeInpus){
            if (!queryTimeInpus.value){
                alert("如欲用現在時間請選擇自訂時間！");
                return;
            }
            finalISOString = queryTimeInpus.value + ":00";
        }
        else{
            let now = new Date();
            let taiwanTime = new Date(now.getTime()+(8*60*60*1000)); //8小時時差
            finalISOString = taiwanTime.toISOString().replace('Z', '');
        }

        console.log("最終發送時間:", finalISOString);

        console.log("正在查詢代碼：", startStation, "到", endStation);

        console.log("偵測到的值 - 起點: [" + startStation + "], 終點: [" + endStation + "]");

        if (!startStation || !endStation) {
            alert("請選擇起始和終止車站！");
            return;
        }

        controlPanel.classList.add('collapsed');
        
        document.getElementById('result').innerHTML = '<p>搜尋中，請稍候...</p>';

        const mode = document.querySelector('input[name="mode"]:checked').value;
        if (mode === 'search'){
            const isNoHSR = document.getElementById("noHSR").checked;
            const hsrCheck = isNoHSR ? 'false' : 'true';

            let  waitTime = 25;
            const hrInput = document.getElementById("waitTimeHr");
            const minInput = document.getElementById("waitTimeMin");

            if (hrInput && minInput) {
                const hours = parseInt(hrInput.value) || 0;
                const minutes = parseInt(minInput.value) || 0;
                waitTime = hours * 60 + minutes;
            }
            else {
                waitTime = 25; 
            }

            const url = `/api/search?start=${startStation}&end=${endStation}&time=${finalISOString}&waitTime=${waitTime}&HSRok=${hsrCheck}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    renderResult(data, waitTime);
                    const saveData = {
                        mode: 'search',
                        data: data,
                        waitTime: waitTime,
                        timestamp: new Date().getTime()
                    };
                    localStorage.setItem("lastQueryResult", JSON.stringify(saveData));
                })
                .catch(err => {
                    document.getElementById('result').innerHTML = '<p>查詢失敗，請檢查後端是否啟動！</p>';
                    console.error(err);
                });
        }
        else{
            const op = document.querySelector('input[name="op"]:checked').value;
            const url = `/api/timetable?start=${startStation}&end=${endStation}&time=${finalISOString}&op=${op}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    renderTable(data);
                                const saveData = {
                        mode: 'timetable',
                        data: data,
                        timestamp: new Date().getTime()
                    };
                    localStorage.setItem("lastQueryResult", JSON.stringify(saveData));
                })
                .catch(err => {
                    document.getElementById('result').innerHTML = '<p>查詢失敗，請檢查後端是否啟動！</p>';
                    console.error(err);
                });
        }
    });
}

window.addEventListener("load", start, false);

function setCity(citySelection){
    citySelection.innerHTML = '';
    for (const region in cityList){
        const optgroup = document.createElement("optgroup");
        optgroup.label = region;

        cityList[region].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            optgroup.appendChild(option);
        });
        citySelection.appendChild(optgroup);
    }
}

function setStation(city, type){
    let stationSelect;
    if (type == "start"){
        stationSelect = document.getElementById("startStation");
    }
    else{
        stationSelect = document.getElementById("endStation");
    }

    stationSelect.innerHTML = '';
    if (!stationList[city]) return;

    stationList[city].forEach(stationStr => {
        const [id, name] = stationStr.includes('|') ? stationStr.split('|') : [stationStr, stationStr];
        const option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        stationSelect.appendChild(option);
    });
    
    if (type === "end" && document.getElementById("startCity").value === document.getElementById("endCity").value && stationList[city].length > 1){
        const secondStationStr = stationList[city][1];
        const secondId = secondStationStr.includes('|') ? secondStationStr.split('|')[0] : secondStationStr;
        stationSelect.value = secondId;
    }
}

function changeStation(){
    let sCity = document.getElementById("startCity");
    let eCity = document.getElementById("endCity");
    let sStation = document.getElementById("startStation");
    let eStation = document.getElementById("endStation");

    let tempStartStation = sStation.value;
    let tempEndStation = eStation.value;
    
    let temp = sCity.value;
    sCity.value = eCity.value;
    eCity.value = temp;

    setStation(sCity.value, "start");
    setStation(eCity.value, "end");

    sStation.value = tempEndStation;
    eStation.value = tempStartStation;
}

function addCommonStation(stationSelect){
    const ID = stationSelect.value;
    const name = stationSelect.options[stationSelect.selectedIndex]?.text;

    if (!ID){
        alert("請選擇車站！")
        return;
    }
    const data = `${ID}|${name}`;
    
    if (stationList["常用"].includes(data)){
        const index = stationList["常用"].indexOf(data);
        if (index > -1){
            stationList["常用"].splice(index, 1);
            alert("該車站已刪除自常用選單");
        }
    }
    else{
        stationList["常用"].push(data);
        alert("該車站已加入到常用選單");
    }

    localStorage.setItem("myCommonStations", JSON.stringify(stationList["常用"]));

    if (document.getElementById("startCity").value === "常用") {
        setStation("常用", "start");
    }
    if (document.getElementById("endCity").value === "常用") {
        setStation("常用", "end");
    }
}

function renderResult(result, waitTime){
    const resultDiv = document.getElementById('result');
    if (!result.success){
        resultDiv.innerHTML = `<p>查詢失敗</p>`;
        return;
    }
    if (!result.path){
        resultDiv.innerHTML = `<p>查無班次。</p>`;
        return;
    }
    let html = '可經由以下路線：<br>';

    result.path.forEach((segment, index) => {
        const item = segment.data;
        const isHSR = segment.title.includes("高鐵");
        const spanClass = isHSR ? 'hsr': 'tra';
        const trainCodeDisplay = item.isError ? `<span style="color:red;">查無班次</span>` : (item.train_code || item.TrainNo);
        const timeDisplay = item.isError ? `---` : `${item.departure_time} ➔ ${item.arrival_time} (${item.travel_time})`;
        const getStationName = (id) => stationNameMap[id] || id;

        html += `${segment.title}：`;

        html += `
            <table class="result-table">
                <thead>
                    <tr>
                        <th>類型</th>
                        <th>車次</th>
                        <th>${getStationName(segment.from)} ➔ ${getStationName(segment.to)}(時間)</th>
                        <th>票價(全票)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class='badge ${spanClass}'>${item.train_type}</span></td>
                        <td>${trainCodeDisplay}</td>
                        <td>${timeDisplay}</td>
                        <td>NT$ ${item.adult_price || '---'}</td>
                    </tr>
                </tbody>
            </table>
        `;

        if (index < result.path.length - 1) {
            html += `<div class="transfer-arrow">在 <b>${getStationName(segment.to)}</b> 站轉乘 (約等待 ${waitTime || 25} 分鐘)</div>`;
        }
    });

    resultDiv.innerHTML = html;
}

function renderTable(data){
    const resultDiv = document.getElementById('result');
    if (!Array.isArray(data)) {
        console.error("收到的資料不是陣列:", data);
        resultDiv.innerHTML = `<p>查詢失敗：後端回傳格式錯誤。</p>`;
        return;
    }
    if (data.length === 0){
        resultDiv.innerHTML = '<p>查無班次</p>'
        return;
    }
    let tableHtml = `
        <table class="result-table">
            <thead>
                <tr>
                    <th>類型</th>
                    <th>車次</th>
                    <th>時間(出發 ➔ 到達)</th>
                    <th>票價(全票)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(item => {
        const isHSR = item.train_type == "高鐵";
        const spanClass = isHSR? 'hsr' : 'tra';
        tableHtml += `
            <tr>
                <td><span class='badge ${spanClass}'>${item.train_type}</span></td>
                <td>${item.train_code}</td>
                <td>${item.departure_time} ➔ ${item.arrival_time} (${item.travel_time})</td>
                <td>NT$ ${item.adult_price}</td>
            </tr>
        `;
    });
    
    tableHtml += '</tbody></table>';
    resultDiv.innerHTML = tableHtml;
}
