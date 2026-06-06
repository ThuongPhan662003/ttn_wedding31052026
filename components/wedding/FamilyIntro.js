"use client";

import { useEffect, useRef, useState } from "react";

export default function FamilyIntro() {
  const sectionRef = useRef(null);
  const [showCloud, setShowCloud] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCloud(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full max-w-5xl mx-auto px-6 py-8"
    >
      <img
        src="/images/chu_hy_day.png"
        alt=""
        className="absolute top-10 left-0 w-30 md:w-14 -translate-x-1/3 -translate-y-1/3 pointer-events-none z-10 top-10"
      />

      {/* Góc trên phải */}
      <img
        src="/images/chu_hy_day.png"
        alt=""
        className="absolute top-10 right-0 w-30 md:w-14 translate-x-1/3 -translate-y-1/3 pointer-events-none top-10"
      />
      {/* Mây */}
      <img
        src="/images/may.png"
        alt=""
        className={`
          absolute
          right-8
          top-0.9/3
          w-32
          md:w-44
          opacity-70
          pointer-events-none
          ${showCloud ? "animate-cloud-enter" : "opacity-0"}
        `}
      />

      {/* Hoa nền */}
      <img
        src="/images/hoa_tulip.png"
        alt=""
        className="absolute bottom-10 -right-10 w-24 opacity-10 -rotate-20 pointer-events-none"
      />

      <div className="max-w-md mx-auto relative grid grid-cols-[80px_1fr] gap-x-6">
        {/* CỘT TRÁI: title + line */}
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-gray-400 mb-3" />

          <div className="text-2xl md:text-3xl leading-[1.35] font-light text-[#444] text-center">
            <div>Thư</div>
            <div>Mời</div>
            <div>Cưới</div>
          </div>

          <div className="w-px h-10 bg-gray-400 mt-3" />
        </div>

        {/* CỘT PHẢI: nội dung */}
        <div>
          {/* Nhà gái */}
          <div className="mb-14">
            <p className="text-[#8b1c25] text-xs tracking-[0.25em] uppercase mb-3">
              Nhà Gái
            </p>

            <div className="space-y-2 uppercase">
              <p className="font-semibold text-gray-800 text-sm">
                Ông: Phạm Tri
              </p>
              <p className="font-semibold text-gray-800 text-sm">
                Bà: Nguyễn Thị Mỹ Hương
              </p>
            </div>
          </div>

          {/* Nhà trai */}
          <div>
            <p className="text-[#8b1c25] text-xs tracking-[0.25em] uppercase mb-3">
              Nhà Trai
            </p>

            <div className="space-y-2 uppercase">
              <p className="font-semibold text-gray-800 text-sm">
                Ông: Tô Minh Thuận
              </p>
              <p className="font-semibold text-gray-800 text-sm">
                Bà: Phan Thị Lệ Hải
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
