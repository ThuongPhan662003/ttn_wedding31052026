import { getGoogleSheet } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

// Ép Vercel luôn fetch dữ liệu mới khi có API call (Không cache)
export const revalidate = 0; 

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['LoveStory'];

    if (!sheet) {
      return NextResponse.json({ error: "Không tìm thấy tab 'LoveStory'" }, { status: 404 });
    }

    const rows = await sheet.getRows();

    // Chuyển đổi dữ liệu từ Google Sheets thành mảng Object
    const timelines = rows.map((row, index) => ({
      id: row.get('id') || index.toString(),
      date: row.get('thoi_gian') || '',
      title: row.get('tieu_de') || '',
      desc: row.get('noi_dung') || '',
      image: row.get('hinh_anh_url') || ''
    }));

    return NextResponse.json({ data: timelines }, { status: 200 });

  } catch (error) {
    console.error("Lỗi API fetch LoveStory từ Google Sheets:", error);
    return NextResponse.json(
      { error: "Không thể tải dữ liệu câu chuyện" }, 
      { status: 500 }
    );
  }
}