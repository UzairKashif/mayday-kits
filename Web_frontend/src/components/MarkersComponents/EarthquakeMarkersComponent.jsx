import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { TailSpin } from 'react-loader-spinner';

const EarthquakeMarkersComponent = ({ mapRef, onMarkerClick }) => {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      setLoading(true);
      try {
        // Use the new URL for your local API endpoint
        const url = 'http://localhost:3000/api/earthquake-events';
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
    
        // Process the data assuming it is structured as provided in your example
        const earthquakes = data.map(item => ({
          ...item.data.properties, // properties contain the earthquake data
          id: item.data.id, // Using the item's id as the earthquake id
          latitude: item.data.geometry.coordinates[1],
          longitude: item.data.geometry.coordinates[0],
        }));
    
        setEarthquakeData(earthquakes);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEarthquakeData();
  }, []);
  
  
  return (
    <>
      {earthquakeData.map((earthquake, index) => (
        <Marker key={index} latitude={parseFloat(earthquake.latitude)} longitude={parseFloat(earthquake.longitude)}>
         <div onClick={() => onMarkerClick(earthquake.latitude, earthquake.longitude, { properties: {...earthquake}, type: 'earthquake' })} style={{ cursor: 'pointer' }}>

            ⚠️
          </div>
        </Marker>
      ))}

      {loading && (
        <div style={{ position: 'absolute', top: 12, right: 300, zIndex: 10 }}>
          <TailSpin
            color="#FF977D"
            height={30}
            width={30}
          />
        </div>
      )}
    </>
  );
};

export default EarthquakeMarkersComponent;
