import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug, status } = await request.json();

    if (!slug || !status) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wedding_db");

    // Tìm đúng khách dựa trên slug và lưu trạng thái RSVP mới nhất
    const result = await db.collection("guests").findOneAndUpdate(
      { slug: slug },
      {
        $set: {
          trang_thai: status, // Cập nhật: "Tham dự" hoặc "Không tham dự"
          updatedAt: new Date(), // Thời gian khách bấm chọn
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      return NextResponse.json(
        { error: "Không tìm thấy khách mời trong hệ thống" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Xác nhận tham dự thành công!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi hệ thống máy chủ" },
      { status: 500 },
    );
  }
}
