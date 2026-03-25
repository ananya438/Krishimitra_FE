/* ─────────────────────────────────────────────
   LanguageModal — First-run language picker
───────────────────────────────────────────── */
import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';
import './LanguageModal.css';

export default function LanguageModal() {
  const { showLangModal, setShowLangModal, setLanguage } = useApp();

  if (!showLangModal) return null;

  function handleSelect(lang) {
    setLanguage(lang);
    setShowLangModal(false);
  }

  return (
    <div className="lang-overlay" role="dialog" aria-label="Choose language">
      <div className="lang-sheet">
        <div className="lang-handle" />

        <div className="lang-header">
          <div className="lang-logo">🌾</div>
          <h2 className="lang-title">Choose your language</h2>
          <p className="lang-subtitle">भाषा चुनें · ਭਾਸ਼ਾ ਚੁਣੋ · भाषा निवडा</p>
        </div>

        <div className="lang-grid">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              className="lang-btn"
              onClick={() => handleSelect(lang)}
              aria-label={`Select ${lang.name}`}
            >
              <span className="lang-btn-flag">{lang.flag}</span>
              <span className="lang-btn-name">{lang.name}</span>
              <span className="lang-btn-native">{lang.native}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
