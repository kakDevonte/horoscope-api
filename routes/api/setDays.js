module.exports = (app, mongo) => {

    app.post('/api/setDays', async (req, res) => {

        let success = false;

        console.log(req.body)
        if (req.body.id !== null) {

            let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);

            if (user !== null) {
                if(req.body.day === 5) {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            day: 0,
                            stars: user.stars + 5,
                            isGetTodayDay: true
                        } }).then(() => null);
                } else {
                    mongo.users.updateOne({ id: req.body.id }, { $set: {
                            day: req.body.day,
                            isGetTodayDay: true
                        } }).then(() => null);
                }
                success = true;

            }
        }
        res.json({ success: success });
    });

}
