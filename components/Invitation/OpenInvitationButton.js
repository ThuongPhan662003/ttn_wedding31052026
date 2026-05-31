"use client";
import { useState } from "react";

export default function OpenInvitationButton({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Nếu khách đã bấm nút, hiển thị toàn bộ nội dung trang thiệp (children)
  if (isOpen) {
    return <>{children}</>;
  }

  // Nếu chưa bấm, chỉ hiển thị duy nhất màn hình có nút bấm
  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-bg">
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-[#C9A227] text-white rounded-xl text-xs uppercase tracking-widest font-semibold shadow-[0_10px_20px_rgba(201,162,39,0.3)] hover:scale-105 hover:bg-[#b59532] transition-all duration-300 active:scale-95"
      >
        💌 Mở Thiệp
      </button>
    </div>
  );
}
