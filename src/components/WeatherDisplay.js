import React, { useState } from 'react';
import '../WeatherDisplay.css';

const majorCities = [
  'Chennai',
  'Mumbai',
  'Delhi',
  'Kolkata',
  'Bangalore',
  'Hyderabad',
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'San Francisco',
];

function WeatherDisplay() {
  const [weather, setWeather] = useState({});
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [customCity, setCustomCity] = useState('');

  const fetchWeatherData = () => {
    const cityToFetch = customCity.trim() || selectedCity.trim();

    if (!cityToFetch) {
      alert('Please select or enter a city.');
      return;
    }

    fetch(`http://api.weatherapi.com/v1/current.json?key=696ffdbd25474f99a3d163912231811&aqi=no&q=${cityToFetch}`)
      .then((data) => data.json())
      .then((result) => setWeather(result))
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        alert('Unable to fetch weather data. Please try again later.');
      });
  };

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCity(selectedValue);
    setCustomCity(selectedValue); // Set the customCity to the selected value
  };

  const handleInputChange = (e) => {
    setCustomCity(e.target.value);
  };

  const handleButtonClick = () => {
    fetchWeatherData();
  };

  if (!weather || !weather.location || !weather.current) {
    return (
      <div className="WeatherDisplayContainer">
        <h2>Weather Hub</h2>
        <select name='cityDropdown' value={selectedCity} onChange={handleCityChange}>
          {majorCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type='text'
          name='customCityInput'
          placeholder='Enter custom city...'
          value={customCity}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Get Weather</button>
      </div>
    );
  }

  const { name } = weather.location;
  const { temp_c, condition } = weather.current;
  const conditionText = condition.text;

  return (
    <div className="WeatherDisplayContainer">
      <h2>Weather Hub</h2>
      <select name='cityDropdown' value={selectedCity} onChange={handleCityChange}>
        {majorCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <input
        type='text'
        name='customCityInput'
        placeholder='Enter custom city...'
        value={customCity}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Get Weather</button>
      <div className="weatherInfo">
        <p className="location">Location: {name}</p>
        <p className="temperature">Temperature: {temp_c}°C</p>
        <p className="weatherCondition">Weather: {conditionText}</p>
      </div>
    </div>
  );
}

export default WeatherDisplay;
