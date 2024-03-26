import React, { useState, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Marker,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // Ensure mapboxgl is correctly imported if needed
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Dropdown from '../dropdown_menu/dropdown';
import TabsDemo from '../Tabs/Tabs';
import FireMarkersComponent from '../MarkersComponents/FireMarkersComponent';
import EarthquakeMarkersComponent from '../MarkersComponents/EarthquakeMarkersComponent';
import { useMarkerClickHandler} from '../Hooks/useMarkerClickHandler'; // Ensure this path is correct
import FireMap from '../Firms/firms'; // Update the import path as necessary
import  { Source, Layer } from 'react-map-gl';
import * as turf from '@turf/turf';
import ToastDemo from '../../components/Toast/toast';


function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: -14.2350,
    longitude: -51.9253,
    zoom: 1.5,
  });


  const [selectedEventGeometry, setSelectedEventGeometry] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toggleWeatherAndToastVisibility = () => {
    setShowWeather((prev) => !prev); // Toggle weather visibility
    setIsToastVisible((prev) => !prev); // Toggle toast visibility concurrently
  };
  

const ToggleSwitch = ({ isOn, handleToggle, label }) => (
  <div className={`toggle-switch ${isOn ? 'on' : ''}`} onClick={handleToggle}>
    <div className="toggle-slider"></div>
    <span style={{ color: 'white', marginLeft: '70px' }}>{label}</span>
  </div>
);


const handleMapViewport = ({ latitude, longitude, zoom }) => {
  setViewport({ latitude, longitude, zoom });

  if (mapRef.current) {
    const map = mapRef.current.getMap();
    map.flyTo({
      center: [longitude, latitude],
      zoom,
      essential: true,
    });
  }
};

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapRef = useRef();

const [showFire, setShowFire] = useState(false);
const [showEarthquake, setShowEarthquake] = useState(false);
const [showWeather, setShowWeather] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);
const [showDetails, setShowDetails] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [fireEventPixels, setFireEventPixels] = useState([]);
const [firePolygon, setFirePolygon] = useState(null);



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

const onDrawPolygon = () => {
  if (fireEventPixels.length === 0) return;
  
  const points = fireEventPixels.map(pixel => [parseFloat(pixel.lon), parseFloat(pixel.lat)]);
  const polygon = turf.convex(turf.multiPoint(points));

  setFirePolygon(polygon);
};
  
const handleMarkerClick = async (lat, lon, event) => {
  
  // console.log("Clicked marker event:", event); // Log the event object
  setSelectedEvent(event); // Update selectedEvent with the clicked event
  setShowDetails(true); // Show the event details
  setIsSidebarOpen(true);
  handleMapViewport({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    zoom: 10,
    pitch: 60,
    bearing: 30,
    speed: 1.2,
  });
  
  if (event.type === 'fire') {
    try {
      const pixelsResponse = await fetch(`http://localhost:3000/api/fire-events/${event.event_id}/pixels`);
      const pixelsData = await pixelsResponse.json();
      setFireEventPixels(pixelsData); // Set the state for fire event pixels
    } catch (error) {
      console.error('Error fetching fire event pixel data:', error);
    }
  }

};

