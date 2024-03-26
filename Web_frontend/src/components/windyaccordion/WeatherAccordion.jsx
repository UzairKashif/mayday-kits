
const WeatherAccordion = ({ isOpen, setIsOpen, weatherData }) => {
    if (!isOpen) {
      return <button onClick={() => setIsOpen(true)}>Show Weather Details</button>;
    }
    return (
      <div>
        <button onClick={() => setIsOpen(false)}>Hide Weather Details</button>
        <div>Wind: {weatherData.wind}</div>
        <div>Temperature: {weatherData.temperature}</div>
        {/* Add more weather details as needed */}
      </div>
    );
  };
  export default WeatherAccordion;