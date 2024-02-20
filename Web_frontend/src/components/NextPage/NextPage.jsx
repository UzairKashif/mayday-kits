import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import "./NextPage.css"
import 'mapbox-gl/dist/mapbox-gl.css';

function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2.5
  });

  // State to hold marker data
  const [markersData, setMarkersData] = useState([]);

  // Fetch marker data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/fire-events');
        const data = await response.json();
        setMarkersData(data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching marker data:', error);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once when the component mounts

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
          latitude={parseFloat(marker.lat)} // Ensure these values are numbers
          longitude={parseFloat(marker.lon)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ color: "#fff" }}>{marker.event_id}</div> {/* Adjust as needed */}
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default NextPage;
