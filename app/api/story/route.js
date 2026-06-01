import clientPromise from "@/lib/mongodb"; // Đường dẫn tới file kết nối MongoDB của bạn
import { NextResponse } from "next/server";

// Vì dữ liệu LoveStory ít khi thay đổi, bạn có thể để Vercel cache hoặc ép fetch mới bằng revalidate = 0
export const revalidate = 0;

export async function GET() {
  try {
    // 1. Kết nối tới MongoDB
    const client = await clientPromise;
    const db = client.db("wedding_db"); // Tên database trên Atlas

    // 2. Lấy dữ liệu từ bộ sưu tập 'lovestory' và sắp xếp theo id tăng dần (1, 2, 3...)
    const rows = await db
      .collection("lovestory")
      .find({})
      .sort({ id: 1 }) // Đảm bảo câu chuyện hiển thị đúng thứ tự từ trước đến sau
      .toArray();

    // 3. Chuyển đổi cấu trúc dữ liệu từ MongoDB khớp 100% với Frontend cũ của bạn
    const timelines = rows.map((row, index) => ({
      // Nếu cột id trong file csv được import dưới dạng Number, ta convert sang String để an toàn
      id:
        row.id !== undefined && row.id !== null
          ? row.id.toString()
          : index.toString(),
      date: row.thoi_gian || "", // Khớp với tên cột 'thoi_gian' trong file CSV của bạn
      title: row.tieu_de || "", // Khớp với tên cột 'tieu_de'
      desc: row.noi_dung || "", // Khớp với tên cột 'noi_dung' và biến 'desc' ở giao diện cũ
      image: row.hinh_anh_url || "", // Khớp với tên cột 'hinh_anh_url' và biến 'image' ở giao diện cũ
    }));

    // 4. Trả về dữ liệu thành công với đúng format `{ data: timelines }` của bạn
    return NextResponse.json({ data: timelines }, { status: 200 });
  } catch (error) {
    console.error("Lỗi API fetch LoveStory từ MongoDB:", error);
    return NextResponse.json(
      { error: "Không thể tải dữ liệu câu chuyện" },
      { status: 500 },
    );
  }
}
