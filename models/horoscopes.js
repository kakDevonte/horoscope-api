const { Schema, model } = require('mongoose');

const schema = new Schema({
  date: {
    type: Date,
    require: true,
    index: true
  },
  aries: {
    type: String,
    require: true
  },
  taurus: {
    type: String,
    require: true
  },
  gemini: {
    type: String,
    require: true
  },
  cancer: {
    type: String,
    require: true
  },
  leo: {
    type: String,
    require: true
  },
  virgo: {
    type: String,
    require: true
  },
  libra: {
    type: String,
    require: true
  },
  scorpio: {
    type: String,
    require: true
  },
  sagittarius: {
    type: String,
    require: true
  },
  capricorn: {
    type: String,
    require: true
  },
  aquarius: {
    type: String,
    require: true
  },
  pisces: {
    type: String,
    require: true
  },
  ophiuchus: {
    type: String,
    require: true
  }
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('horoscopes', schema);
