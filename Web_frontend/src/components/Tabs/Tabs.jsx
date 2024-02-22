import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera } from 'react-icons/fi';
import './styles.css';

const TabPanelContent = ({ value, children }) => (
  <Tabs.Content className="TabsContent" value={value}>
    {children}
  </Tabs.Content>
);
// Function to extract the groups_pk part needed for the URL
const getGroupsPkPart = (groupsPk) => {
  const parts = groupsPk.split('_');
  return parts.length > 1 ? `${parts[0]}_${parts[1]}`:'';
};
const TabsDemo = ({ selectedMarker }) => {
  const [defaultText, setDefaultText] = useState('Select a marker to view details.');

  const handleMarkerSelect = (marker) => {
    if (marker) {
      setDefaultText('');
    } else {
      setDefaultText('Select a marker to view details.');
    }
  };

  
// Generate video URLs based on marker data
const visUrl = selectedMarker ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedMarker.event_id}/ABI/F16/VIS/${getGroupsPkPart(selectedMarker.groups_pk)}.mp4` : '';
const irUrl = selectedMarker ? `https://geos-stat1.s3.us-east-2.amazonaws.com/G16/thumb/${selectedMarker.event_id}/ABI/F16/IR/${getGroupsPkPart(selectedMarker.groups_pk)}.mp4`:'';
  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          <FiInfo className="TabIcon" />
          Info
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          <FiCamera className="TabIcon" />
          Cameras & Videos
        </Tabs.Trigger>
      </Tabs.List>
      <TabPanelContent value="tab1">
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
          <p>{defaultText}</p>
        )}
      </TabPanelContent>
      <TabPanelContent value="tab2">
      {selectedMarker && (
          <div>
            <h3>VIS Video</h3>
            <video width="100%" height="340" controls>
              <source src={visUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h3>IR Video</h3>
            <video width="100%" height="340" controls>
              <source src={irUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </TabPanelContent>
    </Tabs.Root>
  );
};

export default TabsDemo;