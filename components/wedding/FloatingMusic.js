"use client";
"use client";
import { useState, useEffect, useRef } from "react";

export default function FloatingMusic({
  src = "/musics/nen.mp3",
  targetSectionId,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Khởi tạo audio ngầm
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;

    // Trình duyệt chặn tự động phát nhạc, cần đợi tương tác click đầu tiên của khách để phát ổn định
    const handleFirstInteraction = () => {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) =>
          console.log("Chờ người dùng mở bao thư để kích hoạt nhạc"),
        );

      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log(e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrollToTimeline = () => {
    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* 1. NÚT ĐIỀU HƯỚNG CUỘN ĐẾN LỊCH TRÌNH NHANH */}
      <button
        onClick={handleScrollToTimeline}
        className="w-11 h-11 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#8b1c25] hover:scale-105 active:scale-95 transition-all"
        title="Xem lịch trình sự kiện"
      >
        📅
      </button>

      {/* 2. ĐĨA NHẠC XOAY TRÒN */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden bg-white border-2 border-[#d4af37] cursor-pointer active:scale-95 transition-transform ${
          isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
        }`}
      >
        {/* Đĩa vinyl mô phỏng */}
        <div className="absolute inset-1 bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-700">
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
          </div>
        </div>
        {/* Nốt nhạc bay nhỏ bên ngoài biểu thị trạng thái đang phát */}
        {isPlaying && (
          <span className="absolute text-[10px] text-white -top-1 animate-ping">
            🎵
          </span>
        )}
      </button>
    </div>
  );
}