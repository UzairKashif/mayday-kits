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
        // Example URL with query parameters for the USGS earthquake data API
        // Adjust the query parameters as needed for your use case
        const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
        url.search = new URLSearchParams({
          format: 'geojson',
    starttime: '2024-01-01',
    endtime: '2024-02-02',
    minmagnitude: '3',
        });
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        // Assuming data is in GeoJSON format, features is an array of earthquake events
        const earthquakes = data.features.map(feature => ({
          ...feature.properties, // properties contain the earthquake data
          id: feature.id, // Using the feature's id as the earthquake id
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
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
