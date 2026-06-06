"use client";

import { useState, useEffect } from "react";
import { Music2, VolumeX } from "lucide-react";

export default function FloatingMusic({
  audioRef,
  targetSectionId,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef?.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const togglePlay = async () => {
    const audio = audioRef?.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleScrollToTimeline = () => {
    if (!targetSectionId) return;

    const el = document.getElementById(targetSectionId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={handleScrollToTimeline}
        className="
          w-12 h-12
          bg-white
          rounded-full
          shadow-lg
          border
          flex items-center justify-center
          hover:scale-105
          transition
        "
      >
        📅
      </button>

      <button
        onClick={togglePlay}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className="
          relative
          w-14 h-14
          rounded-full
          bg-white
          border-2 border-[#d4af37]
          shadow-xl
          flex items-center justify-center
          transition-all
          hover:scale-105
          active:scale-95
        "
      >
        {isPlaying ? (
          <>
            <Music2 size={26} className="text-[#8b1c25]" />

            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
          </>
        ) : (
          <VolumeX size={26} className="text-gray-500" />
        )}
      </button>
    </div>
  );
}