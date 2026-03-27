import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(selectedLanguage = "en-IN") {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      console.log("🎤 Mic started");
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

    // 🔥 ADD THIS HERE (VERY IMPORTANT)
    recognition.onerror = (e) => {
      console.log("❌ Speech Error:", e.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [selectedLanguage]);

 const startListening = () => {
  if (!recognitionRef.current) return;

  try {
    recognitionRef.current.abort(); // reset if already running
    recognitionRef.current.start();
  } catch (err) {
    console.log("Start error:", err);
  }
};

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
  };
}