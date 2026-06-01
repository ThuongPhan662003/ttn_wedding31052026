"use client";
import { useState, useEffect } from "react";
import MusicPlayer from "@/components/OurStory/MusicPlayer";
import HeroSection from "@/components/OurStory/HeroSection";
import StoryTimeline from "@/components/OurStory/StoryTimeline";
import WeddingEvents from "@/components/OurStory/WeddingEvents";
import AlbumOfLove from "@/components/OurStory/AlbumOfLove";
import QuoteSection from "@/components/OurStory/QuoteSection";
import Link from "next/link";

export default function OurStoryPage() {
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Trạng thái mở thiệp
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch("/api/story");
        const result = await response.json();

        if (result.data) {
          setTimelines(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu LoveStory:", error);
        setIsLoading(false);
      }
    };

    fetchStory();
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    // Chờ hiệu ứng trượt cửa hoàn tất (1.2s) rồi tháo hoàn toàn màn che
    setTimeout(() => {
      setIsAnimationDone(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#333333] relative font-sans overflow-x-hidden">
      {/* 1. MÀN HÌNH MỞ THIỆP HAI CÁNH (GATEFOLD ENVELOPE) */}
      {!isAnimationDone && (
        <div
          className={`fixed inset-0 z-50 flex pointer-events-none transition-all duration-1000 ${
            isOpened ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Cánh cửa bên TRÁI */}
          <div
            className={`w-1/2 h-full bg-[#8B1E2D] border-r border-[#C9A227]/30 pointer-events-auto transition-transform duration-[1200ms] ease-in-out relative flex flex-col items-end justify-center select-none shadow-2xl ${
              isOpened ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="absolute inset-4 md:inset-8 border-y border-l border-[#C9A227]/20 pointer-events-none" />

            <div className="mr-6 md:mr-12 text-right text-[#C9A227] pr-4 md:pr-0">
              <span className="block text-4xl md:text-5xl font-coldwell italic leading-none text-[#E6D6A8]">
                Save
              </span>
              <span className="block text-xs md:text-sm tracking-[0.4em] uppercase font-medium mt-2">
                The Date
              </span>
            </div>
          </div>

          {/* Cánh cửa bên PHẢI */}
          <div
            className={`w-1/2 h-full bg-[#8B1E2D] border-l border-[#C9A227]/30 pointer-events-auto transition-transform duration-[1200ms] ease-in-out relative flex flex-col items-start justify-center select-none shadow-2xl ${
              isOpened ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="absolute inset-4 md:inset-8 border-y border-r border-[#C9A227]/20 pointer-events-none" />
          </div>

          {/* TRỤC GIỮA: CON DẤU SÁP & NHÀNH HOA */}
          {/* TRỤC GIỮA: CON DẤU SÁP & NHÀNH HOA */}
          {/* TRỤC GIỮA: CON DẤU SÁP & NHÀNH HOA */}
          <div
            onClick={handleOpenEnvelope}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto cursor-pointer flex flex-col items-center transition-all duration-[800ms] ${
              isOpened
                ? "opacity-0 scale-75 pointer-events-none blur-sm"
                : "opacity-100 scale-100"
            }`}
          >
            {/* NHÀNH HOA SẤY KHÔ - Đã phóng to (w-24 h-36) để bự và rõ nét hơn */}
            <div className="w-24 h-36 relative opacity-95 animate-pulse pointer-events-none select-none z-20">
              <img
                src="/images/flower-branch.png"
                alt="Flower branch decoration"
                className="w-full h-full object-contain object-bottom"
              />
            </div>

            {/* Khối Con Dấu Sáp 3D Hoàng Gia - mt-[-32px] để hoa cắm sâu vào tâm dấu sáp */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#731825] border-2 border-[#C9A227] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center relative active:scale-95 transition-transform z-10 mt-[-32px]">
              {/* Viền sáp gồ ghề giả lập thủ công */}
              <div className="absolute inset-1.5 border border-[#C9A227]/40 rounded-full" />
              {/* Hoa văn chìm trong con dấu */}
              <span className="text-3xl md:text-4xl text-[#C9A227] font-playfair select-none">
                囍
              </span>
            </div>

            {/* Dòng chữ hướng dẫn nhỏ nhẹ nhàng */}
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#E6D6A8] mt-4 bg-[#8B1E2D]/80 py-1 px-3 rounded-full border border-[#C9A227]/20 backdrop-blur-sm z-10">
              Chạm để mở
            </span>
          </div>
        </div>
      )}

      {/* 2. NỘI DUNG CHÍNH CỦA TRANG LOVE STORY */}
      <div
        className={`transition-all duration-1000 delay-300 ${isOpened ? "opacity-100 filter-none" : "opacity-40 blur-sm"}`}
      >
        {/* Trình phát nhạc */}
        <MusicPlayer src="/musics/nen.mp3" />

        {/* Ảnh bìa tràn viền */}
        <HeroSection />
        {/* COMPONENT ALBUM ẢNH NGHỆ THUẬT VỪA TÁCH */}
        <AlbumOfLove />
        <QuoteSection />
        {/* Các sự kiện cưới */}
        <WeddingEvents />

        {/* Dòng thời gian */}
        <StoryTimeline timelines={timelines} isLoading={isLoading} />

        {/* Nút điều hướng gửi lời chúc */}
        <section className="w-full flex flex-col items-center justify-center pb-24 px-6 relative z-10">
          <div className="w-16 h-px bg-[#C9A227]/50 mb-8" />

          <h3
            className="text-2xl text-[#C9A227] mb-3 italic"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Lưu giữ khoảnh khắc
          </h3>

          <p className="text-xs text-[#2D3748]/70 mb-8 max-w-sm text-center leading-relaxed font-light">
            Hãy cùng chúng mình lưu giữ những lời chúc ngọt ngào và những kỷ
            niệm tuyệt vời nhất trong ngày trọng đại này nhé!
          </p>

          <Link
            href="/send-wish"
            className="
              flex items-center gap-3
              px-10 py-4 
              bg-[#8B1E2D] text-white 
              rounded-xl text-xs font-semibold uppercase tracking-[0.25em] 
              border border-[#C9A227]/30
              shadow-xl hover:bg-[#B33A4A] hover:-translate-y-1
              transition-all duration-300 active:scale-[0.98]
            "
          >
            <span className="text-lg">✍️</span>
            Gửi Lời Chúc Ngay
          </Link>

          <Link
            href="/"
            className="mt-8 text-[10px] uppercase tracking-widest text-[#2D3748]/50 hover:text-[#8B1E2D] border-b border-transparent hover:border-[#8B1E2D] transition-all pb-0.5"
          >
            Trở Về Sảnh Chính
          </Link>
        </section>
      </div>
    </main>
  );
}
