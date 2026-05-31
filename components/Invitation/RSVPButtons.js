"use client";
import { useState } from "react";

export default function RSVPButtons({ slug, initialStatus }) {
  // Trạng thái hiện tại của nút bấm
  const [status, setStatus] = useState(initialStatus || "");
  const [isUpdating, setIsUpdating] = useState(false);

  // Hàm xử lý khi khách bấm nút
  const handleUpdate = async (newStatus) => {
    if (status === newStatus) return; // Nếu bấm lại nút đang chọn thì bỏ qua

    setIsUpdating(true); // Bật trạng thái đang tải

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus); // Đổi màu nút ngay lập tức
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      alert("Lỗi kết nối mạng!");
    }

    setIsUpdating(false); // Tắt trạng thái đang tải
  };

  return (
    <div className="relative grid grid-cols-2 gap-3">
      {/* Lớp phủ khóa màn hình khi đang lưu dữ liệu */}
      {isUpdating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-xl backdrop-blur-[1px]">
          <span className="text-xs text-wedding-gold font-medium animate-pulse">
            Đang lưu...
          </span>
        </div>
      )}

      <button
        onClick={() => handleUpdate("Tham dự")}
        disabled={isUpdating}
        className={`border rounded-xl py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 shadow-sm ${
          status === "Tham dự"
            ? "bg-[#C9A227] text-white border-[#C9A227]" // Trạng thái ĐƯỢC CHỌN
            : "bg-white text-[#C9A227] border-[#C9A227]/30 hover:bg-[#C9A227]/10" // Trạng thái CHƯA CHỌN
        }`}
      >
        ✓ Tham dự
      </button>

      <button
        onClick={() => handleUpdate("Không tham dự")}
        disabled={isUpdating}
        className={`border rounded-xl py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 shadow-sm ${
          status === "Không tham dự"
            ? "bg-[#5F7161] text-white border-[#5F7161]" // Trạng thái ĐƯỢC CHỌN
            : "bg-white text-[#5F7161] border-[#5F7161]/20 hover:bg-[#5F7161]/5" // Trạng thái CHƯA CHỌN
        }`}
      >
        ✕ Không tham dự
      </button>
    </div>
  );
}
