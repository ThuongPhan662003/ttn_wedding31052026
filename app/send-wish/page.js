"use client";
import { useState } from "react";
import Link from "next/link";

export default function SendWishPage() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [status, setStatus] = useState("");

  // Hàm xử lý đọc file ảnh và nén dung lượng xuống dưới 30KB
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chỉ chọn tệp tin hình ảnh.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.4);
        setImageBase64(compressedBase64);
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ten_khach: name,
          loi_chuc: wish,
          hinh_anh_url: imageBase64,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setWish("");
        setImageBase64("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 antialiased relative overflow-hidden">
      
      {/* Các hạt sương mờ dải màu tạo chiều sâu */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5F7161]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Điều hướng */}
      <Link
        href="/"
        className="group mb-8 flex items-center gap-2 text-[10px] font-medium text-[#5F7161]/70 hover:text-[#C9A227] tracking-[0.3em] uppercase transition-all relative z-20"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Quay lại Trang Chủ
      </Link>

      {/* Khung Form thiết kế theo phong cách Cổng vòm */}
      <div className="max-w-md w-full bg-white rounded-[32px] p-6 md:p-8 text-center relative border border-[#C9A227]/15 shadow-[0_25px_60px_-15px_rgba(201,162,39,0.10)]">
        <div className="absolute inset-3 border border-[#C9A227]/25 rounded-[20px] pointer-events-none" />
        <div className="absolute inset-4 border border-[#C9A227]/10 rounded-[16px] pointer-events-none" />

        <h1
          className="text-4xl md:text-5xl text-[#5F7161] tracking-wide mb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Send Wishes
        </h1>

        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-10 h-px bg-[#C9A227]/40"></span>
          <span className="text-[#C9A227]">✦</span>
          <span className="w-10 h-px bg-[#C9A227]/40"></span>
        </div>

        <p className="text-[9px] tracking-[0.25em] text-[#C9A227] uppercase mb-8 font-medium">
          Gửi Lời Chúc & Lưu Kỷ Niệm
        </p>

        {status === "success" ? (
          <div className="bg-[#C9A227]/5 rounded-2xl p-8 border border-[#C9A227]/15 shadow-sm space-y-3 animate-fade-in">
            <span className="text-4xl block">🎉</span>
            <h2
              className="text-lg text-[#5F7161]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Gửi lời chúc thành công!
            </h2>
            <p className="text-xs text-[#5F7161]/70 leading-relaxed">
              Cảm ơn bạn rất nhiều vì đã gửi những thông điệp đong đầy yêu
              thương và khoảnh khắc kỷ niệm đến tụi mình. Lời chúc đang được
              hiển thị tại sảnh tiệc!
            </p>
            <button
              onClick={() => setStatus("")}
              className="mt-4 text-xs text-[#C9A227] border-b border-[#C9A227]/40 pb-0.5 hover:text-[#5F7161] transition-colors"
            >
              Tiếp tục gửi lời chúc khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 text-left space-y-5 px-2">
            
            {status === "error" && (
              <p className="text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                ❌ Có lỗi xảy ra trong quá trình gửi. Bạn vui lòng thử lại nhé!
              </p>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#5F7161]/70 mb-1.5 font-medium">
                Tên của bạn
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#C9A227]/20 rounded-xl p-3 text-sm text-[#5F7161] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 focus:border-[#C9A227] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#5F7161]/70 mb-1.5 font-medium">
                Lời chúc của bạn
              </label>
              <textarea
                required
                rows="3"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                className="w-full bg-white border border-[#C9A227]/20 rounded-xl p-3 text-sm text-[#5F7161] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 focus:border-[#C9A227] transition-all resize-none"
              />
            </div>

            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#C9A227]/40 rounded-xl p-4 bg-[#FAF9F6] hover:bg-[#F3E5D8]/30 transition-colors group overflow-hidden">
              <label className="block text-[10px] uppercase tracking-wider text-[#5F7161]/70 mb-2 font-medium z-10 pointer-events-none">
                Đính kèm hình ảnh kỷ niệm (Tùy chọn)
              </label>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />

              {imageBase64 ? (
                <div className="w-full text-center space-y-2 z-10 pointer-events-none">
                  <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden border border-[#C9A227]/30 shadow-sm">
                    <img
                      src={imageBase64}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] text-[#5F7161] font-medium">
                    ✓ Đã tối ưu ảnh thành công
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-1 z-10 pointer-events-none">
                  <span className="text-xl block group-hover:scale-110 transition-transform">
                    📷
                  </span>
                  <p className="text-xs text-[#C9A227] font-medium">
                    Bấm để chụp ảnh hoặc chọn ảnh
                  </p>
                  <p className="text-[10px] text-[#5F7161]/50 font-light">
                    Ảnh sẽ tự động hiển thị lên máy chiếu tại sảnh
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#5F7161] text-white font-semibold py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase shadow-lg shadow-[#5F7161]/20 hover:bg-[#4E5F50] transition-all active:scale-[0.99] mt-2 disabled:opacity-70"
            >
              {status === "sending" ? "Đang lưu vào hệ thống..." : "✨ Gửi Lời Chúc Mừng"}
            </button>
          </form>
        )}

        <div className="text-[#C9A227]/50 text-xs mt-6 mb-1">
          ✦ ❦ ✦
        </div>
      </div>

      <p className="text-[9px] text-[#5F7161]/40 font-medium uppercase tracking-[0.4em] mt-8">
        Trọng Nghĩa & Thu Thảo Wedding • 2026
      </p>
    </main>
  );
}