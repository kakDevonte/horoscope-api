module.exports = (app, mongo) => {

  app.get('/', async (req, res) => {

    let hash = req.cookies.hash;

    if (hash !== undefined) {

      let settings = await mongo.settings.findOne({ hash: hash }, { __v: 0 }).then(settings => settings);

      if (settings !== null) {

        let status = false;
        let date = null;

        if (req.query.status === 'create') {

          status = 1;
          date = req.query.date;

        } else if (req.query.status === 'update') {

          status = 2;
          date = req.query.date;

        }

        let horoscopes = await mongo.horoscopes.find({}).sort({ date: -1 }).then(horoscopes => horoscopes);

        res.render('index', {
          status: status,
          date: date,
          horoscopes: horoscopes
        });

      } else res.redirect("/auth");

    } else res.redirect("/auth");

  });

};