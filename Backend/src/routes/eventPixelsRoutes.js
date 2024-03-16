const express = require('express');
const fireEventController = require('../controllers/eventPixelsController'); // Correct the path as necessary
const router = express.Router();

router.get('/fire-events/:id/pixels', fireEventController.getEventDetails);

module.exports = router;
