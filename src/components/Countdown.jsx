import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export default function Countdown({ releaseTime }) {
  const [remaining, setRemaining] = useState(releaseTime.diff(dayjs(), "second"));
  const [audioStarted, setAudioStarted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [audio, setAudio] = useState(null);

  // ✨ your girlfriend's nickname (edit this)
  const nicknames = ["Billu", "Jaan", "Rani", "Billauti"]; // 💖 put her name or nickname here

  // countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = releaseTime.diff(dayjs(), "second");
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [releaseTime]);

  // 🎵 setup background audio with fade control
  useEffect(() => {
    const bg = new Audio("/src/assets/ambient.mp3");
    bg.loop = true;
    bg.volume = 0;
    setAudio(bg);

    // attempt autoplay quietly
    bg.play().then(() => fadeIn(bg)).catch(() => {});

    return () => fadeOut(bg);
  }, []);

  // fade in smoothly
  const fadeIn = (bg) => {
    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.02;
      if (vol >= 0.4) {
        bg.volume = 0.4;
        clearInterval(fade);
      } else {
        bg.volume = vol;
      }
    }, 100);
  };

  // fade out on exit
  const fadeOut = (bg) => {
    if (!bg) return;
    let vol = bg.volume;
    const fade = setInterval(() => {
      vol -= 0.03;
      if (vol <= 0) {
        bg.volume = 0;
        clearInterval(fade);
        bg.pause();
      } else {
        bg.volume = vol;
      }
    }, 80);
  };

  const handleStartAudio = () => {
    if (!audioStarted && audio) {
      fadeIn(audio);
      audio.play();
      setAudioStarted(true);
      setShowHint(false);
    }
  };

  const format = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-center bg-linear-to-b from-[#0a0012] via-[#320a35] to-[#8b0848] text-pink-100"
      onClick={handleStartAudio}
      onTouchStart={handleStartAudio}
    >
      {/* 🌌 Twinkling stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-pink-200 rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.8,
            }}
          ></span>
        ))}
      </div>

      {/* ❤️ Pulsing heart */}
      <motion.div
        className="absolute text-7xl md:text-8xl z-10 drop-shadow-[0_0_15px_rgba(255,105,180,0.6)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        ❤️
      </motion.div>

      {/* Countdown text */}
      <motion.div
        className="relative z-20 mt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-pink-200 drop-shadow-lg">
          A surprise will bloom soon 🌸
        </h1>
        <p className="mt-4 text-2xl font-bold text-pink-300 tracking-wide">
          Unlocking in {format(remaining)}
        </p>
        <p className="mt-3 text-pink-200 italic opacity-90">
          Every second brings me closer to you 💫
        </p>
      </motion.div>

      {/* 💖 Floating hearts */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 opacity-70 animate-float-smooth select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              fontSize: `${Math.random() * 24 + 14}px`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* 💕 Floating nickname text */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-200 font-semibold drop-shadow-[0_0_12px_rgba(255,192,203,0.7)] animate-float-slow select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 14}px`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: 0.8,
            }}
          >
            {nicknames[Math.floor(Math.random() * nicknames.length)]}
          </motion.span>
        ))}
      </div>

      {/* 🌙 "Click anywhere" hint */}
      {showHint && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 text-center text-pink-200 text-sm italic tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Click anywhere to begin 🌙
        </motion.div>
      )}
    </div>
  );
}
