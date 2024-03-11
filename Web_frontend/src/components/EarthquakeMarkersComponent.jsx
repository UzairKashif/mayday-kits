import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { db } from '../firebaseConfig';
import { TailSpin } from 'react-loader-spinner';

const EarthquakeMarkersComponent = ({ mapRef, onMarkerClick ,event}) => {
      const [earthquakeData, setEarthquakeData] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => 
      {
        const fetchEarthquakeData = async () => {
          setLoading(true);
          try {
            const querySnapshot = await db.collection("earthquakes").get();
            const earthquakes = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            setEarthquakeData(earthquakes);
          } catch (error) {
            console.error("Error fetching earthquake data from Firestore:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchEarthquakeData();
      },
      []);

  return (
      <>
        {earthquakeData.map((earthquake, index) => 
        (
          <Marker key={index} latitude={parseFloat(earthquake.geometry.coordinates[1])} longitude={parseFloat(earthquake.geometry.coordinates[0])}>
              <div onClick={() => onMarkerClick(earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0], earthquake)} style={{ cursor: 'pointer' }}>
                ⚠️
              </div>
          </Marker>
        )
        )}

        {
        loading && (
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
