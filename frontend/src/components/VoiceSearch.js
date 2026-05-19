import React, { useState, useEffect } from 'react';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSearch(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onSearch]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  return (
    <button 
      className={`voice-search-btn ${isListening ? 'listening' : ''}`}
      onClick={startListening}
      title="Voice Search"
    >
      {isListening ? '🎤 Listening...' : '🎤'}
    </button>
  );
};

export default VoiceSearch;