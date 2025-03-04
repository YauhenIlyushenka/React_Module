import ErrorMessage from '../error-handling/error/error-message';
import './weatherForecast.css'


interface WeatherForecastProps {
  weatherData: WeatherForecast[];
  error: string | null;
}

interface WeatherForecast {
    date: string;
    temperatureC: number;
    summary: string;
}

const WeatherForecast = ({ weatherData, error }: WeatherForecastProps) => {
  return (
    <div>
      {error && <ErrorMessage error={error} />}
      <div className="weather-list">
        {weatherData.length > 0 
        ? (
          weatherData.map((forecast, index) => (
            <div key={index} className="weather-item">
              <p>Date: {forecast.date}</p>
              <p>Temperature: {forecast.temperatureC}°C</p>
              <p>Summary: {forecast.summary}</p>
            </div>
          )))
        : (
            <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;