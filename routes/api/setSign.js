module.exports = (app, mongo) => {

  app.post('/api/setSign', async (req, res) => {

    if (req.body.id !== null) {
          mongo.users.updateOne({ id: req.body.id }, { $set: {
            sign: req.body.sign
          } }).then((data) => console.log(data));
      }

      const user = await mongo.users.findOne({ id: req.body.id });
    console.log('user ', user)
    console.log(req.body.sign)
    res.json(user);

  });

}
