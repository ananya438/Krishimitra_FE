/* ─────────────────────────────────────────────
   FeatureCards — Main feature grid + Gov schemes
───────────────────────────────────────────── */
import React from 'react';
import { useApp } from '../../context/AppContext';
import { FEATURE_CARDS, GOV_SCHEMES } from '../../data/featureCards';
import './FeatureCards.css';

function FeatureCard({ card, isHindi }) {
  const title = isHindi ? card.titleHi : card.title;
  const desc  = isHindi ? card.descriptionHi : card.description;

  const cardContent = (
    <>
      {card.action === 'external' && (
        <span className="feature-card-ext">↗ Official site</span>
      )}
      <span className="feature-card-icon">{card.icon}</span>
      <span
        className="feature-card-tag"
        style={{ color: card.color, borderColor: card.color }}
      >
        {card.tag}
      </span>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{desc}</p>
      <span className="feature-card-arrow">→</span>
    </>
  );

  const cardStyle = {
    background:   card.bgColor,
    borderColor:  card.borderColor,
    boxShadow:    `4px 4px 0 ${card.borderColor}`,
  };

  if (card.action === 'external') {
    return (
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="feature-card"
        style={cardStyle}
        aria-label={`Open ${title} — official website`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      className="feature-card"
      style={cardStyle}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={e => e.key === 'Enter' && e.currentTarget.click()}
    >
      {cardContent}
    </div>
  );
}

function GovSchemePill({ scheme }) {
  return (
    <a
      href={scheme.url}
      target="_blank"
      rel="noopener noreferrer"
      className="scheme-pill"
      aria-label={`Open ${scheme.name} — official website`}
    >
      <span
        className="scheme-pill-icon"
        style={{
          background: scheme.color + '22',
          borderRadius: '10px',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 38, height: 38,
          border: `1.5px solid ${scheme.color}40`,
        }}
      >
        {scheme.icon}
      </span>
      <div className="scheme-pill-info">
        <div className="scheme-pill-name">{scheme.name}</div>
        <div className="scheme-pill-benefit">{scheme.benefit}</div>
      </div>
    </a>
  );
}

export default function FeatureCards() {
  const { language } = useApp();
  const isHindi = language?.id === 'hi';

  return (
    <>
      {/* Main feature grid */}
      <div className="cards-section">
        <h2 className="cards-section-title">
          <span>🌾</span>
          {isHindi ? 'सेवाएं' : 'Features'}
        </h2>
        <div className="cards-grid">
          {FEATURE_CARDS.map(card => (
            <FeatureCard key={card.id} card={card} isHindi={isHindi} />
          ))}
        </div>
      </div>

      {/* Gov Schemes horizontal scroll */}
      <div className="schemes-strip">
        <h2 className="schemes-strip-title">
          <span>🏛️</span>
          {isHindi ? 'सरकारी योजनाएं' : 'Government Schemes'}
        </h2>
        <div className="schemes-scroll" role="list" aria-label="Government schemes">
          {GOV_SCHEMES.map(s => (
            <GovSchemePill key={s.id} scheme={s} />
          ))}
        </div>
      </div>
    </>
  );
}
