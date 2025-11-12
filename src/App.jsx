import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Countdown from "./components/Countdown";
import Reveal from "./components/Reveal";

const RELEASE_TIME = dayjs("2025-11-15T00:00:00");

export default function App() {
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (dayjs().isAfter(RELEASE_TIME)) {
        setIsReleased(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-linear-to-b from-black via-purple-900 to-pink-900 text-white flex items-center justify-center">
      {isReleased ? (
        <Reveal />
      ) : (
        <Countdown releaseTime={RELEASE_TIME} />
      )}
    </div>
  );
}
