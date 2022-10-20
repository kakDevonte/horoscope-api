const verifyLaunchParams = require("../../functions/verifyLaunchParams");
module.exports = (app, mongo) => {

    app.post('/api/setDays', async (req, res) => {

        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        let auth;
        if(req.headers.authorization){
            auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
        }
        if(!auth) {
            res.status(401).send({ error: "not authorized :(" });
            return;
        }

        console.log(req.body)
        if (req.body.id !== null) {
                if(req.body.day > 5) {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            day: 0,
                            stars: req.body.stars + 5,
                            isGetTodayDay: true
                        } }).then(() => null);
                } else {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            day: req.body.day,
                            isGetTodayDay: true
                        } }).then(() => null);
                }
                success = true;

            }
        const user = await mongo.users.findOne({ id: req.body.id });
        res.json(user);
    });

}
