import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { csv } from 'd3-fetch';

const FireMap = ({ showURT, setShowURT, showNRT, setShowNRT, mapRef }) => {

  const addFireData = async () => {
    try {
      // Fetch the JSON data
      const response = await fetch('http://localhost:3000/api/firms-events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fireData = await response.json();

      // Process the data (filtering and creating GeoJSON) exactly as before
      const urtData = fireData.filter(d => d.version === '2.0URT');
      const nrtData = fireData.filter(d => d.version === '2.0NRT');

      const createGeoJSON = (data) => ({
        type: 'FeatureCollection',
        features: data.map(d => ({
          type: 'Feature',
          properties: {
            title: `Fire at ${d.latitude}, ${d.longitude}`,
            brightness: d.bright_ti4,
            version: d.version
          },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(d.longitude), parseFloat(d.latitude)]
          }
        }))
      });

    const map = mapRef.current.getMap();

    if (showURT) {
      const urtGeoJSON = createGeoJSON(urtData);
      if (map.getSource('urt-data')) {
        map.getSource('urt-data').setData(urtGeoJSON);
      } else {
        map.addSource('urt-data', {
          type: 'geojson',
          data: urtGeoJSON,
        });
        map.addLayer({
          id: 'urt-points',
          type: 'circle',
          source: 'urt-data',
          paint: {
            'circle-color': '#ff7b00',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });
      }
    } else {
      if (map.getLayer('urt-points')) {
        map.removeLayer('urt-points');
        map.removeSource('urt-data');
      }
    }

    if (showNRT) {
        const nrtGeoJSON = createGeoJSON(nrtData);
        if (map.getSource('nrt-data')) {
          map.getSource('nrt-data').setData(nrtGeoJSON);
        } else {
          map.addSource('nrt-data', {
            type: 'geojson',
            data: nrtGeoJSON,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50    // Radius of each cluster when clustering points
          });
    
          // Add a layer for the clusters
          map.addLayer({
            id: 'nrt-clusters',
            type: 'circle',
            source: 'nrt-data',
            filter: ['has', 'point_count'],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
              ]
            }
          });
    
          // Add a layer for the cluster counts
          map.addLayer({
            id: 'nrt-cluster-count',
            type: 'symbol',
            source: 'nrt-data',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}', // This will display the number of points in the cluster
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
            }
          });
    
          // Add a layer for the unclustered points
          map.addLayer({
            id: 'nrt-unclustered-point',
            type: 'circle',
            source: 'nrt-data',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#11b4da',
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
            }
          });
        }
      } else {
      if (map.getLayer('nrt-clusters')) {
        map.removeLayer('nrt-clusters');
        map.removeSource('nrt-data');
      }
    }
  } catch (error) {
    console.error("Failed to fetch fire data:", error);
  }
  };

  useEffect(() => {
    if (mapRef && mapRef.current && mapRef.current.getMap) {
      addFireData();
    }
  }, [showURT, showNRT, mapRef]);

  return null; // No need to return any JSX as this component only manages map layers.
};

export default FireMap;
