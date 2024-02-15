const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint for users to submit event data
app.post('/submitEvent', (req, res) => {
  const {
    event_id,
    first_tl,
    lat,
    lon,
    event_start,
    event_last_seen,
    status
  } = req.body;

  // Validate input (add more validation if needed)
  if (!event_id || !first_tl || !lat || !lon || !event_start || !event_last_seen || !status) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Process the received event data (you can customize this part)
  const eventData = {
    event_id,
    first_tl,
    lat,
    lon,
    event_start,
    event_last_seen,
    status,
  };

  // Log the received event data (you can store it in a database, etc.)
  console.log('Received Event Data:', eventData);

  // Respond to the user
  res.status(200).json({
    success: true,
    message: 'Event data sent successfully'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
