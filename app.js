const axios = require("axios");
const moment = require("moment");
const { scheduleJob } = require('node-schedule');

const { sendLineMsgBroadcast } = require('./line.js');
const token = "P84OQmF81ePgcbcVR+sNMslN3aOS5vRMcNUsswNFy8bRwfyY2fYFQMMskxLDC1wrth9006edLeyeAo+63amYlJgth5XtLo2nMXYSytF4jldG8tH2QDF6+73oX2dGAyKKOgqtsvHalqyRit3HA3nrGgdB04t89/1O/w1cDnyilFU=";
scheduleJob('58 17 * * *', async () => {//time
    try {
        const { getResponse } = await axios.get("http://api.airvisual.com/v2/city?city=salaya&state=nakhon-pathom&country=Thailand&key=05a6879e-ab5a-4995-a3a5-a8c1f0fb708b");
        console.log("GET Response")
        console.log(getResponse.data.data.current.pollution.aqius);
        const data = getResponse.data.data.current.pollution.aqius;
    
        const messages =[{
            "type": "flex",
            "altText": "Daily AQI",
            "contents": {
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": `${data}`,
                            "weight": "bold",
                            "size": "xl"
                        },
                    ]
                }
            } 
        }]
        const { status } = await axios.post(
            'https://api.line.me/v2/bot/message/broadcast',
            { messages },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log(status);  
    } catch (e) {
        console.error(e);
    }
})
