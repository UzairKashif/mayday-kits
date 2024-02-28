const express = require('express');
const router = express.Router();
const { fetchWeatherData } = require('../models/weather');
const cors = require('cors');

router.get('/weather-events', cors(), async (req, res) => {
  try {
    const data = await fetchWeatherData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
