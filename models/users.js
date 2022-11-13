const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
    require: true
  },
  sign: {
    type: Number,
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
    type: Array,
    require: true
  },
  countOfAdsPerDay: {
    type: Number,
    require: true
  },
  dateOfShowAds: {
    type: String,
    require: true
  },
  isClickedOnRemindMe: {
    type: Boolean,
    require: true
  }
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('users', schema);