const eventTypeToColorMap = {
  "disaster": "#ff6347",
  "earthquake": "#d2691e",
  "environment-pollution": "#556b2f",
  "explosion": "#ff4500",
  "fire": "#ff0000",
  "flood": "#1e90ff",
  "hazmat": "#ff8c00",
  "landslide": "#8b4513",
  "nuclear": "#800080",
  "snow": "#add8e6",
  "technological-disaster": "#696969",
  "tsunami": "#0000cd",
  "volcano": "#b22222",
  "wildfire": "#b22222",
  "hurricane": "#4682b4",
  "tornado": "#778899",
  "drought": "#f4a460",
  "avalanche": "#f0f8ff",
  "Air Quality Alert": "#556b2f",
  "Ashfall Warning": "#f0f8ff",
  "Avalanche Warning": "#2e8b57",
  "Beach Hazards Statement": "#1e90ff",
  "Coastal Flood Warning": "#708090",
  "Dense Fog Advisory": "#a9a9a9",
  "Dense Smoke Advisory": "#d2691e",
  "Earthquake Warning": "#8b4513",
  "Evacuation - Immediate": "#ff6347",
  "Excessive Heat Warning": "#FF4500",
  "Extreme Cold Warning": "#00bfff",
  "Extreme Fire Danger": "#ff0000",
  "Extreme Wind Warning": "#778899",
  "Fire Warning": "#ff0000",
  "Fire Weather Watch": "#ff4500",
  "Flash Flood Warning": "#1e90ff",
  "Flood Warning": "#1e90ff",
  "Freeze Warning": "#00bfff",
  "Freezing Fog Advisory": "#708090",
  "Freezing Rain Advisory": "#4682b4",
  "Freezing Spray Advisory": "#add8e6",
  "Frost Advisory": "#f0f8ff",
  "Gale Warning": "#778899",
  "Hard Freeze Warning": "#00bfff",
  "Hazardous Materials Warning": "#ff8c00",
  "Hazardous Seas Warning": "#4682b4",
  "Hazardous Weather Outlook": "#708090",
  "Heat Advisory": "#ff4500",
  "High Surf Warning": "#2e8b57",
  "High Wind Warning": "#778899",
  "Hurricane Force Wind Warning": "#4682b4",
  "Hurricane Local Statement": "#4682b4",
  "Ice Storm Warning": "#add8e6",
  "Lakeshore Flood Warning": "#1e90ff",
  "Nuclear Power Plant Warning": "#800080",
  "Radiological Hazard Warning": "#800080",
  "Red Flag Warning": "#ff0000",
  "Rip Current Statement": "#2e8b57",
  "Severe Thunderstorm Warning": "#ff4500",
  "Severe Weather Statement": "#ff6347",
  "Shelter In Place Warning": "#ff6347",
  "Storm Surge Warning": "#1e90ff",
  "Storm Warning": "#4682b4",
  "Tornado Warning": "#778899",
  "Tsunami Warning": "#0000cd",
  "Typhoon Warning": "#4682b4",
  "Urban And Small Stream Flood Advisory": "#1e90ff",
  "Volcano Warning": "#b22222",
  "Wind Advisory": "#778899",
  "Wind Chill Warning": "#00bfff",
  "Winter Storm Warning": "#add8e6",
  "Winter Weather Advisory": "#add8e6",
  "default":"#f7f5f6"
  // ... any other events you need
};
const handleWeatherEventSelect = async (eventData) => {
  if (!eventData || !eventData.properties || !eventData.properties.affectedZones) {
    console.error('Invalid event data:', eventData);
    return; // Exit the function if eventData is not structured as expected.
  }

  const zoneUrls = eventData.properties.affectedZones;
  const features = []; // This will hold the features array

  for (const url of zoneUrls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Assign fillColor here before the object
      console.log("Event type:", eventData.properties.event); // Log the event type key
      const fillColor = eventTypeToColorMap[eventData.properties.event] || eventTypeToColorMap["default"];
      console.log("Assigned color:", fillColor); // Log the color assigned

      const feature = {
        type: "Feature",
        geometry: data.geometry, // Assuming data.geometry is correctly formatted
        properties: { fill: fillColor } // Set properties here, using fillColor directly
      };
      features.push(feature);
    } catch (error) {
      console.error('Failed to fetch zone geometry:', error);
    }
  }

  // Construct the feature collection with the features array
  const featureCollection = {
    type: "FeatureCollection",
    features: features
  };

  setSelectedEventGeometry(featureCollection); // Update state with the new feature collection
  console.log('GeoJSON data:', featureCollection); // Log the entire GeoJSON

  featureCollection.features.forEach(feature => {
    console.log("Fill color for feature:", feature.properties.fill); // Log each feature's fill color
  });
  
  // Calculate the bounding box of the featureCollection and adjust the map viewport accordingly
  const bbox = turf.bbox(featureCollection);
  const map = mapRef.current.getMap();
  map.fitBounds([
    [bbox[0], bbox[1]], // southwest coordinates
    [bbox[2], bbox[3]]  // northeast coordinates
  ], {
    padding: 100
  });
};




// In Dashboard.jsx


