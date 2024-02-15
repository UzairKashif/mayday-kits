import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from '../styles';
import { fetchMarkers } from '../api/api'; // Ensure this path is correct

const MapScreen = () => {
  const [markerData, setMarkerData] = useState([]);

  useEffect(() => {
    const getMarkers = async () => {
      const markers = await fetchMarkers(); // Fetch markers from your backend
      setMarkerData(markers);
    };

    getMarkers();
  }, []);

  // Function to inject JavaScript code into the WebView
  const injectedJavaScript = `
    if (window.updateMapWithMarkers) {
      window.updateMapWithMarkers(${JSON.stringify(markerData)});
    }
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={require('../assets/html/mapbox.html')}
        style={styles.map}
        injectedJavaScript={injectedJavaScript} // Inject JavaScript to update map
        javaScriptEnabled={true} // Enable JavaScript in WebView
      />
    </View>
  );
};

export default MapScreen;
