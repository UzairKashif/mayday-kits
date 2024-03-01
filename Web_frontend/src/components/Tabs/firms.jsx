import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { csv } from 'd3-fetch';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoidXphaXJrYXNoaWYyNyIsImEiOiJjbHE4ODIzbGEweTFwMmlwN202dm54ZjE2In0.oDy-gfip7DW2p8YoPowFeQ';

const FireMap = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Initialize map
        const mapInstance = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/uzairkashif27/clqajsq7p007i01pj841ncdd7', // Use your own Mapbox style URL
            center: [0, 0], // Adjust the initial map center as needed
            zoom: 2 // Adjust the initial zoom level as needed
        });

        mapInstance.on('load', () => {
            setMap(mapInstance);
            addFireData(mapInstance); // Call addFireData here, passing the map instance
        });

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    const addFireData = async (map) => {
        if (!map) return;

        // Fetch FIRMS fire data
        const fireData = await csv('https://firms.modaps.eosdis.nasa.gov/api/area/csv/c1c6f1030fea82cb719ada6b8ea41b75/VIIRS_SNPP_NRT/world/1');

        // Check if the source 'data' already exists, and add it if not
        if (!map.getSource('data')) {
            map.addSource('data', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'data',
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

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'data',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'data',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });
        }

        // Convert fire data to GeoJSON and update the 'data' source
        const geojsonData = {
            type: 'FeatureCollection',
            features: fireData.map(d => ({
                type: 'Feature',
                properties: { title: `Fire at ${d.latitude}, ${d.longitude}`, brightness: d.bright_ti4 },
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(d.longitude), parseFloat(d.latitude)]
                }
            }))
        };
        map.getSource('data').setData(geojsonData);
    };

    return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default FireMap;
