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
        const response = await fetch('http://localhost:3000/api/earthquake-events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const rawData = await response.json();

        // Process the raw data to extract latitude and longitude
        const extractLatLongFromXML = (xmlString) => {
          const latMatch = xmlString.match(/<latitude><value>([-+]?[0-9]*\.?[0-9]+)<\/value><\/latitude>/);
          const longMatch = xmlString.match(/<longitude><value>([-+]?[0-9]*\.?[0-9]+)<\/value><\/longitude>/);
          
          if (latMatch && longMatch) {
            return {
              latitude: parseFloat(latMatch[1]),
              longitude: parseFloat(longMatch[1]),
            };
          }
          return null;
        };
        
        // Example usage within your fetch and map logic
        const processedData = rawData.map(item => {
          const coords = extractLatLongFromXML(item.data);
          if (coords) {
            return coords;
          } else {
            console.error('Could not extract coordinates from:', item);
            return null;
          }
        }).filter(item => item !== null);
        
        

        setEarthquakeData(processedData);
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
        <Marker key={index} latitude={earthquake.latitude} longitude={earthquake.longitude}>
        <div onClick={() => onMarkerClick({ ...earthquake, type: 'earthquake' })} style={{ cursor: 'pointer' }}>
            ⚠️
          </div>
      </Marker>
      
      ))}

      {loading && (
        <div style={{ position: 'absolute', top: 50, right: 50, zIndex: 10 }}>
          <TailSpin color="#FF977D" height={50} width={50} />
        </div>
      )}
    </>
  );
};

export default EarthquakeMarkersComponent;
