import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera, FiChevronRight } from 'react-icons/fi';
import { FaExclamationTriangle, FaFire } from 'react-icons/fa';
import './styles.css';
import { db } from '../../firebaseConfig'; // Ensure this path is correctly set

const TabsDemo = ({ handleMapViewport, showFire, showEarthquake, selectedEvent,setSelectedEvent, showDetails, setShowDetails,isSidebarOpen,setIsSidebarOpen,setFireEventPixels }) => {
  const [events, setEvents] = useState([]);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      const fetchEvents = async () => {
        // Fetch fire events
        const fireResponse = await fetch('http://localhost:3000/api/fire-events');
        const fireEvents = await fireResponse.json();
        // Normalize fire events data
        const normalizedFireEvents = fireEvents.map(event => ({
          ...event,
          type: 'fire',
          date: new Date(event.event_start_since).getTime(),
        }));

      // Fetch earthquake events
      const querySnapshot = await db.collection("earthquakes").get();
      // Normalize earthquake events data
      const earthquakeEvents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        type: 'earthquake',
        date: new Date(doc.data().properties.time).getTime(),
      }));

      // Combine and sort events by date
      const combinedEvents = [...normalizedFireEvents, ...earthquakeEvents];
      combinedEvents.sort((a, b) => a.date - b.date);

      setEvents(combinedEvents);
      };

      fetchEvents();
    
    },[]);
 
    useEffect(() => {
      if (selectedEvent) {
        console.log("Selected event in TabsDemo:", selectedEvent);
        setShowDetails(true);
      }
    }, [selectedEvent]);
    


      const visibleEvents = events.filter(event => {
        if (event.type === 'fire' && showFire) return true;
        if (event.type === 'earthquake' && showEarthquake) return true;
        return false; // Exclude events that don't match visibility conditions
      });

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
  };

        const handleBack = () => {
          setShowDetails(false); // Hide details and show list of events
          setSelectedEvent(null);
          setFireEventPixels([]);
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

                    {showDetails && selectedEvent ?(
                      
                        // Event details view
                        <div className="event-details-container">
                            <button style={{fontSize:'19px',  color:'white'}} onClick={handleBack}>⤺</button> {/* Back button */}
                          
                          <div className="marker-details">
                              <div className="marker-info">
                              

                              {selectedEvent.type === 'fire' && (
                                    <>
                                      <Tabs.Root defaultValue="details">
                                        <Tabs.List aria-label="Fire Event Details">
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
                                            <video width="100%" controls>
                                              <source src={visUrl} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          </div>
                                          <div>
                                            <h4>IR Video</h4>
                                            <video width="100%" controls>
                                              <source src={irUrl} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          </div>
                                        </Tabs.Content>
                                      </Tabs.Root>
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
                          {visibleEvents.length > 0 ? (
                            <div className="events-container">
                              {visibleEvents.map((event) => (
                                <div key={event.id} className="event-card" onClick={() => handleEventSelect(event)}>
                                  {event.type === 'earthquake' ? <FaExclamationTriangle className="iconearth" /> : <FaFire className="icon" />}
                                  <div className="event-info">
                                    <h2 style={{ color: 'white' }}>{event.type === 'earthquake' ? 'Earthquake' : 'Fire'}</h2>
                                    <div>{event.type === 'earthquake' ? event.properties.place : event.name}</div>
                                    <div>{event.type === 'earthquake' ? `` : `Event ID: ${event.event_id}`}</div>
                                    <div>{event.type === 'earthquake' ? `` : `Status: ${event.status}`}</div>
                                    <div>{event.type === 'earthquake' ? `Time: ${new Date(event.date).toLocaleString()}` : `Start Date: ${new Date(event.date).toLocaleString()}`}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="events-placeholder">
                              {/* Display this message when no events are selected */}
                              <p>No event selected. Please select an event to view details.</p>
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

