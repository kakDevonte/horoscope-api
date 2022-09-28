module.exports = (app, mongo) => {

  app.post('/api/addPushToken', async (req, res) => {

    let status;
    let token = await mongo.tokens.findOne({ token: req.body.token }).then(token => token);

    if (token === null) {
      
      if (typeof req.body.token === 'string') {

        if (req.body.token.indexOf('ExponentPushToken') === 0) {
          
          let date = new Date();
          status = 'added';
          mongo.tokens.create({
            token: req.body.token,
            date: date
          }).then(() => false);
          
        } else status = 'not valid';

      } else status = 'have not varable';

    } else {

      let date = new Date();
      mongo.tokens.updateOne({ _id: token._id }, { $set: { date: date } }).then(() => null);
      status = 'have';

    }

    res.json({ status: status });

  });

}
