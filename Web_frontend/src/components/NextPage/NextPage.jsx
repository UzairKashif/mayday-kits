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


function NextPage() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
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

  return (
    <> 

    
      <div id="geocoder" style={{ position: 'absolute', zIndex: 1, top: 10, left: 10 }}></div>
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
          anchor="top"
        >
          <div>
            <h3>Event ID: {selectedMarker.event_id}</h3>
            <p>Latitude: {selectedMarker.lat}</p>
            <p>Longitude: {selectedMarker.lon}</p>
            {/* Add more information or interactive elements here as needed */}
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

      <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <ScaleControl />
      </div>
      </ReactMapGL>
      <div style={{ position: 'absolute', top: 80, left: 10 }}> 
       <Tabs/>
       </div>
    </>
  );
}
export default NextPage;



