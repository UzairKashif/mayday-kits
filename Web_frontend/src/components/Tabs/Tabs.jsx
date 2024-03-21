import fireActiveIcon from '../assets/weather_icons/fire_active.png';
import fireInactiveIcon from '../assets/weather_icons/fire_inactive.png';
import firePendingIcon from '../assets/weather_icons/fire_pending.png';
import React, { useEffect, useState ,useRef} from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera, FiChevronRight } from 'react-icons/fi';
import { FaFire,FaSignOutAlt,FaHome, FaExclamationTriangle, FaGlobe, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import { FaCloud } from 'react-icons/fa';
import './styles.css';
import { db } from '../../firebaseConfig'; // Ensure this path is correctly set
import { TailSpin } from 'react-loader-spinner';
import { collection, getDocs } from 'firebase/firestore';
import * as turf from '@turf/turf';
import logoImage from '../assets/bg.webp'; // Adjust the path accordingly
import SignOut from '../signout/signout';




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

const getIconForEvent = (eventType) => {
  return eventToIconMap[eventType] || eventToIconMap["default"];
};

const TabsDemo = ({ handleMapViewport, handleWeatherEventSelect, onWeatherEventSelect, showFire, showEarthquake,showWeather, selectedEvent,setSelectedEvent, showDetails, setShowDetails,isSidebarOpen,setIsSidebarOpen }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherEventFilters, setWeatherEventFilters] = useState({});
  const detailsPanelRef = useRef(null);

  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [showDetails, setShowDetails] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState('');

// Handle search input change
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value.toLowerCase());
};

// Filter validEvents based on search term
const filteredEvents = searchTerm
  ? validEvents.filter(eventType => eventType.toLowerCase().includes(searchTerm))
  : validEvents;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // API Endpoints
        const fireEventsUrl = 'http://localhost:3000/api/fire-events'; // Adjust with the correct endpoint
        const weatherApiUrl = "https://api.weather.gov/alerts/active";
        const earthquakeApiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-02-02&minmagnitude=3";

        // Fetching data from all three APIs concurrently
        const [fireResponse, weatherResponse, earthquakeResponse] = await Promise.all([
          fetch(fireEventsUrl).then(res => res.json()),
          fetch(weatherApiUrl).then(res => res.json()),
          fetch(earthquakeApiUrl).then(res => res.json()),
        ]);

        // Process fire events data
        const fireEvents = fireResponse.map(event => ({
          ...event,
          type: 'fire',
          date: new Date(event.event_start_since).getTime(), // Adjust based on actual property path
        }));

        // Process weather data
        const weatherEvents = weatherResponse.features.map(eventData => ({
          ...eventData,
          type: 'weather',
          date: eventData.date ? new Date(eventData.date).getTime() : null
        })).filter(event => validEvents.includes(event.properties.event));

        // Process earthquake data
        const earthquakeEvents = earthquakeResponse.features.map(feature => ({
          ...feature,
          type: 'earthquake',
          date: new Date(feature.properties.time).getTime(), // Adjust based on actual property path
        }));

        // Combine and sort events by date
        const combinedEvents = [...fireEvents, ...weatherEvents, ...earthquakeEvents]
          .sort((a, b) => a.date - b.date);

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


    const displayEvents = events.filter(event => {
      const isVisibleType = (event.type === 'fire' && showFire) ||
                            (event.type === 'earthquake' && showEarthquake) ||
                            (event.type === 'weather' && showWeather);
      const passesWeatherFilter = event.type !== 'weather' || weatherEventFilters[event.properties.event];
      return isVisibleType && passesWeatherFilter;
    });


    const handleEventSelect = async (event) => {
      setSelectedEvent(event);
      setShowDetails(true);
      if (event && event.properties && event.properties.affectedZones) {
        handleWeatherEventSelect(event);
      } else {
        console.error('Trying to select an event with invalid structure:', event);
      }
      if (event.type === 'weather') {
        try {
          // Corrected asynchronous handling
          const geometries = await Promise.all(event.properties.affectedZones.map(async (zoneUrl) => {
            const response = await fetch(zoneUrl);
            const data = await response.json();
            return data.geometry ? { ...data.geometry, properties: { event: event.properties.event } } : null;
          }));
          // Assuming onWeatherEventSelect is a prop function passed from Dashboard.jsx that handles weather events
          onWeatherEventSelect(geometries.filter(geo => geo !== null));
        } catch (error) {
          console.error('Error fetching zone geometry:', error);
        }
      }  else {
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

      const detailsPanel = document.querySelector('.details-panel');
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
            latitude: -14.2350,
            longitude: -51.9253,
            zoom: 1.5,

          });

        };
        const getGroupsPkPart = (groupsPk) => {
          const parts = groupsPk.split('_');
          return parts.length > 1 ? `${parts[0]}_${parts[1]}` : '';
        };
        const isFireEvent = selectedEvent && selectedEvent.type === 'fire';
        const visUrl = isFireEvent ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedEvent.event_id}/ABI/F16/VIS/${getGroupsPkPart(selectedEvent.groups_pk ?? '')}.mp4` : '';
        const irUrl = isFireEvent ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedEvent.event_id}/ABI/F16/IR/${getGroupsPkPart(selectedEvent.groups_pk ?? '')}.mp4` : '';
        const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
        console.log(selectedEvent);



        const handleWeatherFilterChange = (event) => {
          const { name, checked } = event.target;
          setWeatherEventFilters(prevFilters => {
            const updatedFilters = { ...prevFilters, [name]: checked };
            console.log('Updated Filters:', updatedFilters);
            return updatedFilters;
          });
        };
        useEffect(() => {
          console.log('Current Weather Event Filters:', weatherEventFilters);
        }, [weatherEventFilters]); // Add weatherEventFilters to dependency array to log whenever it changes



  // // Filtered events based on selected weather event types
  // const filteredEvents = events.filter((event) => {
  //   return event.type !== 'weather' || weatherEventFilters[event.properties.event];
  // });
  const isFilterApplied = Object.values(weatherEventFilters).some(value => value === false);

