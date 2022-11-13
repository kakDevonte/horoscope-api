const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');

function isNumeric(value) {
    return /^\d+$/.test(value);
}

module.exports = (app, mongo) => {
    app.get('/api/setFullPredict/:sign', async (req, res) => {

        const sign = req.params.sign;
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

        if(!isNumeric(sign)) {
            res.status(400).send({ error: "Invalid input :(" });
        }

        if (userId !== null) {
            const oldUser = await mongo.users.findOne({ id: userId });
            const array = oldUser.isFullPredict;
            array[sign] = true;
            const newUser = await mongo.users.findOneAndUpdate(userId, {$set:{stars: oldUser.stars - 2, isFullPredict: array}}, {new: true},);
            res.json(newUser);
        }
    });

}
