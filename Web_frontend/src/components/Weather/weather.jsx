import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { db } from '../../firebaseConfig'; // Adjust this path to your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import * as turf from '@turf/turf';
import "../Dashboard/NextPage.css"; // Ensure these paths are correct
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@radix-ui/themes/styles.css';
import "./weather.css"

// Import icons
import icon911 from '../assets/weather_icons/911.png';
import iconEarthquake from '../assets/weather_icons/earthquake.png';
import iconFire from '../assets/weather_icons/fire.png';
import iconFlood from '../assets/weather_icons/flood.png';
import iconTsunami from '../assets/weather_icons/tsunami.png';
import iconVolcano from '../assets/weather_icons/volcano.png';
import iconWildfire from '../assets/weather_icons/wildfire.png';
import iconEnvironmentPollution from '../assets/weather_icons/environment-pollution.png';
import iconExplosion from '../assets/weather_icons/explosion.png';
import iconHazmat from '../assets/weather_icons/hazmat.png';
import iconLandslide from '../assets/weather_icons/landslide.png';
import iconNuclear from '../assets/weather_icons/nuclear.png';
import iconSnow from '../assets/weather_icons/snow.png';
import iconHurricane from '../assets/weather_icons/hurricane.png';
import iconTornodo from '../assets/weather_icons/tornado.png';
import iconDrought from '../assets/weather_icons/drought.png';
import iconAvalanche from '../assets/weather_icons/avalanche.png';
import iconAirQuality from '../assets/weather_icons/airquality.png';
import iconStorm from '../assets/weather_icons/storm.svg';




const eventToIconMap = {
  "earthquake": iconEarthquake,
  "Earthquake Warning": iconEarthquake,
  "fire": iconFire,
  "Extreme Fire Danger": iconFire,
  "Fire Warning": iconFire,
  "flood": iconFlood,
  "Flash Flood Warning": iconFlood,
  "Flood Warning": iconFlood,
  "Coastal Flood Warning": iconFlood,
  "tsunami": iconTsunami,
  "Tsunami Warning":iconTsunami,
  "volcano": iconVolcano,
  "Volcano Warning": iconVolcano,
  "wildfire": iconWildfire,
  "environment-pollution": iconEnvironmentPollution,
  "explosion": iconExplosion,
  "hazmat": iconHazmat,
  "landslide": iconLandslide,
  "nuclear": iconNuclear,
  "snow": iconSnow,
  "hurricane": iconHurricane,
  "tornado": iconTornodo,
  "Tornado Warning": iconTornodo,
  "drought": iconDrought,
  "avalanche": iconAvalanche,
  "Air Quality Alert": iconAirQuality,
  "Storm Warning": iconStorm,


  // ... map other valid events to their icons
  "default": icon911, // Default icon
};

// Function to get icon URL based on event type
const getIconForEvent = (eventType) => {
  return eventToIconMap[eventType] || eventToIconMap["default"];
};

