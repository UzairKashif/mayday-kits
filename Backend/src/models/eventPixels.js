const pool = require('../config/database');

// Function to get detailed event data including associated pixels
const getEventDetailsWithPixels = async (eventId) => {
    const query = `
    SELECT gp.* 
    FROM g16.geo_pixels gp
    WHERE gp.group_id = (
      SELECT g.group_id 
      FROM g16.groups g
      WHERE g.groups_pk = (
        SELECT e.groups_pk 
        FROM g16.events e 
        WHERE e.event_id = $1
      )
    )
  `;
  try {
    const result = await pool.query(query, [eventId]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getEventDetailsWithPixels,
};
