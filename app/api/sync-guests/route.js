import { getGoogleSheet } from "@/lib/googleSheets";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 0; // Luôn lấy dữ liệu mới nhất khi gọi API

export async function GET() {
  try {
    // 1. Kết nối Google Sheets lấy danh sách khách mới nhất
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle["DanhSachKhach"];
    if (!sheet) {
      return NextResponse.json(
        { error: "Không tìm thấy tab DanhSachKhach" },
        { status: 404 },
      );
    }
    const rows = await sheet.getRows();

    // 2. Kết nối MongoDB
    const client = await clientPromise;
    const db = client.db("wedding_db");

    let addedCount = 0;

    // 3. Duyệt từng người khách trên Google Sheets
    for (const row of rows) {
      const slug = row.get("slug")?.trim();
      const ten_khach = row.get("ten_khach")?.trim();
      const nhom_khach = row.get("nhom_khach")?.trim() || "nha_trai";
      const ghi_chu = row.get("ghi_chu")?.trim() || "";

      if (!slug) continue; // Bỏ qua nếu dòng đó chưa điền slug

      // Sử dụng lệnh `updateOne` với thuộc tính `$setOnInsert`
      // Ý nghĩa: Nếu chưa có slug này -> Tạo mới và đặt trạng_thai = "Chưa xác nhận"
      //          Nếu đã có slug này -> Giữ nguyên, không thay đổi (tránh mất trạng thái khách đã bấm RSVP)
      await db.collection("guests").updateOne(
        { slug: slug },
        {
          $set: {
            ten_khach: ten_khach,
            nhom_khach: nhom_khach,
            ghi_chu: ghi_chu,
          },
          $setOnInsert: {
            trang_thai: "Chưa xác nhận", // Trạng thái mặc định ban đầu cho khách mới
            createdAt: new Date(),
          },
        },
        { upsert: true }, // Kích hoạt tính năng: Chưa có thì thêm, có rồi thì cập nhật
      );
      addedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Đồng bộ thành công ${addedCount} khách từ Google Sheets sang MongoDB!`,
    });
  } catch (error) {
    console.error("Lỗi đồng bộ dữ liệu:", error);
    return NextResponse.json(
      { error: "Lỗi đồng bộ hệ thống" },
      { status: 500 },
    );
  }
}
