"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define the props for the Slider component
interface SliderProps {
  isMenuOpen: boolean; // Indicates whether the menu is open
  toggleMenu: () => void; // Function to toggle the menu
}

const Slider: React.FC<SliderProps> = ({ isMenuOpen, toggleMenu }) => {
  // State for current time and fun fact
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [funFact, setFunFact] = useState<string>("");

  // Effect to fetch fun fact
  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const response = await fetch(
          "https://uselessfacts.jsph.pl/random.json?language=en"
        );
        const data = await response.json();
        setFunFact(data.text);
      } catch (error) {
        console.error("Error fetching fun fact:", error);
      }
    };

    fetchFunFact();
    const intervalID = setInterval(fetchFunFact, 10000);

    return () => clearInterval(intervalID);
  }, []);

  // Effect to update time every second
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const intervalID = setInterval(updateTime, 1000);

    return () => clearInterval(intervalID);
  }, []);

  // Effect to handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toggleMenu();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toggleMenu]);

  // Function to format the date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to format the time
  const formatTime = (time: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return time.toLocaleTimeString([], options);
  };

  return (
    <motion.nav
      transition={{ type: "spring", damping: 200, stiffness: 1000 }}
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? "0%" : "-110%" }}
      className="fixed inset-0 bg-black h-full w-full z-50"
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        toggleMenu();
      }}
      style={{
        background: "url(https://images8.alphacoders.com/134/1346089.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col justify-center h-full text-primary">
        <div className="absolute flex flex-col items-center w-full top-32 text-white">
          <div className="text-9xl font-bold">{formatTime(currentTime)}</div>
          <div className="font-semibold text-4xl mt-5">
            {formatDate(currentTime)}
          </div>
          <div className="font-semibold text-xl mt-40 w-72 flex flex-col items-center">
            Did you know?
            <div className="mt-3">{funFact}</div>
          </div>
        </div>
        <div className="absolute top-0 flex justify-between w-full h-full py-12 px-32 text-white">
          <a
            href="https://google.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google"
          >
            <div className="material-symbols-outlined">search</div>
          </a>
          <a
            href="https://i.pinimg.com/564x/3a/08/4e/3a084e04a46b5f0cdf09fec54659dc07.jpg"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Photo"
          >
            <div className="material-symbols-outlined">photo_camera</div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Slider;
