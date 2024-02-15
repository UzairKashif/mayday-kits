import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

// Set your Mapbox access token
MapboxGL.setAccessToken('pk.eyJ1IjoibWF5ZGF5MjAyNCIsImEiOiJjbHNhYzJ1aDcwMjN6MnFvN3BsaXJ1cmxqIn0.oV41UjANbJWPSgHXko8ShQ');

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const MapScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://10.7.92.119:3000/api/fire-events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching fire events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[-74.5, 40]} // Adjust as needed
        />
        {events.map((event, index) => (
          <MapboxGL.PointAnnotation
            key={index}
            id={String(event.event_id)}
            coordinate={[parseFloat(event.lon), parseFloat(event.lat)]}
          />
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

export default MapScreen;
