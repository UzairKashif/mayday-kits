const fireEventModel = require('../models/eventPixels'); // Correct the path as necessary

// Function to handle the API request
const getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventDetails = await fireEventModel.getEventDetailsWithPixels(eventId);
    res.json(eventDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEventDetails,
};
