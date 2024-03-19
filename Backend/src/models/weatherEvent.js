const pool = require('../config/database');


const getWeatherEvents = async () => {
  const query = 'SELECT  * FROM g16.weather'; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getWeatherEvents,
};