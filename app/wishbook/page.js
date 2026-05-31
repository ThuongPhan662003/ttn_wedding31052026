"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WishbookPage() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm kết nối API gọi danh sách lời chúc từ Google Sheets Database
  const fetchWishes = async () => {
    try {
      const response = await fetch("/api/wishes"); // Backend API đọc từ Tab "Wishes"
      if (response.ok) {
        const data = await response.json();
        setWishes(data);
      }
    } catch (error) {
      console.error("Lỗi nạp dữ liệu sảnh lời chúc:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thiết lập cơ chế tự động làm mới dữ liệu (Real-time polling) sau mỗi 5 giây
  useEffect(() => {
    fetchWishes(); // Chạy lần đầu khi mở trang
    const interval = setInterval(fetchWishes, 5000); // 5000ms = 5 giây tự động quét Sheets lại
    return () => clearInterval(interval);
  }, []);

  return (
    // Sử dụng màu nền Trắng thanh lịch (wedding-bg) làm không gian bao cảnh [source: 1]
    <main className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8 antialiased relative overflow-hidden">
      {/* Các hạt sương mờ dải màu Hồng Pastel tạo chiều sâu cho không gian sảnh [source: 1] */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5F7161]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Thanh điều hướng quay về trang chủ sử dụng tone chữ dark [source: 1] */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-10 border-b border-[#C9A227]/15 pb-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[10px] font-medium text-[#5F7161]/70 hover:text-[#C9A227] tracking-[0.3em] uppercase transition-all"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Về Trang Chủ
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] font-semibold">
          ✦ Live Wedding Wishbook ✦
        </p>
      </div>

      {/* Phần tiêu đề Sảnh thiết kế tinh xảo với Font chữ nghệ thuật Playfair [source: 1] */}
      <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
        <h1
          className="text-4xl md:text-6xl text-[#5F7161] tracking-wide mb-3"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Sảnh Lời Chúc Mừng
        </h1>
        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="w-12 h-px bg-[#C9A227]/40"></span>
          <span className="text-[#C9A227] text-sm">✦</span>
          <span className="w-12 h-px bg-[#C9A227]/40"></span>
        </div>
        <p className="text-sm text-[#5F7161]/70 font-light leading-relaxed px-4">
          Nơi lưu giữ những thông điệp đong đầy yêu thương và khoảnh khắc kỷ
          niệm của tất cả quý quan khách dành cho Trọng Nghĩa &amp; Thu Thảo.
        </p>
      </div>

      {/* KHU VỰC ĐỌC VÀ HIỂN THỊ DỮ LIỆU CHẠY REAL-TIME */}
      <div className="w-full max-w-6xl relative z-10 flex-1">
        {loading ? (
          <div className="text-center py-20">
            <p
              className="text-sm tracking-[0.2em] text-[#C9A227] animate-pulse"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Đang đồng bộ sảnh lời chúc...
            </p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#C9A227]/15 max-w-md mx-auto p-8 shadow-sm">
            <p className="text-xl mb-2">✍️</p>
            <p className="text-xs text-[#5F7161]/60 italic">
              Chưa có lời chúc nào được gửi. Hãy là người đầu tiên gửi lời chúc
              mừng tại mục "Send Wishes"!
            </p>
          </div>
        ) : (
          // Kiến trúc tường gạch đan xen phong cách Pinterest sang trọng
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="
break-inside-avoid
bg-white
rounded-[28px]
p-6
border
border-[#C9A227]/15
shadow-[0_20px_50px_-20px_rgba(95,113,97,0.12)]
hover:shadow-[0_25px_60px_-20px_rgba(201,162,39,0.15)]
transition-all
duration-500
relative
group
flex
flex-col
justify-between
overflow-hidden
"
              >
                {/* Bo viền vòm tinh xảo ẩn hiện bên trong mỗi tấm thẻ lời chúc */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5F7161] via-[#C9A227] to-[#5F7161] opacity-40"></div>

                <div>
                  {/* Tên khách mời sử dụng tone chữ tối và font chữ sang trọng [source: 1] */}
                  <div className="flex justify-between items-start mb-4 border-b border-[#C9A227]/15 pb-3">
                    <div>
                      <h3
                        className="text-lg text-[#5F7161]"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {item.ten_khach}
                      </h3>
                      <span className="text-[9px] text-[#C9A227] uppercase tracking-wider block mt-1">
                        Guest • Khách quý
                      </span>
                    </div>
                    <span className="text-xs opacity-30 select-none">❝</span>
                  </div>

                  {/* Nội dung lời chúc từ Google Sheets */}
                  <p className="text-sm text-[#5F7161]/90 leading-relaxed italic mb-4 whitespace-pre-line px-1">
                    "{item.loi_chuc}"
                  </p>
                </div>

                {/* Nếu khách có đính kèm ảnh, hiển thị ảnh bo góc lãng mạn */}
                {/* KHỐI HIỂN THỊ ẢNH TỪ LINK GOOGLE DRIVE CÔNG KHAI */}
                {item.hinh_anh_url &&
                  item.hinh_anh_url !== "" &&
                  item.hinh_anh_url !== "undefined" &&
                  (item.hinh_anh_url.startsWith("http") ||
                    item.hinh_anh_url.startsWith("data:image")) && (
                    <div className="overflow-hidden rounded-2xl border border-[#C9A227]/15 mb-3 relative max-h-60 flex items-center justify-center bg-white shadow-inner">
                      <img
                        src={item.hinh_anh_url}
                        alt={`Kỷ niệm từ ${item.ten_khach}`}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                {/* Thời gian khách gửi lời nhắn */}
                <div className="text-right text-[10px] text-[#5F7161]/40 tracking-wide pt-3 border-t border-[#C9A227]/10">
                  {item.thoi_gian}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chân trang thanh tao đồng bộ màu chữ dark [source: 1] */}
      <footer
        className="w-full text-center text-[9px] t
      ext-[#5F7161]/40 font-medium uppercase tracking-[0.4em] mt-20 relative z-10 border-t border-[#C9A227]/10 pt-4"
      >
        Trọng Nghĩa &amp; Thu Thảo Wedding • 2026
      </footer>
    </main>
  );
}
