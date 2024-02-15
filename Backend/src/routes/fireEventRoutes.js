const express = require('express');
const router = express.Router();
const EventController = require('../controllers/FireEventController');

router.get('/fire-events', EventController.getEvents);

module.exports = router;
