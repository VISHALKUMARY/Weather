import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/Api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ current: {}, forecast: {} });

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City Name' />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {weather.current && weather.current.weather && (
        <div className="content">
          <div className="location d-flex">
            <MapPin />
            <h2>{weather.current.name} <span>({weather.current.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="" />
            <h3>{weather.current.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{weather.current.main.temp} <span>&deg;C</span></h1>
            <h3>Feels Like {weather.current.main.feels_like} <span>&deg;C</span></h3>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>Wind is {weather.current.wind.speed} Knots in {weather.current.wind.deg}&deg;</h3>
          </div>
        </div>
      )}

      {!weather.current.weather && (
        <div className="content">
          <h4>No Data found!</h4>
        </div>
      )}

      {weather.forecast && weather.forecast.list && (
        <div className="next-days-forecast">
          <h3>Next 3 Days Forecast</h3>
          <div className="forecast-cards d-flex">
            {[1, 2, 3].map((dayOffset) => {
              const targetDate = new Date();
              targetDate.setDate(targetDate.getDate() + dayOffset);
              const dateStr = targetDate.toISOString().split('T')[0];

              const forecastEntry = weather.forecast.list.find(item => item.dt_txt.startsWith(dateStr));

              return forecastEntry ? (
                <div className="forecast-card flex-c" key={dayOffset}>
                  <p><strong>{dateFormat(targetDate, "dddd")}</strong></p>
                  <img src={`https://openweathermap.org/img/wn/${forecastEntry.weather[0].icon}@2x.png`} alt="" />
                  <p>{forecastEntry.weather[0].description}</p>
                  <p>{forecastEntry.main.temp}&deg;C</p>
                </div>
              ) : (
                <div className="forecast-card flex-c" key={dayOffset}>
                  <p><strong>{dateFormat(targetDate, "dddd")}</strong></p>
                  <p>No Data</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

