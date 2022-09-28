module.exports = (app, mongo) => {

  app.get('/pushEvening', async (req, res) => {
    
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0);

    let tokens = await mongo.tokens.find({ date: { $lt: date } }, { __v: 0, _id: 0, date: 0 })
    .then(token => token);
    
    let somePushTokens = [];
    for (let i in tokens) {
      somePushTokens.push(tokens[i].token);
    }

    if (somePushTokens.length > 0) {

      const Expo = require('expo-server-sdk').Expo;
      let expo = new Expo();

      let messages = [];

      for (let pushToken of somePushTokens) {

        if (!Expo.isExpoPushToken(pushToken)) continue;

        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'Что тебя ждёт завтра? Гороскоп готов!',
          data: { withSome: 'data' },
        });

      }

      let chunks = expo.chunkPushNotifications(messages);

      (async () => {
        for (let chunk of chunks) {
          try {
            await expo.sendPushNotificationsAsync(chunk);
          } catch (error) { }
        }
      })();

    }

    res.json({ success: true });

  });

}
