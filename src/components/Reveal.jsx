import React, { useState } from "react";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

export default function Reveal() {
  const [started, setStarted] = useState(false);
  const [burstPlayed, setBurstPlayed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showTogetherness, setShowTogetherness] = useState(false);
  
  // New States for the next steps
  const [showDanceMessage, setShowDanceMessage] = useState(false);
  const [showVideoLayout, setShowVideoLayout] = useState(false); // To show video in a layout
  const [showVideo, setShowVideo] = useState(false); // To play the video
  
  const [showSayari, setShowSayari] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showFriendsPhotos, setShowFriendsPhotos] = useState(false);
  
  const hangingPhotos = ["/photos/photo2.jpeg","/photos/photo3.jpeg", "/photos/photo4.jpeg", "/photos/photo6.jpeg", "/photos/photo8.jpeg", "/photos/photo10.jpeg", "/photos/photo11.jpeg"];
  const togethernessPhotos = ["/photos/together1.jpeg","/photos/together2.jpeg", "/photos/together3.jpeg", "/photos/together4.jpeg", "/photos/together5.jpeg", "/photos/together6.jpeg", "/photos/together7.jpeg", "/photos/together8.jpeg", "/photos/together9.jpeg", "/photos/together10.jpeg", "/photos/together11.jpeg", "/photos/together12.jpeg", "/photos/together13.jpeg", "/photos/together14.jpeg", "/photos/together15.jpeg", "/photos/together16.jpeg", "/photos/together17.jpeg", "/photos/together18.jpeg"];
  const friendsPhotos = ["/photos/friend1.jpeg", "/photos/friend2.jpeg", "/photos/friend3.jpeg"]; // Assume you have these paths
  const togethernessAudioRef = React.useRef(null);
  const sayariAudioRef = React.useRef(null);

  // 🔧 now audio starts only after real click
  const handleStart = async () => {
    if (started) return;
    setStarted(true);

    // burst sound
    const burst = new Audio("/burst.mp3");
    burst.play().catch(() => {});

    setBurstPlayed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // small delay before cake + song
    setTimeout(() => {
      setShowCake(true);
      const song = new Audio("/bdaysong.mp3");
      song.volume = 0.8;
      song.loop = false;
      song.play().catch(() => {});
      
      // stop song and show video reel after 30 s
      setTimeout(() => {
        song.pause();
        setShowCake(false); // Hide the cake scene
        setShowTogetherness(true);
togethernessAudioRef.current.play().catch(() => {});
      }, 35000);
    }, 800);
  };
  
  // New function to handle the transition after Togetherness Reel
  const handleTogethernessEnd = () => {

    togethernessAudioRef.current.pause();
togethernessAudioRef.current.currentTime = 0;

  
    setShowTogetherness(false);
    setShowDanceMessage(true); // Show "Now it's time for dance"
    
    // After 3-4 seconds, hide message and show video layout with video
    setTimeout(() => {
      setShowDanceMessage(false);
      setShowVideoLayout(true);
      setShowVideo(true);
    }, 3500); // 3.5 seconds delay for the message
  };

  const handleVideoEnd = () => {
  setShowVideo(false);
  setShowVideoLayout(false);

  setTimeout(() => {
    setShowSayari(true);

    // 🔊 Play soft background music in loop
    sayariAudioRef.current.currentTime = 0;
    sayariAudioRef.current.play().catch(() => {});

    // Show button after 5 seconds
    setTimeout(() => {
      setShowButton(true);
    }, 5000);

  }, 1000);
};


  
  const handleButtonClick = () => {
  // stop sayari music immediately
  sayariAudioRef.current.pause();
  sayariAudioRef.current.currentTime = 0;

  setShowSayari(false);
  setShowButton(false);
  setShowFinalMessage(true);

  setTimeout(() => {
    setShowFriendsPhotos(true);
  }, 4000);
};
  
  const handleFinalEnd = () => {
      setShowFinalMessage(false);
      setShowFriendsPhotos(false);
      // Optional: Reset state or show a final static screen
  }

  if (!togethernessAudioRef.current) {
  togethernessAudioRef.current = new Audio("/togethersong.mp3");
  togethernessAudioRef.current.loop = false;  // Because you want 1:17 exact duration
  togethernessAudioRef.current.volume = 0.8;
}

