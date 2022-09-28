require('dotenv').config();
const express = require('express');
const mongoose = require('./db');
const mongo = require('./models');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/', express.static('public'));
app.set('view engine', 'ejs');

const fs = require("fs");
// const options = {
//   key: fs.readFileSync(process.env.KEY),
//   cert: fs.readFileSync(process.env.CERT)
// }
//const server = require('https').createServer(options, app);

mongoose().then(async () => {
  await require('./functions/migrations')(mongo);
  // app.listen(process.env.PORT);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  require('./routes')(app, mongo);
}).catch(() => {
  console.error('db error');
  proccess.exit(1);
});

cron.schedule('0 1 * * *', function() {
  mongo.users.updateMany({}, {$set: { isGetTodayDay: false, isFullPredict: false }},{ multi: true }).then(() => null);
});
