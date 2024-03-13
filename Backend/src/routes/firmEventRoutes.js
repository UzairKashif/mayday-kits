const express = require('express');
const router = express.Router();
const EventController = require('../controllers/FirmEventController');

router.get('/firms-events', EventController.getEvents);

module.exports = router;