if (!sayariAudioRef.current) {
  sayariAudioRef.current = new Audio("/sayarisong.mp3");
  sayariAudioRef.current.loop = true;
  sayariAudioRef.current.volume = 0.25;
}

  return (
    <div
      onClick={handleStart}
      onTouchStart={handleStart}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#2a001a] via-[#3b001a] to-[#110009] text-center text-pink-100"
    >
      {/* 🎊 Confetti */}
      {showConfetti && (
        // ... (ConfettiExplosion components remain the same)
        <>
          <div className="absolute inset-0 flex items-center justify-center z-[90]">
            <ConfettiExplosion
              force={0.9}
              duration={3000}
              particleCount={200}
              width={1600}
              floorHeight={800}
              colors={["#ff4d6d","#ffc1cc","#fff0f5","#ffd6e0","#ffffff","#ff85a1"]}
            />
          </div>
          <div className="absolute bottom-0 left-0">
            <ConfettiExplosion force={0.6} particleCount={100} width={900} />
          </div>
          <div className="absolute bottom-0 right-0">
            <ConfettiExplosion force={0.6} particleCount={100} width={900} />
          </div>
        </>
      )}

      {/* ✨ Burst Particles */}
      {burstPlayed && (
        // ... (Burst Particles motion components remain the same)
        <div className="absolute inset-0 flex items-center justify-center z-[70] overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2;
            const distance = 200 + Math.random() * 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.span
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,150,180,1) 0%, rgba(255,100,150,0.5) 60%, transparent 100%)",
                  filter: "blur(1px)",
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x, y, scale: [0, 1.2, 1], opacity: [1, 0.8, 0] }}
                transition={{ duration: 1.3 + Math.random() * 0.5, ease: "easeOut" }}
              />
            );
          })}
        </div>
      )}

      {/* 🎂 Decorated Cake Scene */}
      {showCake && (
        <div className="relative z-40 flex flex-col items-center justify-center w-full h-full">

          {/* 💗 Glowing aura behind cake */}
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full bg-pink-500/30 blur-3xl"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: [0.9, 1.1, 1], opacity: [0.4, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          />

          {/* ✨ Light rays */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute w-1 h-52 bg-gradient-to-t from-pink-300/40 to-transparent origin-bottom"
              style={{ rotate: i * 22.5 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
            />
          ))}

          {/* 🎂 Cake */}
          <motion.img
            src="/cake.png"
            alt="cake"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.1, 1], opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative w-64 md:w-80 drop-shadow-[0_0_25px_rgba(255,150,180,0.9)]"
          />

          {/* 🎉 “Happy Birthday Billu ❤️” */}
          <motion.h2
            className="mt-6 text-3xl md:text-5xl text-pink-300 drop-shadow-[0_0_25px_rgba(255,100,150,0.9)] font-semibold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [0.9, 1.05, 1] }}
            transition={{ delay: 0.8, duration: 2 }}
          >
            Happy Birthday Billu ❤️
          </motion.h2>

          {/* 🖼️ Hanging photo garland */}
          <div className="absolute top-10 left-0 right-0 flex justify-center flex-wrap gap-10 px-10 z-30">
            {[
              ...hangingPhotos
            ].map((photo, i) => {
              const gentleX = (i % 2 === 0 ? -1 : 1) * 10;
              return (
                <motion.div
                  key={`garland-${i}`}
                  className="relative w-28 h-36 md:w-40 md:h-48 bg-pink-100/10 border border-pink-300/30 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: [0, 4, -3, 0],
                    x: [0, gentleX, -gentleX, 0],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* thin hanging string */}
                  <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 w-[2px] h-10 bg-white" />
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  {/* optional clip */}
                  <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-200 rounded-sm shadow-sm" />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🌅 5.5 Years of Togetherness Reel */}
      {showTogetherness && (
        <div className="absolute inset-0 z-[50] overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-sm">

          {/* Slowly sliding photos */}
          <motion.div
            className="absolute flex gap-6"
            initial={{ x: "100%" }}
            animate={{ x: "-120%" }}
            transition={{ duration: 77, ease: "linear", repeat: Infinity }}
          >
            {togethernessPhotos.map((p, i) => (
              <motion.img
                key={`together-${i}`}
                src={p}
                className="w-64 h-80 object-cover rounded-3xl shadow-lg border border-pink-200/20 opacity-90"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
              />
            ))}
          </motion.div>

          {/* Center Text Overlay */}
          <motion.h1
            className="text-4xl md:text-6xl text-pink-200 font-semibold drop-shadow-[0_0_25px_rgba(255,100,150,0.8)] tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            5.5 Years of Togetherness ❤️
          </motion.h1>

          {/* Use a functional component structure for the timeout */}
          <TogethernessReelTimer onComplete={handleTogethernessEnd} duration={120000} />
        </div>
      )}
      
      {/* 💃 Now it's time for dance message */}
      {showDanceMessage && (
          <motion.div
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
          >
              <motion.h1
                  className="text-4xl md:text-7xl text-pink-300 font-bold tracking-wider drop-shadow-[0_0_20px_rgba(255,100,150,0.9)]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              >
                  Now it's time for dance 💃
              </motion.h1>
          </motion.div>
      )}

      {/* 📹 Video Layout */}
      {showVideoLayout && (
          <motion.div
              className="relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-[70%] md:h-[80%] z-[70] bg-black/90 p-4 rounded-3xl shadow-2xl border-4 border-pink-500/80 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
          >
              {showVideo && (
                  <motion.video
                      key="video"
                      src="/video.mp4"
                      autoPlay
                      onEnded={handleVideoEnd}
                      controls={false}
                      className="w-full h-full object-contain rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                  />
              )}
          </motion.div>
      )}

      {showSayari && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-pink-200 text-lg md:text-2xl font-serif leading-relaxed px-6 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <p className="text-center">
            “Tere muskurane se meri duniya roshan hai,<br/>
            Tere hone se hi meri zindagi mehkaati hai,<br/>
            Tujhse juda soch bhi nahi sakta main,<br/>
            Tu meri dhadkan, meri saanson ki raahat hai…” 💫
          </p>
          <motion.h2
            className="mt-6 text-3xl md:text-5xl text-pink-400 drop-shadow-[0_0_25px_rgba(255,100,150,0.9)] font-semibold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
            transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            Happy Birthday Meri Jaan ❤️
          </motion.h2>
          
          {/* Button that appears */}
          {showButton && (
            <motion.button
              onClick={handleButtonClick}
              className="mt-10 px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Continue the Celebration!
            </motion.button>
          )}
        </motion.div>
      )}
      
      {/* 🎉 Final Message Screen */}
      {showFinalMessage && (
          <motion.div
              className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-t from-[#4a002a] to-[#2a001a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
          >
              <motion.h1
                  className="text-4xl md:text-6xl text-yellow-300 font-bold tracking-wider drop-shadow-[0_0_20px_rgba(255,200,50,0.9)] mb-10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              >
                  It's your day Jaan, enjoy it with your friends! 🥳
              </motion.h1>
              
              {showFriendsPhotos && (
                  <div className="flex gap-4 md:gap-8 mt-10">
                      {friendsPhotos.map((photo, i) => (
                          <motion.img
                              key={`friend-${i}`}
                              src={photo}
                              className="w-36 h-48 md:w-48 md:h-64 object-cover rounded-xl shadow-2xl border-4 border-pink-300"
                              initial={{ scale: 0, rotate: (i - 1) * 10 }}
                              animate={{ scale: 1, rotate: (i - 1) * 5 }}
                              transition={{ duration: 1, delay: i * 0.3 }}
                          />
                      ))}
                  </div>
              )}
              
              <motion.h2
                  className="mt-16 text-5xl md:text-8xl text-pink-500 font-extrabold tracking-widest drop-shadow-[0_0_20px_rgba(255,100,150,0.9)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 6, duration: 3, onComplete: handleFinalEnd }}
              >
                  THE END
              </motion.h2>
          </motion.div>
      )}

      {/* Hint */}
      {!started && (
        <motion.div
          className="absolute bottom-12 text-pink-200 text-base italic tracking-widest z-50"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Tap anywhere to begin the magic ✨
        </motion.div>
      )}
    </div>
  );
}

// Helper component to manage the timeout for the togetherness reel
// Using a component for this is cleaner than a raw setTimeout inside the render block
function TogethernessReelTimer({ onComplete, duration }) {
    React.useEffect(() => {
        const timer = setTimeout(onComplete, duration);
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [onComplete, duration]);
    return null;
}