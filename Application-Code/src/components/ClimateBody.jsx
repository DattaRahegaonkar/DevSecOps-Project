import React, { useState } from "react";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";

// the app is running well 

const ClimateBody = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setError(null);
    if (city) {
      try {
        let data = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        );

        if (!data.ok) {
          throw new Error("Please enter a valid city!");
        }

        data = await data.json();
        setWeatherData(data);
        setError(null);
        setCity("");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="m-1 3xl:w-[100%] flex justify-center flex-col items-center bg-gradient-to-b from-[#00feba] to-[#5b548a] p-6 rounded-2xl">
      <form onSubmit={handleSubmit}>
        <input
          className="outline-none h-10 bg-white rounded-full pl-4 mr-4 pb-1"
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter Your City"
        />
        <button
          type="submit"
          className="p-2 rounded-full pl-3 pr-3 outline-none bg-white"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {error && <h1 className="mt-4 text-red-600">{error}</h1>}

      {weatherData && (
        <div className="mt-6 flex justify-center items-center flex-col">
          <img
            className="w-20"
            src={weatherData.current.condition.icon}
            alt="Weather Icon"
          />
          <p className="mb-6">{weatherData.current.condition.text}</p>
          <h1 className="text-6xl mb-2 font-bold">
            {weatherData.current.temp_c}°C
          </h1>
          <h1 className="text-4xl mb-1.5 font-bold">
            {weatherData.location.name}
          </h1>
          <h1 className="text-1xl font-bold">{weatherData.location.region}</h1>
        </div>
      )}

      {weatherData && (
        <div className="flex justify-center items-center mt-15">
          <div className="flex justify-center items-center mr-8">
            <img className="mr-2 w-12" src={humidityIcon} alt="Humidity Icon" />
            <div>
              <h1>{weatherData.current.humidity}%</h1>
              <p>Humidity</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img className="mr-2 w-12" src={windIcon} alt="Wind Icon" />
            <div>
              <h1>{weatherData.current.wind_kph} Km/h</h1>
              <p>Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClimateBody;
