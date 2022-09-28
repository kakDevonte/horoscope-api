module.exports = (app, mongo) => {

  app.get('/new', async (req, res) => {

    let hash = req.cookies.hash;

    if (hash !== undefined) {

      let settings = await mongo.settings.findOne({ hash: hash }, { __v: 0 }).then(settings => settings);

      if (settings !== null) {

        let nextDay;
        let date = await mongo.horoscopes.findOne({}).sort({ date: -1 }).then(day => day);

        if (date === null) {

          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let day = now.getDate();
          nextDay = year + '.' + month + '.' + day;

        } else {

          date = date.date;
          date.setDate(date.getDate() + 1);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          nextDay = year + '.' + month + '.' + day;

        }

        res.render('new', {
          date: nextDay
        });

      } else res.redirect("/auth");

    } else res.redirect("/auth");

  });

  app.post('/new', async (req, res) => {

    let day = await mongo.horoscopes.findOne({ date: req.body.date }).then(day => day);

    let status = 'create';

    if (day === null) {

      await mongo.horoscopes.create({
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
      }).then(() => false);

    } else {

      await mongo.horoscopes.updateOne({ _id: day._id }, { $set: {
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

      status = 'update';

    }
    
    res.redirect("/?status=" + status + '&date=' + req.body.date);

  });

};