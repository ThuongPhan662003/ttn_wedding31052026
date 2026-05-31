import { NextResponse } from 'next/server';
import { getGoogleSheet } from '@/lib/googleSheets';

// API xử lý khi Client gửi dữ liệu RSVP lên
export async function POST(request) {
  try {
    const { slug, status, note } = await request.json();
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['DanhSachKhach']; // Tên Tab trong Google Sheets
    const rows = await sheet.getRows();

    // Tìm dòng có slug khớp với khách mời
    const guestRow = rows.find(row => row.get('slug') === slug);

    if (!guestRow) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy khách mời.' }, { status: 404 });
    }

    // Cập nhật trạng thái RSVP và ghi chú vào Sheets
    guestRow.set('trang_thai_rsvp', status);
    guestRow.set('ghi_chu', note);
    await guestRow.save();

    return NextResponse.json({ success: true, message: 'Xác nhận RSVP thành công!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Lỗi server.' }, { status: 500 });
  }
}