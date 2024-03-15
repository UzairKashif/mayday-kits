
import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera, FiChevronRight } from 'react-icons/fi';
import { FaExclamationTriangle, FaFire } from 'react-icons/fa';
import { FaCloud } from 'react-icons/fa';
import './styles.css';
import { db } from '../../firebaseConfig'; // Ensure this path is correctly set
import { TailSpin } from 'react-loader-spinner';
import { collection, getDocs } from 'firebase/firestore';
import * as turf from '@turf/turf';
const TabsDemo = ({ handleMapViewport, onWeatherEventSelect, showFire, showEarthquake,showWeather, selectedEvent,setSelectedEvent, showDetails, setShowDetails,isSidebarOpen,setIsSidebarOpen }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherEventFilters, setWeatherEventFilters] = useState({});
 
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    useEffect(() => {
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
          console.log(combinedEvents)
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
    

      const handleEventSelect = (event) => {
      setSelectedEvent(event);
      setShowDetails(true); // Show details
      
      if (event.type === 'weather') {
        // Call the function passed from Dashboard
        onWeatherEventSelect(event);
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
                
        

  // Filtered events based on selected weather event types
  const filteredEvents = events.filter((event) => {
    return event.type !== 'weather' || weatherEventFilters[event.properties.event];
  });
  const isFilterApplied = Object.values(weatherEventFilters).some(value => value === false);

// Define displayEvents based on whether a filter is applied
// Assuming visibleEvents already filters based on showFire, showEarthquake, showWeather
  
  return (
    <>
      <button className={`SidebarToggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <FiChevronRight className="ToggleIcon" />
      </button>
     

      <div className={`TabsContainer ${isSidebarOpen ? 'open' : 'closed'}`}>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                  <Tabs.Trigger className="TabsTrigger" value="tab1">
                      <FiInfo className="TabIcon" /> Events
                  </Tabs.Trigger>
                  
                  {/* <Tabs.Trigger className="TabsTrigger" value="tab2">
                      <FiCamera className="TabIcon" /> Cameras & Videos
                  </Tabs.Trigger> */}
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

{showWeather && (
              <div className="filter-dropdown">
                <button onClick={() => setIsDropdownVisible(!isDropdownVisible)} className="filter-dropdown-button">
                ☁ ‎ Filter Events‎ ‎ ‎ ⮟
                </button>
                {isDropdownVisible && (
                  <div className="filter-container">
                    {validEvents.map(eventType => (
                      <label key={eventType} className="filter-option">
                        <input
                          type="checkbox"
                          id={`checkbox-${eventType}`}
                          name={eventType}
                          checked={!!weatherEventFilters[eventType]}
                          onChange={handleWeatherFilterChange}
                        />
                        {eventType}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
                    {showDetails && selectedEvent ?(
                      
                        // Event details view
                        <div className="event-details-container">
                            <button style={{fontSize:'19px',  color:'white'}} onClick={handleBack}>⤺</button> {/* Back button */}
                          
                          <div className="marker-details">
                              <div className="marker-info">
                              

                              {selectedEvent.type === 'fire' && (
                                    <>
                                      <Tabs.Root defaultValue="details">
                                        <Tabs.List  className='innertabs' aria-label="Fire Event Details">
                                          <Tabs.Trigger value="details"><FiInfo className="TabIcon" /> Details</Tabs.Trigger>
                                          <Tabs.Trigger value="cameras"><FiCamera className="TabIcon" /> Cameras & Videos</Tabs.Trigger>
                                        </Tabs.List>

                                        <Tabs.Content value="details" className="TabsContent">
                                          {/* Fire event detailed information here */}
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

                                        
                            </div>
                          </div>
                        </div>
                      ): (
                        <div className="no-event-selected">
                        {displayEvents.length > 0 ?(
                          <div className="events-container">
                             {displayEvents.map((event) => (
                           
                              <div key={event.id} className="event-card" onClick={() => handleEventSelect(event)}>
                                {event.type === 'earthquake' && <FaExclamationTriangle className="iconearth" />}
                                {event.type === 'fire' && <FaFire className="icon" />}
                                {event.type === 'weather' && <FaCloud className="iconweather" />} {/* Display an icon for weather events */}
                                <div className="event-info">
                                  <h2 style={{ color: 'white' }}>{event.type.charAt(0).toUpperCase() + event.type.slice(1)} 
                                  <p style={{ marginLeft:'140px', right:'0', color:'white',   fontSize:'18px',}}>ⓘ</p></h2>
                                  {event.type === 'earthquake' ? (
                                    <>
                                      <div>Location: {event.properties.place}</div>
                                      <div>Magnitude: {event.properties.mag}</div>
                                      <div>Time: {new Date(event.date).toLocaleString()}</div>
                                    </>
                                  ) : event.type === 'fire' ? (
                                    <>
                                      <div>Event ID: {event.event_id}</div>
                                      <div>Status: {event.status}</div>
                                      <div>Start Date: {new Date(event.date).toLocaleString()}</div>
                                    </>
                                  ) : event.type === 'weather' ? (
                                    <>
                                      {/* Display additional info specific to weather events */}
                                      <div>Event: {event.properties.event}</div>
                                    
                                      <div>Effective: {new Date(event.properties.effective).toLocaleString()}</div>
                                      <div>Expires: {event.properties.expires ? new Date(event.properties.expires).toLocaleString() : "N/A"}</div>
                                      
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