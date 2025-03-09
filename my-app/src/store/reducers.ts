import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import WeatherForecast from '../components/weather-forecast/weatherForecast';

interface AppState {
  fact: string | null;
  error: string | null;
  weatherData: WeatherForecast[];
  weatherError: string | null;
}

const initialState: AppState = {
  fact: null,
  error: null,
  weatherData: [],
  weatherError: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFact(state, action: PayloadAction<string | null>) {
      state.fact = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setWeatherData(state, action: PayloadAction<WeatherForecast[]>) {
      state.weatherData = action.payload;
    },
    setWeatherError(state, action: PayloadAction<string | null>) {
      state.weatherError = action.payload;
    },
  },
});

export const { setFact, setError, setWeatherData, setWeatherError } = appSlice.actions;

export default appSlice.reducer;