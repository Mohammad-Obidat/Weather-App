require('dotenv').config();
const express = require('express');
const axios = require('axios');
const City = require('../models/city.js');
const saveCity = require('../config/db.js');
const router = express.Router();

const getWeather = async (cityName) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.weatherAPI_KEY}`;
  const weather = await axios.get(URL);
  let celsiusTemp = Math.floor(weather.data.main.temp - 273.15);
  return {
    name: weather.data.name,
    temperature: celsiusTemp,
    condition: weather.data.weather[0].main,
    conditionPic: weather.data.weather[0].icon,
  };
};

router.get('/city/:cityName', async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const cityWeather = await getWeather(cityName);
    res.status(200).send(cityWeather);
  } catch (error) {
    res.sendStatus(401);
  }
});

router.get('/cities', async (req, res) => {
  let cities = await City.find({});
  if (cities) {
    res.status(200).send(cities);
  } else res.sendStatus(400);
});

router.post('/city', async (req, res) => {
  let cityWeather = req.body;
  if (cityWeather) {
    await saveCity(cityWeather);
    res.status(201).send(cityWeather);
  } else res.sendStatus(400);
});

router.delete('/city/:cityName', async (req, res) => {
  let City_Name = req.params.cityName;
  if (City_Name) {
    let city = await City.findOneAndDelete({ name: City_Name });
    res.status(200).send(city);
  } else res.sendStatus(404);
});

module.exports = router;
