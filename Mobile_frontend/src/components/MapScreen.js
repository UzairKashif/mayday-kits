import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from '../styles';
import { fetchMarkers } from '../api/api';


const MapScreen = () => {
  const [markers, setMarkers] = useState([]);
  const webViewRef = useRef(null);

  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const fetchedMarkers = await fetchMarkers();
        console.log('Fetched markers:', fetchedMarkers);
        setMarkers(fetchedMarkers);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    loadMarkers();
  }, []);

  const injectedJavaScript = `
    (function() {
      window.addMarkers(${JSON.stringify(markers)});
    })();
  `;


  
  return (
   // In MapScreen component
<View style={styles.container}>
  <WebView
    key={markers.length} // Add this line. It forces WebView to re-render when markers change.
    originWhitelist={['*']}
    source={require('../assets/html/mapbox.html')}
    style={styles.mapView}
    injectedJavaScript={injectedJavaScript}
    javaScriptEnabled={true}
    startInLoadingState={true}
    onLoadEnd={() => {
      webViewRef.current?.injectJavaScript(injectedJavaScript);
    }}
    ref={webViewRef}
    onError={(syntheticEvent) => {
      const { nativeEvent } = syntheticEvent;
      console.warn('WebView error: ', nativeEvent);
    }}
  />
</View>

  );
};



export default MapScreen;
