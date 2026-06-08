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
    <section ref={sectionRef} className="relative w-[90vw] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Mây */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-32 md:w-56 h-auto overflow-hidden">
            <img
              src="/images/may.png"
              alt=""
              className={`
            w-full
            opacity-70
            ${showCloud ? "animate-cloud-enter" : "opacity-0"}
          `}
            />
          </div>
        </div>

        {/* Nội dung */}
        <div className="order-2 md:order-1">
          <div className="max-w-md mx-auto grid grid-cols-[80px_1fr] gap-x-6">
            {/* Cột trái */}
            <div className="flex flex-col items-center">
              <div className="w-px h-12 bg-gray-400 mb-3" />

              <div className="text-2xl md:text-3xl leading-[1.35] font-light text-[#444] text-center">
                <div>Thư</div>
                <div>Mời</div>
                <div>Cưới</div>
              </div>

              <div className="w-px h-10 bg-gray-400 mt-3" />
            </div>

            {/* Cột phải */}
            <div>
              {/* Nội dung nhà gái + nhà trai */}
              {/* Cột phải */}
              <div>
                {/* Nhà gái */}
                <div className="mb-14">
                  <p className="text-[#8b1c25] text-xs tracking-[0.25em] uppercase mb-3">
                    Nhà Gái
                  </p>

                  <div className="space-y-2 uppercase mb-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      Ông: Phạm Tri
                    </p>
                    <p className="font-semibold text-gray-800 text-sm">
                      Bà: Nguyễn Thị Mỹ Hương
                    </p>
                  </div>

                  <p className="text-gray-800 text-sm leading-6">
                    Đường 28, Khối Hà My Tây,
                    <br />
                    Phường Điện Bàn Đông, TP. Đà Nẵng
                  </p>
                </div>

                {/* Nhà trai */}
                <div>
                  <p className="text-[#8b1c25] text-xs tracking-[0.25em] uppercase mb-3">
                    Nhà Trai
                  </p>

                  <div className="space-y-2 uppercase mb-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      Ông: Tô Minh Thuận
                    </p>
                    <p className="font-semibold text-gray-800 text-sm">
                      Bà: Phan Thị Lệ Hải
                    </p>
                  </div>

                  <p className="text-gray-800 text-sm leading-6">
                    39 Lê Thành Phương, Tổ 29
                    <br />
                    P. Tuy Hòa, Tỉnh Đắk Lắk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
