export const fetchMarkers = async () => {
  try {
    const response = await fetch('http://10.0.2.2:3000/api/events'); // or the appropriate IP
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching markers:', error);
  }
};
