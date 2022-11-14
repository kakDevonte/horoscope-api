const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');

module.exports = (app, mongo) => {
    app.get('/api/setAdsData', async (req, res) => {
        const verifyLaunchParams = require('../../functions/verifyLaunchParams');
        let auth;
        if(req.headers.authorization){
            auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
        }
        if(!auth) {
            res.status(401).send({ error: "not authorized :(" });
            return;
        }

        const header = qs.parse(req.headers.authorization);
        const userId = header.vk_user_id;

        if (userId !== null) {
            const oldUser = await mongo.users.findOne({ id: userId });

            if(oldUser.day > 5) {
                mongo.users.findOneAndUpdate({ id: userId },
                    {$set:{ day: 0, stars: oldUser.stars + 7, countOfAdsPerDay: oldUser.countOfAdsPerDay + 1,
                            dateOfShowAds: new Date(), }}, {new: true}).then((data) => res.json(data));
            } else {
                mongo.users.findOneAndUpdate({ id: userId },
                    {$set:{ day: oldUser.day + 1, countOfAdsPerDay: oldUser.countOfAdsPerDay + 1,
                            dateOfShowAds: new Date(),
                            stars: oldUser.stars + 2 }}, {new: true}).then((data) => res.json(data));
            }
        }
    });

}
