module.exports = (app, mongo) => {

  app.post('/api/getData', async (req, res) => {

    let id;
    let newcomer = false;
    let sign = '';
    let stars = 0;
    let days = 0;
    let isGetTodayDay = false;
    let isFullPredict = false;

    if (req.body.id !== null) {

        let user = await mongo.users.findOne({ id: req.body.id }).then(user => user);

        if (user !== null) {
          id = user.id;
          sign = user.sign;
          stars = user.stars;
          days = user.day;
          isGetTodayDay = user.isGetTodayDay;
          isFullPredict = user.isFullPredict;
        } else newcomer = true;

    } else newcomer = true

    if (newcomer) {
      let user = await mongo.users.create({ id: req.body.id, sign: '', stars: 0, day: 0, isGetTodayDay: false, isFullPredict: false }).then(user => user);
      id = user.id;
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let today = year + '.' + month + '.' + day;
    let timestamp = today;

    date.setDate(date.getDate() + 1);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    let tomorrow = year + '.' + month + '.' + day;

    today = await mongo.horoscopes.findOne({ date: today }, { __v: 0, _id: 0, date: 0 })
    .then(horoscope => horoscope);
    tomorrow = await mongo.horoscopes.findOne({ date: tomorrow }, { __v: 0, _id: 0, date: 0 })
    .then(horoscope => horoscope);

    let horoscopeIsNotMade = 'Астролог уже составляет ваш гороскоп, зайдите позже.';

    if (today === null) {

      today = {
        aries: horoscopeIsNotMade,
        taurus: horoscopeIsNotMade,
        gemini: horoscopeIsNotMade,
        cancer: horoscopeIsNotMade,
        leo: horoscopeIsNotMade,
        virgo: horoscopeIsNotMade,
        libra: horoscopeIsNotMade,
        scorpio: horoscopeIsNotMade,
        sagittarius: horoscopeIsNotMade,
        capricorn: horoscopeIsNotMade,
        aquarius: horoscopeIsNotMade,
        pisces: horoscopeIsNotMade,
        ophiuchus: horoscopeIsNotMade
      }

    }

    if (tomorrow === null) {

      tomorrow = {
        aries: horoscopeIsNotMade,
        taurus: horoscopeIsNotMade,
        gemini: horoscopeIsNotMade,
        cancer: horoscopeIsNotMade,
        leo: horoscopeIsNotMade,
        virgo: horoscopeIsNotMade,
        libra: horoscopeIsNotMade,
        scorpio: horoscopeIsNotMade,
        sagittarius: horoscopeIsNotMade,
        capricorn: horoscopeIsNotMade,
        aquarius: horoscopeIsNotMade,
        pisces: horoscopeIsNotMade,
        ophiuchus: horoscopeIsNotMade
      }

    }

    res.json({
      id: id,
      stars: stars,
      days: days,
      newcomer: newcomer,
      today: today,
      sign: sign,
      tomorrow: tomorrow,
      timestamp: timestamp,
      isGetTodayDay: isGetTodayDay,
      isFullPredict: isFullPredict
    });

    console.log({
      id: id,
      stars: stars,
      days: days,
      newcomer: newcomer,
      sign: sign,
      // today: today,
      // tomorrow: tomorrow,
      timestamp: timestamp,
      isGetTodayDay: isGetTodayDay
    })
  });
}