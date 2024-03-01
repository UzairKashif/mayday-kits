import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { db } from '../../firebaseConfig'; // Ensure this path is correct for your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import * as turf from '@turf/turf';

const NextPageWeather = () => {
  const [viewport, setViewport] = useState({
    width: '80%',
    height: '100vh',
    latitude: 37.0902,
    longitude: -95.7129,
    zoom: 3,
  });

  const viewportRef = useRef(viewport); // Use ref to keep track of the current viewport
  const [weatherData, setWeatherData] = useState([]);
  const [selectedEventGeometry, setSelectedEventGeometry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "weatherAlerts"));
      const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      setWeatherData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // This effect ensures that the viewport state is always up-to-date with the ref's current value.
    viewportRef.current = viewport;
  }, [viewport]);

  const handleSelectEvent = async (event) => {
    const geometries = [];

    for (const zoneUrl of event.properties.affectedZones) {
      try {
        const response = await fetch(zoneUrl);
        const data = await response.json();
        if (data.geometry) {
          geometries.push(data.geometry);
        }
      } catch (error) {
        console.error('Error fetching zone geometry:', error);
      }
    }

    setSelectedEventGeometry(geometries);

    if (geometries.length > 0) {
      const allCoords = geometries.flatMap(geo => turf.coordAll(geo));
      const bbox = turf.bbox({type: 'FeatureCollection', features: allCoords.map(coord => turf.point(coord))});
      const [minLng, minLat, maxLng, maxLat] = bbox;
      
      // Directly update the viewport state and the ref to enforce the viewport change.
      const newViewport = {
        ...viewportRef.current, // Use the current viewport settings
        longitude: (minLng + maxLng) / 2,
        latitude: (minLat + maxLat) / 2,
        zoom: 6, // Adjust zoom as needed
        transitionDuration: 1000 // Optional: add transition for smooth zooming
      };
      setViewport(newViewport);
      viewportRef.current = newViewport; // Update the ref to the new viewport
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', overflowY: 'scroll', backgroundColor: 'white', borderRight: '1px solid #ddd', color:'black', }}>
        {weatherData.map((event) => (
          <div key={event.id} onClick={() => handleSelectEvent(event)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
            {event.properties.event} - {event.properties.headline}
          </div>
        ))}
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={(nextViewport) => setViewport(nextViewport.viewState || nextViewport)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        {selectedEventGeometry.map((geo, index) => (
          <Source key={index} id={`source-${index}`} type="geojson" data={geo}>
            <Layer
              id={`layer-${index}`}
              type="fill"
              paint={{
                'fill-color': '#088',
                'fill-opacity': 0.8
              }}
            />
          </Source>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default NextPageWeather;
