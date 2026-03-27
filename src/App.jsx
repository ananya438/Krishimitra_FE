import { useState, useRef, useEffect } from 'react'
import './App.css'
import soilNormal from './soil_normal.svg'
import clouds from './clouds.svg'
import rainDrops from './placidplace-drops-13474.gif'
import navbarBottomBorder from './navbar-bottom-border.svg'
import pond from './pond.svg'

function App() {
  const today = new Date().getDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const sliderRef = useRef(null);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const fullText = "Hello! I'm KrishiBot 🌾 Your soil moisture is stable at 42%, and light rain is expected today. Based on current conditions, I recommend delaying irrigation for 24 hours. How can I further assist with your harvest planning?";

  const dates = Array.from({ length: daysInMonth * 3 }, (_, i) => (i % daysInMonth) + 1);

  // Navbar scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to today
  useEffect(() => {
    if (sliderRef.current) {
      const items = sliderRef.current.querySelectorAll('.date-item');
      const targetIndex = daysInMonth + today - 1;
      if (items[targetIndex]) {
        items[targetIndex].scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
      }
    }
  }, [today, daysInMonth]);

  // Typewriter effect
  useEffect(() => {
    if (isChatOpen) {
      let i = 0;
      setDisplayText('');
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isChatOpen]);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    isUserScrolling.current = true;
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { isUserScrolling.current = false; }, 150);

    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    const items = slider.querySelectorAll('.date-item');
    let closestDate = selectedDate;
    let minDistance = Infinity;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(itemCenter - sliderCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestDate = parseInt(item.querySelector('.date-number').innerText);
      }
    });

    if (closestDate !== selectedDate) setSelectedDate(closestDate);
  };

  const handleDateClick = (date, index) => {
    setSelectedDate(date);
    if (sliderRef.current) {
      const items = sliderRef.current.querySelectorAll('.date-item');
      if (items[index]) {
        items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
        <div className="brand-logo">
          <div className="brand-icon">🌾</div>
          <div className="brand-text">
            <span className="brand-krishi">Krishi</span><span className="brand-mitra">Mitra</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="location-chip">
            <span className="location-dot" />
            <span>Dehradun, IN</span>
          </div>
        </div>

        <div className="navbar-right">
          <button className="nav-icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="nav-badge">3</span>
          </button>
          <div className="hamburger">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>
        </div>
      </nav>

      <img src={navbarBottomBorder} alt="" className="navbar-bottom-border" aria-hidden="true" />

      <main className="dashboard-content">

        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="hero">
            <img src={rainDrops} alt="" className="rain-gif" aria-hidden="true" />
            <img src={clouds} alt="" className="clouds-img" aria-hidden="true" />
            <img src={soilNormal} alt="" className="soil-img" aria-hidden="true" />

            {/* Centre hero text */}
            <div className="hero-center">
              <div className="hero-weather-badge">
                <span className="hero-weather-icon">🌧️</span>
                <span>Light Rain</span>
              </div>
              <div className="hero-temp">24°<span className="hero-temp-unit">C</span></div>
              <div className="hero-desc">Continuous showers · Feels like 21°C</div>
            </div>

            {/* Floating widgets */}
            <div className="hero-widget weather-widget">
              <div className="widget-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e6fa0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
              </div>
              <div className="widget-info">
                <div className="widget-val">82%</div>
                <div className="widget-label">Humidity</div>
              </div>
            </div>

            <div className="hero-widget soil-widget">
              <div className="widget-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="widget-info">
                <div className="widget-val">42%</div>
                <div className="widget-label">Moist Soil</div>
              </div>
            </div>

            <div className="hero-widget wind-widget">
              <div className="widget-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                </svg>
              </div>
              <div className="widget-info">
                <div className="widget-val">12 km/h</div>
                <div className="widget-label">NE Wind</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DATE STRIP ── */}
        <section className="timeline-section">
          <div className="section-divider" />
          <div className="date-slider-wrapper">
            <div className="date-slider-header">
              <div className="month-year">
                {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <div className="slider-hint">Tap a date to view conditions</div>
            </div>
            <div className="date-slider" ref={sliderRef} onScroll={handleScroll}>
              {dates.map((date, index) => {
                const dayName = new Date(now.getFullYear(), now.getMonth(), date)
                  .toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                const isToday = date === today && index >= daysInMonth && index < daysInMonth * 2;
                let distance = Math.abs(selectedDate - date);
                if (distance > daysInMonth / 2) distance = daysInMonth - distance;

                let cls = 'date-item';
                if (distance === 0) cls += ' active-date';
                else if (distance === 1) cls += ' near-date';
                else cls += ' far-date';

                return (
                  <div key={`${date}-${index}`} className={cls} onClick={() => handleDateClick(date, index)}>
                    <div className="day-label">{dayName}</div>
                    <div className="date-number">{date}</div>
                    {isToday && <div className="today-marker">TODAY</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="section-divider" />
        </section>

        {/* ── INSIGHTS ── */}
        <section className="insights-section">
          <div className="section-header">
            <h2 className="section-title">Farm Insights</h2>
            <p className="section-subtitle">Real-time status &amp; metrics</p>
          </div>
          <div className="updates">
            <div className="update-heading">Today's Activity</div>

            {/* Weather card */}
            <div className="card card-weather">
              <div className="card-top">
                <div className="card-label">
                  <span className="card-dot dot-blue" />
                  Weather Forecast
                </div>
                <span className="card-badge badge-rain">🌧 Rain</span>
              </div>
              <div className="card-metric">24°C</div>
              <div className="card-desc">Light showers throughout the day. Wind from North-East at 12 km/h. UV index: Low.</div>
              <div className="card-row">
                <div className="card-chip">💧 Humidity 82%</div>
                <div className="card-chip">🌬 Wind 12 km/h</div>
                <div className="card-chip">🌡 Feels 21°C</div>
              </div>
            </div>

            {/* Soil card */}
            <div className="card card-soil">
              <div className="card-top">
                <div className="card-label">
                  <span className="card-dot dot-green" />
                  Soil Health
                </div>
                <span className="card-badge badge-good">✅ Optimal</span>
              </div>
              <div className="card-metric">pH 6.8</div>
              <div className="card-desc">Soil moisture at optimal levels for current wheat crop stage. No irrigation required today.</div>
              <div className="card-row">
                <div className="card-chip">💧 Moisture 42%</div>
                <div className="card-chip">🌡 Soil 18°C</div>
                <div className="card-chip">⚗️ N–P–K OK</div>
              </div>
            </div>

            {/* Advisory card */}
            <div className="card card-advisory">
              <div className="card-top">
                <div className="card-label">
                  <span className="card-dot dot-amber" />
                  Advisory
                </div>
                <span className="card-badge badge-action">⚡ Action</span>
              </div>
              <div className="card-metric">Irrigate</div>
              <div className="card-desc">Wheat crop needs irrigation within 24 hours. Rain today may reduce requirement — reassess tomorrow.</div>
              <div className="card-row">
                <div className="card-chip">📅 Fertilise in 3 days</div>
                <div className="card-chip">🌾 Stage 3</div>
              </div>
            </div>

            {/* Scheme card — new */}
            <div className="card card-scheme">
              <div className="card-top">
                <div className="card-label">
                  <span className="card-dot dot-purple" />
                  Government Scheme
                </div>
                <span className="card-badge badge-scheme">🏛 New</span>
              </div>
              <div className="card-metric-sm">PM Fasal Bima</div>
              <div className="card-desc">Enroll in Pradhan Mantri Fasal Bima Yojana before the season deadline to protect your crop.</div>
              <div className="card-cta">
                <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" className="card-cta-btn">
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <img src={pond} className="footer-pond" alt="" aria-hidden="true" />
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon footer-brand-icon">🌾</span>
            <span className="brand-krishi">Krishi</span>
            <span className="brand-mitra">Mitra</span>
          </div>
          <p className="footer-tagline">Empowering India's farmers with AI</p>
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#terms" className="footer-link">Terms</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
          <div className="footer-divider" />
          <div className="footer-copyright">© 2026 KrishiMitra · Made with 🌿 for Indian Farmers</div>
        </div>
      </footer>

      {/* ── CHATBOT FAB ── */}
      {!isChatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-plant plant-1">
            <div className="plant-stem" /><div className="plant-flower">🌸</div>
          </div>
          <div className="chatbot-plant plant-2">
            <div className="plant-stem" /><div className="plant-flower">🌻</div>
          </div>
          <div className="chatbot-plant plant-3">
            <div className="plant-stem" /><div className="plant-flower">🌷</div>
          </div>
          <button className="chatbot-fab" title="Chat with KrishiBot" onClick={() => setIsChatOpen(true)}>
            <div className="chatbot-fab-ring" />
            <div className="chatbot-fab-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" /><path d="M20 14h2" />
                <path d="M15 13v2" /><path d="M9 13v2" />
              </svg>
            </div>
          </button>
          <div className="chatbot-fab-label">KrishiBot</div>
        </div>
      )}

      {/* ── VOICE CHAT OVERLAY ── */}
      {isChatOpen && (
        <div className="voice-chat-overlay">
          {/* Header bar */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">🌾</div>
              <div>
                <div className="chat-title">KrishiBot</div>
                <div className="chat-subtitle">AI Farm Assistant</div>
              </div>
            </div>
            <button className="close-chat" onClick={() => setIsChatOpen(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Visualizer */}
          <div className="voice-visualizer">
            <div className="nebula-blob" />
            <div className="nebula-blob nebula-blob-2" />
            <div className="frequency-bars">
              {[...Array(11)].map((_, i) => (
                <div key={i} className={`freq-bar bar-${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="chat-text-container">
            <div className="flowing-text">
              {displayText}
              <span className="cursor">|</span>
            </div>
          </div>

          {/* Status + action row */}
          <div className="chat-action-row">
            <div className="bot-status">
              <span className="status-dot" /> Listening…
            </div>
            <button className="chat-mic-btn" aria-label="Tap to speak">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;