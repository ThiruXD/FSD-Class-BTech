import React, { useState } from 'react';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apikey = "58fe98c7e1dd6bf190f7e3d40dfb385d";

  const getWeather = () => {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data));
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      <hi>Search Weather Report: </hi>/*

      <input 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city"
      />

      <button onClick={getWeather}>Show Report</button>

      {weather && weather.cod === "404" && (
        <p style={{ color: "red" }}>City not found, Please contact my dad ThiruXD on github and telegram to solve this problem.</p>
      )}

      {weather && weather.weather && (
        <div style={{ marginTop: "10px" }}>
          <h3>Weather Report for {weather.name}, {weather.sys.country}</h3>
          <p><strong>Description:</strong> {weather.weather[0].description}</p>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Feels Like:</strong> {weather.main.feels_like} °C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Longitude:</strong> {weather.coord.lon} </p>
          <p><strong>Latitude:</strong> {weather.coord.lat} </p>
        </div>
      )}
    </div>
  );
}