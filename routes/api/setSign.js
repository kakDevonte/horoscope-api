const verifyLaunchParams = require("../../functions/verifyLaunchParams");
module.exports = (app, mongo) => {

  app.post('/api/setSign', async (req, res) => {

    const verifyLaunchParams = require('../../functions/verifyLaunchParams');
    let auth;
    if(req.headers.authorization){
      auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
    }
    if(!auth) {
      res.status(401).send({ error: "not authorized :(" });
      return;
    }

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
