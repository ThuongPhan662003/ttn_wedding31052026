import clientPromise from "@/lib/mongodb"; // Đường dẫn tới file kết nối MongoDB của bạn
import { NextResponse } from "next/server";

// ==========================================
// 1. API NHẬN LỜI CHÚC & LƯU CHUỖI ẢNH (POST)
// ==========================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { ten_khach, loi_chuc, hinh_anh_url } = body; // hinh_anh_url là chuỗi ảnh Base64 từ Client

    if (!ten_khach) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    // Kết nối tới MongoDB
    const client = await clientPromise;
    const db = client.db("wedding_db");

    // Tạo bản ghi lời chúc mới đồng bộ với định dạng cũ của bạn
    const newWish = {
      id: Date.now().toString(), // Giữ nguyên cách tạo id dạng chuỗi timestamp của bạn
      ten_khach: ten_khach.trim(),
      loi_chuc: loi_chuc.trim(),
      hinh_anh_url: hinh_anh_url || "", // Lưu chuỗi văn bản ảnh Base64 siêu mượt trên Mongo
      thoi_gian: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
      createdAt: new Date(), // Thêm trường thời gian chuẩn của hệ thống để hỗ trợ sắp xếp chính xác
    };

    // Ghi dữ liệu trực tiếp vào bộ sưu tập 'wishes'
    await db.collection("wishes").insertOne(newWish);

    return NextResponse.json(
      { message: "🎉 Lời chúc đã được lưu vào database thành công!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi API POST Wishes trên MongoDB:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==========================================
// 2. API LẤY DANH SÁCH LỜI CHÚC RA SẢNH TIỆC (GET)
// ==========================================
export async function GET() {
  try {
    // Kết nối tới MongoDB
    const client = await clientPromise;
    const db = client.db("wedding_db");

    // Lấy danh sách lời chúc từ collection 'wishes'
    // Sắp xếp theo thứ tự mới nhất lên đầu nhờ trường `createdAt` (Thay vì dùng hàm .reverse() tốn RAM)
    const wishes = await db
      .collection("wishes")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Map lại dữ liệu để đảm bảo cấu trúc trả về khớp hoàn toàn với cấu trúc mảng cũ của Frontend
    const cleanWishes = wishes.map((row) => ({
      id: row.id || Date.now().toString(),
      ten_khach: row.ten_khach || "Khách ẩn danh",
      loi_chuc: row.loi_chuc || "",
      hinh_anh_url: row.hinh_anh_url || "", // Trả chuỗi Base64 về cho Frontend render bình thường
      thoi_gian: row.thoi_gian || "",
    }));

    return NextResponse.json(cleanWishes, { status: 200 });
  } catch (error) {
    console.error("Lỗi API GET Wishes trên MongoDB:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
