"use client";

import { useEffect, useState } from "react";

export default function GuestListPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = guests.length;

  const attending = guests.filter((g) => g.tham_du === "yes").length;

  const absent = guests.filter((g) => g.tham_du === "no").length;

  const nhaGai = guests.filter((g) => g.nhom_khach === "nha_gai").length;

  const nhaTrai = guests.filter((g) => g.nhom_khach === "nha_trai").length;
  useEffect(() => {
    fetch("/api/guests")
      .then((res) => res.json())
      .then((data) => {
        setGuests(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Thống kê */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow border">
          <p className="text-sm text-gray-500">Tổng khách</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 shadow border">
          <p className="text-sm text-green-700">Tham dự</p>
          <p className="text-3xl font-bold text-green-700">{attending}</p>
        </div>

        <div className="bg-red-50 rounded-2xl p-5 shadow border">
          <p className="text-sm text-red-700">Không tham dự</p>
          <p className="text-3xl font-bold text-red-700">{absent}</p>
        </div>

        <div className="bg-pink-50 rounded-2xl p-5 shadow border">
          <p className="text-sm text-pink-700">Nhà gái</p>
          <p className="text-3xl font-bold text-pink-700">{nhaGai}</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-5 shadow border">
          <p className="text-sm text-blue-700">Nhà trai</p>
          <p className="text-3xl font-bold text-blue-700">{nhaTrai}</p>
        </div>
      </div>

      {/* Danh sách khách */}
      <div className="grid gap-4">
        {guests.map((guest) => (
          <div
            key={guest._id}
            className="bg-white rounded-2xl p-5 shadow border"
          >
            <h3 className="font-semibold text-lg">{guest.ten_khach}</h3>

            <p className="text-sm text-gray-500">
              {guest.nhom_khach === "nha_gai" ? "Nhà gái" : "Nhà trai"}
            </p>

            <div className="mt-3">
              {guest.tham_du === "yes" ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Tham dự
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Không tham dự
                </span>
              )}
            </div>

            <p className="mt-3 text-xs text-gray-400">
              {new Date(guest.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
