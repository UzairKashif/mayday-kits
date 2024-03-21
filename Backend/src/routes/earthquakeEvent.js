const express = require('express');
const router = express.Router();
const { getEarthquakeEvents } = require('../models/earthquake');

router.get('/earthquakeevent', async (req, res) => {
  try {
    const earthquakeData = await getEarthquakeEvents();
    res.json(earthquakeData);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;