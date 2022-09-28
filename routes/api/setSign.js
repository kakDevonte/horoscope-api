module.exports = (app, mongo) => {

  app.post('/api/setSign', async (req, res) => {

    let success = false;

    if (req.body.id !== null) {

        let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);

        if (user !== null &&
          (req.body.sign === 'aries' ||
          req.body.sign === 'taurus' ||
          req.body.sign === 'gemini' ||
          req.body.sign === 'cancer' ||
          req.body.sign === 'leo' ||
          req.body.sign === 'virgo' ||
          req.body.sign === 'libra' ||
          req.body.sign === 'scorpio' ||
          req.body.sign === 'sagittarius' ||
          req.body.sign === 'capricorn' ||
          req.body.sign === 'aquarius' ||
          req.body.sign === 'pisces' ||
          req.body.sign === 'ophiuchus')) {

          mongo.users.updateOne({ id: req.body.id }, { $set: {
            sign: req.body.sign
          } }).then(() => null);
          success = true;
        }
      }

    res.json({ success: success });

  });

}
