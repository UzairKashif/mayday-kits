// src/components/WeatherForecast.js
import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ forecastData, onClose }) => {
  if (!forecastData) {
    return null;
  }

  return (
    <div className="weather-forecast-container">
      <button className="close-btn" onClick={onClose}>×</button>
      {forecastData.map((dayForecast, index) => (
        <div key={index} className="forecast-day">
          <div className="date">{dayForecast.date}</div>
          <div className="temperature">Temperature: {dayForecast.temperature} °C</div>
          <div className="wind">Wind Speed: {dayForecast.windSpeed} km/h</div>
          {/* Include other details from dayForecast as needed */}
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
