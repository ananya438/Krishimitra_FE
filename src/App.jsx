/* ─────────────────────────────────────────────
   App.jsx — Root component
   Composes all sections together.
   Easy to convert to React Native later by
   replacing section wrappers with <View>.
───────────────────────────────────────────── */
import React from 'react';
import { AppProvider } from './context/AppContext';

import LanguageModal    from './components/LanguageModal/LanguageModal';
import Header           from './components/Header/Header';
import Hero             from './components/Hero/Hero';
import DateStrip        from './components/DateStrip/DateStrip';
import FeatureCards     from './components/FeatureCards/FeatureCards';
import VoiceButton      from './components/VoiceButton/VoiceButton';
import OnboardingTour   from './components/OnboardingTour/OnboardingTour';
import OfflineBanner    from './components/OfflineBanner/OfflineBanner';

export default function App() {
  return (
    <AppProvider>
      {/* Modals / Overlays */}
      <LanguageModal />
      <OnboardingTour />
      <OfflineBanner />

      {/* App Shell */}
      <div className="app-shell" style={{ position: 'relative', minHeight: '100vh' }}>
        <Header />

        <main>
          {/* 1. Hero — weather scene + stats */}
          <Hero />

          {/* 2. Date strip — select date for forecast */}
          <DateStrip />

          {/* 3. Feature cards + gov schemes */}
          <FeatureCards />

          {/* Bottom padding so FAB doesn't overlap last card */}
          <div style={{ height: 100 }} />
        </main>

        {/* Floating voice button (bottom-right) */}
        <VoiceButton />
      </div>
    </AppProvider>
  );
}
