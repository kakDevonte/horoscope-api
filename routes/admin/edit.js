module.exports = (app, mongo) => {

  app.get('/edit/:date', async (req, res) => {

    let hash = req.cookies.hash;

    if (hash !== undefined) {

      let settings = await mongo.settings.findOne({ hash: hash }, { __v: 0 }).then(settings => settings);

      if (settings !== null) {

        let horoscope = await mongo.horoscopes.findOne({ date: req.params.date }).then(horoscope => horoscope);

        if (horoscope !== null) {

          res.render('edit', {
            success: false,
            horoscope: horoscope
          });

        } else res.redirect("/");

      } else res.redirect("/auth");

    } else res.redirect("/auth");

  });

  app.post('/edit/:date', async (req, res) => {

      let hash = req.cookies.hash;

      if (hash !== undefined) {
  
        let settings = await mongo.settings.findOne({ hash: hash }, { __v: 0 }).then(settings => settings);
  
        if (settings !== null) {
  
          let horoscope = await mongo.horoscopes.findOne({ date: req.params.date }).then(horoscope => horoscope);
  
          if (horoscope !== null) {

            await mongo.horoscopes.updateOne({ date: req.body.date }, { $set: {
              date: req.body.date,
              aries: req.body.aries,
              taurus: req.body.taurus,
              gemini: req.body.gemini,
              cancer: req.body.cancer,
              leo: req.body.leo,
              virgo: req.body.virgo,
              libra: req.body.libra,
              scorpio: req.body.scorpio,
              sagittarius: req.body.sagittarius,
              capricorn: req.body.capricorn,
              aquarius: req.body.aquarius,
              pisces: req.body.pisces,
              ophiuchus: req.body.ophiuchus
            } }).then(() => false);

            horoscope = await mongo.horoscopes.findOne({ date: req.params.date }).then(horoscope => horoscope);
  
            res.render('edit', {
              success: true,
              horoscope: horoscope
            });
  
          } else res.redirect("/");
  
        } else res.redirect("/auth");
  
      } else res.redirect("/auth");

  });

};