const pool = require('../config/database');


const getEarthquakeEvents = async () => {
  const query = 'select * from earthquake1'; 
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