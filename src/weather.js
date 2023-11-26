import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city, eventName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '7d2544616f9958c7981d7ae5916cec87';

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [city, API_KEY]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div style={{ fontSize: '10px', textAlign: 'center' }}>
      <p style={{ marginBottom: '10px' }}>{eventName}</p>
      {weatherData ? (
        <div>
          <h2 style={{ fontSize: '14px', margin: '5px 0' }}>{weatherData.name}</h2>
          <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="Weather Icon" style={{ width: '32px' }} />
          <p style={{ margin: '5px 0' }}>Temperatura: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p style={{ margin: '5px 0' }}>Descrição: {weatherData.weather[0].description}</p>
          <p style={{ margin: '5px 0' }}>Check-In: 14:45, Check-Out previsto: 22:00</p>
        </div>
      ) : (
        <p>Carregando informações de Tempo {city}...</p>
      )}
    </div>
  );
};

export default Weather;
