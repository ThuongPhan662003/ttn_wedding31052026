'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WishbookPage() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm kết nối API gọi danh sách lời chúc từ Google Sheets Database
  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes'); // Backend API đọc từ Tab "Wishes"
      if (response.ok) {
        const data = await response.json();
        setWishes(data);
      }
    } catch (error) {
      console.error('Lỗi nạp dữ liệu sảnh lời chúc:', error);
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
    <main className="min-h-screen bg-wedding-bg flex flex-col items-center p-4 md:p-8 antialiased relative overflow-hidden">
      
      {/* Các hạt sương mờ dải màu Hồng Pastel tạo chiều sâu cho không gian sảnh [source: 1] */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-wedding-pastel/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-wedding-pastel/30 rounded-full blur-3xl pointer-events-none" />

      {/* Thanh điều hướng quay về trang chủ sử dụng tone chữ dark [source: 1] */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-10 border-b border-wedding-gold/15 pb-4">
        <Link href="/" className="group flex items-center gap-2 text-[10px] font-medium text-wedding-dark/60 hover:text-wedding-gold tracking-[0.3em] uppercase transition-all">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Về Trang Chủ
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-wedding-gold font-semibold">
          ✨ Live Wedding Wishbook ✨
        </p>
      </div>

      {/* Phần tiêu đề Sảnh thiết kế tinh xảo với Font chữ nghệ thuật Playfair [source: 1] */}
      <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl text-wedding-dark tracking-wide font-playfair font-light mb-3">
          Sảnh Lời Chúc Mừng
        </h1>
        <div className="flex justify-center items-center gap-2 opacity-40 mb-4">
          <span className="w-8 h-[1px] bg-wedding-gold" />
          <span className="text-[8px] text-wedding-gold rotate-45">◆</span>
          <span className="w-8 h-[1px] bg-wedding-gold" />
        </div>
        <p className="text-xs text-wedding-dark/60 font-light leading-relaxed px-4">
          Nơi lưu giữ những thông điệp đong đầy yêu thương và khoảnh khắc kỷ niệm của tất cả quý quan khách dành cho Minh Hiếu &amp; Thảo Tiên.
        </p>
      </div>

      {/* KHU VỰC ĐỌC VÀ HIỂN THỊ DỮ LIỆU CHẠY REAL-TIME */}
      <div className="w-full max-w-6xl relative z-10 flex-1">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sm font-playfair text-wedding-gold animate-pulse tracking-widest">
              Đang đồng bộ sảnh lời chúc điện tử...
            </p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-2xl border border-wedding-gold/10 max-w-md mx-auto p-8 shadow-sm">
            <p className="text-xl mb-2">✍️</p>
            <p className="text-xs text-wedding-dark/50 italic font-light">
              Chưa có lời chúc nào được gửi. Hãy là người đầu tiên gửi lời chúc mừng tại mục "Send Wishes"!
            </p>
          </div>
        ) : (
          // Kiến trúc tường gạch đan xen phong cách Pinterest sang trọng
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {wishes.map((item) => (
              <div 
                key={item.id}
                className="break-inside-avoid bg-white rounded-2xl p-6 border border-wedding-gold/15 shadow-[0_15px_40px_-20px_rgba(212,175,55,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Bo viền vòm tinh xảo ẩn hiện bên trong mỗi tấm thẻ lời chúc */}
                <div className="absolute inset-3 border border-wedding-gold/5 rounded-xl pointer-events-none group-hover:border-wedding-gold/15 transition-colors" />

                <div>
                  {/* Tên khách mời sử dụng tone chữ tối và font chữ sang trọng [source: 1] */}
                  <div className="flex justify-between items-start mb-4 border-b border-wedding-pastel pb-3">
                    <div>
                      <h3 className="font-playfair text-base font-normal text-wedding-dark tracking-wide">
                        {item.ten_khach}
                      </h3>
                      <span className="text-[9px] text-wedding-gold uppercase tracking-wider block mt-0.5">
                        Guest • Khách quý
                      </span>
                    </div>
                    <span className="text-xs opacity-30 select-none">❝</span>
                  </div>

                  {/* Nội dung lời chúc từ Google Sheets */}
                  <p className="text-xs text-wedding-dark/80 font-light leading-relaxed italic mb-4 whitespace-pre-line px-1">
                    "{item.loi_chuc}"
                  </p>
                </div>

                {/* Nếu khách có đính kèm ảnh, hiển thị ảnh bo góc lãng mạn */}
                {/* KHỐI HIỂN THỊ ẢNH TỪ LINK GOOGLE DRIVE CÔNG KHAI */}
{item.hinh_anh_url && 
 item.hinh_anh_url !== '' && 
 item.hinh_anh_url !== 'undefined' && 
 (item.hinh_anh_url.startsWith('http') || item.hinh_anh_url.startsWith('data:image')) && (
  <div className="overflow-hidden rounded-xl border border-wedding-pastel mb-3 relative max-h-60 flex items-center justify-center bg-wedding-bg shadow-inner">
    <img 
      src={item.hinh_anh_url} 
      alt={`Kỷ niệm từ ${item.ten_khach}`}
      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
  </div>
)}

                {/* Thời gian khách gửi lời nhắn */}
                <div className="text-right text-[9px] text-wedding-dark/40 font-light tracking-wide pt-2 border-t border-wedding-pastel/40">
                  🗓️ {item.thoi_gian}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chân trang thanh tao đồng bộ màu chữ dark [source: 1] */}
      <footer className="w-full text-center text-[9px] text-wedding-dark/40 font-medium uppercase tracking-[0.4em] mt-20 relative z-10 border-t border-wedding-gold/10 pt-4">
        Hiếu &amp; Tiên Wedding • 2026
      </footer>

    </main>
  );
}