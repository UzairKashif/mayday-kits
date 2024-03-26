import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { db } from '../../firebaseConfig'; // Ensure this path is correct for your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import * as turf from '@turf/turf';
import "../NextPage/NextPage.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import '@radix-ui/themes/styles.css';
import "../NextPage/NextPage.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@radix-ui/themes/styles.css';


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

  const handleLoad = () => {
    const map = mapRef.current.getMap();

    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    });

    geocoder.on('result', function(e) {
      setViewport(prevViewport => ({
        ...prevViewport,
        longitude: e.result.center[0],
        latitude: e.result.center[1],
        zoom: 10,
      }));
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  };
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "weatherAlerts"));
      const validEvents = [
        "earthquake",
        "environment-pollution",
        "explosion",
        "fire",
        "flood",
        "hazmat",
        "landslide",
        "nuclear",
        "snow",
        "technological-disaster",
        "tsunami",
        "volcano",
        "wildfire",
        "hurricane",
        "tornado",
        "drought",
        "avalanche",
        "landslide",
        "Air Quality Alert",
        "Ashfall Warning",
        "Beach Hazards Statement",
        "Coastal Flood Warning",
        "Dense Fog Advisory",
        "Dense Smoke Advisory",
        "Earthquake Warning",
        "Evacuation - Immediate",
        "Excessive Heat Warning",
        "Extreme Cold Warning",
        "Extreme Fire Danger",
        "Extreme Wind Warning",
        "Fire Warning",
        "Fire Weather Watch",
        "Flash Flood Warning",
        "Flood Warning",
        "Freeze Warning",
        "Freezing Fog Advisory",
        "Freezing Rain Advisory",
        "Freezing Spray Advisory",
        "Frost Advisory",
        "Gale Warning",
        "Hard Freeze Warning",
        "Hazardous Materials Warning",
        "Hazardous Seas Warning",
        "Hazardous Weather Outlook",
        "Heat Advisory",
        "High Surf Warning",
        "High Wind Warning",
        "Hurricane Force Wind Warning",
        "Hurricane Local Statement",
        "Ice Storm Warning",
        "Lakeshore Flood Warning",
        "Nuclear Power Plant Warning",
        "Radiological Hazard Warning",
        "Red Flag Warning",
        "Rip Current Statement",
        "Severe Thunderstorm Warning",
        "Severe Weather Statement",
        "Shelter In Place Warning",
        "Storm Surge Warning",
        "Storm Warning",
        "Tornado Warning",
        "Tsunami Warning",
        "Typhoon Warning",
        "Urban And Small Stream Flood Advisory",
        "Volcano Warning",
        "Wind Advisory",
        "Wind Chill Warning",
        "Winter Storm Warning",
        "Winter Weather Advisory",
        "user_residential",
        "user_business",
        "user_government",
        "user_mayday_info",
        "camera",
        "AQI",
        "IP911",
      ];
      const data = querySnapshot.docs
        .map(doc => ({...doc.data(), id: doc.id}))
        .filter(event => validEvents.includes(event.properties.event)); // Only include events that are in the validEvents array
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
    <>
    <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 1, top: 10, right: 30 }}>
  </div> 
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', overflowY: 'scroll', backgroundColor: '#1F1513', borderRight: '1px solid #ddd' }}>
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
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onLoad={handleLoad}
      >
        {selectedEventGeometry.map((geo, index) => (
          <Source key={index} id={`source-${index}`} type="geojson" data={geo}>
            <Layer
              id={`layer-${index}`}
              type="fill"
              paint={{
                'fill-color': '#EC6142',
                'fill-opacity': 0.4
              }}
            />
          </Source>
        ))}
      </ReactMapGL>
    </div>
    </>
  );
};

export default NextPageWeather;
