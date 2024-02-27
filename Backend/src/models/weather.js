const axios = require('axios');

const getWeatherData = async () => {
  const url = 'https://api.weather.gov/alerts/active?area=KS'; // Replace 'your-endpoint' with the specific NWS API endpoint you want to use

  try {
    const response = await axios.get(url);
    const weatherData = response.data; // Modify this as per the structure of the NWS API response
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = {
  getWeatherData,
};