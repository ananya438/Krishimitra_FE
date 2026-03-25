/* ─────────────────────────────────────────────
   Weather Utility Helpers
───────────────────────────────────────────── */
import { WEATHER_CODE_MAP, WEATHER_STATES } from './constants';

/**
 * Map OpenWeather condition code → internal weather state
 */
export function getWeatherState(code, isNight = false) {
  if (isNight) return WEATHER_STATES.NIGHT;
  for (const { range, state } of WEATHER_CODE_MAP) {
    if (code >= range[0] && code <= range[1]) return state;
  }
  return WEATHER_STATES.SUNNY;
}

/**
 * Emoji + label for each weather state
 */
export const WEATHER_DISPLAY = {
  [WEATHER_STATES.SUNNY]:  { emoji: '☀️',  label: 'Sunny',       labelHi: 'धूप' },
  [WEATHER_STATES.CLOUDY]: { emoji: '⛅',  label: 'Cloudy',      labelHi: 'बादल' },
  [WEATHER_STATES.RAINY]:  { emoji: '🌧️', label: 'Rainy',       labelHi: 'बारिश' },
  [WEATHER_STATES.STORMY]: { emoji: '⛈️', label: 'Thunderstorm', labelHi: 'आंधी' },
  [WEATHER_STATES.FOGGY]:  { emoji: '🌫️', label: 'Foggy',       labelHi: 'कोहरा' },
  [WEATHER_STATES.SNOWY]:  { emoji: '❄️',  label: 'Snowy',       labelHi: 'बर्फ' },
  [WEATHER_STATES.NIGHT]:  { emoji: '🌙',  label: 'Night',       labelHi: 'रात' },
};

/**
 * Background gradient for each weather state
 */
export const WEATHER_GRADIENTS = {
  [WEATHER_STATES.SUNNY]:  'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 50%, #E8F4FE 100%)',
  [WEATHER_STATES.CLOUDY]: 'linear-gradient(180deg, #B0BEC5 0%, #CFD8DC 50%, #ECEFF1 100%)',
  [WEATHER_STATES.RAINY]:  'linear-gradient(180deg, #546E7A 0%, #78909C 40%, #90A4AE 100%)',
  [WEATHER_STATES.STORMY]: 'linear-gradient(180deg, #263238 0%, #37474F 40%, #546E7A 100%)',
  [WEATHER_STATES.FOGGY]:  'linear-gradient(180deg, #B0BEC5 0%, #CFD8DC 60%, #ECEFF1 100%)',
  [WEATHER_STATES.SNOWY]:  'linear-gradient(180deg, #90A4AE 0%, #B0BEC5 50%, #E8EAF6 100%)',
  [WEATHER_STATES.NIGHT]:  'linear-gradient(180deg, #1A237E 0%, #283593 40%, #3949AB 100%)',
};

/**
 * Farming advice per weather
 */
export const WEATHER_ADVICE = {
  [WEATHER_STATES.SUNNY]:  { en: 'Great day for harvesting. Ensure crops are irrigated.', hi: 'कटाई के लिए अच्छा दिन। सिंचाई सुनिश्चित करें।' },
  [WEATHER_STATES.CLOUDY]: { en: 'Good for planting seedlings. Mild light conditions.', hi: 'पौध लगाने के लिए अच्छा। हल्की रोशनी की स्थिति।' },
  [WEATHER_STATES.RAINY]:  { en: 'Delay irrigation. Watch for waterlogging in low fields.', hi: 'सिंचाई में देरी करें। जलजमाव की निगरानी करें।' },
  [WEATHER_STATES.STORMY]: { en: 'Do not go to field. Protect crops with nets if possible.', hi: 'खेत में न जाएं। जाल से फसल को सुरक्षित करें।' },
  [WEATHER_STATES.FOGGY]:  { en: 'Watch for fungal diseases. Apply preventive spray.', hi: 'फफूंद रोग का ध्यान रखें। निवारक स्प्रे करें।' },
  [WEATHER_STATES.SNOWY]:  { en: 'Cover sensitive crops. Frost may damage young plants.', hi: 'संवेदनशील फसलें ढकें। पाले से नुकसान हो सकता है।' },
  [WEATHER_STATES.NIGHT]:  { en: 'Review tomorrow\'s forecast. Plan early morning tasks.', hi: 'कल का पूर्वानुमान देखें। सुबह की योजना बनाएं।' },
};

/**
 * Kelvin → Celsius
 */
export const kelvinToCelsius = (k) => Math.round(k - 273.15);

/**
 * Celsius → Fahrenheit
 */
export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

/**
 * Generate mock weather data when API is unavailable
 */
export function getMockWeather(state = WEATHER_STATES.SUNNY) {
  const temps = { sunny: 28, cloudy: 22, rainy: 19, stormy: 17, foggy: 15, snowy: 2, night: 18 };
  return {
    temp: temps[state] ?? 24,
    humidity: Math.floor(Math.random() * 30) + 50,
    windSpeed: Math.floor(Math.random() * 15) + 5,
    description: WEATHER_DISPLAY[state]?.label ?? 'Clear',
    weatherState: state,
    isLoading: false,
    isMock: true,
  };
}
