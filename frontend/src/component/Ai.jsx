import React, { useContext, useRef, useState } from 'react';
import ai from "../assets/ai.png";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const recognitionRef = useRef(null);
  const openingSound = useRef(new Audio(open));

  // ✅ Initialize speech recognition once
  if (!recognitionRef.current && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognitionRef.current = recognition;
  }

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      toast.error("Speech recognition not supported.");
      return;
    }

    // Prevent multiple starts
    if (activeAi) return;

    setActiveAi(true);
    openingSound.current.play();
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice command:", transcript);

      if (transcript.includes("search") && transcript.includes("open")) {
        speak("Opening search");
        setShowSearch(true);
        navigate("/collection");
      } else if (transcript.includes("search") && transcript.includes("close")) {
        speak("Closing search");
        setShowSearch(false);
      } else if (transcript.includes("collection") || transcript.includes("product")) {
        speak("Opening collections");
        setShowSearch(false);
        navigate("/collection");
      } else if (transcript.includes("home")) {
        speak("Going to home page");
        setShowSearch(false);
        navigate("/");
      } else if (transcript.includes("about")) {
        speak("Opening about page");
        setShowSearch(false);
        navigate("/about");
      } else if (transcript.includes("cart")) {
        speak("Opening your cart");
        setShowSearch(false);
        navigate("/cart");
      } else if (transcript.includes("contact")) {
        speak("Opening contact page");
        setShowSearch(false);
        navigate("/contact");
      } else if (transcript.includes("order")) {
        speak("Opening your orders");
        setShowSearch(false);
        navigate("/order");
      } else {
        speak("Command not recognized. Try again.");
        toast.error("Command not recognized");
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech error:", err);
      toast.error("Error using microphone.");
    };

    recognition.onend = () => {
      setActiveAi(false);
    };
  };

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-[999]'
      onClick={handleVoiceCommand}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer transition-transform duration-300 ease-in-out ${
          activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'scale-100'
        }`}
        style={{
          filter: activeAi
            ? 'drop-shadow(0px 0px 30px #00d2fc)'
            : 'drop-shadow(0px 0px 20px black)',
        }}
      />
    </div>
  );
}

export default Ai;
