const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');

module.exports = (app, mongo) => {
    app.get('/api/setStars', async (req, res) => {

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
            const oldUser = await mongo.users.findOne({ id: userId });
            const newUser = await mongo.users.findOneAndUpdate(userId, {$set:{stars: oldUser.stars + 2}},
                {new: true});
            res.json(newUser);
        }
    });

}
