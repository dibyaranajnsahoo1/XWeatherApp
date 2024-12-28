import React, { useState } from "react";
import "./weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null); 

    try {
      const key = "2b2ca9ef3ab54dc6be795245242412";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            borderRadius: "5px",
            width: "200px",
            height: "25px",
            padding: "5px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            borderRadius: "5px",
            width: "90px",
            height: "30px",
            background: "#39ac39",
            color: "white",
            border: "none",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && weather.current && (
        <div
          className="weather-cards"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          <div className="weather-card">
            <p>Temperature:</p>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity:</p>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition:</p>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed:</p>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
