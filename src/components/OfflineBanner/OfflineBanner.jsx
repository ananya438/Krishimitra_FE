/* ─────────────────────────────────────────────
   OfflineBanner — Shows when no internet connection
───────────────────────────────────────────── */
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

const styles = {
  banner: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 800,
    background: '#2C2416',
    color: '#F5F0E8',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: "'Comic Neue', cursive",
    fontSize: '13px',
    fontWeight: 700,
    borderBottom: '2px solid #8B7D65',
    animation: 'slide-down 0.4s ease both',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#F0A830',
    animation: 'pulse-dot 1.5s ease-in-out infinite',
    flexShrink: 0,
  },
  chip: {
    background: 'rgba(240,168,48,0.18)',
    border: '1px solid #F0A830',
    borderRadius: '8px',
    padding: '2px 8px',
    fontSize: '11px',
    color: '#F0A830',
  },
};

const css = `
  @keyframes slide-down {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.5); opacity: 0.5; }
  }
`;

export default function OfflineBanner() {
  const { isOnline, language } = useApp();
  const [show, setShow] = useState(false);
  const isHindi = language?.id === 'hi';

  useEffect(() => {
    if (!isOnline) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isOnline]);

  if (!show) return null;

  return (
    <>
      <style>{css}</style>
      <div style={styles.banner} role="alert" aria-live="polite">
        <div style={styles.dot} aria-hidden="true" />
        <span>
          {isOnline
            ? (isHindi ? '✅ वापस ऑनलाइन!' : '✅ Back online!')
            : (isHindi ? '📡 ऑफलाइन मोड — कैश्ड डेटा दिख रहा है' : '📡 Offline Mode — showing cached data')
          }
        </span>
        <span style={styles.chip}>
          {isOnline ? 'Live' : 'Offline'}
        </span>
      </div>
    </>
  );
}
