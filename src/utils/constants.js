/* ─────────────────────────────────────────────
   App-wide Constants
───────────────────────────────────────────── */

export const APP_NAME = 'KrishiMitra';
export const APP_VERSION = '1.0.0';

export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/* OpenWeatherMap — replace with your real API key */
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/* IP Geolocation (no key needed) */
export const GEO_URL = 'https://ipapi.co/json/';

/* Default location (Dehradun, Uttarakhand) */
export const DEFAULT_LOCATION = {
  city: 'Dehradun',
  state: 'Uttarakhand',
  country: 'IN',
  lat: 30.3165,
  lon: 78.0322,
};

/* Weather condition codes → internal state */
export const WEATHER_STATES = {
  SUNNY:      'sunny',
  CLOUDY:     'cloudy',
  RAINY:      'rainy',
  STORMY:     'stormy',
  FOGGY:      'foggy',
  SNOWY:      'snowy',
  NIGHT:      'night',
};

/* OpenWeather code ranges → our state */
export const WEATHER_CODE_MAP = [
  { range: [200, 299], state: WEATHER_STATES.STORMY },
  { range: [300, 399], state: WEATHER_STATES.RAINY  },
  { range: [500, 599], state: WEATHER_STATES.RAINY  },
  { range: [600, 699], state: WEATHER_STATES.SNOWY  },
  { range: [700, 799], state: WEATHER_STATES.FOGGY  },
  { range: [800, 800], state: WEATHER_STATES.SUNNY  },
  { range: [801, 804], state: WEATHER_STATES.CLOUDY },
];

/* Soil types by Indian state (simplified lookup) */
export const STATE_SOIL_MAP = {
  'Uttarakhand':    { type: 'Mountain Loam',    ph: '6.0–7.0', organic: 'High' },
  'Punjab':         { type: 'Alluvial Sandy',   ph: '7.5–8.5', organic: 'Medium' },
  'Haryana':        { type: 'Alluvial Clay',    ph: '7.0–8.0', organic: 'Medium' },
  'Maharashtra':    { type: 'Black Cotton',     ph: '7.5–8.5', organic: 'Medium' },
  'Rajasthan':      { type: 'Desert Sandy',     ph: '7.5–9.0', organic: 'Low' },
  'Kerala':         { type: 'Laterite Red',     ph: '4.5–6.0', organic: 'High' },
  'Tamil Nadu':     { type: 'Red Sandy Loam',   ph: '6.0–7.5', organic: 'Low' },
  'West Bengal':    { type: 'Alluvial Rich',    ph: '6.0–7.0', organic: 'High' },
  'Madhya Pradesh': { type: 'Black Regur',      ph: '7.0–8.5', organic: 'Medium' },
  'Uttar Pradesh':  { type: 'Alluvial Gangetic', ph: '7.0–8.0', organic: 'High' },
  'default':        { type: 'Mixed Loam',       ph: '6.5–7.5', organic: 'Medium' },
};

/* Local storage keys */
export const STORAGE_KEYS = {
  LANGUAGE:     'km_language',
  LOCATION:     'km_location',
  ONBOARDED:    'km_onboarded',
  WEATHER_CACHE: 'km_weather_cache',
  CACHE_TIME:   'km_cache_time',
};

/* Cache TTL: 30 minutes */
export const CACHE_TTL_MS = 30 * 60 * 1000;

/* Voice interaction prompts */
export const VOICE_PROMPTS = {
  en: 'Tap the microphone and ask me anything about your farm...',
  hi: 'माइक पर टैप करें और अपने खेत के बारे में कुछ भी पूछें...',
};
