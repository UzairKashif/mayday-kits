import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { db } from '../../firebaseConfig'; // Make sure this path is correct

function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 2
  });

  const [earthquakeData, setEarthquakeData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection("earthquakes").get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setEarthquakeData(data);
      } catch (error) {
        console.error('Error fetching earthquake data from Firestore:', error);
      }
    };
    fetchData();
  }, []);
  const handleMarkerClick = (earthquake, event) => {
    event.stopPropagation(); // Prevent click from propagating to the map
    console.log('Clicked marker data:', earthquake); // This should log the earthquake data structure
  
    // Check if the earthquake object and its geometry are defined
    if (earthquake && earthquake.geometry && earthquake.geometry.coordinates) {
      setSelectedMarker(earthquake);
    } else {
      console.error('Invalid earthquake data:', earthquake);
    }
  };
  
  

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
        longitude={earthquake.geometry.coordinates[0]}
        latitude={earthquake.geometry.coordinates[1]}
      >
        <div
          onClick={(e) => handleMarkerClick(earthquake, e)} // Pass the earthquake data and event
          style={{ fontSize: '18px', cursor: 'pointer' }}
        >
          🌎
        </div>
      </Marker>
      
      ))}

      {selectedMarker && (
        <Popup
          longitude={selectedMarker.geometry.coordinates[0]}
          latitude={selectedMarker.geometry.coordinates[1]}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={true}
          anchor="bottom"
        >
          <div>
            <strong>Place:</strong> {selectedMarker.properties.place}<br />
            <strong>Magnitude:</strong> {selectedMarker.properties.mag}<br />
            <strong>Type:</strong> {selectedMarker.properties.type}<br />
            <strong>Time:</strong> {new Date(selectedMarker.properties.time).toLocaleString()}<br />
            <strong>Coordinates:</strong> {selectedMarker.geometry.coordinates.join(', ')}
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default NextPage;
