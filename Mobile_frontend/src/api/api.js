export const fetchMarkers = async () => {
  try {
    const response = await fetch('http://192.168.43.139:3000/api/fire-events'); // or the appropriate IP
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching markers:', error);
  }
}; 