"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Quotes about remembrance and memories
const quotes = [
  "Those we love don't go away, they walk beside us every day.",
  "What we once enjoyed and deeply loved we can never lose, for all that we love deeply becomes part of us.",
  "When someone you love becomes a memory, the memory becomes a treasure.",
  "To live in hearts we leave behind is not to die.",
  "The life of the dead is placed in the memory of the living.",
];

export default function EnhancedHero() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Basic video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on load
    video.play().catch(err => {
      console.log("Initial play error:", err);
    });

    // Handle visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && video.paused) {
        video.play().catch(err => {
          console.log("Visibility play error:", err);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Quote rotation
  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="enhanced-hero min-h-screen flex items-center justify-center text-white relative"
      style={{ marginTop: 0 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Floating particles effect */}
      <div className="particles-container absolute inset-0 overflow-hidden z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center z-30 relative flex flex-col items-center justify-center min-h-screen py-16">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-3xl"
          style={{ opacity: 0.3 }}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          {/* Optional: Add a decorative element like a lotus flower or diya */}
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-primary/30 rounded-full"></div>
            <div className="absolute inset-4 bg-primary/40 rounded-full"></div>
            <div className="absolute inset-6 bg-primary/50 rounded-full"></div>
            <div className="absolute inset-8 bg-primary/60 rounded-full"></div>
            <div className="absolute inset-10 bg-white/70 rounded-full animate-ping"></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          In Loving Memory of
          <span className="block mt-2 text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Dushyant
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[2px] w-32 bg-white/50 mx-auto my-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 1 }}
          className="quote-container h-20 flex items-center justify-center mb-2"
        >
          <p className="text-xl md:text-2xl max-w-3xl mx-auto italic font-light text-white">
            "{quotes[currentQuote]}"
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white"
        >
          A beautiful soul who touched our lives in countless ways
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4">
            <a
              href="#about"
              className="bg-white text-black px-8 py-3 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              His Story
            </a>
            <a
              href="#memories"
              className="bg-primary/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              Memories
            </a>
            <a
              href="/photos"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-md hover:bg-white/30 transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              Photo Gallery
            </a>
          </div>

          <a
            href="#tribute"
            className="bg-transparent border border-white px-10 py-3 rounded-md hover:bg-white/10 transition-all transform hover:scale-105 shadow-lg mt-2 font-medium"
          >
            Leave a Tribute
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 mb-4"
        >
          <a
            href="#about"
            className="animate-bounce p-2 inline-block"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
