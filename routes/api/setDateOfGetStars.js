const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');

module.exports = (app, mongo) => {
    app.post('/api/setDateOfGetStars/:date', async (req, res) => {
        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        const sign = req.params.sign;

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
                    mongo.users.updateOne({ id: userId }, { $set: {
                            dateOfGetStars: req.body.dateOfGetStars,
                        } }).then(() => null);
            }
        let user = await mongo.users.findOne({ id: userId }).then(user => user);
        res.json(user);
    });

}
