"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SendWishPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    wishes: "",
    attendance: "yes",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // Hàm xử lý đọc file ảnh và nén dung lượng xuống dưới 30KB
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ten_khach: formData.name,
          loi_chuc: formData.wishes || "",
          tham_du: formData.attendance,
        }),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setSuccess(true);

      setFormData({
        name: "",
        wishes: "",
        attendance: "yes",
      });

      setTimeout(() => {
        router.push("/wishbook");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#70121a] flex flex-col items-center justify-center p-4 md:p-8 antialiased relative overflow-hidden">
      {/* Các hạt sương mờ dải màu tạo chiều sâu */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5F7161]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Điều hướng */}
      <Link
        href="/"
        className="group mb-8 flex items-center gap-2 text-[10px] font-medium text-[#e6d6a8]/80 hover:text-white hover:text-[#C9A227] tracking-[0.3em] uppercase transition-all relative z-20"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Quay lại Trang Chủ
      </Link>

      {/* Khung Form thiết kế theo phong cách Cổng vòm */}
      <div className="max-w-md w-full bg-[#70121a] rounded-[32px] p-6 md:p-8 text-center relative border border-[#C9A227]/15 shadow-[0_25px_60px_-15px_rgba(201,162,39,0.10)]">
        <div className="absolute inset-3 border border-[#C9A227]/25 rounded-[20px] pointer-events-none" />
        <div className="absolute inset-4 border border-[#C9A227]/10 rounded-[16px] pointer-events-none" />

        <h1 className="font-serif text-3xl md:text-4xl text-[#e6d6a8] italic">
          Lời chúc dành cho cô dâu & chú rể
        </h1>

        <p className="text-xs text-red-200/75 mt-2 leading-relaxed">
          Hãy để lại những lời chúc ý nghĩa nhất dành cho cô dâu và chú rể trong
          ngày trọng đại này.
        </p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-10 h-px bg-[#C9A227]/40"></span>
          <span className="text-[#C9A227]">✦</span>
          <span className="w-10 h-px bg-[#C9A227]/40"></span>
        </div>

        <p className="text-[9px] tracking-[0.25em] text-[#C9A227] uppercase mb-8 font-medium">
          Gửi Lời Chúc & Lưu Kỷ Niệm
        </p>

        {success ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center animate-fade-in">
            {/* Icon */}
            <div className="text-center py-12 animate-pulse">
              <div className="text-6xl mb-6">🎉</div>

              <h2 className="font-serif text-3xl text-[#e6d6a8]">
                Gửi lời chúc thành công!
              </h2>

              <p className="mt-4 text-red-200/80">
                Cảm ơn bạn đã gửi những lời chúc tốt đẹp đến cô dâu và chú rể.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3 text-[#d4af37]">
                <div className="w-5 h-5 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin" />

                <span>Đang chuyển đến Sảnh Lời Chúc...</span>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 text-left space-y-5 px-2"
          >
            {error && (
              <p className="text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                ❌ Có lỗi xảy ra trong quá trình gửi. Bạn vui lòng thử lại nhé!
              </p>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-red-100">
                Tên của bạn *
              </label>

              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Nhập họ và tên..."
                className="w-full bg-[#821821] text-white placeholder-red-300/40 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-red-100">
                Lời chúc gửi đến Cô dâu & Chú rể
              </label>

              <textarea
                rows={5}
                value={formData.wishes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wishes: e.target.value,
                  })
                }
                placeholder="Viết những lời chúc ngọt ngào nhất tại đây..."
                className="w-full bg-[#821821] text-white placeholder-red-300/40 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#d4af37] text-[#8b1c25] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#e6d6a8] disabled:opacity-50 transition-all shadow-md"
            >
              {isSubmitting ? "Đang gửi..." : "✨ Gửi lời chúc mừng"}
            </button>
          </form>
        )}

        <div className="text-[#C9A227]/50 text-xs mt-6 mb-1">✦ ❦ ✦</div>
      </div>

      <p className="text-[9px] text-[#5F7161]/40 font-medium uppercase tracking-[0.4em] mt-8">
        Trọng Nghĩa & Thu Thảo Wedding • 2026
      </p>
    </main>
  );
}
