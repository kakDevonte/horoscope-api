module.exports = (app, mongo) => {
    app.post('/api/setAdsData', async (req, res) => {
        if (req.body.id !== null) {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            countOfAdsPerDay: req.body.countOfAdsPerDay,
                            dateOfShowAds: req.body.dateOfShowAds,
                        } }).then(() => null);
        }
        const user = await mongo.users.findOne({ id: req.body.id });
        console.log('USER ', user)
        res.json(user);
    });

}
