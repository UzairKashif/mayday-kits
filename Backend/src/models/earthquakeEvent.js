const pool = require('../config/database');


const getEarthquakeEvents = async () => {
  const query = 'SELECT  * FROM g16.earthquake LIMIT 100'; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getEarthquakeEvents,
};