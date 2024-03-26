import fireActiveIcon from "../assets/weather_icons/fire_active.png";
import fireInactiveIcon from "../assets/weather_icons/fire_inactive.png";
import firePendingIcon from "../assets/weather_icons/fire_pending.png";
import React, { useEffect, useState, useRef } from "react";
import WeatherAccordion from "../windyaccordion/WeatherAccordion";
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
  showEarthquake,
  showWeather,
  selectedEvent,
  setSelectedEvent,
  showDetails,
  setShowDetails,
  isSidebarOpen,
  setIsSidebarOpen,
  onDrawPolygon,
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherEventFilters, setWeatherEventFilters] = useState({});
  const [areAllChecked, setAreAllChecked] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const fetchWindyData = async (lat, lon) => {
    const params = {
      lat: lat,
      lon: lon,
      model: 'gfs,arome,iconEu,gfs,gfsWave,namConus,namHawaii,namAlaska,geos5', // Include all models
      parameters: ['wind', 'temperature'], // Parameters you want to retrieve
      key: 'UDPVe8gC6B1J8JTwGeB91qEVGlBUWNZW',
    };
  
    try {
      const response = await fetch(`https://api.windy.com/api/point-forecast/v2?${new URLSearchParams(params)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data from Windy');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
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
      fetchWindyData(event.lat, event.lon).catch(console.error);
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
  const handleOpenModal = () => {
    setIsModalVisible(true);
    setinfoVisible(false);
    setSearchTerm("");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setinfoVisible(false);
    setSearchTerm("");
  };
  const handleinfo = () => {
    setinfoVisible(true);
    setIsModalVisible(false);
    setSearchTerm("");
  };

  const handleinfoclose = () => {
    setinfoVisible(false);
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
                    <button
                      onClick={handleinfoclose}
                      className="close-modal-button"
                    ></button>
                  </div>
                  <div className="info-body">
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
                      <button className="signout-button">
                        <SignOut /> <FaSignOutAlt />
                      </button>
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
                            <WeatherAccordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen} weatherData={weatherData} />
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
