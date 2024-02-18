const express = require('express')
const app = express()
const PORT = 4000
const axios = require("axios");
const moment = require("moment");
const { scheduleJob } = require('node-schedule');
const asyncHandler = require("express-async-handler");

const { sendLineMsgBroadcast } = require('./line');
var health="";
var todo= "";
var todo2 = "";
var color = "";
//scheduleJob('52 10 * * *', async () => {
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
app.get('/', asyncHandler(async (req, res, next)=> {
      
    try {
        var aqi;
        await axios.get('http://api.airvisual.com/v2/city?city=salaya&state=nakhon-pathom&country=Thailand&key=05a6879e-ab5a-4995-a3a5-a8c1f0fb708b')
        .then(function (response) {
            console.log("GET Response")
            console.log(response.data);
            aqi = response.data.data.current.pollution.aqius;
            
          
        console.log(aqi);
        if (aqi<=50){
            health = "ดี"; 
            todo = "สามารถดำเนินกิจกรรมได้ตามปกติ";
            todo2 = "สามารถดำเนินกิจกรรมได้ตามปกติ";
            color = "#9cd84e";
        }
        else if (aqi<=100){
            health = "ปานกลาง";
            todo = "สามารถดำเนินกิจกรรมได้ตามปกติ";
            todo2 = "ควรลดการออกแรงหนักหรือ เป็นเวลานาน และสังเกตอาการไอและเหนื่อยของตัวเอง"; 
            color = "#F7AD19";
        }
        else if (aqi<=150){
            health = "มีผลกระทบต่อผู้ป่วยหรือร่างกายอ่อนแอ"; 
            todo = "สามารถดำเนินกิจกรรมได้ตามปกติ";
            todo2 = "ควรลดกิจกรรมนอกอาคารที่ใช้แรงหนักหรือ เป็นเวลานาน โดยอาจพักเป็นระยะ ๆ หมั่นสังเกตอาการไอ ล้า ใจสั่น และแน่นหน้าอกของตนเอง หากมีโรคประจำตัวให้ปฏิบัติตามที่แพทย์แนะนำ";
            color = "#f99049";
        }
        else if (aqi<=200){
            health = "มีผลกระทบต่อทุกคน"; 
            todo = "ควรลดกิจกรรมนอกอาคารที่ใช้แรงงานหนักหรือเป็นเวลานาน อาจพักเป็นระยะ ๆ";
            todo2 = "ควรลดกิจกรรมนอกอาคารที่ใช้แรงงานหนักหรือเป็นเวลานาน ให้พักหรือทำงานในอาคาร";
            color = "#f65e5f";
        }
        else if (aqi<=300){
            health = "มีผลกระทบต่อทุกคนอย่างรุนแรง";
            todo = "ควรหลีกเลี่ยงกิจกรรมนอกอาคารที่ใช้แรงหนักหรือเป็นเวลานาน หรือทำกิจกรรมในอาคารแทน";
            todo2 = "ควรงดกิจกรรมนอกอาคารทุกชนิด ทำกิจกรรมในอาคารแทน"; 
            color = "#a070b6";
        }
        else{
            health = "อันตราย";
            todo = "ควรงดกิจกรรมนอกอาคารทุกชนิด";
            todo2 = "ควรพักในอาคารเท่านั้น ทำกิจกรรมที่ไม่ออกแรงมาก"; 
            color = "#a06a7b";
        }

        sendLineMsgBroadcast(
            [{
                "type": "flex",
                "altText": "Daily AQI",
                "contents": {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                              {
                                "type": "text",
                                "text":  "AQI : " + `${ aqi }`,
                                "weight": "bold",
                                "size": "xl",
                                "align": "center",
                                "color": color,
                                "wrap": true,
                              },
                              {
                                "type": "text",
                                "text":  health,
                                "weight": "bold",
                                "align": "center",
                                "color": color,
                                "wrap": true,
                              },
                              {
                                "type": "text",
                                "text": "ที่มา: www.iqair.com"
                              },
                              {
                                "type": "text",
                                "text": " "
                              },
                              {
                                "type": "text",
                                "weight": "bold",
                                "text": "[ประชาชนทั่วไป]"
                              },
                              {
                                "type": "text",
                                "text": todo,
                                "wrap": true,
                              },
                              {
                                "type": "text",
                                "weight": "bold",
                                "text": "[ประชาชนในกลุ่มเสี่ยง]"
                              },
                              {
                                "type": "text",
                                "text": todo2,
                                "wrap": true,
                              },
                              {
                                "type": "text",
                                "text": "ที่มา: https://pm2_5.nrct.go.th"
                              },
                        ]
                    }
                }
            }]
        );
        health="";
        
          
          
          
        
          
          // Export the Express API
          module.exports = app
    })
    } catch (e) {
        console.log(e);
    }
    res.status(200).json(aqi);

//})
}))
