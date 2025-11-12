import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
// import dayjs from "dayjs";
import photo1 from "/photo1.jpg";
import photo2 from "/photo2.jpg";
import photo3 from "/photo3.jpg";
import song from "/song.mp3";

export default function Reveal() {
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState(false);
  const message = "Happy Birthday ❤️\nYou are my favorite reason to smile.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = new Audio(song);
    if (playing) {
      audio.play();
      return () => audio.pause();
    }
  }, [playing]);

  const images = [photo1, photo2, photo3];

  return (
    <div className="relative text-center px-6 py-8 w-full overflow-hidden">
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={250} />

      {/* floating hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 opacity-50 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              fontSize: `${Math.random() * 20 + 14}px`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* typewriter */}
      <motion.h1
        className="whitespace-pre-line text-4xl md:text-5xl font-bold text-pink-200 drop-shadow-lg mb-10 leading-snug"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {text}
      </motion.h1>

      {/* gallery */}
      <div className="flex flex-wrap justify-center gap-6">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="memory"
            className="w-56 h-56 rounded-2xl shadow-xl object-cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.6, duration: 0.8 }}
          />
        ))}
      </div>

      <motion.p
        className="mt-10 text-lg text-pink-100 font-light max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        You’ve brought color to my life, laughter to my soul, and peace to my heart.
        <br /> Thank you for being you. 💕
      </motion.p>

      <motion.button
        onClick={() => setPlaying(!playing)}
        className="mt-8 bg-pink-200 text-pink-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
      >
        {playing ? "⏸ Pause Song" : "🎵 Play Song"}
      </motion.button>
    </div>
  );
}
