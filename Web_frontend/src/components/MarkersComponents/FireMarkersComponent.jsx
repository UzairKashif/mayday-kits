import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { TailSpin } from 'react-loader-spinner';
import fireActiveIcon from '../assets/weather_icons/fire_active.png';
import fireInactiveIcon from '../assets/weather_icons/fire_inactive.png';
import firePendingIcon from '../assets/weather_icons/fire_pending.png';

const FireMarkersComponent = ({ mapRef, onMarkerClick }) => {
      const [markersData, setMarkersData] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => 
          {
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
          },
          
          []);

  return (
    <>
          {
          markersData.map((marker, index) => 
          (
<Marker key={index} latitude={parseFloat(marker.lat)} longitude={parseFloat(marker.lon)}>
  <div className="marker-container" onClick={() => onMarkerClick(marker.lat, marker.lon, { ...marker, type: 'fire' })}>
    <img 
      src={
        marker.status.trim() === 'Active' ? fireActiveIcon :
        marker.status.trim() === 'Inactive' ? fireInactiveIcon :
        firePendingIcon
      }
      alt="Fire Status Icon"
      style={{
        width: '30px', // Adjust size as needed
        height: '30px' // Adjust size as needed
      }}
    />
  </div>
</Marker>
          ))
          }

          {
          loading && 
          (
            <div style={{ position: 'absolute', top: 12, right: 300, zIndex: 10 }}>
              <TailSpin
                color="#FF977D"
                height={30}
                width={30}
              />
            </div>
          )
          }
    </>
  );
};

export default FireMarkersComponent;
