"use client";
import Link from "next/link";

export default function FloatingButton({ href, text, icon }) {
  return (
    // fixed: Cố định vị trí
    // bottom-8: Cách đáy màn hình một khoảng
    // left-1/2 -translate-x-1/2: Căn chính giữa màn hình
    // z-50: Đảm bảo nút luôn nổi lên trên mọi thành phần khác
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
      <Link
        href={href}
        className="
          flex items-center justify-center gap-2 
          px-8 py-3.5 
          bg-[#5F7161]/95 backdrop-blur-md text-white 
          rounded-full 
          text-[10px] font-semibold uppercase tracking-[0.25em] 
          shadow-[0_10px_25px_rgba(95,113,97,0.4)] 
          hover:bg-[#4E5F50] hover:-translate-y-1 hover:shadow-2xl
          transition-all duration-300 active:scale-[0.98]
          whitespace-nowrap
        "
      >
        <span className="text-base">{icon}</span>
        {text}
      </Link>
    </div>
  );
}
