
//////////This will just showthe Geometry of data with  greater than 3 magnitude///////////
const axios = require('axios');
const getEarthquakeEvents = async () => {
  const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
  const params = {
    format: 'geojson',
    starttime: '2024-01-01',
    endtime: '2024-02-02',
    minmagnitude: '3',
  };

  try {
    const response = await axios.get(url, { params });
    const earthquakeData = response.data.features.map((event) => event.geometry);
    return earthquakeData;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
};

module.exports = {
  getEarthquakeEvents,
};











///////////////////   For Complete Data Show /////////////////////////

// const getEarthquakeEvents = async () => {
//   const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
//   const params = {
//     format: 'geojson',
//     starttime: '2024-01-01',
//     endtime: '2024-02-02',
//     minmagnitude: '3',
//   };

//   try {
//     const response = await axios.get(url, { params });
//     const earthquakeData = response.data.features.map((event) => {
//       return {
//         geometry: event.geometry,
//         properties: event.properties, // Include all properties
//         // Add additional fields as needed
//       };
//     });
//     return earthquakeData;
//   } catch (error) {
//     console.error('Error fetching earthquake data:', error);
//     throw error;
//   }
// };

// module.exports = {
//   getEarthquakeEvents,
// };




