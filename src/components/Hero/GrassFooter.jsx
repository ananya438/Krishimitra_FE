/* ─────────────────────────────────────────────
   GrassFooter — Wavy animated grass + soil bar
   Grows on scroll, then becomes static
───────────────────────────────────────────── */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { getSoilByState } from '../../utils/soilData';

/* Individual hand-drawn style grass blade as SVG path */
function GrassBlade({ x, height, swayClass, color = '#5a7a30', delay = '0s' }) {
  const mid = x + 6;
  const tip = x + (Math.random() > 0.5 ? 4 : -4);

  return (
    <path
      className={swayClass}
      d={`M${x},90 C${x},${90 - height * 0.4} ${mid},${90 - height * 0.7} ${tip},${90 - height}`}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      style={{
        transformOrigin: `${x}px 90px`,
        animationDelay: delay,
      }}
    />
  );
}

export default function GrassFooter() {
  const { location } = useApp();
  const [grassScale, setGrassScale] = useState(1);
  const [isGrown, setIsGrown]       = useState(false);
  const heroRef     = useRef(null);
  const ticking     = useRef(false);
  const maxGrown    = useRef(false);

  const soil = getSoilByState(location?.state ?? '');

  /* Scroll handler — grass grows upward until limit */
  const handleScroll = useCallback(() => {
    if (maxGrown.current) return;
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const grow = Math.min(1 + scrollY / 160, 1.55); // max 155% height
        setGrassScale(grow);
        if (grow >= 1.55) {
          setIsGrown(true);
          maxGrown.current = true;
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Hand-crafted blade positions for a natural look */
  const blades = [
    { x: 10,  h: 38, delay: '0.0s',  color: '#4a6e28' },
    { x: 22,  h: 52, delay: '0.3s',  color: '#5c8032' },
    { x: 34,  h: 42, delay: '0.7s',  color: '#6b9038' },
    { x: 44,  h: 58, delay: '0.15s', color: '#4a6e28' },
    { x: 56,  h: 36, delay: '0.55s', color: '#5c8032' },
    { x: 67,  h: 50, delay: '0.9s',  color: '#6b9038' },
    { x: 79,  h: 44, delay: '0.25s', color: '#4a6e28' },
    { x: 90,  h: 56, delay: '0.65s', color: '#5c8032' },
    { x: 102, h: 38, delay: '0.05s', color: '#6b9038' },
    { x: 113, h: 48, delay: '0.45s', color: '#4a6e28' },
    { x: 124, h: 42, delay: '0.85s', color: '#5c8032' },
    { x: 136, h: 60, delay: '0.35s', color: '#6b9038' },
    { x: 148, h: 40, delay: '0.75s', color: '#4a6e28' },
    { x: 159, h: 52, delay: '0.2s',  color: '#5c8032' },
    { x: 170, h: 44, delay: '0.6s',  color: '#6b9038' },
    { x: 182, h: 56, delay: '0.1s',  color: '#4a6e28' },
    { x: 193, h: 38, delay: '0.5s',  color: '#5c8032' },
    { x: 205, h: 50, delay: '0.95s', color: '#6b9038' },
    { x: 216, h: 46, delay: '0.4s',  color: '#4a6e28' },
    { x: 228, h: 58, delay: '0.8s',  color: '#5c8032' },
    { x: 240, h: 36, delay: '0.0s',  color: '#6b9038' },
    { x: 251, h: 54, delay: '0.35s', color: '#4a6e28' },
    { x: 263, h: 42, delay: '0.7s',  color: '#5c8032' },
    { x: 275, h: 60, delay: '0.15s', color: '#6b9038' },
    { x: 286, h: 40, delay: '0.55s', color: '#4a6e28' },
    { x: 298, h: 50, delay: '0.9s',  color: '#5c8032' },
    { x: 310, h: 44, delay: '0.25s', color: '#6b9038' },
    { x: 322, h: 56, delay: '0.65s', color: '#4a6e28' },
    { x: 333, h: 38, delay: '0.05s', color: '#5c8032' },
    { x: 345, h: 52, delay: '0.45s', color: '#6b9038' },
    { x: 357, h: 46, delay: '0.85s', color: '#4a6e28' },
    { x: 369, h: 58, delay: '0.3s',  color: '#5c8032' },
    { x: 380, h: 40, delay: '0.75s', color: '#6b9038' },
    { x: 392, h: 54, delay: '0.2s',  color: '#4a6e28' },
    { x: 404, h: 42, delay: '0.6s',  color: '#5c8032' },
    { x: 416, h: 60, delay: '0.95s', color: '#6b9038' },
    { x: 428, h: 36, delay: '0.4s',  color: '#4a6e28' },
    { x: 440, h: 50, delay: '0.8s',  color: '#5c8032' },
    { x: 452, h: 44, delay: '0.1s',  color: '#6b9038' },
    { x: 464, h: 58, delay: '0.5s',  color: '#4a6e28' },
    { x: 476, h: 38, delay: '0.25s', color: '#5c8032' },
  ];

  return (
    <div className="hero-footer" ref={heroRef}>
      {/* SVG Grass */}
      <div className="grass-container">
        <svg
          viewBox="0 0 490 90"
          xmlns="http://www.w3.org/2000/svg"
          className="grass-svg"
          style={{
            transform: `scaleY(${grassScale})`,
            transformOrigin: 'bottom center',
            transition: isGrown ? 'none' : 'transform 0.1s ease-out',
          }}
          aria-hidden="true"
        >
          {/* Ground fill */}
          <rect x="0" y="80" width="490" height="10" fill="#6b7a3e" />

          {/* Hill shapes for depth */}
          <path
            d="M0,75 Q60,55 120,68 Q180,80 240,60 Q300,42 360,62 Q420,78 490,65 L490,90 L0,90 Z"
            fill="#5a6e30"
            opacity="0.6"
          />

          {/* Grass blades */}
          {blades.map((b, i) => (
            <GrassBlade
              key={i}
              x={b.x}
              height={b.h}
              color={b.color}
              delay={b.delay}
              swayClass={isGrown
                ? ''  /* static once grown */
                : (i % 2 === 0 ? 'grass-blade-sway' : 'grass-blade-sway-alt')
              }
            />
          ))}

          {/* Wildflowers scattered */}
          {[45, 110, 195, 268, 340, 415].map((fx, i) => (
            <g key={i}>
              <circle cx={fx} cy={72} r="4" fill={i % 2 === 0 ? '#F0A830' : '#E85D75'} stroke="#2C2416" strokeWidth="1" />
              <circle cx={fx} cy={72} r="1.5" fill="white" />
            </g>
          ))}
        </svg>

        {/* Inline CSS for grass sway animations */}
        <style>{`
          .grass-blade-sway {
            animation: grass-sway 3s ease-in-out infinite;
          }
          .grass-blade-sway-alt {
            animation: grass-sway-alt 3.5s ease-in-out infinite;
          }
          @keyframes grass-sway {
            0%,100% { transform: rotate(0deg); }
            25%     { transform: rotate(4deg); }
            75%     { transform: rotate(-3deg); }
          }
          @keyframes grass-sway-alt {
            0%,100% { transform: rotate(0deg); }
            30%     { transform: rotate(-4deg); }
            70%     { transform: rotate(3deg); }
          }
        `}</style>
      </div>

      {/* Soil data bar */}
      <div className="soil-bar">
        <div className="soil-stat">
          <span className="soil-stat-icon">💧</span>
          <span>Humidity: <strong>{68}%</strong></span>
        </div>
        <div className="soil-stat">
          <span className="soil-stat-icon">🌍</span>
          <span>Soil: <strong>{soil.type}</strong></span>
        </div>
        <div className="soil-stat">
          <span className="soil-stat-icon">⚗️</span>
          <span>pH: <strong>{soil.ph}</strong></span>
        </div>
        <div className="soil-stat">
          <span className="soil-stat-icon">🌿</span>
          <span>Organic: <strong>{soil.organic}</strong></span>
        </div>
      </div>
    </div>
  );
}
