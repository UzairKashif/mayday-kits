export const fetchMarkers = async () => {
  try {
    const response = await fetch('http://10.7.186.183:3000/api/fire-events');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching markers:', error);
    return []; // Return an empty array in case of an error
  }
};

