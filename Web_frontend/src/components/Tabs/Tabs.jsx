import fireActiveIcon from "../assets/weather_icons/fire_active.png";
import fireInactiveIcon from "../assets/weather_icons/fire_inactive.png";
import firePendingIcon from "../assets/weather_icons/fire_pending.png";
import React, { useEffect, useState, useRef } from "react";
import AccordionDemo from "../windyaccordion/WeatherAccordion";
import * as Tabs from "@radix-ui/react-tabs";
import { FiInfo, FiCamera, FiChevronRight } from "react-icons/fi";
import {
  FaFire,
  FaSignOutAlt,
  FaHome,
  FaExclamationTriangle,
  FaGlobe,
  FaInfoCircle,
  FaUserCircle,
  faLayerGroup,
  FaLayerGroup,
} from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import "./styles.css";
import { db } from "../../firebaseConfig"; // Ensure this path is correctly set
import { TailSpin } from "react-loader-spinner";
import { collection, getDocs } from "firebase/firestore";
import * as turf from "@turf/turf";
import logoImage from "../assets/bg.webp"; // Adjust the path accordingly
import SignOut from "../signout/signout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SkeletonLoader from "../Skeleton/SkeletonLoader";

import icon911 from "../assets/weather_icons/911.png";
import iconDisaster from "../assets/newicons/icons/disaster.png";
import iconEarthquake from "../assets/newicons/icons/earthquake.png";
import iconEnvironmentPollution from "../assets/newicons/icons/env-pollution.png";
import iconExplosion from "../assets/weather_icons/explosion.png";
import iconFire from "../assets/weather_icons/fire.png";
import iconFlood from "../assets/newicons/icons/flooded-house.png";
import iconHazmat from "../assets/newicons/icons/biohazard.png";
import iconLandslide from "../assets/newicons/icons/landslide.png";
import iconNuclear from "../assets/newicons/icons/nuclear.png";
import iconSnow from "../assets/newicons/icons/snowflake.png";
import iconTechnologicalDisaster from "../assets/newicons/icons/breakdown.png";
import iconTsunami from "../assets/newicons/icons/tsunami.png";
import iconVolcano from "../assets/newicons/icons/volcano.png";
import iconWildfire from "../assets/newicons/icons/wildfire.png";
import iconHurricane from "../assets/newicons/icons/hurricane.png";
import iconTornado from "../assets/newicons/icons/tornado.png";
import iconDrought from "../assets/newicons/icons/drought.png";
import iconAvalanche from "../assets/newicons/icons/snow-avalanche.png";
import iconAirQualityAlert from "../assets/newicons/icons/air-quality.png";
import iconAshfallWarning from "../assets/newicons/icons/ash.png";
import iconAvalancheWarning from "../assets/newicons/icons/snow-avalanche.png";
import iconBeachHazardsStatement from "../assets/newicons/icons/beach.png";
import iconCoastalFloodWarning from "../assets/newicons/icons/erosion.png";
import iconDenseFogAdvisory from "../assets/newicons/icons/fog.png";
import iconDenseSmokeAdvisory from "../assets/newicons/icons/co2.png";
import iconEarthquakeWarning from "../assets/newicons/icons/earthquake.png";
import iconEvacuationImmediate from "../assets/newicons/icons/exit.png";
import iconExcessiveHeatWarning from "../assets/newicons/icons/heat.png";
import iconExtremeColdWarning from "../assets/newicons/icons/coldwarning.png";
import iconExtremeFireDanger from "../assets/newicons/icons/hot.png";
import iconExtremeWindWarning from "../assets/newicons/icons/wind.png";
import iconFireWarning from "../assets/newicons/icons/fire-extinguisher.png";
import iconFireWeatherWatch from "../assets/newicons/icons/firewatch.png";
import iconFlashFloodWarning from "../assets/newicons/icons/flash-flood.png";
import iconFloodWarning from "../assets/newicons/icons/natural-disaster.png";
import iconFreezeWarning from "../assets/newicons/icons/coldwarning.png";
import iconFreezingFogAdvisory from "../assets/newicons/icons/freezingfog.png";
import iconFreezingRainAdvisory from "../assets/newicons/icons/raining.png";
import iconFreezingSprayAdvisory from "../assets/newicons/icons/freezingspray.png";
import iconFrostAdvisory from "../assets/newicons/icons/frost.png";
import iconGaleWarning from "../assets/newicons/icons/galewarning.png";
import iconHardFreezeWarning from "../assets/newicons/icons/frost.png";
import iconHazardousMaterialsWarning from "../assets/newicons/icons/waste.png";
import iconHazardousSeasWarning from "../assets/newicons/icons/seawarning.png";
import iconHazardousWeatherOutlook from "../assets/newicons/icons/weatherlookout.png";
import iconHeatAdvisory from "../assets/newicons/icons/heatwave.png";
import iconHighSurfWarning from "../assets/newicons/icons/high-tide.png";
import iconHighWindWarning from "../assets/newicons/icons/galewarning.png";
import iconHurricaneForceWindWarning from "../assets/newicons/icons/hurricane.png";
import iconHurricaneLocalStatement from "../assets/newicons/icons/hurricane.png";
import iconIceStormWarning from "../assets/newicons/icons/ice.png";
import iconLakeshoreFloodWarning from "../assets/newicons/icons/erosion.png";
import iconNuclearPowerPlantWarning from "../assets/newicons/icons/nuclear.png";
import iconRadiologicalHazardWarning from "../assets/newicons/icons/radioactive.png";
import iconRedFlagWarning from "../assets/newicons/icons/flag.png";
import iconRipCurrentStatement from "../assets/newicons/icons/ripcurrent.png";
import iconSevereThunderstormWarning from "../assets/newicons/icons/severethunder.png";
import iconSevereWeatherStatement from "../assets/newicons/icons/thunderstorm.png";
import iconShelterInPlaceWarning from "../assets/newicons/icons/shelter.png";
import iconStormSurgeWarning from "../assets/newicons/icons/stromsurge.png";
import iconStormWarning from "../assets/newicons/icons/thunder-warning.png";
import iconTornadoWarning from "../assets/newicons/icons/tornado-warn.png";
import iconTsunamiWarning from "../assets/newicons/icons/tsunami-warning.png";
import iconTyphoonWarning from "../assets/newicons/icons/typhoon.png";
import iconUrbanAndSmallStreamFloodAdvisory from "../assets/newicons/icons/flood.png";
import iconVolcanoWarning from "../assets/newicons/icons/volcano.png";
import iconWindAdvisory from "../assets/newicons/icons/gale.png";
import iconWindChillWarning from "../assets/newicons/icons/windchill.png";
import iconWinterStormWarning from "../assets/newicons/icons/winterstrom.png";
import iconWinterWeatherAdvisory from "../assets/newicons/icons/winterweather.png";

