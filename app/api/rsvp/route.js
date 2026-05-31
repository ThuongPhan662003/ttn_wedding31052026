import { getGoogleSheet } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug, status } = await request.json();

    // Kết nối Google Sheets
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle["DanhSachKhach"];
    const rows = await sheet.getRows();

    // Tìm đúng người khách đang xem thiệp thông qua slug
    const guest = rows.find((row) => row.get("slug") === slug);

    if (!guest) {
      return NextResponse.json(
        { error: "Không tìm thấy khách mời" },
        { status: 404 },
      );
    }

    // Cập nhật cột "trang_thai" và lưu lại
    guest.set("trang_thai", status);
    await guest.save();

    return NextResponse.json(
      { success: true, message: "Đã cập nhật thành công!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi cập nhật RSVP:", error);
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
