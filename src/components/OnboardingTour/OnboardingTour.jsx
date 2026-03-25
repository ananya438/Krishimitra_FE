/* ─────────────────────────────────────────────
   OnboardingTour — 3-step visual tutorial
───────────────────────────────────────────── */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './OnboardingTour.css';

const STEPS = [
  {
    emoji: '🎤',
    titleEn: 'Your Voice is Your Keyboard!',
    titleHi: 'आपकी आवाज़ ही आपका कीबोर्ड है!',
    descEn:  'Tap the mic button (bottom-right) anytime and ask KrishiMitra anything — in your own language.',
    descHi:  'कभी भी माइक बटन (दाईं तरफ नीचे) दबाएं और कृषिमित्र से कुछ भी पूछें — अपनी भाषा में।',
  },
  {
    emoji: '🌤️',
    titleEn: 'Live Weather for Your Farm',
    titleHi: 'आपके खेत का लाइव मौसम',
    descEn:  'The top section shows real-time weather and smart advice based on your exact location.',
    descHi:  'ऊपरी भाग में आपके खेत का असली मौसम और स्मार्ट सलाह दिखती है।',
  },
  {
    emoji: '📅',
    titleEn: 'Tap Any Date for Predictions',
    titleHi: 'भविष्यवाणी के लिए कोई भी तारीख चुनें',
    descEn:  'Use the date strip to see weather forecasts and farming tips for any day.',
    descHi:  'किसी भी दिन का मौसम पूर्वानुमान और खेती की सलाह पाने के लिए तारीख बार का उपयोग करें।',
  },
  {
    emoji: '🌱',
    titleEn: 'Soil & Humidity at a Glance',
    titleHi: 'एक नज़र में मिट्टी और नमी',
    descEn:  'Scroll down in the hero section to see live soil type, pH, and humidity for your area.',
    descHi:  'मुख्य भाग को नीचे स्क्रॉल करें और अपने क्षेत्र की मिट्टी, pH, और नमी देखें।',
  },
];

export default function OnboardingTour() {
  const { hasOnboarded, markOnboarded, language } = useApp();
  const [step, setStep] = useState(0);
  const [key,  setKey]  = useState(0); /* for re-mount animation */

  const isHindi   = language?.id === 'hi';
  const current   = STEPS[step];
  const isLast    = step === STEPS.length - 1;

  if (hasOnboarded) return null;

  function next() {
    if (isLast) {
      markOnboarded();
    } else {
      setStep(s => s + 1);
      setKey(k => k + 1);
    }
  }

  return (
    <div className="tour-overlay" role="dialog" aria-label="App introduction tour">
      <div className="tour-sheet">
        <div className="tour-handle" />

        {/* Step dots */}
        <div className="tour-step-indicators" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`tour-dot${i === step ? ' active' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Step content */}
        <div className="tour-step" key={key} role="presentation">
          <div className="tour-step-emoji" aria-hidden="true">
            {current.emoji}
          </div>
          <h2 className="tour-step-title">
            {isHindi ? current.titleHi : current.titleEn}
          </h2>
          <p className="tour-step-desc">
            {isHindi ? current.descHi : current.descEn}
          </p>
        </div>

        {/* Navigation */}
        <div className="tour-nav">
          <button
            className="tour-btn-skip"
            onClick={markOnboarded}
            aria-label="Skip tour"
          >
            {isHindi ? 'छोड़ें' : 'Skip'}
          </button>
          <button
            className={`tour-btn-next${isLast ? ' tour-btn-done' : ''}`}
            onClick={next}
            aria-label={isLast ? 'Get started' : 'Next step'}
          >
            {isLast
              ? (isHindi ? 'शुरू करें 🌾' : "Let's Go! 🌾")
              : (isHindi ? 'आगे →'        : 'Next →')
            }
          </button>
        </div>
      </div>
    </div>
  );
}
