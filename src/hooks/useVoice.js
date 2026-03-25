/* ─────────────────────────────────────────────
   Hook: useVoice — Speech-to-Text + TTS
───────────────────────────────────────────── */
import { useState, useCallback, useRef, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

/* ── Simple AI response engine (rule-based) ── */
function getAIResponse(query, lang = 'en') {
  const q = query.toLowerCase();

  const responses = {
    en: {
      rain:      'Rain is expected tonight. Delay irrigation by 24 hours. Ensure proper drainage.',
      soil:      'Your soil moisture is at 68%. It is in the ideal range. No immediate watering needed.',
      crop:      'Based on weather and soil data, wheat and mustard are best suited for this season.',
      weather:   'Today is partly cloudy with 24°C temperature. Good day for field work.',
      insurance: 'PM Fasal Bima Yojana offers crop insurance from ₹495. Register before the deadline.',
      price:     'Visit Agmarknet for live mandi prices for your crop.',
      pest:      'Monitor for aphids this week. Humid conditions increase pest risk. Apply neem oil spray.',
      default:   'I am KrishiMitra, your AI farming assistant. Ask me about weather, soil, crops, or government schemes.',
    },
    hi: {
      rain:      'आज रात बारिश की संभावना है। 24 घंटे के लिए सिंचाई रोकें। जल निकासी सुनिश्चित करें।',
      soil:      'आपकी मिट्टी की नमी 68% है। यह आदर्श स्तर पर है। अभी सिंचाई की जरूरत नहीं।',
      crop:      'मौसम और मिट्टी के आधार पर, इस मौसम में गेहूं और सरसों सबसे अच्छे हैं।',
      weather:   'आज आंशिक बादल हैं, तापमान 24°C है। खेत के काम के लिए अच्छा दिन।',
      insurance: 'PM फसल बीमा योजना ₹495 से शुरू होती है। समय सीमा से पहले पंजीकरण करें।',
      price:     'अपनी फसल के लाइव मंडी भाव के लिए Agmarknet देखें।',
      pest:      'इस सप्ताह माहू (aphids) की निगरानी करें। नमी से कीट बढ़ते हैं। नीम तेल स्प्रे करें।',
      default:   'मैं कृषिमित्र हूं, आपका AI कृषि सहायक। मौसम, मिट्टी, फसल या योजनाओं के बारे में पूछें।',
    },
  };

  const r = responses[lang] ?? responses.en;

  if (q.includes('rain') || q.includes('बारिश')) return r.rain;
  if (q.includes('soil') || q.includes('मिट्टी')) return r.soil;
  if (q.includes('crop') || q.includes('फसल'))   return r.crop;
  if (q.includes('weather') || q.includes('मौसम')) return r.weather;
  if (q.includes('insurance') || q.includes('बीमा')) return r.insurance;
  if (q.includes('price') || q.includes('भाव'))  return r.price;
  if (q.includes('pest') || q.includes('कीट'))   return r.pest;
  return r.default;
}

export function useVoice(language = 'en') {
  const [isListening, setIsListening] = useState(false);
  const [transcript,  setTranscript]  = useState('');
  const [response,    setResponse]    = useState('');
  const [isSpeaking,  setIsSpeaking]  = useState(false);
  const [error,       setError]       = useState(null);
  const [supported,   setSupported]   = useState(true);

  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);

  useEffect(() => {
    if (!SpeechRecognition) { setSupported(false); }
  }, []);

  /* ── Text to Speech ── */
  const speak = useCallback((text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang   = language === 'hi' ? 'hi-IN' : 'en-IN';
    utt.rate   = 0.92;
    utt.pitch  = 1;

    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utt);
  }, [language]);

  /* ── Start Listening ── */
  const startListening = useCallback(() => {
    if (!SpeechRecognition || isListening) return;
    setError(null);
    setTranscript('');
    setResponse('');

    const recognition = new SpeechRecognition();
    recognition.lang         = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous   = false;
    recognition.interimResults = true;

    recognition.onstart  = () => setIsListening(true);
    recognition.onresult = (e) => {
      const text = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('');
      setTranscript(text);
    };
    recognition.onend = () => {
      setIsListening(false);
      /* Generate and speak response */
      setTranscript(prev => {
        if (prev.trim()) {
          const ans = getAIResponse(prev, language);
          setResponse(ans);
          setTimeout(() => speak(ans), 300);
        }
        return prev;
      });
    };
    recognition.onerror = (e) => {
      setIsListening(false);
      setError(e.error === 'not-allowed' ? 'Microphone permission denied.' : 'Could not understand. Try again.');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [language, isListening, speak]);

  /* ── Stop Listening ── */
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  /* ── Stop Speaking ── */
  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  /* Cleanup */
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      synthRef.current?.cancel();
    };
  }, []);

  return {
    isListening, transcript, response, isSpeaking, error, supported,
    startListening, stopListening, speak, stopSpeaking,
  };
}
