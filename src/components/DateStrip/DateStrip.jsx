/* ─────────────────────────────────────────────
   DateStrip — Tap date → see forecast / history
───────────────────────────────────────────── */
import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import './DateStrip.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* Generate 7-day window: 3 days back, today, 3 ahead */
function buildDateWindow() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + (i - 3));
    return {
      date:    d,
      dayName: DAYS[d.getDay()],
      dayNum:  d.getDate(),
      month:   MONTHS[d.getMonth()],
      isToday: d.toDateString() === today.toDateString(),
      isPast:  d < new Date(today.setHours(0,0,0,0)),
    };
  });
}

/* Mock predictions per date offset */
function getPrediction(offset) {
  const templates = [
    { weather: '🌧️ Rainy',   temp: '19°C', advice: 'Skip field work. Protect stored crops from moisture.', soil: 'High moisture — avoid tilling.' },
    { weather: '⛅ Cloudy',  temp: '22°C', advice: 'Good day for transplanting seedlings.', soil: 'Moderate moisture — ideal for planting.' },
    { weather: '🌧️ Drizzle', temp: '21°C', advice: 'Light rain expected. No irrigation needed.', soil: 'Moist — monitor drainage.' },
    { weather: '☀️ Sunny',   temp: '28°C', advice: 'Ideal for harvesting. Irrigate by evening.', soil: 'Drying fast — irrigate morning.' },
    { weather: '☀️ Sunny',   temp: '30°C', advice: 'Hot day. Water crops early morning only.', soil: 'Very dry — irrigation needed.' },
    { weather: '⛅ Partly Cloudy', temp: '25°C', advice: 'Good day for spraying pesticides (low wind).', soil: 'Normal — standard care.' },
    { weather: '🌤️ Clear',   temp: '27°C', advice: 'Perfect for field inspection and weeding.', soil: 'Well-balanced — no action needed.' },
  ];
  return templates[((offset % 7) + 7) % 7];
}

export default function DateStrip() {
  const { selectedDate, setSelectedDate, language } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(3); /* today = index 3 */

  const dates    = useMemo(() => buildDateWindow(), []);
  const isHindi  = language?.id === 'hi';

  const today = new Date();
  const offset = Math.round((new Date(selectedDate) - new Date(today.setHours(0,0,0,0))) / 86400000);
  const pred   = getPrediction(offset);

  const dateLabel = `${dates[selectedIdx]?.dayName}, ${dates[selectedIdx]?.dayNum} ${dates[selectedIdx]?.month}`;
  const isPast    = dates[selectedIdx]?.isPast;

  function handleSelect(idx) {
    setSelectedIdx(idx);
    setSelectedDate(dates[idx].date);
  }

  return (
    <div className="date-strip-wrap">
      <p className="date-strip-label">
        {isHindi ? '📅 तारीख चुनें — पूर्वानुमान देखें' : '📅 Select date — view forecast'}
      </p>

      {/* Date cells */}
      <div className="date-strip" role="tablist" aria-label="Date selector">
        {dates.map((d, i) => (
          <div
            key={i}
            role="tab"
            aria-selected={i === selectedIdx}
            className={[
              'date-cell',
              d.isToday ? 'today' : '',
              i === selectedIdx ? 'selected' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleSelect(i)}
          >
            <div className="date-cell-day">{d.dayName}</div>
            <div className="date-cell-num">{d.dayNum}</div>
            <div className="date-cell-month">{d.month}</div>
            {d.isToday && <div className="date-cell-today-dot" />}
          </div>
        ))}
      </div>

      {/* Prediction panel */}
      <div
        className="date-prediction"
        role="tabpanel"
        aria-label={`Forecast for ${dateLabel}`}
        key={selectedIdx} /* re-animate on change */
      >
        <div className="date-prediction-header">
  <span className="date-prediction-title">{dateLabel}</span>
  <span className="date-prediction-badge">
    {isPast 
      ? '📖 History' 
      : dates[selectedIdx]?.isToday 
        ? '🔴 Today' 
        : '🔮 Forecast'}
  </span>
</div>

        <div className="date-prediction-row">
          <span className="date-prediction-icon">🌤️</span>
          <span className="date-prediction-text">
            {isHindi ? 'मौसम:' : 'Weather:'}
          </span>
          <span className="date-prediction-value">{pred.weather} · {pred.temp}</span>
        </div>

        <div className="date-prediction-row">
          <span className="date-prediction-icon">💡</span>
          <span className="date-prediction-text">{pred.advice}</span>
        </div>

        <div className="date-prediction-row">
          <span className="date-prediction-icon">🌱</span>
          <span className="date-prediction-text">
            {isHindi ? 'मिट्टी:' : 'Soil:'}{' '}
            <span className="date-prediction-value">{pred.soil}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
