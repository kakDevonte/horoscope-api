const verifyLaunchParams = require("../../functions/verifyLaunchParams");
module.exports = (app, mongo) => {

    app.post('/api/setFullPredict', async (req, res) => {

        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        let auth;
        if(req.headers.authorization){
            auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
        }
        if(!auth) {
            res.status(401).send({ error: "not authorized :(" });
            return;
        }

        if (req.body.id !== null) {
                mongo.users.updateOne({ id: req.body.id }, { $set: {
                        stars: req.body.stars - 2,
                        isFullPredict: true
                    } }).then(() => null);
        }
        const user = await mongo.users.findOne({ id: req.body.id });
        res.json(user);
    });

}
