const axios = require('axios');
require('dotenv').config();

const channelAccessToken  = "P84OQmF81ePgcbcVR+sNMslN3aOS5vRMcNUsswNFy8bRwfyY2fYFQMMskxLDC1wrth9006edLeyeAo+63amYlJgth5XtLo2nMXYSytF4jldG8tH2QDF6+73oX2dGAyKKOgqtsvHalqyRit3HA3nrGgdB04t89/1O/w1cDnyilFU=";

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
            console.log("sent ok");
            return status;
        } catch (e) {
            throw Error(e);
        }
    }
};