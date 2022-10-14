module.exports = (app, mongo) => {

    app.post('/api/setFullPredict', async (req, res) => {

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
