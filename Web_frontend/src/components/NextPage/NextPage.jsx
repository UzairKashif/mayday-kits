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
        const response = await fetch('http://localhost:3000/data.json');
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
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
    >
      {markersData.map((marker, index) => (
        <Marker
        key={index}
        latitude={parseFloat(marker.lat)}
        longitude={parseFloat(marker.lon)}
        offsetLeft={-15}
        offsetTop={-15}
      >
        <div 
          className="simple-marker" 
          onClick={() => {
            console.log(`Marker ${marker.event_id} clicked`); // For debugging
            setSelectedMarker(prevState => ({ ...prevState, ...marker }));
          }}
        ></div>
      </Marker>
      ))}

      {/* Display Popup on Marker Click */}
      {selectedMarker && (
  <Popup
    latitude={Number(selectedMarker.lat)}
    longitude={Number(selectedMarker.lon)}
    onClose={() => setSelectedMarker(null)}
    closeOnClick={true}
    anchor="top"
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
