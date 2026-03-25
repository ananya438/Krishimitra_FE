/* ─────────────────────────────────────────────
   Hero — Main weather experience section
───────────────────────────────────────────── */
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLocation } from '../../hooks/useLocation';
import { useWeather } from '../../hooks/useWeather';
import { WEATHER_DISPLAY, WEATHER_ADVICE } from '../../utils/weatherUtils';
import { GREETINGS, TAGLINES } from '../../data/languages';
import WeatherScene from './WeatherScene';
import GrassFooter from './GrassFooter';
import './Hero.css';

export default function Hero() {
  const { language } = useApp();
  const { location, loading: locLoading } = useLocation();
  const { weather } = useWeather(location);

  const langId    = language?.id ?? 'en';
  const isHindi   = langId === 'hi';
  const greeting  = GREETINGS[langId]  ?? GREETINGS.en;
  const tagline   = TAGLINES[langId]   ?? TAGLINES.en;
  const wxDisplay = WEATHER_DISPLAY[weather.weatherState];
  const advice    = WEATHER_ADVICE[weather.weatherState];

  return (
    <section className="hero" aria-label="Weather and farm overview">
      {/* Animated sky background */}
      <WeatherScene weatherState={weather.weatherState} />

      {/* Center content */}
      <div className="hero-content">
        {/* Greeting badge */}
        <div className="hero-badge">
          <span>{wxDisplay?.emoji ?? '🌾'}</span>
          <span>{greeting}, Farmer!</span>
        </div>

        {/* App title */}
        <h1 className="hero-title">
          KrishiMitra
          <br />
          <span style={{ fontSize: '0.65em', fontWeight: 400 }}>{tagline}</span>
        </h1>

        {/* Location */}
        {!locLoading && location && (
          <div className="hero-location">
            <span>📍</span>
            <span>{location.city}, {location.state}</span>
          </div>
        )}

        {/* Weather stats chips */}
        <div className="hero-stats">
          {weather.isLoading ? (
            <>
              <div className="skeleton" style={{ width: 80, height: 36 }} />
              <div className="skeleton" style={{ width: 90, height: 36 }} />
              <div className="skeleton" style={{ width: 80, height: 36 }} />
            </>
          ) : (
            <>
              <div className="hero-stat-chip">
                🌡️ {weather.temp}°C
              </div>
              <div className="hero-stat-chip">
                💧 {weather.humidity}%
              </div>
              <div className="hero-stat-chip">
                🌬️ {weather.windSpeed} km/h
              </div>
              <div className="hero-stat-chip">
                {wxDisplay?.emoji} {isHindi ? wxDisplay?.labelHi : wxDisplay?.label}
              </div>
            </>
          )}
        </div>

        {/* Farming advice */}
        {!weather.isLoading && advice && (
          <p className="hero-advice">
            💡 {isHindi ? advice.hi : advice.en}
          </p>
        )}
      </div>

      {/* Grass + soil bar */}
      <GrassFooter humidity={weather.humidity} />
    </section>
  );
}
