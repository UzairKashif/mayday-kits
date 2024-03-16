import { useState, useCallback } from 'react';

export const useMarkerClickHandler = (mapRef) => {
  const [initialViewState, setInitialViewState] = useState(null);

  const handleMarkerClick = useCallback((marker) => {
    const mapInstance = mapRef.current.getMap();

    if (!initialViewState) {
      setInitialViewState({
        longitude: mapInstance.getCenter().lng,
        latitude: mapInstance.getCenter().lat,
        zoom: mapInstance.getZoom(),
      });
    }

    mapInstance.flyTo({
      center: [parseFloat(marker.lon), parseFloat(marker.lat)],
      zoom: 14,
    });
  }, [mapRef, initialViewState]);

  const handleMapClick = useCallback(() => {
    if (initialViewState && mapRef.current) {
      const mapInstance = mapRef.current.getMap();
      mapInstance.flyTo({
        ...initialViewState,
        zoom: initialViewState.zoom,
      });
      setInitialViewState(null); // Optional: Clear initial view state after resetting
    }
  }, [mapRef, initialViewState]);

  return { handleMarkerClick, handleMapClick };
};
