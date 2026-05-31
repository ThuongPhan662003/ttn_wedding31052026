'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Cấu hình Ngày Cưới của hai bạn để chạy bộ đếm ngược (Định dạng: YYYY-MM-DD)
  const weddingDate = '2026-10-18T11:00:00'; 

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingDate) - +new Date();
      let timeLeftSample = {};

      if (difference > 0) {
        timeLeftSample = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(timeLeftSample);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#333333] flex flex-col items-center justify-between font-sans">
      
      {/* 1. HERO SECTION - Tổng quan phần đầu trang */}
      <section className="relative w-full flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-12">
        {/* Vòng hoa hoặc họa tiết trang trí phía trên tiêu đề */}
        <div className="text-[#D4AF37] text-3xl mb-4 animate-pulse">✨</div>
        
        <p className="text-xs uppercase tracking-[0.3em] text-[#888888] mb-3 font-medium">
          Welcome to Our Wedding
        </p>
        
        {/* Tên cô dâu chú rể sử dụng Font Playfair Display */}
        <h1 
          className="text-5xl md:text-7xl text-[#D4AF37] my-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Trọng Nghĩa <br />
          <span className="text-3xl md:text-4xl block my-2 text-[#FFB7B2] font-light">&amp;</span>
          Thu Thảo
        </h1>

        <p className="text-sm italic text-[#666666] max-w-sm mt-2">
          "Hành trình hạnh phúc bắt đầu từ lời hẹn ước, thân mời bạn ghé thăm không gian ngày cưới của chúng mình."
        </p>

        {/* 2. COUNTDOWN TIMER - Bộ đếm ngược thời gian */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm border border-[#F3E5D8] rounded-2xl p-6 max-w-md w-full shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#888888] mb-4 font-semibold">
            Tiệc Cưới Sẽ Diễn Ra Sau
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#FFF5F5] rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#FFB7B2]">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Ngày</span>
            </div>
            <div className="bg-[#FFF5F5] rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#FFB7B2]">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Giờ</span>
            </div>
            <div className="bg-[#FFF5F5] rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#FFB7B2]">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Phút</span>
            </div>
            <div className="bg-[#FFF5F5] rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#FFB7B2]">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Giây</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU ĐIỀU HƯỚNG NHANH CHO KHÁCH MỜI (Tối ưu Mobile First) */}
      <section className="w-full max-w-md px-4 pb-16 space-y-4">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-2">
          Khám phá các phân sảnh
        </p>

        <Link href="/our-story" className="block">
          <div className="w-full bg-white hover:bg-[#FFF5F5] transition-all border border-[#F3E5D8] rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-serif text-lg text-[#D4AF37] group-hover:text-[#FFB7B2] transition-colors">
                📖 Our Love Story
              </h3>
              <p className="text-xs text-gray-400 mt-1">Xem album ảnh cưới & hành trình yêu nhau</p>
            </div>
            <span className="text-[#D4AF37] text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>

        <Link href="/send-wish" className="block">
          <div className="w-full bg-white hover:bg-[#FFF5F5] transition-all border border-[#F3E5D8] rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-serif text-lg text-[#D4AF37] group-hover:text-[#FFB7B2] transition-colors">
                ✍️ Send Wishes & Photo
              </h3>
              <p className="text-xs text-gray-400 mt-1">Gửi câu chúc ngọt ngào & chụp ảnh tại tiệc</p>
            </div>
            <span className="text-[#D4AF37] text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>

        <Link href="/wishbook" className="block">
          <div className="w-full bg-white hover:bg-[#FFF5F5] transition-all border border-[#F3E5D8] rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-serif text-lg text-[#D4AF37] group-hover:text-[#FFB7B2] transition-colors">
                ✨ Wedding Wishbook
              </h3>
              <p className="text-xs text-gray-400 mt-1">Sảnh trình chiếu tất cả lời chúc của mọi người</p>
            </div>
            <span className="text-[#D4AF37] text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>
      </section>

      {/* Footer bản quyền nhẹ nhàng */}
      <footer className="w-full py-4 text-center text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-100 bg-white/40">
        Nghĩa &amp; Thương Wedding © 2026
      </footer>

    </main>
  );
}