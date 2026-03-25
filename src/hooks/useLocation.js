/* ─────────────────────────────────────────────
   Hook: useLocation — GPS + IP geolocation
───────────────────────────────────────────── */
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_LOCATION, GEO_URL, STORAGE_KEYS, CACHE_TTL_MS } from '../utils/constants';

export function useLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchIPLocation = useCallback(async () => {
    try {
      const res  = await fetch(GEO_URL);
      const data = await res.json();
      const loc  = {
        city:    data.city    ?? DEFAULT_LOCATION.city,
        state:   data.region  ?? DEFAULT_LOCATION.state,
        country: data.country ?? DEFAULT_LOCATION.country,
        lat:     data.latitude  ?? DEFAULT_LOCATION.lat,
        lon:     data.longitude ?? DEFAULT_LOCATION.lon,
      };
      setLocation(loc);
      localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify({ ...loc, ts: Date.now() }));
      return loc;
    } catch {
      return DEFAULT_LOCATION;
    }
  }, []);

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    /* Check cache first */
    try {
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOCATION) ?? 'null');
      if (cached?.ts && Date.now() - cached.ts < CACHE_TTL_MS) {
        setLocation(cached);
        setLoading(false);
        return;
      }
    } catch { /* ignore */ }

    /* Try GPS */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
          /* Reverse geocode via nominatim */
          try {
            const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await res.json();
            const loc  = {
              city:    data.address?.city ?? data.address?.town ?? data.address?.village ?? DEFAULT_LOCATION.city,
              state:   data.address?.state ?? DEFAULT_LOCATION.state,
              country: data.address?.country_code?.toUpperCase() ?? 'IN',
              lat, lon,
              ts: Date.now(),
            };
            setLocation(loc);
            localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(loc));
          } catch {
            setLocation({ ...DEFAULT_LOCATION, lat, lon, ts: Date.now() });
          }
          setLoading(false);
        },
        async () => {
          /* GPS denied → fallback to IP */
          const loc = await fetchIPLocation();
          setLocation(loc);
          setLoading(false);
        },
        { timeout: 8000, maximumAge: CACHE_TTL_MS }
      );
    } else {
      const loc = await fetchIPLocation();
      setLocation(loc);
      setLoading(false);
    }
  }, [fetchIPLocation]);

  useEffect(() => { detectLocation(); }, [detectLocation]);

  return { location, setLocation, loading, error, retry: detectLocation };
}
