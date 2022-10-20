const verifyLaunchParams = require("../../functions/verifyLaunchParams");
module.exports = (app, mongo) => {
    app.post('/api/setDateOfGetStars', async (req, res) => {
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
                            dateOfGetStars: req.body.dateOfGetStars,
                        } }).then(() => null);
            }
        let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);
        res.json(user);
    });

}
