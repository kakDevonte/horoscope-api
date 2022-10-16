module.exports = (app, mongo) => {
    app.post('/api/setStars', async (req, res) => {
        if (req.body.id !== null) {
                mongo.users.updateOne({ id: req.body.id }, { $set: {
                        stars: req.body.stars
                    } }).then(() => null);
            }
        let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);
        res.json(user);
    });

}