// Handler to add/update polygon layer
const updateMapWithEventGeometry = (geoJsonData) => {
  const map = mapRef.current.getMap();

  console.log('Adding/Updating layer with the following data:', geoJsonData);

  // Check if a source already exists
  if (map.getSource('weather-event')) {
    console.log('Source exists, removing existing layer');
    map.removeLayer('weather-event-polygon');
    map.removeSource('weather-event');
  }

  console.log('Adding new source and layer');
  // Add new source and layer
  map.addSource('weather-event', { type: 'geojson', data: featureCollection });
  map.addLayer({
    id: 'weather-event-polygon',
    type: 'fill',
    source: 'weather-event',
    paint: {
      'fill-color': ['get', 'fill'], // Use the fill property for the color
      'fill-opacity': 0.5,
    },
  });
};


  return (
    <>
    
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        onMove={evt => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onClick={(evt) => {
          evt.preventDefault();
        }}
        onLoad={handleLoad}
      >

{firePolygon && (
  <Source id="fire-event-polygon" type="geojson" data={firePolygon}>
    <Layer
      id="fire-event-polygon-layer"
      type="fill"
      paint={{
        'fill-color': '#ff0000', // Customize color
        'fill-opacity': 0.5,
      }}
    />
  </Source>
)}
        {showFire &&  <FireMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
        {showEarthquake && <EarthquakeMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
        <ToastDemo open={isToastVisible} setOpen={setIsToastVisible} />
        {fireEventPixels.map((pixel, index) => (
          <Marker key={index} latitude={parseFloat(pixel.lat)} longitude={parseFloat(pixel.lon)}>
            <div className="fire-event-pixel" />
          </Marker>
        ))}
    
        <FireMap 
       
        mapRef={mapRef}
        isVisible={showFire} // Pass the mapRef down to the FireMap component
        />
 
        <div style={{ position: 'absolute', top: 30, right: 50, margin: '20px', zIndex: 1 }}>
            <div style={{ position: 'relative', height: '100vh' }}>
                <div id="map" style={{ width: '100%', height: '100%' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, margin: '20px', zIndex: 1 }}>
                     
                    </div>
              </div>
        </div>

        <div style={{ position: 'absolute', top: 10, left: 0, zIndex: 0 , width:'50'}} >
        <Dropdown 
          showFire={showFire} 
          setShowFire={setShowFire} 
          showEarthquake={showEarthquake} 
          setShowEarthquake={setShowEarthquake}
          showWeather={showWeather}
          setShowWeather={setShowWeather}
          toggleWeatherAndToastVisibility={toggleWeatherAndToastVisibility}
         
        />
</div>
        <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 100000, top: 10, right: 30 }}>
        </div>
        
        <div style={{ position: 'absolute', top: 0, left: '40px', zIndex: 100 }} className="overlay-container">
          <TabsDemo 
          selectedEvent={selectedEvent} 
          setSelectedEvent={setSelectedEvent}
          handleMapViewport={handleMapViewport} 
          handleMarkerClick={handleMarkerClick} 
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          isSidebarOpen = {isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          showFire={showFire} 
          showEarthquake={showEarthquake} 
          showWeather={showWeather}
          handleWeatherEventSelect={handleWeatherEventSelect}
          onWeatherEventSelect={handleWeatherEventSelect}
          onDrawPolygon={onDrawPolygon}
          style={{ height: '100vh' }} 
          />
        </div>

        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <NavigationControl />
        </div>
        <div style={{ position: 'absolute', top: 10, left: 10 }}> 
          <FullscreenControl />
        </div>

        <div style={{ position: 'absolute', bottom: 100, right: 10 , zIndex: 10}}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        
        </div>
        {selectedEventGeometry.features && selectedEventGeometry.features.length > 0 && (
        <Source id="event-geometry-source" type="geojson" data={selectedEventGeometry} key={Date.now()}>
        <Layer
          id="event-geometry-layer"
          type="fill"
          source="event-geometry-source"
          paint={{
            'fill-color': ['get', 'fill'], // Assuming this gets the correct property
            'fill-opacity': 0.4,
          }}
        />
      </Source>
      
      
      )}
      </ReactMapGL>
    </>
  );
}

export default NextPage;

