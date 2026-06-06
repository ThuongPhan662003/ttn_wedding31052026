"use client";

import { useState } from "react";

export default function GuestConfirmForm({ guestType, ceremonyName }) {
  const [name, setName] = useState("");

  const [attendance, setAttendance] = useState(null);

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (attendance === null) {
      alert("Vui lòng chọn tham dự");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/guest-confirm", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          attendance,
          guestType,
          ceremonyName,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Cảm ơn bạn đã xác nhận tham dự ❤️");

        setName("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập họ và tên"
        className="
          w-full
          px-4
          py-3
          rounded-xl
          mb-4
          text-center
        "
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setAttendance(true)}
          className={`py-3 rounded-xl ${
            attendance === true ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          Tham dự
        </button>

        <button
          onClick={() => setAttendance(false)}
          className={`py-3 rounded-xl ${
            attendance === false ? "bg-red-600 text-white" : "bg-white"
          }`}
        >
          Không tham dự
        </button>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="
          w-full
          py-3
          rounded-full
          bg-[#c9a227]
          text-[#66785f]
          font-bold
        "
      >
        {loading ? "Đang gửi..." : "Xác nhận"}
      </button>
    </div>
  );
}
