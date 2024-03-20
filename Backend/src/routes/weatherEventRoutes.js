const express = require('express');
const router = express.Router();
const EventController = require('../controllers/WeatherEventController');

router.get('/weather-events', EventController.getEvents);

module.exports = router;
