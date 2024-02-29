import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

function NextPageWeather() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 37.0902, // Default center of the US
    longitude: -95.7129,
    zoom: 3
  });

  const [weatherData, setWeatherData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.weather.gov/alerts/active');
        const data = await response.json();
        const processedData = data.features.map(feature => {
          if (feature.geometry && feature.geometry.coordinates[0]) {
            // Assuming a polygon - calculating the centroid might be more complex
            const firstCoordinate = feature.geometry.coordinates[0][0];
            return {
              id: feature.id,
              longitude: firstCoordinate[0],
              latitude: firstCoordinate[1],
              title: feature.properties.event,
              description: feature.properties.headline
            };
          }
          return null;
        }).filter(item => item !== null);
        setWeatherData(processedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchData();
  }, []);
console.log('Selected Marker:', selectedMarker); // Debug log
  return (
<>
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
    >
      
   {weatherData.map((event) => (
  <Marker key={event.id} longitude={event.longitude} latitude={event.latitude}>
  <div onClick={(e) => {
    e.stopPropagation(); // Prevent click from propagating to the map
    setSelectedMarker(event);
  }} style={{ fontSize: '18px', cursor: 'pointer' }}>⛅</div>
</Marker>

))}

{selectedMarker && (
  <Popup
    longitude={selectedMarker.longitude}
    latitude={selectedMarker.latitude}
    onClose={() => {
      console.log('Closing popup'); // Add this for debugging
      setSelectedMarker(null);
    }}
    closeOnClick={true}
    anchor="bottom"
  >
    <div>
      <h3>{selectedMarker.title}</h3>
      <p>{selectedMarker.description}</p>
    </div>
  </Popup>
)}


    </ReactMapGL>
    </>
  );
}

export default NextPageWeather;
