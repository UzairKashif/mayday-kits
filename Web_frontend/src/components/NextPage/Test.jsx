import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebaseConfig'; // Make sure this path is correct
import Dropdown from '../dropdown_menu/dropdown'; // Ensure the path to your Dropdown component is correct
import "../NextPage/NextPage.css";
import TabsEarthquake from '../Tabs/Tabsearthquake';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import '@radix-ui/themes/styles.css';
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl';
import "./NextPage.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@radix-ui/themes/styles.css';


function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
   latitude: -14.2350, // Update latitude to a value over Brazil
    longitude: -51.9253, // Update longitude to a value over Brazil
    zoom: 2.5
  });
  const [initialCamera, setInitialCamera] = useState(null);


  const [earthquakeData, setEarthquakeData] = useState([]);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  const mapRef = useRef();

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
  const handleMarkerClick = (earthquake, event = {}) => {
    // Only call stopPropagation if it's a function
    if (typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
  
    setSelectedEarthquake(earthquake);
    // Access the Mapbox map instance
    const mapInstance = mapRef.current.getMap();

    // If initialCamera is not set, save the current camera position
    if (!initialCamera) {
      setInitialCamera({
        longitude: mapInstance.getCenter().lng,
        latitude: mapInstance.getCenter().lat,
        zoom: mapInstance.getZoom(),
        pitch: mapInstance.getPitch(),
        bearing: mapInstance.getBearing(),
      });
    }

    // Fly to the clicked marker
   // Fly to the clicked marker
mapInstance.flyTo({
  center: [parseFloat(earthquake.geometry.coordinates[0]), parseFloat(earthquake.geometry.coordinates[1])],
  zoom: 14,
  pitch: 60,
  bearing: 30,
  speed: 1.2, // make the flying speed appear smooth
});

  };

  const handleClosePopup = () => {
    setSelectedEarthquake(null);
    
    // Access the Mapbox map instance
    const mapInstance = mapRef.current.getMap();

    // Fly back to the initial camera position
    if (initialCamera) {
      mapInstance.flyTo({
        ...initialCamera,
        speed: 1.2, // make the flying speed appear smooth
      });
      // Reset initialCamera for the next interaction
      setInitialCamera(null);
    }
  };
  const handleMapClick = (event) => {
    // Check if the click is on the map and not on a feature (like a marker)
    const features = mapRef.current.queryRenderedFeatures(event.point);
    if (features.length === 0) {
      handleClosePopup();
    }
  };
  

  return (

    <>

<div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 1, top: 10, right: 30 }}>
  </div>  
    <div style={{ position: 'relative', height: '100%' }}>
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onClick={handleMapClick}
      onLoad={handleLoad}
    
    >
      <Dropdown />
      
      
            {earthquakeData.map((earthquake, index) => (
        <Marker
        key={index}
        longitude={earthquake.geometry.coordinates[0]}
        latitude={earthquake.geometry.coordinates[1]}
        onClose={handleClosePopup}
      >
        <div
          onClick={(e) => handleMarkerClick(earthquake, e)} 
          onClose={handleClosePopup} // Pass the earthquake data and event
          style={{ fontSize: '18px', cursor: 'pointer' }}
        >
          ⚠️
        </div>
      </Marker>
      
      ))}

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
      
      <div style={{  bottom: 10, left:10 }}>
        
      </div> 
      
    </ReactMapGL>

    </div>
      <div style={{ position: 'absolute', top: 10, left: 10, }}>
        {/* Pass the selectedMarker state to the TabsDemo component */}
      
<TabsEarthquake
  earthquakeData={earthquakeData}
  selectedEarthquake={selectedEarthquake}
  setSelectedEarthquake={setSelectedEarthquake}
  handleMarkerClick={handleMarkerClick} 
  onSelectMarker={handleMarkerClick} // Pass this function as a prop
/>

      </div>
    
    
    </>
  );
}

export default NextPage;
