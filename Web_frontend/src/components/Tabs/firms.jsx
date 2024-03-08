import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { csv } from 'd3-fetch';

const FireMap = ({ showURT, setShowURT, showNRT, setShowNRT, mapRef }) => {

  const addFireData = async () => {
    const fireData = await csv('https://firms.modaps.eosdis.nasa.gov/api/area/csv/c1c6f1030fea82cb719ada6b8ea41b75/VIIRS_SNPP_NRT/world/1');
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
          clusterMaxZoom: 14,
          clusterRadius: 50
        });
        map.addLayer({
          id: 'nrt-clusters',
          type: 'circle',
          source: 'nrt-data',
          filter: ['has', 'point_count'],
          paint: {
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
        // Additional layers for clusters can be added here as needed.
      }
    } else {
      if (map.getLayer('nrt-clusters')) {
        map.removeLayer('nrt-clusters');
        map.removeSource('nrt-data');
      }
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