module.exports = (app, mongo) => {

  app.get('/logout', async (req, res) => {
    
    res.cookie('hash', '', { maxAge: new Date().getTime() - 31536000000 });
    res.redirect("/auth");
    
  });

}
