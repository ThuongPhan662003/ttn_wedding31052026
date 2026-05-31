"use client";
import { useState, useEffect } from "react";
// Nếu thư mục components của bạn nằm cùng cấp với app, hãy dùng đường dẫn @/components/...
import MusicPlayer from "@/components/OurStory/MusicPlayer";
import HeroSection from "@/components/OurStory/HeroSection";
import StoryTimeline from "@/components/OurStory/StoryTimeline";
import WeddingEvents from "@/components/OurStory/WeddingEvents";
import Link from "next/link";
export default function OurStoryPage() {
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#333333] relative font-sans">
      {/* 1. Trình phát nhạc (Truyền link bài hát vào biến src) */}
      <MusicPlayer src="/musics/nen.mp3" />

      {/* 2. Ảnh bìa tràn viền */}
      <HeroSection />
      <WeddingEvents />
      {/* 3. Dòng thời gian (Truyền dữ liệu và trạng thái loading xuống) */}
      <StoryTimeline timelines={timelines} isLoading={isLoading} />
      {/* ========================================== */}
      {/* 5. NÚT ĐIỀU HƯỚNG GỬI LỜI CHÚC (MỚI THÊM)   */}
      {/* ========================================== */}
      <section className="w-full flex flex-col items-center justify-center pb-24 px-6 relative z-10 animate-fade-in">
        {/* Đường gạch ngang trang trí */}
        <div className="w-16 h-px bg-[#C9A227]/50 mb-8" />

        <h3
          className="text-2xl text-[#C9A227] mb-3 italic"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Lưu giữ khoảnh khắc
        </h3>

        <p className="text-xs text-[#5F7161]/70 mb-8 max-w-sm text-center leading-relaxed font-light">
          Hãy cùng chúng mình lưu giữ những lời chúc ngọt ngào và những kỷ niệm
          tuyệt vời nhất trong ngày trọng đại này nhé!
        </p>

        <Link
          href="/send-wish"
          className="
            flex items-center gap-3
            px-10 py-4 
            bg-[#5F7161] text-white 
            rounded-xl text-xs font-semibold uppercase tracking-[0.25em] 
            shadow-xl shadow-[#5F7161]/20 
            hover:bg-[#4E5F50] hover:-translate-y-1 hover:shadow-2xl
            transition-all duration-300 active:scale-[0.98]
          "
        >
          <span className="text-lg">✍️</span>
          Gửi Lời Chúc Ngay
        </Link>

        <Link
          href="/"
          className="mt-8 text-[10px] uppercase tracking-widest text-[#5F7161]/50 hover:text-[#C9A227] border-b border-transparent hover:border-[#C9A227] transition-all pb-0.5"
        >
          Trở Về Sảnh Chính
        </Link>
      </section>
    </main>
  );
}
