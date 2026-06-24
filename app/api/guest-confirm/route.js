import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { ten_khach, tham_du, nhom_khach, so_luong } = await request.json();

    if (!ten_khach?.trim()) {
      return NextResponse.json(
        {
          error: "Vui lòng nhập tên",
        },
        {
          status: 400,
        },
      );
    }

    const client = await clientPromise;
    const db = client.db("wedding_db");

    await db.collection("guests_confirm").insertOne({
      ten_khach: ten_khach.trim(),
      tham_du,
      nhom_khach,
      so_luong: tham_du === "yes" ? Number(so_luong) || 1 : 0,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Xác nhận thành công",
    });
  } catch (error) {
    console.error("Guest confirm error:", error);

    return NextResponse.json(
      {
        error: "Lỗi máy chủ",
      },
      {
        status: 500,
      },
    );
  }
}
