import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FiInfo, FiCamera } from 'react-icons/fi';
import './styles.css';

const TabPanelContent = ({ value, children }) => (
  <Tabs.Content className="TabsContent" value={value}>
    {children}
  </Tabs.Content>
);

const TabsDemo = ({ selectedMarker }) => (
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
      {selectedMarker && (
        <div>
          <h3>Event ID: {selectedMarker.event_id}</h3>
          <p> <b>Latitude:</b> {selectedMarker.lat}</p>
          <p><b>Longitude:</b> {selectedMarker.lon}</p>
          <p> <b>Height:</b> {selectedMarker.height}</p>
          <p><b>Status:</b> {selectedMarker.status}</p>
          <p><b>Update flag:</b> {selectedMarker.update_flag}</p>
          <p><b>Event start since:</b> {selectedMarker.event_start_since}</p>
          <p><b>Event last seen:</b> {selectedMarker.event_last_seen}</p>
          
          {/* Add more information or interactive elements here as needed */}
        </div>
      )}
    </TabPanelContent>
    <TabPanelContent value="tab2">
      {/* Tab 2 content */}
    </TabPanelContent>
  </Tabs.Root>
);

export default TabsDemo;