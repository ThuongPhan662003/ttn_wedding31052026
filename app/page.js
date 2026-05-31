"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [countdownTitle, setCountdownTitle] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Khai báo ngày bên ngoài hoặc dùng useMemo để không bị re-render liên tục
  const vuQuyDate = new Date("2026-07-03T11:00:00");
  const tanHonDate = new Date("2026-07-10T10:30:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let difference = 0;
      let title = "";

      if (now < vuQuyDate) {
        // 1. Chưa tới ngày Vu Quy -> Đếm ngược đến Vu Quy
        difference = vuQuyDate - now;
        title = "Lễ Vu Quy bắt đầu sau";
      } else if (now < tanHonDate) {
        // 2. Đã xong Vu Quy, chưa tới Tân Hôn -> Đếm ngược đến Tân Hôn
        difference = tanHonDate - now;
        title = "Lễ Tân Hôn bắt đầu sau";
      } else {
        // 3. Đã xong cả 2 lễ -> Đếm xuôi thời gian đã là vợ chồng
        difference = now - tanHonDate; 
        title = "Ngày chung đôi";
      }

      setCountdownTitle(title);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    // Chạy ngay lần đầu tiên để tránh bị trễ 1 giây hiển thị
    calculateTimeLeft();

    // Thiết lập bộ đếm chạy mỗi giây
    const timer = setInterval(calculateTimeLeft, 1000);

    // Dọn dẹp bộ đếm khi component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#5F7161] flex flex-col items-center justify-between">
      {/* HERO */}
      <section className="relative w-full flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-12">
        <div className="text-[#C9A227] text-3xl mb-4 animate-pulse">✨</div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#5F7161] mb-3 font-medium">
          Welcome to Our Wedding
        </p>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl text-[#C9A227] my-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Trọng Nghĩa
          <br />
          <span className="text-2xl md:text-3xl block my-2 text-[#5F7161]">
            &
          </span>
          Thu Thảo
        </h1>

        <p className="text-sm italic text-[#5F7161] max-w-sm mt-2">
          "Hành trình hạnh phúc bắt đầu từ lời hẹn ước, thân mời bạn ghé thăm
          không gian ngày cưới của chúng mình."
        </p>

        {/* COUNTDOWN */}
        <div className="mt-12 bg-white border border-[#C9A227]/20 rounded-2xl p-6 max-w-md w-full shadow-[0_10px_30px_rgba(201,162,39,0.08)]">
          <p
            className="text-xs uppercase tracking-widest text-[#5F7161] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {countdownTitle}
          </p>
          <p className="text-[11px] text-[#C9A227] mb-5 tracking-[0.15em] uppercase">
            {countdownTitle === "Lễ Vu Quy bắt đầu sau" &&
              "03 • 07 • 2026 | 11:00"}

            {countdownTitle === "Lễ Tân Hôn bắt đầu sau" &&
              "10 • 07 • 2026 | 10:30"}

            {countdownTitle === "Ngày chung đôi" &&
              "Forever Begins"}
          </p>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-white border border-[#C9A227]/15 rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#C9A227]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5F7161]">
                Ngày
              </span>
            </div>

            <div className="bg-white border border-[#C9A227]/15 rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#C9A227]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5F7161]">
                Giờ
              </span>
            </div>

            <div className="bg-white border border-[#C9A227]/15 rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#C9A227]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5F7161]">
                Phút
              </span>
            </div>

            <div className="bg-white border border-[#C9A227]/15 rounded-xl p-3">
              <span className="block text-2xl font-bold text-[#C9A227]">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5F7161]">
                Giây
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="w-full max-w-md px-4 pb-16 space-y-4">
        <p className="text-center text-xs text-[#5F7161]/70 uppercase tracking-widest mb-2">
          Khám phá các phân sảnh
        </p>

        <Link href="/our-story" className="block">
          <div className="w-full bg-white hover:bg-[#5F7161]/5 transition-all border border-[#C9A227]/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3
                className="text-lg text-[#C9A227] group-hover:text-[#5F7161] transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                📖 Our Love Story
              </h3>

              <p className="text-xs text-[#5F7161]/70 mt-1">
                Xem album ảnh cưới & hành trình yêu nhau
              </p>
            </div>

            <span className="text-[#C9A227] text-sm group-hover:translate-x-1 transition-transform">
              ➔
            </span>
          </div>
        </Link>

        <Link href="/send-wish" className="block">
          <div className="w-full bg-white hover:bg-[#5F7161]/5 transition-all border border-[#C9A227]/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3
                className="text-lg text-[#C9A227] group-hover:text-[#5F7161] transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                ✍️ Send Wishes & Photo
              </h3>

              <p className="text-xs text-[#5F7161]/70 mt-1">
                Gửi câu chúc ngọt ngào & chụp ảnh tại tiệc
              </p>
            </div>

            <span className="text-[#C9A227] text-sm group-hover:translate-x-1 transition-transform">
              ➔
            </span>
          </div>
        </Link>

        <Link href="/wishbook" className="block">
          <div className="w-full bg-white hover:bg-[#5F7161]/5 transition-all border border-[#C9A227]/20 rounded-xl p-4 flex items-center justify-between group shadow-sm active:scale-[0.98]">
            <div className="text-left">
              <h3
                className="text-lg text-[#C9A227] group-hover:text-[#5F7161] transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                ✨ Wedding Wishbook
              </h3>

              <p className="text-xs text-[#5F7161]/70 mt-1">
                Sảnh trình chiếu tất cả lời chúc của mọi người
              </p>
            </div>

            <span className="text-[#C9A227] text-sm group-hover:translate-x-1 transition-transform">
              ➔
            </span>
          </div>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-4 text-center text-[10px] text-[#5F7161]/60 uppercase tracking-widest border-t border-[#C9A227]/10 bg-white">
        Trọng Nghĩa &amp; Thu Thảo Wedding © 2026
      </footer>
    </main>
  );
}