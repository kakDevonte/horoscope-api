const verifyLaunchParams = require("../../functions/verifyLaunchParams");
const qs = require('qs');

function isNumeric(value) {
  return /^\d+$/.test(value);
}

module.exports = (app, mongo) => {
  app.get('/api/setSign/:sign', async (req, res) => {
    const sign = req.params.sign;
    const verifyLaunchParams = require('../../functions/verifyLaunchParams');
    let auth;
    // if(req.headers.authorization){
    //   auth = verifyLaunchParams(req.headers.authorization, process.env.SECRET);
    // }
    // if(!auth) {
    //   res.status(401).send({ error: "not authorized :(" });
    //   return;
    // }

    const header = qs.parse(req.headers.authorization);
    const userId = header.vk_user_id;

    if(!isNumeric(sign)) {
      res.status(400).send({ error: "Invalid input :(" });
    }

    if (userId !== null) {
          const user = await mongo.users.findOneAndUpdate({ id: userId }, { $set: {
            sign: sign
          } }, {new: true})
      res.json(user)
          //     .then().then((data) => {
          //   console.log("RES === ", data)
          //   res.json(data)
          // });
      }
  });

}
