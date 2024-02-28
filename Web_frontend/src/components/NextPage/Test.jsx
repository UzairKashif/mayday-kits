import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  const [earthquakeData, setEarthquakeData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/earthquake-events');
        const data = await response.json();
        setEarthquakeData(data);
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
      }
    };
    fetchData();
  }, []);
  console.log('Selected Marker:', selectedMarker); // Debug log
  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
    >
     // ... other parts of your component remain the same

{earthquakeData.map((earthquake, index) => (
  <Marker
    key={index}
    longitude={earthquake.coordinates[0]}
    latitude={earthquake.coordinates[1]}
  >
    <div
      onClick={() => setSelectedMarker(earthquake)}
      style={{ fontSize: '16px', cursor: 'pointer' }}
    >
      ☢️
    </div>
  </Marker>
))}




{selectedMarker && (
  <Popup
    longitude={selectedMarker.coordinates[0]}
    latitude={selectedMarker.coordinates[1]}
    onClose={() => setSelectedMarker(null)}
    closeOnClick={true}
    anchor="bottom"
  >
    <div>
      <h3>Earthquake Details</h3>
      <p>Longitude: {selectedMarker.coordinates[0]}</p>
      <p>Latitude: {selectedMarker.coordinates[1]}</p>
      {/* Include additional details here as needed, such as elevation if relevant */}
      <p>Elevation: {selectedMarker.coordinates[2]} meters</p>
      {/* If you have magnitude and time data, you can add them here */}
      {selectedMarker.magnitude && <p>Magnitude: {selectedMarker.magnitude}</p>}
      {selectedMarker.time && <p>Time: {new Date(selectedMarker.time).toLocaleString()}</p>}
    </div>
  </Popup>
)}

    </ReactMapGL>
  );
}

export default NextPage;
