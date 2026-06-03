"use client";
"use client";
import { useState } from "react";

export default function RSVPForm({ onOpenDonation }) {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    wishes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Giả lập gửi API lưu lời chúc vào Database
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", attendance: "yes", wishes: "" });
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section className="w-full bg-[#8b1c25] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto bg-[#70121a] p-6 md:p-10 rounded-2xl border border-[#d4af37]/20 shadow-2xl">
        {/* Tiêu đề Form */}
        <div className="text-center space-y-2 mb-8">
          <h3 className="font-serif text-2xl md:text-3xl italic text-[#e6d6a8]">
            Xác Nhận Tham Dự & Lời Chúc
          </h3>
          <p className="text-xs text-red-200/75 max-w-md mx-auto font-light leading-relaxed">
            Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình. Hãy
            để lại thông tin để gia đình chuẩn bị đón tiếp chu đáo nhất nhé!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hàng 1: Tên và Lựa chọn tham dự (Xếp hàng ngang trên PC, dọc trên Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-red-100">
                Tên của bạn *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nhập họ và tên..."
                className="w-full bg-[#821821] text-white placeholder-red-300/40 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-red-100">
                Bạn sẽ tham dự chứ?
              </label>
              <select
                value={formData.attendance}
                onChange={(e) =>
                  setFormData({ ...formData, attendance: e.target.value })
                }
                className="w-full bg-[#821821] text-white border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors appearance-none"
              >
                <option value="yes">Chắc chắn sẽ đến chung vui</option>
                <option value="maybe">Sẽ sắp xếp công việc sau</option>
                <option value="no">Rất tiếc không thể tham dự</option>
              </select>
            </div>
          </div>

          {/* Hàng 2: Lời chúc chân thành */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide uppercase text-red-100">
              Lời chúc gửi đến Cô dâu & Chú rể
            </label>
            <textarea
              rows={4}
              value={formData.wishes}
              onChange={(e) =>
                setFormData({ ...formData, wishes: e.target.value })
              }
              placeholder="Viết những lời chúc ngọt ngào nhất tại đây..."
              className="w-full bg-[#821821] text-white placeholder-red-300/40 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
            />
          </div>

          {/* Khối Thông Báo Thành Công Trực Quan */}
          {success && (
            <div className="text-xs bg-emerald-600/30 text-emerald-200 py-3 px-4 rounded-xl border border-emerald-500/30 text-center animate-fadeIn">
              🎉 Gửi phản hồi thành công! Cảm ơn bạn rất nhiều!
            </div>
          )}

          {/* Cụm Nút Tương Tác Kép Gồm Gửi Lời Chúc & Mở QR Code Tĩnh mừng cưới */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 border-t border-red-800/50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] text-[#8b1c25] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#e6d6a8] disabled:opacity-50 transition-all shadow-md active:scale-98"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi lời chúc mừng"}
            </button>

            <button
              type="button"
              onClick={onOpenDonation}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[#d4af37] text-[#e6d6a8] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#8b1c25] transition-all active:scale-98"
            >
              💝 Gửi Quà Mừng Cưới
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