// Define displayEvents based on whether a filter is applied
// Assuming visibleEvents already filters based on showFire, showEarthquake, showWeather
const [isModalVisible, setIsModalVisible] = useState(false);
const [info, setinfoVisible] = useState(false);
const handleOpenModal = () => {
    setIsModalVisible(true);
    setinfoVisible(false);
};

const handleCloseModal = () => {
  setIsModalVisible(false);
 
};
const handleinfo = () => {
 
  setinfoVisible(true); 
  setIsModalVisible(false);
};

const handleinfoclose = () => {

setinfoVisible(false);
};

  return (
    <>

    <div className={`ThinSidebar ${!isSidebarOpen ? 'show' : ''}`}>
   
    <div className="ThinSidebarLogo">
    <img src={logoImage} alt="Logo" className="LogoIcon" />
  </div>

  
  <FaHome className={`ThinSidebarIcon ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} />
  <FaExclamationTriangle className="ThinSidebarIcon" onClick={() => {/* Handle earthquake icon click */}} />
  <FaGlobe className="ThinSidebarIcon" onClick={() => {/* Handle globe icon click */}} />
  
  {showWeather &&
  <FaCloud className="ThinSidebarIcon" onClick={handleOpenModal}  />
}
  <FaUserCircle className="ThinSidebarIcon" onClick={handleinfo} />
  <button style={{zIndex:'100'}} className={`SidebarToggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <FiChevronRight className="ToggleIcon" />
      </button>
</div>
      

      <div className={`TabsContainer ${isSidebarOpen ? 'open' : 'closed'}`}>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                  <Tabs.Trigger className="TabsTrigger" value="tab1">
                      <FiInfo className="TabIcon" /> Events
                  </Tabs.Trigger>

                 
            </Tabs.List>


          <Tabs.Content value="tab1" className="TabsContent" ref={detailsPanelRef}>
          {
        loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TailSpin
              color="#FF977D"
              height={40}
              width={40}
            />
          </div>
        )}

{showWeather && !showDetails && (
     <div className="filter-dropdown">
     {/* <button onClick={handleOpenModal} className="filter-dropdown-button">
       ☁ ‎ Filter Events ‎ ‎⮟
     </button> */}
     {
       isModalVisible && (
         <div className="modal-overlay" onClick={handleCloseModal}>
           <div className="modal" onClick={e => e.stopPropagation()}>
             <div className="modal-header">
               <h4 className="modal-title">Filter Events</h4>
               <button onClick={handleCloseModal} className="close-modal-button">×</button>
             </div>
             <div className="modal-body">
               <input
                 type="text"
                 placeholder="Search events..."
                 onChange={handleSearchChange}
                 className="modal-search-input"
               />
               <ul className="filter-options-list">
                 {filteredEvents.map(eventType => (
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
                     <label htmlFor={`toggle-${eventType}`} className="filter-label">{eventType}</label>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       )
     }
   </div>
    )}


{info && (
        <div className="info-overlay" onClick={handleinfoclose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h4 className="modal-title">User Profile</h4>
        <button onClick={handleinfoclose} className="close-modal-button">×</button>
      </div>
      <div className="info-body">
      <div className="profile-content">
  <FaUserCircle alt="User" className="profile-picture" />
  <h3 className="profile-name">Nazar Hussain</h3>
  <p className="profile-detail"><strong>Country:</strong>
  <img src="https://cdn.jsdelivr.net/npm/twemoji@latest/2/svg/1f1f5-1f1f0.svg" alt="Pakistan Flag" style={{width: '1em', height: '1em', verticalAlign: '-0.1em'}} />
  Pakistan
</p>
  <br />
  <p className="profile-detail"><strong>Email:</strong>nazarhussain786@hotmail.com</p>
  <br />
  <p className="profile-detail"><strong>Details:</strong>Premium User </p>
  <button className="signout-button">
  <SignOut /> <FaSignOutAlt /> 
  </button>
</div>

      </div>
    </div>
  </div>
)}
   
   
                    {showDetails && selectedEvent ?(

                        // Event details view
                        <div className="event-details-container">


                          <div className="marker-details">
                              <div className="marker-info">


                              {selectedEvent.type === 'fire' && (
                                    <>
                                    <Tabs.Root defaultValue="details"className="no-scrollbar">
                                      <div className="flex-container">
    <button className="back-button" onClick={handleBack}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"></path>
      </svg>
    </button>
    <Tabs.List className="innertabs" aria-label="Fire Event Details">
      <Tabs.Trigger value="details"><FiInfo className="TabIcon" /> Details</Tabs.Trigger>
      <Tabs.Trigger value="cameras"><FiCamera className="TabIcon" /> Cameras & Videos</Tabs.Trigger>
    </Tabs.List>
  </div>
                                        <Tabs.Content value="details" 
                                       className="no-scrollbar">
                                          {/* Fire event detailed information here */}
                                          <div className="status-container">
  <img
    src={
      selectedEvent.status.trim() === 'Active' ? fireActiveIcon :
      selectedEvent.status.trim() === 'Inactive' ? fireInactiveIcon :
      selectedEvent.status.trim() === 'Pending' ? firePendingIcon :
      undefined
    }
    alt="Fire Status Icon"
    className="icon1"
  />
  <p>{new Date(selectedEvent.event_start_since).toLocaleDateString()}</p>
  <span className={`status-badge ${selectedEvent.status.trim().toLowerCase()}`}>
    {selectedEvent.status}
  </span>
</div>

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
                                                <p>{new Date(selectedEvent.event_start_since).toLocaleDateString()}</p>
                                              </div>
                                              <div className="detail-box">
                                                <h4>Event Last Seen</h4>
                                                <p>{new Date(selectedEvent.event_last_seen).toLocaleDateString()}
                                                </p>
                                              </div>
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
                                            <video width="100%"controls autoPlay muted loop>
                                              <source src={irUrl} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          </div>
                                        </Tabs.Content>
                                      </Tabs.Root>
                                    </>
                                  )}

                                {selectedEvent.type === 'weather' && (
                                  <>
                                    <button style={{fontSize:'19px',  color:'white'}} onClick={handleBack}> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"></path>
      </svg></button> {/* Back button */}

      <div className="status-container">
      <img
              src={getIconForEvent(selectedEvent.properties.event)}
              alt="Event icon"
              className="iconweather12"
            />
  <p>{new Date(selectedEvent.properties.effective).toLocaleDateString()}</p>
  <span className={`status-badge ${selectedEvent.properties.status.toLowerCase().replace(/\s/g, '-')}`}>
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
                                      <p>{new Date(selectedEvent.properties.effective).toLocaleString()}</p>
                                    </div>
                                    <div className="detail-box">
                                      <h4>Expires</h4>
                                      <p>{selectedEvent.properties.expires ? new Date(selectedEvent.properties.expires).toLocaleString() : "N/A"}</p>
                                    </div>
                                    <div className="detail-box">
                                      <h4>Description</h4>
                                      <p>{selectedEvent.properties.description}</p>
                                    </div>
                                    <div className="detail-box">
                                      <h4>Instruction</h4>
                                      <p>{selectedEvent.properties.instruction || "No specific instructions provided."}</p>
                                    </div>
                                    </>
                                                                          )}

                                                                          




                                    {selectedEvent.type === 'earthquake' && (
                                         <>
                                           <button style={{fontSize:'19px',  color:'white'}} onClick={handleBack}> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"></path>
      </svg></button> {/* Back button */}

      <div className="status-container">
      <FaExclamationTriangle className="iconearth1" />
  <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
  <span className={`status-badge ${selectedEvent.properties.status.toLowerCase().replace(/\s/g, '-')}`}>
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
                      ): (
                                                <div className="no-event-selected">
                                                {displayEvents.length > 0 ?(
                                                  <div className="events-container">
                                                      {displayEvents.map((event) => (

                                                      <div key={event.id} className="event-card" onClick={() => handleEventSelect(event)}>


                                                       {/* Conditional rendering for earthquake events */}
          {event.type === 'earthquake' && <FaExclamationTriangle className="iconearth" />}
          {/* Conditional rendering for fire events */}
          {event.type === 'fire' && (
            <img
              src={
                event.status.trim() === 'Active' ? fireActiveIcon :
                event.status.trim() === 'Inactive' ? fireInactiveIcon :
                event.status.trim() === 'Pending' ? firePendingIcon :
                undefined
              }
              alt="Fire Status Icon"
              className="icon"
            />
          )}
          {/* Conditional rendering for weather events */}
          {event.type === 'weather' && (
            <img
              src={getIconForEvent(event.properties.event)}
              alt="Event icon"
              className="iconweather"
            />
          )}

                                                        <div className="event-info">
                                                          <h2 style={{ color: 'white' }}>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                          <p style={{ marginLeft:'140px', right:'0', color:'white',   fontSize:'18px',}}>ⓘ</p></h2>
                                                          {event.type === 'earthquake' ? (
                                                            <>
                                                              <div>Location: {event.properties.place}</div>
                                                              
                                                              <div>Time: {new Date(event.date).toLocaleString()}</div>
                                                            </>
                                                          ) : event.type === 'fire' ? (
                                                            <>
                                                            
                                                              <div>Status: {event.status}</div>
                                                              <div>Start Date: {new Date(event.date).toLocaleString()}</div>
                                                            </>
                                                          ) : event.type === 'weather' ? (
                                                            <>
                                                              {/* Display additional info specific to weather events */}
                                                              <div>Event: {event.properties.event}</div>

                                                              <div>Effective: {new Date(event.properties.effective).toLocaleString()}</div>
                                                          

                                                            </>
                                                          ) : null}

                                                        </div>
                                                      </div>
                                                    ))}

                                                  </div>


                                          ) : (
                                            <div className="events-placeholder">
                                              {/* Display this message when no events are selected */}
                                              <p style={{color:'white',}}>No event selected. Please select an event to view details.</p>
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