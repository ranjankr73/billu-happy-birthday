import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export default function Countdown({ releaseTime }) {
  const [remaining, setRemaining] = useState(releaseTime.diff(dayjs(), "second"));
  const [audioStarted, setAudioStarted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [audio, setAudio] = useState(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const nicknames = ["Billu", "Jaan", "Rani", "Billauti"];

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = releaseTime.diff(dayjs(), "second");
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [releaseTime]);

  // Music setup
  useEffect(() => {
    const bg = new Audio("/ambient.mp3");
    bg.loop = true;
    bg.volume = 0;
    setAudio(bg);
    setIsReadyToPlay(true);
    return () => bg.pause();
  }, []);

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
    }, 120);
  };

  const handleStartAudio = () => {
    if (isReadyToPlay && !audioStarted && audio) {
      audio.play();
      fadeIn(audio);
      setAudioStarted(true);
      setShowHint(false);
      setIsReadyToPlay(false);
    }
  };

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center w-20 sm:w-24 md:w-28 relative mx-2">
      <span className="block text-5xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-100 to-red-500 drop-shadow-[0_0_12px_rgba(255,0,0,0.6)]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-widest text-red-100 opacity-90">{label}</span>
    </div>
  );

  const Separator = () => (
    <span className="text-4xl md:text-6xl text-red-300 opacity-50 font-script mx-1 md:mx-2">:</span>
  );

  const format = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return (
      <div className="flex justify-center items-center">
        <TimeBlock value={h} label="Hours" />
        <Separator />
        <TimeBlock value={m} label="Minutes" />
        <Separator />
        <TimeBlock value={s} label="Seconds" />
      </div>
    );
  };

  // Aurora background
  const BackgroundAurora = () => (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-[#1a0018] via-[#420016] to-[#240010]"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 18,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{ backgroundSize: "300% 300%" }}
    ></motion.div>
  );

  // Main render
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-center text-red-100 font-serif"
      onClick={handleStartAudio}
      onTouchStart={handleStartAudio}
    >
      <BackgroundAurora />

      {/* Stars */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-60">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-red-100 rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.6,
            }}
          ></span>
        ))}
      </div>

      {/* Central heart */}
      <motion.div
        className="absolute text-[14rem] md:text-[22rem] z-30 text-[#B00000] drop-shadow-[0_0_50px_rgba(255,0,0,0.9)]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        ❤️
      </motion.div>

      <div className="absolute inset-0 z-[60] pointer-events-none">
  {Array.from({ length: 25 }).map((_, i) => (
    <motion.span
      key={`heart-${i}`}
      className="absolute text-[#ff4d6d] drop-shadow-[0_0_10px_rgba(255,100,120,0.8)]"
      initial={{ x: `${Math.random() * 100}vw`, y: "110vh", opacity: 0.3 }}
      animate={{
        x: `${Math.random() * 100}vw`,
        y: "-120vh",
        rotate: [0, 15, -10, 20, 0],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 18 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5,
      }}
      style={{ fontSize: `${Math.random() * 18 + 12}px`, willChange: "transform,opacity" }}
    >
      ❤️
    </motion.span>
  ))}

  {Array.from({ length: 12 }).map((_, i) => (
    <motion.span
      key={`name-${i}`}
      className="absolute text-pink-200 font-serif drop-shadow-[0_0_8px_rgba(255,150,200,0.9)]"
      initial={{ x: `${Math.random() * 100}vw`, y: "100vh", opacity: 0.4 }}
      animate={{
        x: `${Math.random() * 100}vw`,
        y: "-120vh",
        rotate: [0, 10, -10, 15, 0],
        opacity: [0.4, 0.9, 0.4],
      }}
      transition={{
        duration: 25 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 6,
      }}
      style={{ fontSize: `${Math.random() * 22 + 10}px`, willChange: "transform,opacity" }}
    >
      {nicknames[Math.floor(Math.random() * nicknames.length)]}
    </motion.span>
  ))}
</div>

      <motion.div
        className="relative z-40 flex flex-col items-center p-6 sm:p-8 bg-white/10 rounded-3xl border border-red-200/10 shadow-[0_0_40px_rgba(255,0,0,0.15)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white drop-shadow-[0_0_18px_rgba(255,0,0,0.8)] mb-6">
          A surprise will bloom soon 💋
        </h1>

        <div className="w-full">
          {remaining > 0 ? (
            format(remaining)
          ) : (
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-red-200 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              It's Time ❤️
            </motion.div>
          )}
        </div>

        <p className="mt-5 text-base sm:text-lg text-red-100 italic font-light tracking-widest">
          Every second brings me closer to you 💞
        </p>
      </motion.div>

      {showHint && (
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center text-red-200 text-sm italic tracking-widest z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Tap / Click anywhere to begin the melody 🎶
        </motion.div>
      )}
    </div>
  );
}
