/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store/store';
import { setFact, setError, setWeatherData, setWeatherError } from '../store/reducers'; // Импорт экшенов
import FetchFactButton from '../components/fetch-fact-button/fetchFactButton';
import SuccessMessage from '../components/error-handling/success/success-message';
import ErrorMessage from '../components/error-handling/error/error-message';
import WeatherForecast from '../components/weather-forecast/weatherForecast';
import JobNotifications from '../components/notificaction/jobNotificaction';

const HomePage = () => {
  const dispatch = useDispatch();

  const fact = useSelector((state: RootState) => state.app.fact);
  const error = useSelector((state: RootState) => state.app.error);
  const weatherData = useSelector((state: RootState) => state.app.weatherData);
  const weatherError = useSelector((state: RootState) => state.app.weatherError);

  const isSplitHost = true;

  const fetchFact = async (): Promise<void> => {
    dispatch(setError(null));
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      dispatch(setFact(response.data.fact));
    } catch {
      dispatch(setFact(null));
      dispatch(setError('Something went wrong.'));
    }
  };

  const deleteResource = async (): Promise<void> => {
    dispatch(setError(null));
    try {
      await axios.delete('http://localhost:8787/weatherforecast/delete-info');
    } catch {
      dispatch(setError('Something went wrong.'));
    }
  };

  const fetchWeatherData = async (): Promise<void> => {
    dispatch(setWeatherError(null));
    try {
      const response = await axios.get(isSplitHost ? 'http://localhost:8787/weatherforecast' : '/weatherforecast');
      dispatch(setWeatherData(response.data));
    } catch {
      dispatch(setWeatherError('Something went wrong while fetching weather data.'));
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <JobNotifications />
      <br />
      <FetchFactButton fetchFact={fetchFact} />
      <br />
      {fact && <SuccessMessage fact={fact} />}
      {error && <ErrorMessage error={error} />}
      <br />
      <button onClick={fetchWeatherData}>Load Weather Forecast</button>
      <WeatherForecast weatherData={weatherData} error={weatherError} />
      <br />
      <button onClick={deleteResource}>Delete Resource</button>
    </div>
  );
};

export default HomePage;