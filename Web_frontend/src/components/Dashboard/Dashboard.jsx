import React, { useState, useRef } from "react";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Marker,
} from "react-map-gl";
import mapboxgl from "mapbox-gl"; // Ensure mapboxgl is correctly imported if needed
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Dropdown from "../dropdown_menu/dropdown";
import TabsDemo from "../Tabs/Tabs";
import FireMarkersComponent from "../MarkersComponents/FireMarkersComponent";
import EarthquakeMarkersComponent from "../MarkersComponents/EarthquakeMarkersComponent";
import { useMarkerClickHandler } from "../Hooks/useMarkerClickHandler"; // Ensure this path is correct
import FireMap from "../Firms/firms"; // Update the import path as necessary
import { Source, Layer } from "react-map-gl";
import * as turf from "@turf/turf";
import ToastDemo from "../../components/Toast/toast";

function NextPage() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: -14.235,
    longitude: -51.9253,
    zoom: 1.5,
  });

  const [showURT, setShowURT] = useState(false);
  const [showNRT, setShowNRT] = useState(false);
  const [selectedEventGeometry, setSelectedEventGeometry] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toggleWeatherAndToastVisibility = () => {
    setShowWeather((prev) => !prev); // Toggle weather visibility
    setIsToastVisible((prev) => !prev); // Toggle toast visibility concurrently
  };

  const ToggleSwitch = ({ isOn, handleToggle, label }) => (
    <div className={`toggle-switch ${isOn ? "on" : ""}`} onClick={handleToggle}>
      <div className="toggle-slider"></div>
      <span style={{ color: "white", marginLeft: "70px" }}>{label}</span>
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

  const handleLoad = () => {
    const map = mapRef.current.getMap();
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    });

    geocoder.on("result", function (e) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        longitude: e.result.center[0],
        latitude: e.result.center[1],
        zoom: 10,
      }));
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
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

    if (event.type === "fire") {
      try {
        const pixelsResponse = await fetch(
          `http://localhost:3000/api/fire-events/${event.event_id}/pixels`
        );
        const pixelsData = await pixelsResponse.json();
        setFireEventPixels(pixelsData); // Set the state for fire event pixels
      } catch (error) {
        console.error("Error fetching fire event pixel data:", error);
      }
    }
  };
  const handleWeatherEventSelect = async (eventData) => {
    if (
      !eventData ||
      !eventData.properties ||
      !eventData.properties.affectedZones
    ) {
      console.error("Invalid event data:", eventData);
      return; // Exit the function if eventData is not structured as expected.
    }
    // This example assumes eventData.properties.affectedZones is an array of URLs to fetch geometry data
    const zoneUrls = eventData.properties.affectedZones;
    const geometries = [];

    for (const url of zoneUrls) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        geometries.push(data.geometry); // Assuming the geometry is directly available under data.geometry
      } catch (error) {
        console.error("Failed to fetch zone geometry:", error);
      }
    }

    const featureCollection = turf.featureCollection(
      geometries.map((geo) => turf.feature(geo))
    );
    setSelectedEventGeometry(featureCollection);

    // Calculate the bounding box of the featureCollection
    const bbox = turf.bbox(featureCollection);

    // Now that you have the bounding box, adjust the map viewport
    // Note: This assumes mapRef is a ref to your ReactMapGL instance
    const map = mapRef.current.getMap();
    map.fitBounds(
      [
        [bbox[0], bbox[1]], // southwest coordinates
        [bbox[2], bbox[3]], // northeast coordinates
      ],
      {
        padding: 100, // Optional: Adjust the padding as needed
      }
    );
  };

  return (
    <>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        onMove={(evt) => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onClick={(evt) => {
          evt.preventDefault();
        }}
        onLoad={handleLoad}
      >
        {showFire && (
          <FireMarkersComponent
            mapRef={mapRef}
            onMarkerClick={(lat, lon, event) =>
              handleMarkerClick(lat, lon, event)
            }
          />
        )}
        {showEarthquake && (
          <EarthquakeMarkersComponent
            mapRef={mapRef}
            onMarkerClick={(lat, lon, event) =>
              handleMarkerClick(lat, lon, event)
            }
          />
        )}
        <ToastDemo open={isToastVisible} setOpen={setIsToastVisible} />
        {fireEventPixels.map((pixel, index) => (
          <Marker
            key={index}
            latitude={parseFloat(pixel.lat)}
            longitude={parseFloat(pixel.lon)}
          >
            <div className="fire-event-pixel" />
          </Marker>
        ))}

        <FireMap
          showURT={showURT}
          setShowURT={setShowURT}
          showNRT={showNRT}
          setShowNRT={setShowNRT}
          mapRef={mapRef} // Pass the mapRef down to the FireMap component
        />

        <div
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            margin: "20px",
            zIndex: 1,
          }}
        >
          <div style={{ position: "relative", height: "100vh" }}>
            <div id="map" style={{ width: "100%", height: "100%" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "20px",
                zIndex: 1,
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            zIndex: 0,
            width: "50",
          }}
        >
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

        <div
          id="geocoder-container"
          className="custom-geocoder"
          style={{ position: "absolute", zIndex: 100000, top: 10, right: 50 }}
        >
          <div
            id="geocoder"
            style={{ position: "absolute", zIndex: 100000, top: 10, right: 30 }}
          ></div>
        </div>

        <div
          style={{ position: "absolute", top: 0, left: "40px", zIndex: 100 }}
          className="overlay-container"
        >
          <TabsDemo
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            handleMapViewport={handleMapViewport}
            handleMarkerClick={handleMarkerClick}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            showFire={showFire}
            showEarthquake={showEarthquake}
            showWeather={showWeather}
            handleWeatherEventSelect={handleWeatherEventSelect}
            onWeatherEventSelect={handleWeatherEventSelect}
            style={{ height: "100vh" }}
          />
        </div>

        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <NavigationControl />
        </div>
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <FullscreenControl />
        </div>

        <div
          style={{ position: "absolute", bottom: 100, right: 10, zIndex: 10 }}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>
        {selectedEventGeometry.features &&
          selectedEventGeometry.features.length > 0 && (
            <Source
              id="event-geometry-source"
              type="geojson"
              data={selectedEventGeometry}
            >
              <Layer
                id="event-geometry-layer"
                type="fill"
                paint={{
                  "fill-color": "#f08", // Example fill color
                  "fill-opacity": 0.4, // Example fill opacity
                }}
              />
            </Source>
          )}
      </ReactMapGL>
    </>
  );
}

export default NextPage;
