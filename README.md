# 🌾 KrishiMitra — AI Farmer Assistant

> Comic / Notebook aesthetic · Mobile-First · Voice-First · AI-Powered

---

## ✨ What's Inside

| Component | File | Description |
|---|---|---|
| AppContext | `src/context/AppContext.js` | Global state: language, location, online status |
| LanguageModal | `src/components/LanguageModal/` | First-run language picker (bottom sheet) |
| Header | `src/components/Header/` | Sticky header with offline badge + lang switcher |
| Hero | `src/components/Hero/` | Dynamic weather scene + stats + grass footer |
| WeatherScene | `src/components/Hero/WeatherScene.jsx` | Animated sky: sun, clouds, rain, storm, night |
| GrassFooter | `src/components/Hero/GrassFooter.jsx` | Scroll-grow SVG grass + soil data bar |
| DateStrip | `src/components/DateStrip/` | 7-day date selector → forecast panel |
| FeatureCards | `src/components/FeatureCards/` | 6 feature cards + gov scheme pills |
| VoiceButton | `src/components/VoiceButton/` | Floating mic FAB + flower bloom animation |
| OnboardingTour | `src/components/OnboardingTour/` | 4-step visual tour for first-time users |
| OfflineBanner | `src/components/OfflineBanner/` | Offline mode notification |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Add your OpenWeather API key
# Edit: src/utils/constants.js
# Replace: 'YOUR_OPENWEATHER_API_KEY'

# 3. Start development server
npm start
```

App runs at **http://localhost:3000**

---

## 🔑 API Keys

### Weather (Optional — works without it in demo mode)
1. Get free key at https://openweathermap.org/api
2. Edit `src/utils/constants.js`:
   ```js
   export const WEATHER_API_KEY = 'your_key_here';
   ```

### Location
- Uses browser GPS first → falls back to IP-based geo (free, no key needed)
- Reverse geocoding via OpenStreetMap Nominatim (free, no key needed)

---

## 📁 Project Structure

```
krishimitra/
├── public/
│   └── index.html              # Google Fonts loaded here
├── src/
│   ├── styles/
│   │   ├── globals.css         # Design tokens, paper texture, base styles
│   │   └── animations.css      # All keyframe animations library
│   ├── context/
│   │   └── AppContext.js       # Global state (language, location, online)
│   ├── hooks/
│   │   ├── useLocation.js      # GPS + IP geolocation hook
│   │   ├── useWeather.js       # Weather fetch + cache hook
│   │   └── useVoice.js         # Speech-to-text + TTS hook
│   ├── utils/
│   │   ├── constants.js        # API keys, storage keys, defaults
│   │   ├── weatherUtils.js     # Weather code mapping, gradients, advice
│   │   └── soilData.js         # Soil type by state, crop recommendations
│   ├── data/
│   │   ├── languages.js        # Language list, greetings, taglines
│   │   └── featureCards.js     # Feature card data + gov scheme data
│   ├── components/
│   │   ├── LanguageModal/      # LanguageModal.jsx + .css
│   │   ├── Header/             # Header.jsx + .css
│   │   ├── Hero/               # Hero.jsx + WeatherScene.jsx + GrassFooter.jsx + .css
│   │   ├── VoiceButton/        # VoiceButton.jsx + .css
│   │   ├── DateStrip/          # DateStrip.jsx + .css
│   │   ├── FeatureCards/       # FeatureCards.jsx + .css
│   │   ├── OnboardingTour/     # OnboardingTour.jsx + .css
│   │   └── OfflineBanner/      # OfflineBanner.jsx
│   ├── App.jsx                 # Root component
│   └── index.js                # Entry point
└── package.json
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F5F0E8` | Background (notebook paper) |
| `--ink` | `#2C2416` | Text, borders, buttons |
| `--olive` | `#6B7A3E` | Agriculture accent |
| `--amber` | `#D4820A` | Alerts, highlights |
| `--font-sketch` | Caveat | Headlines |
| `--font-hand` | Patrick Hand | Sub-heads |
| `--font-comic` | Comic Neue | Body text |

---

## 📱 Converting to React Native (Future)

The codebase is structured for easy migration:

1. **Context** (`AppContext.js`) → works as-is in RN
2. **Hooks** (`useLocation`, `useWeather`, `useVoice`) → swap browser APIs for RN equivalents:
   - `navigator.geolocation` → `expo-location`
   - `Web Speech API` → `expo-speech` + `@react-native-voice/voice`
3. **Components** → replace `div/section/header` with `View`, CSS with `StyleSheet`
4. **Navigation** → add `react-navigation`

---

## 🌐 Features

- ✅ Language selection (Hindi, English, Garhwali, Kumaoni, Punjabi, Marathi)
- ✅ Auto-detect location (GPS → IP fallback)
- ✅ Dynamic weather scene (Sun ☀️ / Clouds ⛅ / Rain 🌧️ / Storm ⛈️ / Night 🌙)
- ✅ Animated grass footer (scroll to grow!)
- ✅ Voice interaction (speak → AI responds → TTS reads back)
- ✅ Date strip with 7-day window + forecast panel
- ✅ 6 feature cards (internal + external govt links)
- ✅ Government scheme pills (PM Kisan, PMFBY, KCC, Agmarknet)
- ✅ Onboarding tour (4 steps, icon-based)
- ✅ Offline mode detection + banner
- ✅ Weather data caching (30 min TTL)
- ✅ Comic / notebook paper aesthetic

---

## 🏗️ Built With

- React 18 (functional components + hooks)
- Vanilla CSS (no Tailwind — easier for RN migration)
- Web Speech API (browser-native, no library)
- OpenWeather API (free tier)
- OpenStreetMap Nominatim (free geocoding)
- Google Fonts: Caveat, Patrick Hand, Comic Neue

---

*KrishiMitra — Yeh app mere liye bana hai 🌾*
