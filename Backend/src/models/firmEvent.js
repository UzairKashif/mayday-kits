const pool = require('../config/database');


const getFirmsEvents = async () => {
  const query = 'SELECT  * FROM g16.viirs'; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getFirmsEvents,
};