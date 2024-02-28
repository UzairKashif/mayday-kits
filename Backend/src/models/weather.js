const axios = require('axios');

const fetchWeatherData = async () => {
  const url = 'https://api.weather.gov/alerts/active';
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'frontend/1.0' }
    });
    const features = response.data.features;
    return features.map(feature => ({
      id: feature.id,
      geometry: feature.geometry,
      properties: feature.properties
    }));
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};

module.exports = { fetchWeatherData };
