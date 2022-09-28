const { Schema, model } = require('mongoose');

const schema = new Schema({
  token: {
    type: String,
    require: true,
    index: true
  },
  date: {
    type: Date,
    require: true,
    index: true
  }
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('tokens', schema);
