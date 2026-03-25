/* ─────────────────────────────────────────────
   Hook: useWeather — fetch + cache weather data
───────────────────────────────────────────── */
import { useState, useEffect, useCallback } from 'react';
import {
  WEATHER_API_KEY, WEATHER_BASE_URL,
  STORAGE_KEYS, CACHE_TTL_MS, WEATHER_STATES,
} from '../utils/constants';
import { getWeatherState, getMockWeather, kelvinToCelsius } from '../utils/weatherUtils';

const DEMO_MODE = WEATHER_API_KEY === 'YOUR_OPENWEATHER_API_KEY';

export function useWeather(location) {
  const [weather, setWeather] = useState({
    temp: 24, humidity: 68, windSpeed: 12,
    description: 'Partly Cloudy', weatherState: WEATHER_STATES.CLOUDY,
    isLoading: true, isMock: false,
  });

  const fetchWeather = useCallback(async (lat, lon) => {
    /* Check cache */
    try {
      const raw    = localStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
      const cached = raw ? JSON.parse(raw) : null;
      const cacheTs = Number(localStorage.getItem(STORAGE_KEYS.CACHE_TIME) ?? 0);
      if (cached && Date.now() - cacheTs < CACHE_TTL_MS) {
        setWeather({ ...cached, isLoading: false });
        return;
      }
    } catch { /* ignore */ }

    /* Demo/offline mode — use mock data */
    if (DEMO_MODE || !navigator.onLine) {
      const hour = new Date().getHours();
      const state = hour >= 20 || hour < 6
        ? WEATHER_STATES.NIGHT
        : [WEATHER_STATES.SUNNY, WEATHER_STATES.CLOUDY, WEATHER_STATES.RAINY][Math.floor(Math.random() * 3)];
      const mock = getMockWeather(state);
      setWeather(mock);
      return;
    }

    try {
      const url = `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
      const res  = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const hour = new Date().getHours();
      const isNight = hour >= 20 || hour < 6;
      const weatherState = getWeatherState(data.weather[0].id, isNight);

      const result = {
        temp:        kelvinToCelsius(data.main.temp),
        humidity:    data.main.humidity,
        windSpeed:   Math.round(data.wind.speed * 3.6), // m/s → km/h
        description: data.weather[0].description,
        weatherState,
        isLoading:   false,
        isMock:      false,
      };

      setWeather(result);
      localStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, JSON.stringify(result));
      localStorage.setItem(STORAGE_KEYS.CACHE_TIME, String(Date.now()));
    } catch {
      /* Fallback to mock */
      setWeather(getMockWeather(WEATHER_STATES.CLOUDY));
    }
  }, []);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location, fetchWeather]);

  return { weather, refetch: () => fetchWeather(location?.lat, location?.lon) };
}
