const axios = require('axios');
require('dotenv').config();

const channelAccessToken  = "mhfoz6dR56oza7pbTl8rLIGkDlFzDSxeJ+wlmMQvLl1mfBgUfmokS0x+J2LUebj+erc6uNXAZ0TR0cEUORlnsoYPjxum4lUrmXShI0PNaZx5bNDsAQ8M5KkpPxytkJ/MkJ0K5cupsledAzvyqDIgRAdB04t89/1O/w1cDnyilFU=";

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