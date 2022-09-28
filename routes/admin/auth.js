const md5 = require('md5');

module.exports = (app, mongo) => {

  app.get('/auth', async (req, res) => {
    
    let hash = req.cookies.hash;

    if (hash !== undefined) {

      mongo.settings.findOne({ hash: hash }).then((result) => {

        if (result !== null) {

          res.redirect("/");

        } else {

          res.render('auth', {
            error: false
          });

        }

      });

    } else {

      res.render('auth', {
        error: false
      });

    }
    
  });

  
  app.post('/auth', async (req, res) => {

    const login = req.body.login;
    const pass = req.body.pass;
    
    mongo.settings.findOne({
      login: login,
      pass: pass
    }).then((result) => {

      if (result !== null) {

        const hash = md5(login + pass);
        res.cookie('hash', hash, { maxAge: 31536000000 }); //cookie
        res.redirect("/");
        
      } else {
        
        res.render('auth', {
          error: true
        });

      }

    });

  });

};