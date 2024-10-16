import React, { useState } from 'react';
import axios from 'axios';
var img;
var iconurl;
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const API_KEY = 'e4c6a454dcb774d1f41209bc6fef887d';

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      console.log(response.data);

      var iconcode = weatherData.weather[0].icon;

      iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

   

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={getWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button type="submit">Check In</button>
        </form>
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <div className="temp">
              <img src='../high-temperature.png' width="100px" height="100px" alt={weatherData.main.temp} />
              <p>{weatherData.main.temp} °C</p>
            </div>
            <div className='weather-card'>
              {
                <img src={iconurl} width="100px" height="100px" alt={weatherData.weather[0].description} />
              }
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="weather-card">
              <img src='../cloud.png' width="100px" height="100px" alt={weatherData.main.humidity} />
              <p>{weatherData.main.humidity} %</p>
            </div>

            <div className="weather-card">
              <img src="../wind-turbine.png" width="100px" height="100px" alt={weatherData.wind.speed} />
              <p>{weatherData.wind.speed}</p>
            </div>
            
            <div className="weather-card">
              <img src="../barometer.png" width="100px" height="100px" alt={weatherData.main.pressure} />
              <p>{weatherData.main.pressure}</p>
            </div>                        

            <div className="weather-card">
              <img src="../sea-level.png" width="100px" height="100px" alt={weatherData.main.sea_level} />
              <p>{weatherData.main.sea_level}</p>
            </div>            
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