const NextPageWeather = () => {
  const [viewport, setViewport] = useState({
    width: '80%',
    height: '100vh',
    latitude: 37.0902,
    longitude: -95.7129,
    zoom: 3,
  });

  const validEvents = [
    "earthquake", "environment-pollution", "explosion", "fire", "flood", "hazmat", "landslide",
    "nuclear", "snow", "technological-disaster", "tsunami", "volcano", "wildfire", "hurricane",
    "tornado", "drought", "avalanche", "Air Quality Alert", "Ashfall Warning", "Beach Hazards Statement",
    "Coastal Flood Warning", "Dense Fog Advisory", "Dense Smoke Advisory", "Earthquake Warning",
    "Evacuation - Immediate", "Excessive Heat Warning", "Extreme Cold Warning", "Extreme Fire Danger",
    "Extreme Wind Warning", "Fire Warning", "Fire Weather Watch", "Flash Flood Warning", "Flood Warning",
    "Freeze Warning", "Freezing Fog Advisory", "Freezing Rain Advisory", "Freezing Spray Advisory",
    "Frost Advisory", "Gale Warning", "Hard Freeze Warning", "Hazardous Materials Warning",
    "Hazardous Seas Warning", "Hazardous Weather Outlook", "Heat Advisory", "High Surf Warning",
    "High Wind Warning", "Hurricane Force Wind Warning", "Hurricane Local Statement", "Ice Storm Warning",
    "Lakeshore Flood Warning", "Nuclear Power Plant Warning", "Radiological Hazard Warning", "Red Flag Warning",
    "Rip Current Statement", "Severe Thunderstorm Warning", "Severe Weather Statement", "Shelter In Place Warning",
    "Storm Surge Warning", "Storm Warning", "Tornado Warning", "Tsunami Warning", "Typhoon Warning",
    "Urban And Small Stream Flood Advisory", "Volcano Warning", "Wind Advisory", "Wind Chill Warning",
    "Winter Storm Warning", "Winter Weather Advisory"
  ];

  const mapRef = useRef();
  const [weatherData, setWeatherData] = useState([]);
  const [selectedEventGeometry, setSelectedEventGeometry] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(
    validEvents.reduce((acc, eventType) => ({ ...acc, [eventType]: false }), {})
  );
  
  

  const resetSelection = () => {
  setSelectedEventDetails(null); // Clears selected event details
  setSelectedEventGeometry([]); // Clears selected event geometries

  const map = mapRef.current.getMap(); // Get the current map instance

  // Ensure coordinates are in the correct order: [longitude, latitude]
  map.flyTo({
    center: [-95.7129, 37.0902], // Correct order of coordinates
    zoom: 3, // Default zoom level to reset to
    speed: 0.8, // Controls the speed of the flyTo animation, with 1 being the default speed
    curve: 1, // The rate at which the zoom level accelerates to the final zoom level
    essential: true // This ensures the animation happens even if the user prefers reduced motion
  });
};


  

  const getEventColor = (eventType) => {
    const colorMap = {
      // Defining colors for each event type as needed
      "earthquake": "#795548",
      "environment-pollution": "#9E9D24",
      "explosion": "#D84315",
      "fire": "#E65100",
      "flood": "#1565C0",
      "hazmat": "#F9A825",
      "landslide": "#6A1B9A",
      "nuclear": "#212121",
      "snow": "#B3E5FC",
      "technological-disaster": "#616161",
      "tsunami": "#0277BD",
      "volcano": "#BF360C",
      "wildfire": "#DD2C00",
      "hurricane": "#0288D1",
      "tornado": "#1A237E",
      "drought": "#3E2723",
      "avalanche": "#ECEFF1",
      "Air Quality Alert": "#827717",
      "Ashfall Warning": "#3E2723",
      "Beach Hazards Statement": "#80D8FF",
      "Coastal Flood Warning": "#01579B",
      "Dense Fog Advisory": "#8C9EFF",
      "Dense Smoke Advisory": "#B0BEC5",
      "Earthquake Warning": "#6D4C41",
      "Evacuation - Immediate": "#D50000",
      "Excessive Heat Warning": "#FF6D00",
      "Extreme Cold Warning": "#64B5F6",
      "Extreme Fire Danger": "#E64A19",
      "Extreme Wind Warning": "#455A64",
      "Fire Warning": "#FF3D00",
      "Fire Weather Watch": "#FFAB00",
      "Flash Flood Warning": "#0D47A1",
      "Flood Warning": "#1976D2",
      "Freeze Warning": "#81D4FA",
      "Freezing Fog Advisory": "#E1F5FE",
      "Freezing Rain Advisory": "#4FC3F7",
      "Freezing Spray Advisory": "#B3E5FC",
      "Frost Advisory": "#81D4FA",
      "Gale Warning": "#0D47A1",
      "Hard Freeze Warning": "#29B6F6",
      "Hazardous Materials Warning": "#FF6F00",
      "Hazardous Seas Warning": "#039BE5",
      "Hazardous Weather Outlook": "#78909C",
      "Heat Advisory": "#FF8A65",
      "High Surf Warning": "#01579B",
      "High Wind Warning": "#2962FF",
      "Hurricane Force Wind Warning": "#0D47A1",
      "Hurricane Local Statement": "#0288D1",
      "Ice Storm Warning": "#81D4FA",
      "Lakeshore Flood Warning": "#0277BD",
      "Nuclear Power Plant Warning": "#424242",
      "Radiological Hazard Warning": "#616161",
      "Red Flag Warning": "#D84315",
      "Rip Current Statement": "#00B0FF",
      "Severe Thunderstorm Warning": "#1E88E5",
      "Severe Weather Statement": "#303F9F",
      "Shelter In Place Warning": "#D32F2F",
      "Storm Surge Warning": "#00E5FF",
      "Storm Warning": "#1565C0",
      "Tornado Warning": "#1A237E",
      "Tsunami Warning": "#01579B",
      "Typhoon Warning": "#006064",
      "Urban And Small Stream Flood Advisory": "#64B5F6",
      "Volcano Warning": "#DD2C00",
      "Wind Advisory": "#42A5F5",
      "Wind Chill Warning": "#90CAF9",
      "Winter Storm Warning": "#1E88E5",
      "Winter Weather Advisory": "#90CAF9",
      "default": "#9e9e9e" // Default color for any event types not explicitly listed
    };


    return colorMap[eventType] || colorMap["default"];
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/weather-evens')
      .then(response => response.json())
      .then(data => {
        setWeatherEvents(data);
      })
      .catch(error => {
        console.error('Error fetching weather events:', error);
      });
  }, []);

  const toggleEventSelection = (eventType) => {
    setSelectedEvents(prevEvents => ({
      ...prevEvents,
      [eventType]: !prevEvents[eventType]
    }));
  };

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

    map.on('click', (e) => {
      // Check if click is on a polygon; if not, reset
      const features = map.queryRenderedFeatures(e.point, { layers: selectedEventGeometry.map((_, index) => `layer-${index}`) });
      if (features.length === 0) {
          resetSelection();
      }
    });

  };

  const handleSelectEvent = async (event) => {
    const geometries = [];

    for (const zoneUrl of event.properties.affectedZones) {
      try {
        const response = await fetch(zoneUrl);
        const data = await response.json();
        if (data.geometry) {
          geometries.push({ ...data.geometry, properties: { event: event.properties.event } });
        }
      } catch (error) {
        console.error('Error fetching zone geometry:', error);
      }
    }

    if (geometries.length > 0) {
      const allCoords = geometries.flatMap(geo => turf.coordAll(geo));
      const bbox = turf.bbox(turf.featureCollection(allCoords.map(coord => turf.point(coord))));
      const [minLng, minLat, maxLng, maxLat] = bbox;
      const map = mapRef.current.getMap();
  
      map.flyTo({
        center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
        zoom: 6, // You may want to adjust this zoom level based on your needs
        speed: 0.8, // Adjust the speed of the animation, with 1 being the default speed
        curve: 1, // Controls the animation curve. A higher value will make the animation more abrupt.
        essential: true // This ensures the animation happens even if the user prefers reduced motion
      });
  
      setSelectedEventDetails(event.properties);
    }

    setSelectedEventGeometry(geometries);

    if (geometries.length > 0) {
      const allCoords = geometries.flatMap(geo => turf.coordAll(geo));
      const bbox = turf.bbox(turf.featureCollection(allCoords.map(coord => turf.point(coord))));
      const [minLng, minLat, maxLng, maxLat] = bbox;

      setViewport({
        ...viewport,
        longitude: (minLng + maxLng) / 2,
        latitude: (minLat + maxLat) / 2,
        zoom: 6,
        transitionDuration: 1000
      });
    }
    setSelectedEventDetails(event.properties);
  };

  const FiltersButton = () => (
    <div 
      onMouseEnter={() => setIsDropdownVisible(true)}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        right: '20px',
        top: '10px',
        zIndex: 3,
        // Additional styling here
      }}
    >
      Filters
    </div>
  );

  

  const Dropdown = () => {
  
    return isDropdownVisible && (
      <div
        className="dropdown"
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => setIsDropdownVisible(false)}
        style={{
          display: 'block',
          position: 'absolute',
          right: '20px',
          top: '50px',
          backgroundColor: '#1F1513',
          padding: '10px',
          border: '1px solid #ddd',
          zIndex: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {
  validEvents.length ? (
    validEvents.map((eventType) => (
      <div key={eventType}>
        <input
          type="checkbox"
          id={eventType}
          checked={selectedEvents[eventType]}
          onChange={() => toggleEventSelection(eventType)}
        />
        <label htmlFor={eventType}>{eventType}</label>
      </div>
    ))
  ) : (
    <div>No event types available.</div>
  )
}
      </div>
    );
  };
  
  const filteredWeatherData = weatherData.filter(event => selectedEvents[event.properties.event]);

  return (
    <>
      <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 1, top: 10, right: 30 }}></div>
      <FiltersButton />
      <Dropdown /> {/* Render the Dropdown component here */}
      <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', overflowY: 'scroll', backgroundColor: '#1F1513', borderRight: '1px solid #ddd' }}>
    {selectedEventDetails ? (
        // Display the selected event details
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <h2>{selectedEventDetails.headline}</h2>
            <p>{selectedEventDetails.description}</p>
            <button onClick={resetSelection}>Back</button>
        </div>
    ) : (
      // Filter and display the list of events based on selectedEvents state
      filteredWeatherData.map((event) => (
        <div key={event.id} onClick={() => handleSelectEvent(event)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
          <img src={getIconForEvent(event.properties.event)} alt="Event icon" style={{ marginRight: '10px' }} width="24" height="24" />
          {event.properties.event} - {event.properties.headline}
        </div>
      ))
    )}
  </div>

        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onMove={evt => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          onLoad={handleLoad}
        >
          {selectedEventGeometry.map((geo, index) => (
            <Source key={index} id={`source-${index}`} type="geojson" data={geo}>
              <Layer
                id={`layer-${index}`}
                type="fill"
                paint={{
                  'fill-color': getEventColor(geo.properties.event),
                  'fill-opacity': 0.5,
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
