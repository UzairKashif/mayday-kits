import mapboxgl from 'mapbox-gl';
import '@radix-ui/themes/styles.css';
import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl
} from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./NextPage.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import Tabs from '../Tabs/Tabs';
import TabsDemo from '../Tabs/Tabs';
import globeIcon from '../assets/earthico.png';
import { FaSearch } from 'react-icons/fa';
function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
   latitude: -14.2350, // Update latitude to a value over Brazil
    longitude: -51.9253, // Update longitude to a value over Brazil
    zoom: 2.5
  });
  const [initialCamera, setInitialCamera] = useState(null);

  const [markersData, setMarkersData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();

  const handleMarkerClick = (marker, event) => {
    event.stopPropagation(); // Prevent map click event from firing
    setSelectedMarker(marker);
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
    mapInstance.flyTo({
      center: [parseFloat(marker.lon), parseFloat(marker.lat)],
      zoom: 14,
      pitch: 60,
      bearing: 30,
      speed: 1.2, // make the flying speed appear smooth
    });
  };

  const handleClosePopup = () => {
    setSelectedMarker(null);
    
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/csvjson.json');
        const data = await response.json();
        setMarkersData(data);
      } catch (error) {
        console.error('Error fetching marker data:', error);
      }
    };
    fetchData();
  }, []);

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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleGlobeButtonClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    /* Change the fill color to red */
    backgroundColor: '#010001',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '30px',
    padding: '20px',
    zIndex: 9999,
  };
  
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  };
  
  const videoPlayerStyle = {
    width: '100%',
    height: '100%',
  };
  
  // ...
  
  const CloseButton = () => (
    <button style={closeButtonStyle} onClick={handleGlobeButtonClick}>
      X
    </button>
  );
  const globeButtonStyle = {
    position: 'absolute',
    top: '18px',
    left: '290px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    zIndex:10,
  };

  const globeIconStyle = {
    width: '54px',
    height: '50px',
    fill: '#ffffff', // Replace with desired color
  };
  return (
    <> 
 <div style={{ position: 'relative' }}>
        <div id="geocoder" className="custom-geocoder" style={{ position: 'absolute', zIndex: 1, top: 8, left: 0 }}>
          {/* Your geocoder content */}
        </div>
        <button style={globeButtonStyle} onClick={handleGlobeButtonClick}>
  <img style={globeIconStyle} src={globeIcon} alt="Globe Icon" />
</button>

{isPopupVisible && (
      <div style={popupStyle}>
      <CloseButton />
      <video style={{ width: '100%', height: '100%' }} controls>
        <source src=" https://geos-stat1.s3.us-east-2.amazonaws.com/G16/FULL/terra/Last24hrs.mp4 " type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    )}
      </div>

      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={evt => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        onLoad={handleLoad}
      >
       
      {markersData.map((marker, index) => (
        <Marker
          key={index}
          latitude={parseFloat(marker.lat)}
          longitude={parseFloat(marker.lon)}
        >
          <div className="marker-container">
            <div className="simple-marker" />
            <div 
              className="clickable-center" 
              onClick={(event) => handleMarkerClick(marker, event)}
            />
          </div>
        </Marker>
      ))}

{selectedMarker && (
  <Popup
  latitude={parseFloat(selectedMarker.lat)}
  longitude={parseFloat(selectedMarker.lon)}
  onClose={handleClosePopup}
  closeOnClick={true}
  anchor="bottom"
  className="custom-popup"
  closeButton={false} // Hide the default close button
>
  <div className="popup-content">
    <h4>Fire Hazard</h4>
    
    <button className="custom-close-button" onClick={handleClosePopup}>
      
    </button>
  </div>
</Popup>
)}

      {/* Control Containers */}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <NavigationControl />
      </div>

      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <FullscreenControl />
      </div>

      <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </div>

      <div style={{  bottom: 10, left: 10 }}>
        <ScaleControl />
      </div>
      </ReactMapGL>
      <div style={{ position: 'absolute', top: 80, left: 10, zIndex:100,}}>
        {/* Pass the selectedMarker state to the TabsDemo component */}
        <TabsDemo selectedMarker={selectedMarker} />
      </div>

    </>
  );
}
export default NextPage;



