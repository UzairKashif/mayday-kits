import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera, FiChevronRight } from 'react-icons/fi';
import { FaExclamationTriangle, FaFire } from 'react-icons/fa';
import './styles.css';
import { db } from '../../firebaseConfig'; // Ensure this path is correctly set
import { FaCloud } from 'react-icons/fa'; // This is just an example, choose any icon that fits your needs
import { collection, getDocs } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import * as turf from '@turf/turf';

const TabsDemo = ({ handleMapViewport , showFire, showEarthquake,showWeather,onWeatherMarkerClick}) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEventGeometry, setSelectedEventGeometry] = useState([]);
  const [weatherEventFilters, setWeatherEventFilters] = useState({});
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  useEffect(() => {

    const initialFilters = validEvents.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
    setWeatherEventFilters(initialFilters); 
// Add this in TabsDemo component props


// Function to call when a weather marker is clicked
const handleWeatherMarkerClick = (event) => {
  const polygonData = event.geometry; // Assuming this is the GeoJSON data
  onWeatherMarkerClick(polygonData);
};

    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Combine all fetch operations into a single async function
        const fireEventsPromise = fetch('http://localhost:3000/api/fire-events').then(res => res.json());
        const earthquakeEventsPromise = getDocs(collection(db, "earthquakes"));
        const weatherEventsPromise = getDocs(collection(db, "weatherAlerts"));

        const [fireEvents, earthquakeSnapshot, weatherSnapshot] = await Promise.all([fireEventsPromise, earthquakeEventsPromise, weatherEventsPromise]);

        const normalizedFireEvents = fireEvents.map(event => ({
          ...event,
          type: 'fire',
          date: new Date(event.event_start_since).getTime(),
        }));

        const earthquakeEvents = earthquakeSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          type: 'earthquake',
          date: new Date(doc.data().properties.time).getTime(),
        }));

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
        const weatherEvents = weatherSnapshot.docs.map(doc => {
          const eventData = doc.data();
          return {
            ...eventData,
            id: doc.id,
            type: 'weather',
            date: eventData.date ? new Date(eventData.date).getTime() : null
          };
        }).filter(event => validEvents.includes(event.properties.event));

        // Combine all events and sort by date
        const combinedEvents = [...normalizedFireEvents, ...earthquakeEvents, ...weatherEvents].sort((a, b) => a.date - b.date);

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
      console.log(selectedEvent); // Debug: Check if selectedEvent is received correctly
      if(selectedEvent) {
        setShowDetails(true); // Ensure logic for showing details is correct
      }
      },[selectedEvent]);

      const handleEventSelect = (event) => {
      setSelectedEvent(event);
      setShowDetails(true); // Show details

      // Fly to the event location
      handleMapViewport({
        latitude: parseFloat(event.lat || event.geometry.coordinates[1]),
        longitude: parseFloat(event.lon || event.geometry.coordinates[0]),
        zoom: 10, // Adjust zoom level as needed
        pitch: 60,
        bearing: 30,
        speed: 1.2,
      });
      const geometries = []; // This should be the polygon data for the selected event
  
      // ... logic to fetch and push geometries to the array (similar to NextPageWeather)
      
      // Once you have the geometries
      setSelectedEventGeometry(geometries);
  };

  
  
  

        const handleBack = () => {
          setLoading(true);
            try {
              setShowDetails(false); // Hide details and show list of events
              setSelectedEvent(null);
              // Reset map to initial state
              handleMapViewport({
                latitude: -14.2350,
                longitude: -51.9253,
                zoom: 1.5,
              });
            } catch (error) {
              // Handle potential errors here
              console.error(error);
            } finally {
              setLoading(false);
            }
                    
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

  
        const visibleEvents = events.filter(event => {
          if (event.type === 'fire' && showFire) return true;
          if (event.type === 'earthquake' && showEarthquake) return true;
          if (event.type === 'weather' && showWeather) return true;
          return false;
        });
        
        const handleWeatherFilterChange = (event) => {
          const { name, checked } = event.target;
          setWeatherEventFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
        };
        

  // Filtered events based on selected weather event types
  const filteredEvents = events.filter((event) => {
    return event.type !== 'weather' || weatherEventFilters[event.properties.event];
  });
  const isFilterApplied = Object.values(weatherEventFilters).some(value => value === false);

// Define displayEvents based on whether a filter is applied
// Assuming visibleEvents already filters based on showFire, showEarthquake, showWeather
let displayEvents = events;
if (showWeather && isFilterApplied) {
    // Apply weather filters to already filtered visibleEvents
    displayEvents = visibleEvents.filter(event => {
        return event.type !== 'weather' || weatherEventFilters[event.properties.event];
    });
} else {
    // Use visibleEvents directly if no weather filter is applied
    displayEvents = visibleEvents;
}

  return (
    <>
      <button className={`SidebarToggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <FiChevronRight className="ToggleIcon" />
      </button>

      <div className="filter-dropdown">
  <button onClick={() => setIsDropdownVisible(!isDropdownVisible)} className="filter-dropdown-button">
    Filter Events
  </button>
  {isDropdownVisible && (
    <div className="filter-container">
      {validEvents.map((eventType) => (
        <label key={eventType} className="filter-option">
          <input
            type="checkbox"
            name={eventType}
            checked={weatherEventFilters[eventType]}
            onChange={handleWeatherFilterChange}
          />
          {eventType}
        </label>
      ))}
    </div>
  )}
</div>
      
      <div className={`TabsContainer ${isSidebarOpen ? 'open' : 'closed'}`}>

      

        <Tabs.Root className="TabsRoot" defaultValue="tab1">

            <Tabs.List className="TabsList" aria-label="Manage your account">
                  <Tabs.Trigger className="TabsTrigger" value="tab1">
                      <FiInfo className="TabIcon" /> Events
                  </Tabs.Trigger>
                  
                  <Tabs.Trigger className="TabsTrigger" value="tab2">
                      <FiCamera className="TabIcon" /> Cameras & Videos
                  </Tabs.Trigger>
            </Tabs.List>


          <Tabs.Content value="tab1" className="TabsContent">
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

                    {!showDetails ? (


<div className="events-container">
        {displayEvents.map((event) => (
            <div key={event.id} className="event-card" onClick={() => handleEventSelect(event)}>
                {event.type === 'earthquake' && <FaExclamationTriangle className="iconearth" />}
                {event.type === 'fire' && <FaFire className="icon" />}
                {event.type === 'weather' && <FaCloud className="iconweather" />}
                <div className="event-info">
                    <h2 style={{color:'white',}} >{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h2>
                    <div>{event.properties?.event || event.properties?.headline || event.name || event.properties?.place}</div>
                    <div>
                        {event.properties?.expires ? 
                            new Date(event.properties.expires).toLocaleString() :
                            (event.date ? new Date(event.date).toLocaleString() : "N/A")}
                    </div>
                </div>
            </div>
        ))}
    </div>
                    
                      ) : (
                      
                        // Event details view
                        <div className="event-details-container">
                            <button style={{fontSize:'19px',  color:'white'}} onClick={handleBack}>⤺</button> {/* Back button */}
                          
                          <div className="marker-details">
                              <div className="marker-info">
                                    
                                    {selectedEvent.type === 'fire' && (
                                        <>
                                              {/* Fire event details */}
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
                                                <h4>Status</h4>
                                                <p>{selectedEvent.status}</p>
                                              </div>
                                              <div className="detail-box">
                                                <h4>Update Flag</h4>
                                                <p>{selectedEvent.update_flag}</p>
                                              </div>
                                              <div className="detail-box">
                                                <h4>Event Start Since</h4>
                                                <p>{selectedEvent.event_start_since}</p>
                                              </div>
                                              <div className="detail-box">
                                                <h4>Event Last Seen</h4>
                                                <p>{selectedEvent.event_last_seen}</p>
                                              </div>


                                        </>
                                        )}



                                    {selectedEvent.type === 'earthquake' && (
                                         <>
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
                                                <h4>Status</h4>
                                                <p>{selectedEvent.properties.status}</p>
                                              </div>

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

{selectedEvent.type === 'weather' && (
  <>
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
                            </div>
                          </div>
                        </div>
                      )}
          </Tabs.Content>



          

          <Tabs.Content value="tab2" className="TabsContent">
                {selectedEvent ? (
                      isFireEvent ? (
                            <div>
                              <h3>VIS Video</h3>
                              <video width="100%" height="340" controls autoPlay muted loop>
                                <source src={visUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <h3>IR Video</h3>
                              <video width="100%" height="340" controls autoPlay muted loop>
                                <source src={irUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>

                  ) : (

                    <p style={{color:'white',}} >This event type does not have associated videos.</p>
                  
                      )

                  ) : (
                    
                    <p style={{color:'white',}}>There's nothing to show. <br/>Select a location to see satellite videos.</p>
                      )
                      }
          </Tabs.Content>
                




        </Tabs.Root>
      </div>


 

    </>
  );
};

export default TabsDemo;











