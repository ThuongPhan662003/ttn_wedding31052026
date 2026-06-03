"use client";

import { useState } from "react";
import Link from "next/link";

export default function FloatingMenu({ targetSectionId }) {
  const [showGiftModal, setShowGiftModal] = useState(false);

  const scrollToSection = () => {
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* THANH ĐIỀU HƯỚNG GÓC TRÁI DƯỚI MÀN HÌNH */}
      {/* Responsive: bottom-5 điện thoại đổi thành bottom-8 trên desktop */}
      <div className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50 flex items-center bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-full shadow-xl border border-wedding-greenLight/20 gap-0.5 md:gap-1 animate-slideUp">
        {/* Nút 1: Về Trang Chủ */}
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full text-wedding-dark/70 hover:text-wedding-green hover:bg-wedding-bg transition-all duration-300"
          title="Quay về sảnh chính"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 md:w-[22px] md:h-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <div className="w-[1px] h-5 bg-wedding-greenLight/20" />

        {/* Nút 2: Xem Thời Gian Tiệc Đám Cưới */}
        <button
          onClick={scrollToSection}
          className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full text-wedding-dark/70 hover:text-wedding-green hover:bg-wedding-bg transition-all duration-300"
          title="Xem thời gian sự kiện"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 md:w-[22px] md:h-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <div className="w-[1px] h-5 bg-wedding-greenLight/20" />

        {/* Nút 3: Gửi Quà Mừng Cưới (Popup QR) */}
        <button
          onClick={() => setShowGiftModal(true)}
          className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full text-wedding-gold hover:text-wedding-red hover:bg-wedding-cream transition-all duration-300"
          title="Gửi quà chúc mừng"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 md:w-[22px] md:h-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.5v15m0-15a3 3 0 013-3h1.5a3 3 0 013 3v0a3 3 0 01-3 3H12m0-3a3 3 0 00-3-3H7.5a3 3 0 00-3 3v0a3 3 0 003 3H12"
            />
          </svg>
        </button>
      </div>

      {/* POPUP MODAL QR CODE RESPONSIVE AN TOÀN */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Tối ưu: max-h-[90vh] + overflow-y-auto ngăn tình trạng màn hình điện thoại thấp bị che lấp mất nút hoặc mất thông tin */}
          <div className="bg-white rounded-3xl w-full max-w-[350px] md:max-w-sm p-5 md:p-7 border border-wedding-greenLight/20 shadow-2xl text-center space-y-4 relative max-h-[90vh] overflow-y-auto scrollbar-none animate-scaleUp">
            {/* Nút đóng (X) */}
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-wedding-dark/40 hover:text-wedding-dark hover:bg-wedding-bg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div>
              <span className="text-xl md:text-2xl">💝</span>
              <h3 className="font-playfair font-bold text-base md:text-lg text-wedding-green mt-1">
                Gửi Quà Chúc Mừng
              </h3>
              <p className="font-inter text-[11px] md:text-xs text-wedding-dark/60 font-light mt-0.5">
                Cảm ơn bạn rất nhiều vì đã gửi yêu thương đến tụi mình!
              </p>
            </div>

            {/* Khung chứa ảnh mã QR co giãn linh hoạt theo chiều rộng thẻ bọc */}
            <div className="bg-wedding-cream p-3 rounded-2xl border border-wedding-greenLight/20 inline-block w-full max-w-[200px] md:max-w-[220px]">
              <img
                src="https://api.vietqr.io/image/970422-123456789-vT9YvXW.jpg?accountName=TRONG%20NGHIA&amount=0"
                alt="Mã QR Mừng Cưới"
                className="w-full h-auto object-contain rounded-xl shadow-sm"
              />
            </div>

            {/* Chi tiết text chuyển khoản phòng hờ thiết bị không quét được mã */}
            <div className="text-[11px] md:text-xs space-y-1 bg-wedding-bg py-2.5 px-4 rounded-xl text-left font-inter">
              <p className="text-wedding-dark/70">
                <strong className="text-wedding-green font-semibold">
                  Ngân hàng:
                </strong>{" "}
                MB Bank (Quân Đội)
              </p>
              <p className="text-wedding-dark/70">
                <strong className="text-wedding-green font-semibold">
                  Số tài khoản:
                </strong>{" "}
                123456789
              </p>
              <p className="text-wedding-dark/70">
                <strong className="text-wedding-green font-semibold">
                  Chủ TK:
                </strong>{" "}
                NGUYEN TRONG NGHIA
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
