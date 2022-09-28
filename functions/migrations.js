module.exports = async (mongo) => {

  let settings = await mongo.settings.findOne({}).then(settings => settings);

  if (settings === null) await mongo.settings.create({}).then(() => null);

}