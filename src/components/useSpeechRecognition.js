import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(selectedLanguage = "en-IN") {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition not supported");
      console.error("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      console.log("🎤 Mic started");
      setError(null);
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Mic stopped");
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let text = "";

      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      console.log("📝 Transcript:", text);
      setTranscript(text);
    };

    recognition.onerror = (e) => {
      console.log("❌ Speech Error:", e.error);
      
      if (e.error === 'no-speech') {
        // Just stop listening, don't treat as a persistent error
        setIsListening(false);
      } else {
        setError(e.error);
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [selectedLanguage]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      setError(null);
      recognitionRef.current.abort(); // reset if already running
      recognitionRef.current.start();
    } catch (err) {
      console.log("Start error:", err);
      setError("Failed to start microphone");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
  };
}