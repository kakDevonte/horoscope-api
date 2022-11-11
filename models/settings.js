const { Schema, model } = require('mongoose');

const schema = new Schema({
  login: {
    type: String,
    require: true,
    default: 'irsAdmin'
  },
  pass: {
    type: String,
    require: true,
    default: 'newPassIrs321'
  },
  hash: {
    type: String,
    require: true,
    default: 'f6fdffe48c908deb0f4c3bd36c032e72'
  }
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('settings', schema);
