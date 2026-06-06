"use client";

import { useState } from "react";

export default function RSVPConfirm({ onConfirmed, type }) {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Vui lòng nhập họ và tên");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/guest-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ten_khach: formData.name.trim(),
          tham_du: formData.attendance,
          nhom_khach: type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }
      setSuccess(true);
      onConfirmed({
        ...formData,
        name: formData.name.trim(),
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Không thể gửi xác nhận");
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return (
      <section className="w-full bg-[#8b1c25] text-white py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#70121a] rounded-3xl p-10 text-center">
          <div className="text-6xl mb-4">💖</div>

          <h2 className="text-3xl font-serif italic text-[#e6d6a8] mb-4">
            Xác nhận thành công
          </h2>

          <p className="text-red-100 leading-relaxed">
            Cảm ơn bạn đã dành thời gian xác nhận tham dự.
            <br />
            Chúng mình rất mong được gặp bạn trong ngày trọng đại.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full bg-[#8b1c25] text-white py-16 px-4">
      {" "}
      <div className="max-w-2xl mx-auto bg-[#70121a] rounded-3xl p-8 md:p-10">
        {" "}
        <div className="text-center mb-8">
          {" "}
          <h2 className="text-3xl font-serif italic text-[#e6d6a8]">
            Xác Nhận Tham Dự{" "}
          </h2>
          ```
          <p className="text-sm text-red-200/70 mt-3">
            Sự hiện diện của bạn là niềm vinh hạnh đối với gia đình chúng mình.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            required
            placeholder="Họ và tên"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#821821] px-4 py-3 outline-none"
          />

          <select
            value={formData.attendance}
            onChange={(e) =>
              setFormData({
                ...formData,
                attendance: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#821821] px-4 py-3 outline-none"
          >
            <option value="yes">💖 Tôi sẽ đến chung vui cùng gia đình</option>

            <option value="maybe">🤍 Tôi sẽ cố gắng sắp xếp tham dự</option>

            <option value="no">🌷 Rất tiếc tôi không thể tham dự</option>
          </select>

          {error && (
            <div className="text-sm text-red-300 bg-red-900/30 rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {loading && (
            <div className="rounded-xl bg-white/10 p-4 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>

              <p className="text-sm text-[#f6e7b7]">
                Hệ thống đang ghi nhận thông tin tham dự...
              </p>
            </div>
          )}
          <button
            disabled={loading}
            type="submit"
            className="
    w-full
    bg-[#d4af37]
    text-[#8b1c25]
    py-4
    rounded-full
    font-semibold
    tracking-wide
    transition
    disabled:opacity-60
    disabled:cursor-not-allowed
    flex
    items-center
    justify-center
    gap-3
  "
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#8b1c25] border-t-transparent rounded-full animate-spin" />
                <span>Đang gửi xác nhận...</span>
              </>
            ) : (
              "Xác Nhận Tham Dự"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