const eventToIconMap = {
  disaster: iconDisaster,
  earthquake: iconEarthquake,
  "environment-pollution": iconEnvironmentPollution,
  explosion: iconExplosion,
  fire: iconFire,
  flood: iconFlood,
  hazmat: iconHazmat,
  landslide: iconLandslide,
  nuclear: iconNuclear,
  snow: iconSnow,
  "technological-disaster": iconTechnologicalDisaster,
  tsunami: iconTsunami,
  volcano: iconVolcano,
  wildfire: iconWildfire,
  hurricane: iconHurricane,
  tornado: iconTornado,
  drought: iconDrought,
  avalanche: iconAvalanche,
  "Air Quality Alert": iconAirQualityAlert,
  "Ashfall Warning": iconAshfallWarning,
  "Avalanche Warning": iconAvalancheWarning,
  "Beach Hazards Statement": iconBeachHazardsStatement,
  "Coastal Flood Warning": iconCoastalFloodWarning,
  "Dense Fog Advisory": iconDenseFogAdvisory,
  "Dense Smoke Advisory": iconDenseSmokeAdvisory,
  "Earthquake Warning": iconEarthquakeWarning,
  "Evacuation - Immediate": iconEvacuationImmediate,
  "Excessive Heat Warning": iconExcessiveHeatWarning,
  "Extreme Cold Warning": iconExtremeColdWarning,
  "Extreme Fire Danger": iconExtremeFireDanger,
  "Extreme Wind Warning": iconExtremeWindWarning,
  "Fire Warning": iconFireWarning,
  "Fire Weather Watch": iconFireWeatherWatch,
  "Flash Flood Warning": iconFlashFloodWarning,
  "Flood Warning": iconFloodWarning,
  "Freeze Warning": iconFreezeWarning,
  "Freezing Fog Advisory": iconFreezingFogAdvisory,
  "Freezing Rain Advisory": iconFreezingRainAdvisory,
  "Freezing Spray Advisory": iconFreezingSprayAdvisory,
  "Frost Advisory": iconFrostAdvisory,
  "Gale Warning": iconGaleWarning,
  "Hard Freeze Warning": iconHardFreezeWarning,
  "Hazardous Materials Warning": iconHazardousMaterialsWarning,
  "Hazardous Seas Warning": iconHazardousSeasWarning,
  "Hazardous Weather Outlook": iconHazardousWeatherOutlook,
  "Heat Advisory": iconHeatAdvisory,
  "High Surf Warning": iconHighSurfWarning,
  "High Wind Warning": iconHighWindWarning,
  "Hurricane Force Wind Warning": iconHurricaneForceWindWarning,
  "Hurricane Local Statement": iconHurricaneLocalStatement,
  "Ice Storm Warning": iconIceStormWarning,
  "Lakeshore Flood Warning": iconLakeshoreFloodWarning,
  "Nuclear Power Plant Warning": iconNuclearPowerPlantWarning,
  "Radiological Hazard Warning": iconRadiologicalHazardWarning,
  "Red Flag Warning": iconRedFlagWarning,
  "Rip Current Statement": iconRipCurrentStatement,
  "Severe Thunderstorm Warning": iconSevereThunderstormWarning,
  "Severe Weather Statement": iconSevereWeatherStatement,
  "Shelter In Place Warning": iconShelterInPlaceWarning,
  "Storm Surge Warning": iconStormSurgeWarning,
  "Storm Warning": iconStormWarning,
  "Tornado Warning": iconTornadoWarning,
  "Tsunami Warning": iconTsunamiWarning,
  "Typhoon Warning": iconTyphoonWarning,
  "Urban And Small Stream Flood Advisory": iconUrbanAndSmallStreamFloodAdvisory,
  "Volcano Warning": iconVolcanoWarning,
  "Wind Advisory": iconWindAdvisory,
  "Wind Chill Warning": iconWindChillWarning,
  "Winter Storm Warning": iconWinterStormWarning,
  "Winter Weather Advisory": iconWinterWeatherAdvisory,
  default: icon911, // Default icon
};

