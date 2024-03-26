import React, { useEffect } from 'react';
import './WindyMap.css';


// Rest of your component code

const WindyMap = () => {
    useEffect(() => {
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback || null;
          document.head.appendChild(script);
        };
      
        // Load Leaflet 1.4.x first
        loadScript('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js', () => {
          // Then load Windy API
          loadScript('https://api.windy.com/assets/map-forecast/libBoot.js', () => {
            // Ensure the global windyInit function exists
            if (typeof window.windyInit === 'function') {
              // Now it's safe to call windyInit
            }
          });
        });
      }, []);

      
  useEffect(() => {
    // Function to dynamically load the Windy API script
    const loadWindyAPI = (callback) => {
      const script = document.createElement('script');
      script.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
      script.async = true;
      script.onload = () => callback();
      document.body.appendChild(script);
    };

    const options = {
      key: 'WZCvppLEHeQeg7s3i8LVoc2gdkfeGcyY', // Replace with your API key
      lat: 50.4,
      lon: 14.3,
      zoom: 5,
    };

    // Call the function with the windyInit callback
    loadWindyAPI(() => {
      // Ensure that the windyInit function is available on the window object
      if (typeof window.windyInit === 'function') {
        window.windyInit(options, windyAPI => {
          const { map } = windyAPI;
          // Now you can safely use the Windy API
         
        });
      }
    });
  }, []);

  return <div id="windy" className="windy-map"></div>;
};

export default WindyMap;
