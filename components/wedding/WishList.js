"use client";

import { useEffect, useState } from "react";
import WishCard from "./WishCard";

export default function WishList() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data?.data || data || []);
    };

    fetchWishes();
    const interval = setInterval(fetchWishes, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-3">
      {/* FIXED PANEL */}
      <div className="relative border border-[#8b1c25]/40 rounded-xl bg-[#fffaf5] shadow-md">
        {/* HEADER (optional đẹp hơn) */}
        <div className="sticky top-0 z-10 bg-[#fffaf5] border-b border-[#d4af37]/30 px-4 py-3">
          <h2 className="text-[#8b1c25] font-serif text-lg tracking-wide">
            Lời Chúc
          </h2>
        </div>

        {/* SCROLL AREA */}
        <div className="h-[75vh] overflow-y-auto divide-y divide-[#d4af37]/20">
          {wishes.map((item, i) => (
            <div
              key={i}
              className={i % 2 === 0 ? "bg-[#fffaf5]" : "bg-[#f7efe6]"}
            >
              <WishCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
