const pool = require('../config/database');


const getFireEvents = async () => {
  const query = 'SELECT  * FROM g16.events'; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getFireEvents,
};