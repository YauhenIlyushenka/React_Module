import { useState } from 'react'
import './App.css'
import FetchFactButton from './components/fetch-fact-button/fetchFactButton';
import SuccessMessage from './components/error-handling/success/success-message';
import ErrorMessage from './components/error-handling/error/error-message';
import axios from 'axios';
import WeatherForecast from './components/weather-forecast/weatherForecast';

const App = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const fetchFact = async (): Promise<void> => {
    setError(null);
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      setFact(response.data.fact);
    }
    catch {
      setFact(null);
      setError('Something went wrong.');
    }
  };

  const fetchWeatherData = async (): Promise<void> => {
    setWeatherError(null);
    try {
      const response = await axios.get('http://localhost:4342/weatherforecast');
      setWeatherData(response.data);
    } catch {
      setWeatherError('Something went wrong while fetching weather data.');
    }
  };

  return (
    <div className="App">
      <FetchFactButton fetchFact={fetchFact} />
      <br/>
      {fact && <SuccessMessage fact={fact} />}
      {error && <ErrorMessage error={error} />}
      <br/>
      <button onClick={fetchWeatherData}>Load Weather Forecast</button>
      <WeatherForecast
        weatherData={weatherData}
        error={weatherError}
      />
    </div>
  );
};

export default App;
