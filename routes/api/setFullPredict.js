module.exports = (app, mongo) => {

    app.post('/api/setFullPredict', async (req, res) => {

        let success = false;

        if (req.body.id !== null) {

            let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);

            if (user !== null) {
                mongo.users.updateOne({ id: req.body.id }, { $set: {
                        stars: req.body.stars,
                        isFullPredict: true
                    } }).then(() => null);
                success = true;

            }
        }
        res.json({ success: success });
    });

}