// utils/speechRecognition.js
export const startListening = (onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  
    recognition.start();
  };
  