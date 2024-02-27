
const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../models/weather');

router.get('/weather-events', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


