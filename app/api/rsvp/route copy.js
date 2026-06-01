import clientPromise from "@/lib/mongodb"; // Import file kết nối vừa tạo ở Bước 1
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug, status } = await request.json();

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!slug || !status) {
      return NextResponse.json(
        { error: "Thiếu thông tin slug hoặc trạng thái" },
        { status: 400 }
      );
    }

    // 1. Kết nối tới MongoDB
    const client = await clientPromise;
    const db = client.db("wedding_db"); // Tên database bạn đã tạo trên Atlas

    // 2. Tìm trúng khách theo slug và cập nhật trực tiếp trường "trang_thai"
    // Tên trường "trang_thai" khớp hoàn toàn với file CSV cũ của bạn
    const result = await db.collection("guests").findOneAndUpdate(
      { slug: slug },                   // Điều kiện tìm kiếm dựa trên slug nhận từ client
      { 
        $set: { 
          trang_thai: status,           // Cập nhật trạng thái mới (Ví dụ: "Tham dự", "Không tham dự")
          updatedAt: new Date()         // Lưu thêm thời gian cập nhật để tiện theo dõi
        } 
      },
      { returnDocument: "after" }       // Lệnh này yêu cầu Mongo trả về dữ liệu mới sau khi đã sửa xong
    );

    // 3. Nếu MongoDB tìm khắp bảng mà không thấy slug nào khớp
    if (!result) {
      return NextResponse.json(
        { error: "Không tìm thấy khách mời trong hệ thống" },
        { status: 404 }
      );
    }

    // 4. Trả về kết quả thành công siêu tốc cho Frontend
    return NextResponse.json(
      { success: true, message: "Đã cập nhật thành công!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Lỗi cập nhật RSVP trên MongoDB:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống máy chủ khi xử lý RSVP" }, 
      { status: 500 }
    );
  }
}