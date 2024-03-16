const EventModel = require('../models/firmEvent');

exports.getEvents = async (req, res) => {
  try {
    const events = await EventModel.getFirmsEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};
