const City = require('../models/city.js');

const saveCity = async (weather) => {
  const w1 = new City(weather);
  await w1.save();
};

module.exports = saveCity;
