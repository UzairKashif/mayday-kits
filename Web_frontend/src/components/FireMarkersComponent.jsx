import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { TailSpin } from 'react-loader-spinner';

const FireMarkersComponent = ({ mapRef, onMarkerClick }) => {
  const [markersData, setMarkersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/fire-events');
        const data = await response.json();
        setMarkersData(data);
      } catch (error) {
        console.error('Error fetching marker data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {markersData.map((marker, index) => (
        <Marker
          key={index}
          latitude={parseFloat(marker.lat)}
          longitude={parseFloat(marker.lon)}
        >
          <div className="marker-container">
            <div className="simple-marker" />
            <div className="clickable-center" onClick={() => onMarkerClick(marker.lat, marker.lon)}>

              {/* Marker content */}
            </div>
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

export default FireMarkersComponent;
