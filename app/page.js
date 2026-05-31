'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
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
    <main className="min-h-screen bg-wedding-bg text-wedding-dark flex flex-col items-center justify-between font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-12">
        <div className="text-wedding-gold text-3xl mb-4 animate-pulse">✨</div>
        
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 font-medium">
          Welcome to Our Wedding
        </p>
        
        {/* Đã sử dụng class font-arcittya và text-wedding-gold ở đây */}
        <h1 className="font-arcittya text-5xl md:text-7xl text-wedding-gold my-4 leading-tight">
          Trọng Nghĩa <br />
          <span className="text-3xl md:text-4xl block my-2 text-wedding-pink font-light">&amp;</span>
          Thu Thảo
        </h1>

        <p className="text-sm italic text-gray-600 max-w-sm mt-2">
          "Hành trình hạnh phúc bắt đầu từ lời hẹn ước, thân mời bạn ghé thăm không gian ngày cưới của chúng mình."
        </p>

        {/* 2. COUNTDOWN TIMER */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm border border-wedding-gold/20 rounded-2xl p-6 max-w-md w-full shadow-sm">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">
            Tiệc Cưới Sẽ Diễn Ra Sau
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-wedding-pastel rounded-xl p-3">
              <span className="block text-2xl font-bold text-wedding-pink">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Ngày</span>
            </div>
            <div className="bg-wedding-pastel rounded-xl p-3">
              <span className="block text-2xl font-bold text-wedding-pink">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Giờ</span>
            </div>
            <div className="bg-wedding-pastel rounded-xl p-3">
              <span className="block text-2xl font-bold text-wedding-pink">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Phút</span>
            </div>
            <div className="bg-wedding-pastel rounded-xl p-3">
              <span className="block text-2xl font-bold text-wedding-pink">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400">Giây</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU ĐIỀU HƯỚNG */}
      <section className="w-full max-w-md px-4 pb-16 space-y-4">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-2">
          Khám phá các phân sảnh
        </p>

        <Link href="/our-story" className="block">
          <div className="w-full bg-white hover:bg-wedding-pastel transition-all border border-wedding-gold/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-playfair text-lg text-wedding-gold group-hover:text-wedding-pink transition-colors">
                📖 Our Love Story
              </h3>
              <p className="text-xs text-gray-400 mt-1">Xem album ảnh cưới & hành trình yêu nhau</p>
            </div>
            <span className="text-wedding-gold text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>

        <Link href="/send-wish" className="block">
          <div className="w-full bg-white hover:bg-wedding-pastel transition-all border border-wedding-gold/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-playfair text-lg text-wedding-gold group-hover:text-wedding-pink transition-colors">
                ✍️ Send Wishes & Photo
              </h3>
              <p className="text-xs text-gray-400 mt-1">Gửi câu chúc ngọt ngào & chụp ảnh tại tiệc</p>
            </div>
            <span className="text-wedding-gold text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>

        <Link href="/wishbook" className="block">
          <div className="w-full bg-white hover:bg-wedding-pastel transition-all border border-wedding-gold/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3 className="font-playfair text-lg text-wedding-gold group-hover:text-wedding-pink transition-colors">
                ✨ Wedding Wishbook
              </h3>
              <p className="text-xs text-gray-400 mt-1">Sảnh trình chiếu tất cả lời chúc của mọi người</p>
            </div>
            <span className="text-wedding-gold text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </div>
        </Link>
      </section>

      <footer className="w-full py-4 text-center text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-100 bg-white/40">
        Trọng Nghĩa &amp; Thu Thảo Wedding © 2026
      </footer>
    </main>
  );
}