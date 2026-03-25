/* ─────────────────────────────────────────────
   Soil Data Utilities
───────────────────────────────────────────── */
import { STATE_SOIL_MAP } from './constants';

/**
 * Get soil info for a given state name
 */
export function getSoilByState(stateName) {
  return STATE_SOIL_MAP[stateName] ?? STATE_SOIL_MAP['default'];
}

/**
 * Crop recommendations based on soil type
 */
export const SOIL_CROP_MAP = {
  'Mountain Loam':     ['Wheat', 'Barley', 'Potato', 'Pea', 'Apple'],
  'Alluvial Sandy':    ['Wheat', 'Rice', 'Sugarcane', 'Maize', 'Mustard'],
  'Alluvial Clay':     ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jowar'],
  'Black Cotton':      ['Cotton', 'Soybean', 'Jowar', 'Groundnut', 'Onion'],
  'Desert Sandy':      ['Bajra', 'Moth Bean', 'Cluster Bean', 'Sesame'],
  'Laterite Red':      ['Coconut', 'Rubber', 'Cashew', 'Tea', 'Tapioca'],
  'Red Sandy Loam':    ['Groundnut', 'Cotton', 'Jowar', 'Maize'],
  'Alluvial Rich':     ['Rice', 'Jute', 'Tea', 'Mustard', 'Sugarcane'],
  'Black Regur':       ['Cotton', 'Wheat', 'Gram', 'Linseed', 'Oilseeds'],
  'Alluvial Gangetic': ['Wheat', 'Rice', 'Sugarcane', 'Mustard', 'Potato'],
  'Mixed Loam':        ['Wheat', 'Maize', 'Vegetables', 'Pulses'],
};

/**
 * Get recommended crops for a soil type
 */
export function getRecommendedCrops(soilType) {
  return SOIL_CROP_MAP[soilType] ?? SOIL_CROP_MAP['Mixed Loam'];
}

/**
 * Soil health indicators
 */
export const SOIL_HEALTH_TIPS = {
  'High':   { label: 'Excellent', color: '#27AE60', icon: '🌿' },
  'Medium': { label: 'Good',      color: '#D4820A', icon: '🌱' },
  'Low':    { label: 'Needs Care',color: '#C0392B', icon: '⚠️'  },
};
