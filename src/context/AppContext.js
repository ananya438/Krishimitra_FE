/* ─────────────────────────────────────────────
   AppContext — Global Application State
───────────────────────────────────────────── */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, DEFAULT_LOCATION } from '../utils/constants';
import { LANGUAGES } from '../data/languages';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  /* ── Language ── */
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return LANGUAGES.find(l => l.id === saved) ?? LANGUAGES[0]; // default Hindi
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang.id);
  }, []);

  /* ── Location ── */
  const [location, setLocationState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCATION);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });

  const setLocation = useCallback((loc) => {
    setLocationState(loc);
    localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(loc));
  }, []);

  /* ── Onboarding ── */
  const [hasOnboarded, setHasOnboardedState] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true';
  });

  const markOnboarded = useCallback(() => {
    setHasOnboardedState(true);
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
  }, []);

  /* ── Online status ── */
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online',  on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  /* ── Language modal ── */
  const [showLangModal, setShowLangModal] = useState(!localStorage.getItem(STORAGE_KEYS.LANGUAGE));

  /* ── Selected date for date strip ── */
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ── Voice active ── */
  const [voiceActive, setVoiceActive] = useState(false);

  const value = {
    language, setLanguage,
    location, setLocation,
    hasOnboarded, markOnboarded,
    isOnline,
    showLangModal, setShowLangModal,
    selectedDate, setSelectedDate,
    voiceActive, setVoiceActive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
