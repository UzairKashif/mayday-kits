import React, { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera, FiAlertTriangle } from 'react-icons/fi';
import './styles.css';
import { FaFire } from 'react-icons/fa';
const TabsDemo = ({ selectedMarker, markersData, onSelectMarker }) => {
  // Function to extract the groups_pk part needed for the URL
  const getGroupsPkPart = (groupsPk) => {
    const parts = groupsPk.split('_');
    return parts.length > 1 ? `${parts[0]}_${parts[1]}` : '';
  };
  const [sortedMarkers, setSortedMarkers] = useState([]);

  // Sort markersData by start_since_date in descending order when markersData changes
  useEffect(() => {
    const sortedData = [...markersData].sort((a, b) => {
      // Convert start_since_date strings to Date objects
      const dateA = new Date(a.event_start_since);
      const dateB = new Date(b.event_start_since);
      // Descending order comparison
      return dateB - dateA;
    });
    setSortedMarkers(sortedData);
  }, [markersData]);

  // Generate video URLs based on marker data
  const visUrl = selectedMarker
    ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedMarker.event_id}/ABI/F16/VIS/${getGroupsPkPart(selectedMarker.groups_pk)}.mp4`
    : '';
  const irUrl = selectedMarker
    ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedMarker.event_id}/ABI/F16/IR/${getGroupsPkPart(selectedMarker.groups_pk)}.mp4`
    : '';
    return (
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          <FiInfo className="TabIcon" />
          Events
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          <FiCamera className="TabIcon" />
          Cameras & Videos
        </Tabs.Trigger>
      </Tabs.List>
        <Tabs.Content value="tab1" className="TabsContent">
       
{selectedMarker ? (
          
          <div class="marker-details">
                 <div class="marker-info">
                   <div class="detail-box">
                     <h4>Event ID</h4>
                     <p>{selectedMarker.event_id}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Latitude</h4>
                     <p>{selectedMarker.lat}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Longitude</h4>
                     <p>{selectedMarker.lon}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Height</h4>
                     <p>{selectedMarker.height}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Status</h4>
                     <p>{selectedMarker.status}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Update Flag</h4>
                     <p>{selectedMarker.update_flag}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Event Start Since</h4>
                     <p>{selectedMarker.event_start_since}</p>
                   </div>
                   <div class="detail-box">
                     <h4>Event Last Seen</h4>
                     <p>{selectedMarker.event_last_seen}</p>
                   </div>
                      </div>
                    </div>
                  
                 ) : (
          
                  <div className="events-container">
                  {sortedMarkers.map((marker) => (
                    <div key={marker.id} className="event-card" onClick={() => onSelectMarker(marker, {preventDefault: () => {}})}>
                      <FaFire className="fire-icon" />
                      <div className="event-info">
                        <div>{marker.name}</div>
                        <div>Status: {marker.status}</div>
                        <div>
  Start Date: {
    new Date(marker.event_start_since).toLocaleDateString('en-US', {
      year: 'numeric', // numeric, 2-digit
      month: 'long', // numeric, 2-digit, long, short, narrow
      day: 'numeric', // numeric, 2-digit
      weekday: 'long', // long, short, narrow
    }) + ' ' + 
    new Date(marker.event_start_since).toLocaleTimeString('en-US', {
      hour: '2-digit', // numeric, 2-digit
      minute: '2-digit', // numeric, 2-digit
      second: '2-digit', // numeric, 2-digit
      hour12: true // true for AM/PM; false for 24-hour
    })
  }
</div>

                      </div>
                    </div>
                  ))}
                </div>
                
        )}
      </Tabs.Content>
       
        <Tabs.Content value="tab2" className="TabsContent">
        {selectedMarker && (
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
        )}
      </Tabs.Content>
      </Tabs.Root>
    );
  };
  
  export default TabsDemo;