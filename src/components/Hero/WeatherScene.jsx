/* ─────────────────────────────────────────────
   WeatherScene — Animated sky for each weather state
───────────────────────────────────────────── */
import React, { useMemo } from 'react';
import { WEATHER_STATES } from '../../utils/constants';
import { WEATHER_GRADIENTS } from '../../utils/weatherUtils';

/* ── Rain drops ── */
function RainLayer({ heavy = false }) {
  const drops = useMemo(() =>
    Array.from({ length: heavy ? 40 : 22 }, (_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      height:   `${Math.random() * 18 + 12}px`,
      delay:    `${Math.random() * 2}s`,
      duration: `${Math.random() * 0.6 + 0.5}s`,
      opacity:  Math.random() * 0.5 + 0.4,
    }))
  , [heavy]);

  return (
    <div className="rain-layer" aria-hidden="true">
      {drops.map(d => (
        <div
          key={d.id}
          className="raindrop"
          style={{
            left:             d.left,
            height:           d.height,
            animationDelay:   d.delay,
            animationDuration:d.duration,
            opacity:          d.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Clouds ── */
function CloudLayer({ opacity = 1 }) {
  return (
    <div className="cloud-layer" aria-hidden="true" style={{ opacity }}>
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
    </div>
  );
}

/* ── Sun ── */
function Sun() {
  return (
    <div className="sun-wrap" aria-hidden="true">
      <div className="sun-rays">
        {[0,1,2,3,4,5,6,7].map(i => (
          <div key={i} className="sun-ray" style={{ '--i': i }} />
        ))}
      </div>
      <div className="sun-circle" />
    </div>
  );
}

/* ── Lightning ── */
function LightningScene() {
  return (
    <>
      <div className="lightning-flash" aria-hidden="true" />
      <div className="lightning-bolt" aria-hidden="true">⚡</div>
    </>
  );
}

/* ── Stars ── */
function StarsLayer() {
  const stars = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      top:      `${Math.random() * 65}%`,
      left:     `${Math.random() * 100}%`,
      size:     `${Math.random() * 3 + 2}px`,
      delay:    `${Math.random() * 4}s`,
      duration: `${Math.random() * 2 + 2}s`,
    }))
  , []);

  return (
    <div className="stars-layer" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            top:              s.top,
            left:             s.left,
            width:            s.size,
            height:           s.size,
            animationDelay:   s.delay,
            animationDuration:s.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ── Snow ── */
function SnowLayer() {
  const flakes = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      delay:    `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 3}s`,
      size:     `${Math.random() * 8 + 6}px`,
    }))
  , []);

  return (
    <div className="rain-layer" aria-hidden="true">
      {flakes.map(f => (
        <div
          key={f.id}
          style={{
            position:         'absolute',
            top:              '-20px',
            left:             f.left,
            fontSize:         f.size,
            animationDelay:   f.delay,
            animationDuration:f.duration,
            animation:        `rain-fall ${f.duration} linear ${f.delay} infinite`,
          }}
        >❄</div>
      ))}
    </div>
  );
}

/* ── Fog ── */
function FogLayer() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(200,210,215,0.7) 0%, rgba(220,225,228,0.4) 100%)',
      pointerEvents: 'none',
    }} />
  );
}

/* ── Main Export ── */
export default function WeatherScene({ weatherState }) {
  const gradient = WEATHER_GRADIENTS[weatherState] ?? WEATHER_GRADIENTS[WEATHER_STATES.SUNNY];

  return (
    <div
      className="hero-sky"
      style={{ background: gradient }}
      aria-hidden="true"
    >
      {/* Clouds shown for cloudy, rainy, stormy */}
      {[WEATHER_STATES.CLOUDY, WEATHER_STATES.RAINY, WEATHER_STATES.STORMY].includes(weatherState) && (
        <CloudLayer opacity={weatherState === WEATHER_STATES.STORMY ? 0.9 : 0.75} />
      )}

      {/* Sun only for sunny */}
      {weatherState === WEATHER_STATES.SUNNY && <Sun />}

      {/* Rain for rainy + stormy */}
      {weatherState === WEATHER_STATES.RAINY  && <RainLayer />}
      {weatherState === WEATHER_STATES.STORMY && <RainLayer heavy />}

      {/* Lightning for stormy */}
      {weatherState === WEATHER_STATES.STORMY && <LightningScene />}

      {/* Stars + moon for night */}
      {weatherState === WEATHER_STATES.NIGHT  && (
        <>
          <StarsLayer />
          <div className="moon">🌙</div>
        </>
      )}

      {/* Fog overlay */}
      {weatherState === WEATHER_STATES.FOGGY && <FogLayer />}

      {/* Snow */}
      {weatherState === WEATHER_STATES.SNOWY && (
        <>
          <FogLayer />
          <SnowLayer />
        </>
      )}

      {/* Light clouds for foggy too */}
      {weatherState === WEATHER_STATES.FOGGY && <CloudLayer opacity={0.5} />}
    </div>
  );
}
