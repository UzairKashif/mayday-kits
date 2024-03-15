import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const FireMap = ({ mapRef }) => {
  const zoomSwitchLevel = 9; // Define the zoom level for switching between clusters and individual points

  const addFireData = async () => {
    // Fetching data from the local API
    const response = await fetch('http://localhost:3000/api/firms-events');
    const fireData = await response.json(); // Assuming the response is JSON

    // Creating GeoJSON directly from the API response
    const geojsonData = {
      type: 'FeatureCollection',
      features: fireData.map(d => ({
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
    };

    const map = mapRef.current.getMap();

    if (!map.getSource('fire-data')) {
      map.addSource('fire-data', {
        type: 'geojson',
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: zoomSwitchLevel - 1,
        clusterRadius: 50
      });

      map.addLayer({
        id: 'fire-clusters',
        type: 'circle',
        source: 'fire-data',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#CC4E00',
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

      map.addLayer({
        id: 'fire-cluster-count',
        type: 'symbol',
        source: 'fire-data',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.addLayer({
        id: 'fire-unclustered-point',
        type: 'circle',
        source: 'fire-data',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#FFDC00',
          'circle-radius': 7,
        },
        layout: {
          'visibility': 'none',
        },
      });
    } else {
      map.getSource('fire-data').setData(geojsonData);
    }

    map.on('zoom', () => {
      const currentZoom = map.getZoom();
      if (currentZoom > zoomSwitchLevel) {
        map.setLayoutProperty('fire-unclustered-point', 'visibility', 'visible');
        map.setLayoutProperty('fire-clusters', 'visibility', 'none');
        map.setLayoutProperty('fire-cluster-count', 'visibility', 'none');
      } else {
        map.setLayoutProperty('fire-unclustered-point', 'visibility', 'none');
        map.setLayoutProperty('fire-clusters', 'visibility', 'visible');
        map.setLayoutProperty('fire-cluster-count', 'visibility', 'visible');
      }
    });
  };

  useEffect(() => {
    if (mapRef && mapRef.current && mapRef.current.getMap) {
      addFireData();
    }
  }, [mapRef]);

  return null; // No need to return any JSX as this component only manages map layers.
};

export default FireMap;
