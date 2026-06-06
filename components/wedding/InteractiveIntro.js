"use client";
import { useEffect, useState } from "react";

export default function InteractiveIntro({ onOpened }) {
  const [isMounted, setIsMounted] = useState(false);
  const [showName, setShowName] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);

      // 👉 cho name xuất hiện sớm hơn animation kết thúc
      setTimeout(() => {
        setShowName(true);
        if (onOpened) onOpened();
      }, 1200); // ❌ không phải 2000 nữa
    }, 500);

    return () => clearTimeout(timer);
  }, [onOpened]);

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-[#fcfaf6] text-center px-3 pt-10 pb-10 select-none overflow-x-hidden">
      {/* HEADER */}
      <div className=" mb-30 md:mb-14">
        {/* KHUNG GÓC TRÁI TRÊN */}
        <img
          src="/images/khung.png"
          alt=""
          className="absolute -top-5 -left-5 w-40 md:w-16 z-20 -rotate-90 pointer-events-none"
        />

        {/* KHUNG GÓC PHẢI TRÊN */}
        <img
          src="/images/khung.png"
          alt=""
          className="absolute -top-5 -right-5 w-40 md:w-16 z-20 pointer-events-none"
        />

        <span className="font-serif text-[10px] tracking-[0.35em] text-gray-400 uppercase block mb-1">
          THIỆP
        </span>

        <h2 className="font-serif text-2xl text-[#8b1c25] italic tracking-wide font-light">
          Mời Cưới
        </h2>

        <div className="w-11 h-11 mx-auto my-3 flex items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#fdfbf7] text-[#d4af37] text-lg font-serif">
          囍
        </div>
      </div>

      {/* ENVELOPE SECTION */}
      <div className="relative mb-5 md:mb-4 w-[90%] mx-auto h-[370px]">
        <img
          src="/images/letter_envelope.png"
          className="absolute bottom-0 left-0 right-0 mx-auto z-[10] pointer-events-none scale-170"
        />

        <div
          className="absolute left-1/2 bottom-0 w-[74%] z-20"
          style={{
            transform: isMounted
              ? "translate(-50%, -85px)"
              : "translate(-50%, 240px)",
            opacity: isMounted ? 1 : 0,
            transition:
              "transform 2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out",
          }}
        >
          <div className="h-[360px] rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
            <img
              src="/images/hero-section.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <img
          src="/images/frontofenvelope.png"
          className="absolute bottom-0 mx-auto z-30 pointer-events-none scale-150"
        />

        <div className="absolute bottom-3 left-1/2 z-50 -translate-x-1/2">
          <img
            src="/images/seal.png"
            className="w-10 sm:w-12 md:w-14 lg:w-16 h-auto"
          />
        </div>
      </div>

      {/* ================= NAME SECTION (ĐƯA XUỐNG DƯỚI CÙNG) ================= */}

      <div
        className={`mt-8 overflow-hidden py-2 transition-all duration-700 ${
          showName ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div
          className="font-serif text-xl text-gray-800 flex items-center justify-center space-x-2 whitespace-nowrap"
          style={{
            transform: isMounted ? "translateX(0)" : "translateX(120px)",
            opacity: isMounted ? 1 : 0,
            transition:
              "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out",
            transitionDelay: "0.2s",
          }}
        >
          <span className="font-great-vibes text-gray-900 tracking-wide ">
            Thu Thảo
          </span>

          <span className="text-red-500 text-sm animate-pulse mx-1">❤️</span>

          <span className="font-great-vibes  text-gray-900 tracking-wide">
            Trọng Nghĩa
          </span>
        </div>

        <div
          className="h-[1px] w-40 mx-auto mt-3 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          style={{ opacity: isMounted ? 1 : 0 }}
        />

        <p
          className="text-sm text-gray-500 font-serif mt-2 tracking-[0.15em]"
          style={{ opacity: isMounted ? 1 : 0 }}
        >
          03.07.2026 <br />
          10.07.2026
        </p>
      </div>
      {/* DECORATIVE BOTTOM FLOWER */}
    </div>
  );
}
