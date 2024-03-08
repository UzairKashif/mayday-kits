import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo } from 'react-icons/fi';
import './earthquake.css'; // Ensure the path to styles.css is correct
import { FaExclamationTriangle } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import '@radix-ui/themes/styles.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "../NextPage/NextPage.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@radix-ui/themes/styles.css';

const TabsEarthquake = ({ earthquakeData, selectedEarthquake,setSelectedEarthquake ,onSelectMarker}) => {
  // State to manage the selected earthquake marker
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (


    <>


<button style={{backgroundColor:'#1F1513'}} className={`SidebarToggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <FiChevronRight className="ToggleIcon" />
      </button>
      <div className={`TabsContainer ${isSidebarOpen ? 'open' : 'closed'}`}>

    <Tabs.Root className="TabsRoot" defaultValue="info">
      <Tabs.List className="TabsList">
        <Tabs.Trigger className="TabsTrigger" value="info">
          <FiInfo className="TabIcon" />
          Earthquake Info
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="info" className="TabsContent">
      {selectedEarthquake ? (
  <div className="marker-details">
    <div className="marker-info">
      <div className="detail-box">
        <h4>Place</h4>
        <p>{selectedEarthquake.properties.place}</p>
      </div>
      <div className="detail-box">
        <h4>Magnitude</h4>
        <p>{selectedEarthquake.properties.mag}</p>
      </div>
      <div className="detail-box">
        <h4>Type</h4>
        <p>{selectedEarthquake.properties.type}</p>
      </div>
      <div className="detail-box">
        <h4>Time</h4>
        <p>{new Date(selectedEarthquake.properties.time).toLocaleString()}</p>
      </div>
      <div className="detail-box">
        <h4>Coordinates</h4>
        <p>{selectedEarthquake.geometry.coordinates.join(', ')}</p>
      </div>
      {/* Add any additional details you have for earthquakes here */}
    </div>
  </div>
        ) : (
          <div className="events-container">
            {earthquakeData.map((earthquake, index) => (
              <div key={index} className="event-card"  onClick={() =>onSelectMarker(earthquake, {preventDefault: () => {}})}>
                <FaExclamationTriangle className="fire-icon" />
                <div className="event-info">
                  <div>{earthquake.properties.place}</div>
                  <div>Magnitude: {earthquake.properties.mag}</div>
                  <div>Depth: {earthquake.geometry.coordinates[2]} km</div>
                  <div>Date: {new Date(earthquake.properties.time).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </Tabs.Content>
    </Tabs.Root>
    </div>
    </>
  );
};

export default TabsEarthquake;
