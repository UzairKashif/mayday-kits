import React, { useState, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
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



function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: -14.2350,
    longitude: -51.9253,
    zoom: 1.5,
  });

  const [showURT, setShowURT] = useState(false);
  const [showNRT, setShowNRT] = useState(false);

  const [selectedWeatherPolygon, setSelectedWeatherPolygon] = useState(null); // New state for weather polygon

  // Extend handleMarkerClick or create a new one for weather markers
  const handleWeatherMarkerClick = (polygonData, lat, lon) => {
    setSelectedWeatherPolygon(polygonData); // Assuming polygonData is GeoJSON
    handleMapViewport({
      latitude: lat,
      longitude: lon,
      zoom: 10, // or any zoom level you prefer
    });
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

const [showFire, setShowFire] = useState(true);
const [showEarthquake, setShowEarthquake] = useState(true);
const [selectedEvent, setSelectedEvent] = useState(null);
const [showDetails, setShowDetails] = useState(false);
const [showWeather, setShowWeather] = useState(true); // State to control weather event visibility
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


  
const handleMarkerClick = (lat, lon, event) => {
  console.log("Clicked marker event:", event); // Log the event object
  setSelectedEvent(event); // Update selectedEvent with the clicked event
  setShowDetails(true); // Show the event details
  handleMapViewport({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    zoom: 10,
    pitch: 60,
    bearing: 30,
    speed: 1.2,
  });
};
  
  
const handleWeatherPolygonSelect = (polygonData) => {
  setSelectedWeatherPolygon(polygonData); // Set the polygon data state
};
const [weatherEventFilters, setWeatherEventFilters] = useState({/* initial state */});

// Handler for changing the filters
const handleWeatherFilterChange = (event) => {
  const { name, checked } = event.target;
  setWeatherEventFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
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
        {showFire &&  <FireMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
        {showEarthquake && <EarthquakeMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
        {showURT && <FireMap showURT={showURT} setShowURT={setShowURT} />}
        {showNRT && <FireMap showNRT={showNRT} setShowNRT={setShowNRT} />}
    
        <FireMap 
        showURT={showURT}
        setShowURT={setShowURT}
        showNRT={showNRT}
        setShowNRT={setShowNRT}
        mapRef={mapRef} // Pass the mapRef down to the FireMap component
        />





 
        <div style={{ position: 'absolute', top: 30, right: 50, margin: '20px', zIndex: 1 }}>
            <div style={{ position: 'relative', height: '100vh' }}>
                <div id="map" style={{ width: '100%', height: '100%' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, margin: '20px', zIndex: 1 }}>
                        <ToggleSwitch
                          isOn={showURT}
                          handleToggle={() => setShowURT(!showURT)}
                          label="URT"
                        />
                        <ToggleSwitch
                          isOn={showNRT}
                          handleToggle={() => setShowNRT(!showNRT)}
                          label="NRT"
                        />
                    </div>
              </div>
        </div>


        <Dropdown 
          showFire={showFire} 
          setShowFire={setShowFire} 
          showEarthquake={showEarthquake} 
          setShowEarthquake={setShowEarthquake}
          showWeather={showWeather}
  setShowWeather={setShowWeather}
  weatherEventFilters={weatherEventFilters}
  onWeatherFilterChange={handleWeatherFilterChange}
        />
        <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 100000, top: 10, right: 30 }}>
        </div>
        
        <div style={{ position: 'absolute', top: 10, left: 0, zIndex: 1 }} className="overlay-container">
          <TabsDemo selectedEvent={selectedEvent} handleMapViewport={handleMapViewport} handleMarkerClick={handleMarkerClick} 
          showFire={showFire} 
          showEarthquake={showEarthquake}
          showWeather={showWeather}
          onWeatherMarkerClick={handleWeatherPolygonSelect}
          weatherEventFilters={weatherEventFilters}
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
      
        {selectedWeatherPolygon && (
          <Source id="weather-polygon" type="geojson" data={selectedWeatherPolygon}>
            <Layer
              id="polygonLayer"
              type="fill"
              paint={{
                'fill-color': '#888', // Customize as needed
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
