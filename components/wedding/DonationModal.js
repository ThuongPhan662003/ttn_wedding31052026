"use client";

export default function DonationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      {/* Khung nội dung Popup phong cách thiệp cưới */}
      <div className="bg-[#fdfbf7] w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-[#d4af37]/30 text-center relative animate-[scaleUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
        {/* Nút Đóng hình chữ X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors text-sm"
        >
          ✕
        </button>

        <span className="font-serif text-xs text-[#d4af37] tracking-widest block mb-1">
          HỘP MỪNG CƯỚI ONLINE
        </span>
        <h3 className="font-serif text-xl text-[#8b1c25] italic mb-4">
          Gửi Lời Chúc & Mừng Cưới
        </h3>

        <p className="text-xs text-gray-500 mb-6 px-2 leading-relaxed">
          Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình. Nếu
          bạn muốn gửi quà mừng cưới, có thể quét mã QR dưới đây:
        </p>

        {/* Cột cuộn hiển thị thông tin ngân hàng của cả hai */}
        <div className="space-y-6 max-h-[360px] overflow-y-auto pr-1">
          {/* TÀI KHOẢN CÔ DÂU (Ngọc Anh) */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-[#8b1c25] tracking-wider mb-2 uppercase">
              Mừng cưới Cô dâu (Ngọc Anh)
            </p>
            <div className="w-40 h-40 mx-auto bg-gray-50 rounded-lg overflow-hidden border border-gray-200 p-1 mb-2 flex items-center justify-center shadow-inner">
              {/* Ảnh QR VietinBank của Ngọc Anh */}
              <img
                src="/images/static-qr-vietinbank.jpg"
                alt="Mã QR Mừng Cưới Cô Dâu"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-gray-700 leading-relaxed text-left px-2 bg-[#fcfaf6] p-2 rounded border border-gray-50">
              <div>
                • Chủ TK:{" "}
                <span className="font-bold text-gray-800">
                  PHẠM THỊ NGỌC ANH
                </span>
              </div>
              <div>
                • STK:{" "}
                <span className="font-mono font-semibold text-gray-900">
                  106871751824
                </span>
              </div>
              <div>
                • Ngân hàng:{" "}
                <span className="font-medium text-gray-800">
                  VietinBank (CN Bình Xuyên)
                </span>
              </div>
            </div>
          </div>

          {/* TÀI KHOẢN CHÚ RỂ (Liu Bo) */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-[#8b1c25] tracking-wider mb-2 uppercase">
              Mừng cưới Chú rể (Liu Bo)
            </p>
            <div className="w-40 h-40 mx-auto bg-gray-50 rounded-lg overflow-hidden border border-gray-200 p-1 mb-2 flex items-center justify-center shadow-inner">
              {/* Ảnh QR tài khoản chú rể của bạn */}
              <img
                src="/images/qr-chure.png"
                alt="Mã QR Mừng Cưới Chú Rể"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-gray-700 leading-relaxed text-left px-2 bg-[#fcfaf6] p-2 rounded border border-gray-50">
              <div>
                • Chủ TK:{" "}
                <span className="font-bold text-gray-800">LIU BO</span>
              </div>
              <div>
                • STK:{" "}
                <span className="font-mono font-semibold text-gray-900">
                  0987654321
                </span>
              </div>
              <div>
                • Ngân hàng:{" "}
                <span className="font-medium text-gray-800">MB Bank</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#8b1c25] text-white py-2.5 rounded-xl text-sm font-medium shadow-md hover:bg-[#70121a] transition-all"
        >
          Cảm ơn bạn rất nhiều! ❤️
        </button>
      </div>
    </div>
  );
}
