// src/components/WindyMap.js
import React, { useEffect, useRef, useState } from 'react';
import useScript from '../Hooks/useScript';
import WeatherForecast from './WeatherForecast'; // Importing WeatherForecast component
import './WindyMap.css';








// Placeholder for actual data fetching
// Adapt this function to use Windy API or another weather API
const fetchPointForecast = async (lat, lon) => {
    try {
      const apiKey = 'UDPVe8gC6B1J8JTwGeB91qEVGlBUWNZW'; // Your actual API key
      const url = 'https://api.windy.com/api/point-forecast/v2';
      const body = JSON.stringify({
        lat: lat,
        lon: lon,
        model: 'gfs',
        parameters: ['temp', 'wind', 'dewpoint', 'rh', 'pressure'],
        levels: ['surface'],
        key: apiKey
      });
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      });
  
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Network response was not ok. Status: ${response.status}. Body: ${errorBody}`);
      }
  
      const data = await response.json();
  
      // Log the raw data received from the API
      console.log("Raw API data:", data);
  
      if (!data || !data.ts || !Array.isArray(data.ts) || data.ts.length === 0) {
        console.error('Data is not in the expected format or is empty:', data);
        return [];
      }
  
      const processedData = data.ts.map((timestamp, index) => {
        const temperature = data['temp-surface'] ? data['temp-surface'][index] : 'N/A';
        const windSpeed = data['wind-surface'] ? data['wind-surface'][index] : 'N/A';
  
        return {
          date: new Date(timestamp).toISOString().split('T')[0],
          temperature: temperature,
          windSpeed: windSpeed,
        };
      });
  
      // Log the processed data structure
      console.log("Processed forecast data:", processedData);
  
      return processedData;
    } catch (error) {
      console.error('Failed to fetch point forecast:', error);
      return [];
    }
    
  };
  

const WindyMap = () => {
    const mapRef = useRef(null);
    const [showForecast, setShowForecast] = useState(false);
    const [forecastData, setForecastData] = useState(null);
  
  const leafletStatus = useScript('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js');
  const windyStatus = useScript(
    leafletStatus === 'ready' ? 'https://api.windy.com/assets/map-forecast/libBoot.js' : null
  );

  

  useEffect(() => {
    if (windyStatus === 'ready' && typeof window.windyInit === 'function') {
      const options = {
        key: 'jCa2M0eIaEMfgewJDCLb4yfnL04UQPKt',
        lat: 50.4,
        lon: 14.3,
        zoom: 5,
      };

      window.windyInit(options, (windyAPI) => {
        const { map, picker } = windyAPI;
        
        map.setView([options.lat, options.lon], options.zoom);

        picker.on('pickerOpened', async (latLon) => {
            const data = await fetchPointForecast(latLon.lat, latLon.lon);
            setForecastData(data);
            setShowForecast(true);
          });
          

        map.on('click', function (e) {
          picker.open({ lat: e.latlng.lat, lon: e.latlng.lng });
        });

        mapRef.current = map;
      });
    }
  }, [windyStatus]);

  const handleCloseForecast = () => {
    setShowForecast(false);
  };


  return (
    <div>
      <div ref={mapRef} id="windy" className="windy-map"></div>
      {showForecast && forecastData && (
        <WeatherForecast
  forecastData={forecastData}
  onClose={handleCloseForecast}
  className={showForecast ? 'show' : ''}
/>

      )}
    </div>
  );
};

export default WindyMap;