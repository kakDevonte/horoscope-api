require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', false);
    mongoose.set('useCreateIndex', true);

    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('DB connection closed'))
      .once('open', () => resolve(mongoose.connections[0]));
    
    mongoose.connect('mongodb://localhost:27017/base', { useNewUrlParser: true, useUnifiedTopology: true });
  });
}