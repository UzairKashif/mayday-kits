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
import FireMarkersComponent from '../FireMarkersComponent';
import EarthquakeMarkersComponent from '../EarthquakeMarkersComponent';
import { useMarkerClickHandler } from '../useMarkerClickHandler'; // Ensure this path is correct
import FireMap from '../Tabs/firms'; // Update the import path as necessary

function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: -14.2350,
    longitude: -51.9253,
    zoom: 1.5,
  });
  const [allMarkers, setAllMarkers] = useState([]);
  const [showURT, setShowURT] = useState(false);
  const [showNRT, setShowNRT] = useState(false);
// CSS for the toggle switch
const toggleStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '60px',
  height: '34px',
  margin: '0 10px',
};

const toggleSliderStyle = {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  transition: '.4s',
  borderRadius: '34px',
};

const toggleSliderBeforeStyle = {
  position: 'absolute',
  content: '""',
  height: '26px',
  width: '26px',
  left: '4px',
  bottom: '4px',
  backgroundColor: 'white',
  transition: '.4s',
  borderRadius: '50%',
};
const ToggleSwitch = ({ isOn, handleToggle, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ color: 'white' }}>{label}</span>
      <div style={toggleStyle} onClick={handleToggle}>
          <div style={{...toggleSliderStyle, backgroundColor: isOn ? '#2196F3' : '#ccc'}}>
              <div style={{
                  ...toggleSliderBeforeStyle,
                  transform: isOn ? 'translateX(26px)' : 'translateX(0)'
              }}></div>
          </div>
      </div>
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

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
  
    if (event.type === 'earthquake') {
      const latitude = parseFloat(event.geometry.coordinates[0]);
      const longitude = parseFloat(event.geometry.coordinates[1]);
      handleMapViewport({
        latitude,
        longitude,
        zoom: 10,
      });
    }
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
        {showFire && <FireMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
{showEarthquake && <EarthquakeMarkersComponent mapRef={mapRef} onMarkerClick={(lat, lon, event) => handleMarkerClick(lat, lon, event)} />}
{showURT && <FireMap showURT={showURT} setShowURT={setShowURT} />}
        {showNRT && <FireMap showNRT={showNRT} setShowNRT={setShowNRT} />}
        // Inside your NextPage component's return statement:
<FireMap 
  showURT={showURT}
  setShowURT={setShowURT}
  showNRT={showNRT}
  setShowNRT={setShowNRT}
  mapRef={mapRef} // Pass the mapRef down to the FireMap component
/>





 {/* FIRMS Filters */}
 <div style={{ position: 'absolute', top: 0, right: 0, margin: '20px', zIndex: 1 }}>
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
        />
        <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 100000, top: 10, right: 30 }}>
        </div>
        <div style={{ position: 'absolute', top: 10, left: 0, zIndex: 1 }} className="overlay-container">
          <TabsDemo selectedEvent={selectedEvent} handleMapViewport={handleMapViewport} handleMarkerClick={handleMarkerClick} />
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
      
      </ReactMapGL>
    </>
  );
}

export default NextPage;
