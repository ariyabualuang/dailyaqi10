const axios = require('axios');
require('dotenv').config();

const channelAccessToken  = "r11Xod8be7hTlVyVzNh9722k4y6NMnFQBkwDpOI5+MG0we4OJYffgfZK4a1fE9d1WjvXQte2WocnO22cneUIxAwM6qI2jRoa2yBISnlKXfcdDyQVdeB6YY3XF2xC5vElclKmshMaq7EovZeM8AbpgwdB04t89/1O/w1cDnyilFU=";

module.exports = {
    sendLineMsgBroadcast: async (messages, token = channelAccessToken) => {
        try {
            const { status } = await axios({
                method: 'post',
                url: 'https://api.line.me/v2/bot/message/broadcast',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: { messages }
            });
            
            return status;
        } catch (e) {
            throw Error(e);
        }
    }
};