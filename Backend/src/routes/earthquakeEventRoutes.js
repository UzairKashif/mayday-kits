const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EarthquakeController');

router.get('/earthquake-events', EventController.getEvents);

module.exports = router;
