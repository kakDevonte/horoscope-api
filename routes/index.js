module.exports = (app, mongo) => {

  require('./api/addPushToken')(app, mongo);
  require('./api/getData')(app, mongo);
  require('./api/setSign')(app, mongo);
  require('./api/setDays')(app, mongo);
  require('./api/setStars')(app, mongo);
  require('./api/setFullPredict')(app, mongo);
  require('./api/addPushNotice')(app, mongo);
  require('./api/setDateOfGetStars')(app, mongo);

  require('./admin/home')(app, mongo);
  require('./admin/auth')(app, mongo);
  require('./admin/logout')(app, mongo);
  require('./admin/new')(app, mongo);
  require('./admin/edit')(app, mongo);

  require('./push/morning')(app, mongo);
  require('./push/evening')(app, mongo);

}