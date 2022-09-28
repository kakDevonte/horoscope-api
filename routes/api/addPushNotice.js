const schedule = require("node-schedule");
const easyvk = require('easyvk');
require('dotenv').config();

module.exports = (app, mongo) => {
    app.post('/api/addPushNotice', async (req, res) => {
        let success = false;
        if (req.body.id !== null) {
            let now = new Date();
            // let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 25, 0, 0, 0);
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 15, 0);            console.log(date);
            const j = schedule.scheduleJob(date, function(){
                easyvk({
                    token: process.env.TOKEN
                }).then(async vk => {
                    let vkr = await vk.call('notifications.sendMessage', {
                        user_ids: req.body.id,
                        message: "Что тебя ждёт завтра? Гороскоп готов!",
                    });
                    console.log(vkr);
                })
            });
                success = true;
        }
        res.json({ success: success });
    });
}