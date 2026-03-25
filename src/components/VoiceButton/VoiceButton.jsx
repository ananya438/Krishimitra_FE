/* ─────────────────────────────────────────────
   VoiceButton — Floating mic FAB with flower bloom
───────────────────────────────────────────── */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useVoice } from '../../hooks/useVoice';
import './VoiceButton.css';

/* Flower positions relative to button */
const FLOWER_POSITIONS = [
  { top: '-52px', left: '-24px', delay: 0,    symbol: '🌸' },
  { top: '-44px', left: '18px',  delay: 0.15, symbol: '🌼' },
  { top: '-8px',  left: '-54px', delay: 0.3,  symbol: '🌺' },
  { top: '16px',  left: '-50px', delay: 0.1,  symbol: '🌻' },
  { top: '-56px', left: '-4px',  delay: 0.25, symbol: '🌷' },
];

function FlowerBlossom({ visible, fading }) {
  if (!visible) return null;
  return (
    <>
      {FLOWER_POSITIONS.map((f, i) => (
        <span
          key={i}
          className={`voice-flower${fading ? ' fading' : ''}`}
          style={{
            top:            f.top,
            left:           f.left,
            animationDelay: `${f.delay}s`,
          }}
          aria-hidden="true"
        >
          {f.symbol}
        </span>
      ))}
    </>
  );
}

export default function VoiceButton() {
  const { language, setVoiceActive } = useApp();
  const {
    isListening, transcript, response, isSpeaking, error, supported,
    startListening, stopListening, speak,
  } = useVoice(language?.id ?? 'en');

  const [showFlowers,  setShowFlowers]  = useState(false);
  const [fadingFlowers,setFadingFlowers]= useState(false);
  const [showBubble,   setShowBubble]   = useState(false);

  const flowerTimer = useRef(null);
  const fadeTimer   = useRef(null);

  /* ── Periodic flower bloom (every 15 seconds) ── */
  const bloomFlowers = useCallback(() => {
    setShowFlowers(true);
    setFadingFlowers(false);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setFadingFlowers(true);
      setTimeout(() => setShowFlowers(false), 500);
    }, 3500);
  }, []);

  useEffect(() => {
    /* First bloom after 2s */
    const first = setTimeout(bloomFlowers, 2000);
    /* Then every 15s */
    flowerTimer.current = setInterval(bloomFlowers, 15000);
    return () => {
      clearTimeout(first);
      clearInterval(flowerTimer.current);
      clearTimeout(fadeTimer.current);
    };
  }, [bloomFlowers]);

  /* Sync voice active state to context */
  useEffect(() => {
    setVoiceActive(isListening || isSpeaking);
  }, [isListening, isSpeaking, setVoiceActive]);

  /* Show bubble when response arrives */
  useEffect(() => {
    if (response) {
      setShowBubble(true);
      /* Bloom flowers on AI response */
      bloomFlowers();
    }
  }, [response, bloomFlowers]);

  function handleMicClick() {
    if (isListening) {
      stopListening();
    } else {
      setShowBubble(false);
      startListening();
    }
  }

  /* Button state */
  const fabClass = [
    'voice-fab',
    isListening ? 'listening' : '',
    isSpeaking  ? 'speaking'  : '',
  ].filter(Boolean).join(' ');

  if (!supported) return null;

  return (
    <div className="voice-fab-wrap" role="complementary" aria-label="Voice assistant">

      {/* Response bubble */}
      {showBubble && response && (
        <div className="voice-bubble-wrap">
          <div className="voice-bubble">
            {transcript && (
              <p className="voice-bubble-query">"{transcript}"</p>
            )}
            <p className="voice-bubble-text">{response}</p>
            <button
              className="voice-bubble-speaker"
              onClick={() => speak(response)}
              aria-label="Replay response"
              title="Replay"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      {/* Live transcript while listening */}
      {isListening && transcript && (
        <div className="voice-transcript">
          🎙 {transcript}…
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="voice-error">⚠️ {error}</div>
      )}

      {/* Main FAB */}
      <div style={{ position: 'relative' }}>
        {/* Flowers */}
        <FlowerBlossom visible={showFlowers} fading={fadingFlowers} />

        {/* Pulse rings while listening */}
        {isListening && (
          <>
            <div className="voice-ring" />
            <div className="voice-ring voice-ring-2" />
            <div className="voice-ring voice-ring-3" />
          </>
        )}

        <button
          className={fabClass}
          onClick={handleMicClick}
          aria-label={isListening ? 'Stop listening' : 'Tap to speak with KrishiMitra'}
          title={isListening ? 'Stop' : 'Speak'}
        >
          {isListening ? (
            /* EQ bars while listening */
            <div className="voice-bars">
              {[1,2,3,4,5].map(i => <div key={i} className="voice-bar" />)}
            </div>
          ) : isSpeaking ? (
            <span className="voice-fab-icon">🔊</span>
          ) : (
            <span className="voice-fab-icon">🎤</span>
          )}
        </button>
      </div>

      {/* Label */}
      <div className="voice-label">
        {isListening ? 'Listening…' : isSpeaking ? 'Speaking…' : 'Tap to ask'}
      </div>
    </div>
  );
}
