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
        // Adjust the URL to your actual data source
        const response = await fetch('http://localhost:3000/api/earthquake-events');
        const data = await response.json();
        setEarthquakeData(data);
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
    >
      {earthquakeData.map((earthquake, index) => (
        <Marker
          key={index}
          longitude={earthquake.coordinates[0]}
          latitude={earthquake.coordinates[1]}
        >
          <div onClick={() => setSelectedMarker(earthquake)}>🌎</div>
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
            {/* Display information from the selected marker. Adjust as necessary. */}
            Coordinates: {selectedMarker.coordinates[0]}, {selectedMarker.coordinates[1]}
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default NextPage;