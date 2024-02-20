import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "./NextPage.css";
import 'mapbox-gl/dist/mapbox-gl.css';
// Import your custom marker icon
import customMarkerIcon from '../assets/fire.png';

function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2.5
  });

  const [markersData, setMarkersData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fire-events');
        const data = await response.json();
        setMarkersData(data);
      } catch (error) {
        console.error('Error fetching marker data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      {markersData.map((marker, index) => (
        <Marker
          key={index}
          latitude={parseFloat(marker.lat)}
          longitude={parseFloat(marker.lon)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          {/* Replace div with image for custom marker */}
          <div 
            className="simple-marker" 
            onClick={() => setSelectedMarker(marker)}
          ></div>
        </Marker>
      ))}

      {/* Display Popup on Marker Click */}
      {selectedMarker && (
        <Popup
          latitude={parseFloat(selectedMarker.lat)}
          longitude={parseFloat(selectedMarker.lon)}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={true}
        >
          <div>
            <h3>Event ID: {selectedMarker.event_id}</h3>
            <p>Latitude: {selectedMarker.lat}</p>
            <p>Longitude: {selectedMarker.lon}</p>
            {/* Add more information here as needed */}
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default NextPage;
