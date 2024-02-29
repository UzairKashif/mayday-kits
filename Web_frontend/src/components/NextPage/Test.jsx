import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { db } from '../../firebaseConfig'; // Adjust the path according to your project structure

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
        const querySnapshot = await db.collection("earthquakes").get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log("Fetched earthquake data:", data); // Log the fetched data
        setEarthquakeData(data.map(earthquake => {
          // THIS IS HOW YOU CAN QUERY OTHER PROPERTIES FROM FIRESTORE DB
          console.log(earthquake.properties.status);
          
          // Return the modified earthquake object
          return {
            ...earthquake,
            coordinates: [earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]]
          };
        }));        
        
      } catch (error) {
        console.error('Error fetching earthquake data from Firestore:', error);
      }
    };
    fetchData();
  }, []);
  

  // The rest of your component...


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