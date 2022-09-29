module.exports = (app, mongo) => {

    app.post('/api/setAdsData', async (req, res) => {

        let success = false;

        console.log(req.body)
        if (req.body.id !== null) {

            let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);

            if (user !== null) {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            countOfAdsPerDay: req.body.countOfAdsPerDay,
                            dateOfShowAds: req.body.dateOfShowAds,
                        } }).then(() => null);
                success = true;

            }
        }
        res.json({ success: success });
    });

}
