const schedule = require("node-schedule");
const easyvk = require('easyvk');
const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');
require('dotenv').config();

module.exports = (app, mongo) => {
    app.get('/api/addPushNotice', async (req, res) => {
        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        let auth;
        // if(req.headers.authorization){
        //     auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
        // }
        // if(!auth) {
        //     res.status(401).send({ error: "not authorized :(" });
        //     return;
        // }

        const header = qs.parse(req.headers.authorization);
        const userId = header.vk_user_id;

        let success = false;
        if (userId !== null) {
            let now = new Date();
            //let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0, 0);
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 15, 0);
            console.log(date);
            const j = schedule.scheduleJob(date, function(){
                easyvk({
                    token:  '98e8fad498e8fad498e8fad4e69bf81d5c998e898e8fad4fbd1b4eecb6d3c1f58a0b725'//process.env.TOKEN
                }).then(async vk => {
                    let vkr = await vk.call('notifications.sendMessage', {
                        user_ids: userId,
                        message: "Что тебя ждёт завтра? Гороскоп готов!",
                    });
                    console.log(vkr);
                })
            });
                success = true;
        }
        res.json({ success: success });
    });

    app.get('/api/remindMe', async (req, res) => {
        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        let auth;
        // if(req.headers.authorization){
        //     auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
        // }
        // if(!auth) {
        //     res.status(401).send({ error: "not authorized :(" });
        //     return;
        // }

        const header = qs.parse(req.headers.authorization);
        const userId = header.vk_user_id;

        if (userId !== null) {
            const newUser = await mongo.users.findOneAndUpdate(userId, {$set:{
                    isClickedOnRemindMe: true}}, {new: true});
            res.json(newUser);
        }
    });
}