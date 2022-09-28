const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
    require: true
  },
  sign: {
    type: String,
    require: true
  },
  stars: {
    type: Number,
    require: true
  },
  day: {
    type: Number,
    require: true
  },
  isGetTodayDay: {
    type: Boolean,
    require: true
  },
  isFullPredict: {
    type: Boolean,
    require: true
  },
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('users', schema);
