import React from "react";
import { Routes, Route } from "react-router-dom";
import Countdown from "./components/Countdown";
import Reveal from "./components/Reveal";
import dayjs from "dayjs";

export default function App() {
  // 🕛 Define the reveal time (update this to her birthday)
  const releaseTime = dayjs("2025-11-14T00:00:00"); // yyyy-mm-ddThh:mm:ss

  return (
    <Routes>
      {/* Default page */}
      <Route path="/" element={<Countdown releaseTime={releaseTime} />} />

      {/* Reveal page */}
      <Route path="/reveal" element={<Reveal />} />

      {/* Optional fallback route */}
      <Route
        path="*"
        element={
          <div className="h-screen flex items-center justify-center text-2xl text-pink-200 bg-black">
            Page not found 💔
          </div>
        }
      />
    </Routes>
  );
}