const eventTypeToColorMap = {
  disaster: "#ff6347",
  earthquake: "#d2691e",
  "environment-pollution": "#556b2f",
  explosion: "#ff4500",
  fire: "#ff0000",
  flood: "#1e90ff",
  hazmat: "#ff8c00",
  landslide: "#8b4513",
  nuclear: "#800080",
  snow: "#add8e6",
  "technological-disaster": "#696969",
  tsunami: "#0000cd",
  volcano: "#b22222",
  wildfire: "#b22222",
  hurricane: "#4682b4",
  tornado: "#778899",
  drought: "#f4a460",
  avalanche: "#f0f8ff",
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
  default: "#f7f5f6",
  // ... any other events you need
};

const getIconForEvent = (eventType) => {
  return eventToIconMap[eventType] || eventToIconMap["default"];
};

const TabsDemo = ({
  handleMapViewport,
  handleWeatherEventSelect,
  onWeatherEventSelect,
  showFire,
  setShowFire,
  showEarthquake,
  setShowEarthquake,
  showWeather,
  setShowWeather,
  selectedEvent,
  setSelectedEvent,
  showDetails,
  setShowDetails,
  isSidebarOpen,
  setIsSidebarOpen,
  onDrawPolygon,
  toggleWeatherAndToastVisibility,
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherEventFilters, setWeatherEventFilters] = useState({});
  const [areAllChecked, setAreAllChecked] = useState(false);







  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

const [weatherData, setWeatherData] = useState({});
const fetchWindyData = async (lat, lon) => {
  const url = 'https://api.windy.com/api/point-forecast/v2';
  const data = {
    lat: lat,
    lon: lon,
    model: "gfs",
    parameters: ["wind", "dewpoint", "rh", "pressure"],
    levels: ["surface", "800h", "300h"],
    key: "UDPVe8gC6B1J8JTwGeB91qEVGlBUWNZW"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    console.log('Success:', jsonData);
    setWeatherData(jsonData); // Update state with fetched data
  } catch (error) {
    console.error('Error:', error);
  }
};

  const detailsPanelRef = useRef(null);

  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [showDetails, setShowDetails] = useState(false);
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
  ];
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const toggleAllCheckboxes = () => {
    const newState = !areAllChecked;
    setAreAllChecked(newState);
    setWeatherEventFilters(
      validEvents.reduce((acc, eventType) => {
        acc[eventType] = newState;
        return acc;
      }, {})
    );
  };
  const [manualToggle, setManualToggle] = useState(false); // Track manual toggling
  const prevConditionsRef = useRef({ showFire, showEarthquake, showWeather });
  // Automatically open the sidebar based on certain conditions
  useEffect(() => {
    const prevConditions = prevConditionsRef.current;
    const anyPreviousFalse =
      !prevConditions.showFire &&
      !prevConditions.showEarthquake &&
      !prevConditions.showWeather;
    const anyCurrentTrue = showFire || showEarthquake || showWeather;

    if (anyCurrentTrue && anyPreviousFalse && !manualToggle) {
      setIsSidebarOpen(true);
      setManualToggle(false); // Reset manualToggle when conditions change as expected
    } else if (!anyCurrentTrue) {
      // When all conditions are false, allow automatic behavior again
      setManualToggle(false);
    }

    // Update the ref with the current conditions for the next effect run
    prevConditionsRef.current = { showFire, showEarthquake, showWeather };
  }, [showFire, showEarthquake, showWeather, manualToggle]);

  // Function to manually toggle the sidebar
  const toggleSidebarManually = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setManualToggle(true); // Indicate the sidebar was toggled manually
  };

  // Filter validEvents based on search term
  const filteredEvents = searchTerm
    ? validEvents.filter((eventType) =>
        eventType.toLowerCase().includes(searchTerm)
      )
    : validEvents;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // API Endpoints
        const fireEventsUrl = "http://localhost:3000/api/fire-events"; // Adjust with the correct endpoint
        const earthquakeApiUrl = "http://localhost:3000/api/earthquake-events";
        const weatherApiUrl = "http://localhost:3000/api/weather-events";

        // Fetching data from all three APIs concurrently
        const [fireResponse, weatherResponse, earthquakeResponse] =
          await Promise.all([
            fetch(fireEventsUrl).then((res) => res.json()),
            fetch(weatherApiUrl).then((res) => res.json()),
            fetch(earthquakeApiUrl).then((res) => res.json()),
          ]);

        // Process fire events data
        const fireEvents = fireResponse.map((event) => ({
          ...event,
          type: "fire",
          date: new Date(event.event_start_since).getTime(), // Adjust based on actual property path
        }));

        // Process weather data
        const weatherEvents = weatherResponse
          .map((item) => ({
            ...item.data,
            type: "weather",
            date: item.data.properties.sent
              ? new Date(item.data.properties.sent).getTime()
              : null,
          }))
          .filter((event) => validEvents.includes(event.properties.event));

        // Process earthquake data
        const earthquakeEvents = earthquakeResponse.map((item) => ({
          ...item.data,
          type: "earthquake",
          date: new Date(item.data.properties.time).getTime(), // Adjust based on the actual property path
        }));

        // Combine and sort events by date
        const combinedEvents = [
          ...fireEvents,
          ...weatherEvents,
          ...earthquakeEvents,
        ].sort((a, b) => a.date - b.date);

        setEvents(combinedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      console.log("Selected event in TabsDemo:", selectedEvent);
      setShowDetails(true);
    }
  }, [selectedEvent]);

  const displayEvents = events.filter((event) => {
    const isVisibleType =
      (event.type === "fire" && showFire) ||
      (event.type === "earthquake" && showEarthquake) ||
      (event.type === "weather" && showWeather);
    const passesWeatherFilter =
      event.type !== "weather" || weatherEventFilters[event.properties.event];
    return isVisibleType && passesWeatherFilter;
  });

  const handleEventSelect = async (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
    if (event.lat && event.lon) {
      await fetchWindyData(event.lat, event.lon);
    }

    if (event && event.properties && event.properties.affectedZones) {
      handleWeatherEventSelect(event);
    } else {
      console.error("Trying to select an event with invalid structure:", event);
    }
    if (event.type === "weather") {
      try {
        const geometries = await Promise.all(
          event.properties.affectedZones.map(async (zoneUrl) => {
            const response = await fetch(zoneUrl);
            const data = await response.json();
            if (data.geometry) {
              // Set the fill color for the geometry based on the event type
              const color =
                eventTypeToColorMap[event.properties.event] ||
                eventTypeToColorMap["default"];
              data.geometry.properties = {
                ...data.geometry.properties,
                fill: color,
              };
              return data.geometry;
            }
            return null;
          })
        );

        // Here we are assuming that onWeatherEventSelect is a function passed as a prop to TabsDemo
        // and it expects an array of geometries, possibly with their fill colors already set.
        onWeatherEventSelect(geometries.filter((geo) => geo !== null));
      } catch (error) {
        console.error("Error fetching zone geometry:", error);
      }
    } else {
      // Handle other event types as before
      handleMapViewport({
        latitude: parseFloat(event.lat || event.geometry.coordinates[1]),
        longitude: parseFloat(event.lon || event.geometry.coordinates[0]),
        zoom: 10,
        pitch: 60,
        bearing: 30,
        speed: 1.2,
      });
    }

    
    const detailsPanel = document.querySelector(".details-panel");
    if (detailsPanel) {
      detailsPanel.scrollTop = 0;
    }
    if (detailsPanelRef.current) {
      detailsPanelRef.current.scrollTop = 0;
    }
  };

  const handleBack = () => {
    setShowDetails(false); // Hide details and show list of events
    setSelectedEvent(null);
    // Reset map to initial state
    handleMapViewport({
      latitude: -14.235,
      longitude: -51.9253,
      zoom: 1.5,
    });
  };
  const getGroupsPkPart = (groupsPk) => {
    const parts = groupsPk.split("_");
    return parts.length > 1 ? `${parts[0]}_${parts[1]}` : "";
  };
  const isFireEvent = selectedEvent && selectedEvent.type === "fire";
  const visUrl = isFireEvent
    ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${
        selectedEvent.event_id
      }/ABI/F16/VIS/${getGroupsPkPart(selectedEvent.groups_pk ?? "")}.mp4`
    : "";
  const irUrl = isFireEvent
    ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${
        selectedEvent.event_id
      }/ABI/F16/IR/${getGroupsPkPart(selectedEvent.groups_pk ?? "")}.mp4`
    : "";

  console.log(selectedEvent);

  const handleWeatherFilterChange = (event) => {
    const { name, checked } = event.target;
    setWeatherEventFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: checked };
      console.log("Updated Filters:", updatedFilters);
      return updatedFilters;
    });
  };
  useEffect(() => {
    console.log("Current Weather Event Filters:", weatherEventFilters);
  }, [weatherEventFilters]); // Add weatherEventFilters to dependency array to log whenever it changes

  // // Filtered events based on selected weather event types
  // const filteredEvents = events.filter((event) => {
  //   return event.type !== 'weather' || weatherEventFilters[event.properties.event];
  // });
  const isFilterApplied = Object.values(weatherEventFilters).some(
    (value) => value === false
  );

  // Define displayEvents based on whether a filter is applied
  // Assuming visibleEvents already filters based on showFire, showEarthquake, showWeather
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [info, setinfoVisible] = useState(false);
  const [layers, setlayerVisible] = useState(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
    setinfoVisible(false);
    setlayerVisible(false);
    setSearchTerm("");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setinfoVisible(false);
    setlayerVisible(false);
    setSearchTerm("");
  };
  const handleinfo = () => {
    setinfoVisible(true);
    setIsModalVisible(false);
    setlayerVisible(false);
    setSearchTerm("");
  };

  const handleinfoclose = () => {
    setinfoVisible(false);
    handleCloseModal();
    setSearchTerm("");
  };
  const handlelayer = () => {
    setIsModalVisible(false);
    setlayerVisible(true);
    setinfoVisible(false);
    
    setSearchTerm("");
  };

  const handlelayerclose = () => {
    setIsModalVisible(false);
    setlayerVisible(false);
    handleCloseModal();
    setSearchTerm("");
  };
  return (
    <>
      <div className={`ThinSidebar ${!isSidebarOpen ? "show" : ""}`}>
        <div className="ThinSidebarLogo">
          <img src={logoImage} alt="Logo" className="LogoIcon" />
        </div>

        <HiOutlineLocationMarker
          className={`ThinSidebarIcon ${isSidebarOpen ? "open" : ""}`}
          onClick={handleCloseModal}
        />
   <FaLayerGroup id="a" className="ThinSidebarIcon" onClick={handlelayer} />
        {showWeather && (
          <FaCloud className="ThinSidebarIcon" onClick={handleOpenModal} />
        )}
        <FaUserCircle className="ThinSidebarIcon" onClick={handleinfo} />
     
        <button
          style={{ zIndex: "100" }}
          className={`SidebarToggle ${
            isSidebarOpen ? "Close Sidebar" : "Open Sidebar"
          }`}
          onClick={toggleSidebarManually}
        >
          <FiChevronRight className="ToggleIcon" />
        </button>
      </div>

      <div className={`TabsContainer ${isSidebarOpen ? "open" : "closed"}`}>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
              <FiInfo className="TabIcon" /> Events
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            value="tab1"
            className="TabsContent"
            ref={detailsPanelRef}
          >
            {loading && (
              <div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
                <div className="skeleton-loader-container">
                  <SkeletonLoader />
                </div>
              </div>
            )}

            {showWeather && !showDetails && (
              <div className="filter-dropdown">
                {/* <button onClick={handleOpenModal} className="filter-dropdown-button">
       ☁ ‎ Filter Events ‎ ‎⮟
     </button> */}
                {isModalVisible && (
                  <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                      <div className="modal-header">
                        <h4 className="modal-title">Filter Events</h4>
                        <button
                          onClick={handleCloseModal}
                          className="close-modal-button"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <input
                          type="text"
                          placeholder="Filter Events"
                          onChange={handleSearchChange}
                          className="modal-search-input"
                        />
                        <button
                          onClick={toggleAllCheckboxes}
                          className="toggle-all-button"
                        >
                          {areAllChecked ? "Uncheck All" : "Check All"}
                        </button>
                        <ul className="filter-options-list">
                          {filteredEvents.map((eventType) => (
                            <li key={eventType} className="filter-option">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  id={`toggle-${eventType}`}
                                  name={eventType}
                                  checked={!!weatherEventFilters[eventType]}
                                  onChange={handleWeatherFilterChange}
                                />
                                <span className="slider round"></span>
                              </label>
                              <label
                                htmlFor={`toggle-${eventType}`}
                                className="filter-label"
                              >
                                {eventType}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {info && (
              <div className="info-overlay" onClick={handleCloseModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h4 className="modal-title">User Profile</h4>
                    <button className="signout-button">
                        <SignOut /> <FaSignOutAlt />
                      </button>
                  </div>
                  <div className="inf-body">
                    <div className="profile-content">
                      <FaUserCircle alt="User" className="profile-picture" />
                      <h3 className="profile-name">Nazar Hussain</h3>
                      <p className="profile-detail">
                        <strong>Country:</strong>
                        <img
                          src="https://cdn.jsdelivr.net/npm/twemoji@latest/2/svg/1f1f5-1f1f0.svg"
                          alt="Pakistan Flag"
                          style={{
                            width: "1em",
                            height: "1em",
                            verticalAlign: "-0.1em",
                          }}
                        />
                        Pakistan
                      </p>
                      <br />
                      <p className="profile-detail">
                        <strong>Email:</strong>nazarhussain786@hotmail.com
                      </p>
                      <br />
                      <p className="profile-detail">
                        <strong>Details:</strong>Premium User{" "}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            )}



{layers &&   (
  <div className="info-overlay" onClick={handlelayerclose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h4 className="modal-title">Layers</h4>
        <button onClick={handlelayerclose} className="close-modal-button"></button>
      </div>
      <div className="layers-body">
        {/* Implement the toggles here */}
        <div className="checkbox">
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      id="fireCheckbox"
                      checked={showFire}
                      onChange={(e) => setShowFire(e.target.checked)}
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-icon1">
                        <svg
                          fill="currentColor"
                          width="800px"
                          height="800px"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.888 31.977c-7.539 0-12.887-5.228-12.887-12.431 0-3.824 2.293-7.944 2.39-8.116 0.199-0.354 0.59-0.547 0.998-0.502 0.404 0.052 0.736 0.343 0.84 0.736 0.006 0.024 0.624 2.336 1.44 3.62 0.548 0.864 1.104 1.475 1.729 1.899-0.423-1.833-0.747-4.591-0.22-7.421 1.448-7.768 7.562-9.627 7.824-9.701 0.337-0.097 0.695-0.010 0.951 0.223 0.256 0.235 0.373 0.586 0.307 0.927-0.010 0.054-1.020 5.493 1.123 10.127 0.195 0.421 0.466 0.91 0.758 1.399 0.083-0.672 0.212-1.386 0.41-2.080 0.786-2.749 2.819-3.688 2.904-3.726 0.339-0.154 0.735-0.104 1.027 0.126 0.292 0.231 0.433 0.603 0.365 0.969-0.011 0.068-0.294 1.938 1.298 4.592 1.438 2.396 1.852 3.949 1.852 6.928 0 7.203-5.514 12.43-13.111 12.43zM6.115 14.615c-0.549 1.385-1.115 3.226-1.115 4.931 0 6.044 4.506 10.43 10.887 10.43 6.438 0 11.11-4.386 11.11-10.431 0-2.611-0.323-3.822-1.567-5.899-0.832-1.386-1.243-2.633-1.439-3.625-0.198 0.321-0.382 0.712-0.516 1.184-0.61 2.131-0.456 4.623-0.454 4.649 0.029 0.446-0.242 0.859-0.664 1.008s-0.892 0.002-1.151-0.364c-0.075-0.107-1.854-2.624-2.637-4.32-1.628-3.518-1.601-7.323-1.434-9.514-1.648 0.96-4.177 3.104-4.989 7.466-0.791 4.244 0.746 8.488 0.762 8.529 0.133 0.346 0.063 0.739-0.181 1.018-0.245 0.277-0.622 0.4-0.986 0.313-0.124-0.030-2.938-0.762-4.761-3.634-0.325-0.514-0.617-1.137-0.864-1.742z"></path>
                        </svg>
                      </span>
                      <span className="checkbox-details">
                        <span className="checkbox-label">Mayday Fires</span>
                      </span>
                    </span>
                  </label>
                </div>



         {/* The Earthquake Selector */}
         <div className="checkbox">
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={showEarthquake}
                      className="checkbox-input"
                      onChange={(e) => setShowEarthquake(e.target.checked)}
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-icon3">
                        <svg
                          width="800px"
                          height="800px"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              fill-rule="nonzero"
                              d="M5 21a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21H5zm7-17.298L6 9.156V19h4.357l1.393-1.5L8 14l5-3-2.5-2 3-3-.5 3 2.5 2-4 3 3.5 3-1.25 2H18V9.157l-6-5.455z"
                            />
                          </g>
                        </svg>
                      </span>
                      <span className="checkbox-label">USGS Earthquakes</span>
                    </span>
                  </label>
                </div>




        
        <div className="checkbox">
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={showWeather}
                      onChange={toggleWeatherAndToastVisibility}
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-icon2">
                        <svg
                          width="800px"
                          height="800px"
                          viewBox="0 0 192 192"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M92.603 56.375a38.999 38.999 0 0 1 41.38 23.584c-.262.063-.523.13-.783.2a6 6 0 0 0-4.242 7.348 6 6 0 0 0 7.348 4.243 22.002 22.002 0 0 1 26.747 27.636A22.003 22.003 0 0 1 142 135H28.518a35.006 35.006 0 0 1 32.313-28.933 6 6 0 1 0-.743-11.976c-.36.022-.72.048-1.08.079a39.001 39.001 0 0 1 33.595-37.795ZM47.032 96.796a51 51 0 0 1 99.492-17.494 33.995 33.995 0 0 1 24.349 15.743A34 34 0 0 1 142 147H22a6 6 0 0 1-5.995-6.24 6.034 6.034 0 0 1-.002-.241 47.002 47.002 0 0 1 31.029-43.723Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="checkbox-label">NWS Weather</span>
                    </span>
                  </label>
                </div>
      </div>
    </div>
  </div>
)}


            {showDetails && selectedEvent ? (
              // Event details view
              <div className="event-details-container">
                <div className="marker-details">
                  <div className="marker-info">
                    {selectedEvent.type === "fire" && (
                      <>
                        <Tabs.Root
                          defaultValue="details"
                          className="no-scrollbar"
                        >
                          <div className="flex-container">
                            <button
                              className="back-button"
                              onClick={handleBack}
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </button>
                            <Tabs.List
                              className="innertabs"
                              aria-label="Fire Event Details"
                            >
                              <Tabs.Trigger value="details">
                                <FiInfo className="TabIcon" /> Details
                              </Tabs.Trigger>
                              <Tabs.Trigger value="cameras">
                                <FiCamera className="TabIcon" /> Cameras &
                                Videos
                              </Tabs.Trigger>
                            </Tabs.List>
                          </div>
                          <Tabs.Content
                            value="details"
                            className="no-scrollbar"
                          >
                            {/* Fire event detailed information here */}
                            <div className="status-container">
                              <img
                                src={
                                  selectedEvent.status.trim() === "Active"
                                    ? fireActiveIcon
                                    : selectedEvent.status.trim() === "Inactive"
                                    ? fireInactiveIcon
                                    : selectedEvent.status.trim() === "Pending"
                                    ? firePendingIcon
                                    : undefined
                                }
                                alt="Fire Status Icon"
                                className="icon1"
                              />
                              <p>
                                {new Date(
                                  selectedEvent.event_start_since
                                ).toLocaleDateString()}
                              </p>
                              <span
                                className={`status-badge ${selectedEvent.status
                                  .trim()
                                  .toLowerCase()}`}
                              >
                                {selectedEvent.status}
                              </span>
                            </div>
                            <button
                              className="draw-polygon-button"
                              onClick={() =>
                                onDrawPolygon(selectedEvent.event_id)
                              }
                            >
                              Draw Polygon
                            </button>
                            <div className="detail-box">
                              <h4>Event ID</h4>
                              <p>{selectedEvent.event_id}</p>
                            </div>
                            <div className="detail-box">
                              <h4>Latitude</h4>
                              <p>{selectedEvent.lat}</p>
                            </div>
                            <div className="detail-box">
                              <h4>Longitude</h4>
                              <p>{selectedEvent.lon}</p>
                            </div>
                            <div className="detail-box">
                              <h4>Height</h4>
                              <p>{selectedEvent.height}</p>
                            </div>

                            <div className="detail-box">
                              <h4>Update Flag</h4>
                              <p>{selectedEvent.update_flag}</p>
                            </div>
                            <div className="detail-box">
                              <h4>Event Start Since</h4>
                              <p>
                                {new Date(
                                  selectedEvent.event_start_since
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="detail-box">
                              <h4>Event Last Seen</h4>
                              <p>
                                {new Date(
                                  selectedEvent.event_last_seen
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <AccordionDemo isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen} weatherData={weatherData} />

                          </Tabs.Content>

                          <Tabs.Content value="cameras" className="TabsContent">
                            {/* Cameras and videos related to the event */}
                            <h3>Cameras & Videos</h3>
                            <div>
                              <h4>VIS Video</h4>
                              <video width="100%" controls autoPlay muted loop>
                                <source src={visUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            <div>
                              <h4>IR Video</h4>
                              <video width="100%" controls autoPlay muted loop>
                                <source src={irUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </Tabs.Content>
                        </Tabs.Root>
                      </>
                    )}

                    {selectedEvent.type === "weather" && (
                      <>
                        <button
                          style={{ fontSize: "19px", color: "white" }}
                          onClick={handleBack}
                        >
                          {" "}
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>{" "}
                        {/* Back button */}
                        <div className="status-container">
                          <img
                            src={getIconForEvent(
                              selectedEvent.properties.event
                            )}
                            alt="Event icon"
                            className="iconweather12"
                          />
                          <p>
                            {new Date(
                              selectedEvent.properties.effective
                            ).toLocaleDateString()}
                          </p>
                          <span
                            className={`status-badge ${selectedEvent.properties.status
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                          >
                            {selectedEvent.properties.status}
                          </span>
                        </div>
                        <div className="detail-box">
                          <h4>Event</h4>
                          <p>{selectedEvent.properties.event}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Severity</h4>
                          <p>{selectedEvent.properties.severity}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Area</h4>
                          <p>{selectedEvent.properties.areaDesc}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Effective</h4>
                          <p>
                            {new Date(
                              selectedEvent.properties.effective
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div className="detail-box">
                          <h4>Expires</h4>
                          <p>
                            {selectedEvent.properties.expires
                              ? new Date(
                                  selectedEvent.properties.expires
                                ).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                        <div className="detail-box">
                          <h4>Description</h4>
                          <p>{selectedEvent.properties.description}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Instruction</h4>
                          <p>
                            {selectedEvent.properties.instruction ||
                              "No specific instructions provided."}
                          </p>
                        </div>
                      </>
                    )}

                    {selectedEvent.type === "earthquake" && (
                      <>
                        <button
                          style={{ fontSize: "19px", color: "white" }}
                          onClick={handleBack}
                        >
                          {" "}
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>{" "}
                        {/* Back button */}
                        <div className="status-container">
                          <FaExclamationTriangle className="iconearth" />
                          <p>
                            {new Date(selectedEvent.date).toLocaleDateString()}
                          </p>
                          <span
                            className={`status-badge ${selectedEvent.properties.status
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                          >
                            {selectedEvent.properties.status}
                          </span>
                        </div>
                        <div className="detail-box">
                          <h4>Place</h4>
                          <p>{selectedEvent.properties.place}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Magnitude</h4>
                          <p>{selectedEvent.properties.mag}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Time</h4>
                          <p>{new Date(selectedEvent.date).toLocaleString()}</p>
                        </div>
                        {/* Add more earthquake details here */}
                        <div className="detail-box">
                          <h4>Tsunami</h4>
                          <p>{selectedEvent.properties.tsunami}</p>
                        </div>
                        <div className="detail-box">
                          <h4>Source</h4>
                          <p>{selectedEvent.properties.sources}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-event-selected">
                {displayEvents.length > 0 ? (
                  <div className="events-container">
                    {displayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="event-card"
                        onClick={() => handleEventSelect(event)}
                      >
                        {/* Conditional rendering for earthquake events */}
                        {event.type === "earthquake" && (
                          <FaExclamationTriangle className="iconearth" />
                        )}
                        {/* Conditional rendering for fire events */}
                        {event.type === "fire" && (
                          <img
                            src={
                              event.status.trim() === "Active"
                                ? fireActiveIcon
                                : event.status.trim() === "Inactive"
                                ? fireInactiveIcon
                                : event.status.trim() === "Pending"
                                ? firePendingIcon
                                : undefined
                            }
                            alt="Fire Status Icon"
                            className="icon"
                          />
                        )}
                        {/* Conditional rendering for weather events */}
                        {event.type === "weather" && (
                          <img
                            src={getIconForEvent(event.properties.event)}
                            alt="Event icon"
                            className="iconweather"
                          />
                        )}

                        <div className="event-info">
                          <h2 style={{ color: "white" }}>
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                            <p
                              style={{
                                marginLeft: "140px",
                                right: "0",
                                color: "white",
                                fontSize: "18px",
                              }}
                            >
                              ⓘ
                            </p>
                          </h2>
                          {event.type === "earthquake" ? (
                            <>
                              <div>Location: {event.properties.place}</div>

                              <div>
                                Time: {new Date(event.date).toLocaleString()}
                              </div>
                            </>
                          ) : event.type === "fire" ? (
                            <>
                              <div>Status: {event.status}</div>
                              <div>
                                Start Date:{" "}
                                {new Date(event.date).toLocaleString()}
                              </div>
                            </>
                          ) : event.type === "weather" ? (
                            <>
                              {/* Display additional info specific to weather events */}
                              <div>Event: {event.properties.event}</div>

                              <div>
                                Effective:{" "}
                                {new Date(
                                  event.properties.effective
                                ).toLocaleString()}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="events-placeholder">
                    {/* Display this message when no events are selected */}
                    {!loading && (
                      <p style={{ color: "white" }}>
                        No event selected. Please select an event to view
                        details.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default TabsDemo;
