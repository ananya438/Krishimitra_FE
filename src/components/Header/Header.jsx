/* ─────────────────────────────────────────────
   Header — Sticky app header
───────────────────────────────────────────── */
import React from 'react';
import { useApp } from '../../context/AppContext';
import './Header.css';

export default function Header() {
  const { isOnline, setShowLangModal, language } = useApp();

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-logo">
          <div className="header-logo-icon">🌾</div>
          <div className="header-logo-text">
            <span className="header-app-name">KrishiMitra</span>
            <span className="header-tagline">AI Farmer Assistant</span>
          </div>
        </div>

        {/* Right: offline + lang switcher */}
        <div className="header-actions">
          {!isOnline && (
            <div className="header-offline-chip">
              <span className="header-offline-dot" />
              Offline
            </div>
          )}
          <button
            className="header-icon-btn"
            onClick={() => setShowLangModal(true)}
            aria-label="Change language"
            title={`Language: ${language.name}`}
          >
            {language.flag}
          </button>
        </div>
      </div>
    </header>
  );
}
