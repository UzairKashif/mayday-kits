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
          <p>Latitude: {selectedMarker.lat}</p>
          <p>Longitude: {selectedMarker.lon}</p>
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