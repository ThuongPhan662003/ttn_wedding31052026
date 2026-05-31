import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { NextResponse } from 'next/server';

// Hàm cấu hình xác thực Google Sheets an toàn
function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error("Thiếu biến môi trường GOOGLE_SERVICE_ACCOUNT_EMAIL hoặc GOOGLE_PRIVATE_KEY trên Vercel!");
  }

  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const formattedKey = privateKey.replace(/\\n/g, '\n');

  return new JWT({
    email: email,
    key: formattedKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// ==========================================
// 1. API NHẬN LỜI CHÚC & LƯU CHUỖI ẢNH (POST)
// ==========================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { ten_khach, loi_chuc, hinh_anh_url } = body; // hinh_anh_url là chuỗi ảnh Base64 đã nén từ Client

    if (!ten_khach || !loi_chuc) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Kết nối thẳng tới Database Google Sheets
    const auth = getGoogleAuth();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Wishes'];

    // Ghi dữ liệu trực tiếp: Lưu luôn chuỗi văn bản ảnh Base64 vào cột hinh_anh_url (Cột D)
    await sheet.addRow({
      id: Date.now().toString(),
      ten_khach: ten_khach,
      loi_chuc: loi_chuc,
      hinh_anh_url: hinh_anh_url || '', 
      thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    });

    return NextResponse.json({ message: '🎉 Lời chúc đã được lưu vào database thành công!' }, { status: 200 });
  } catch (error) {
    console.error('Lỗi API POST Wishes:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==========================================
// 2. API LẤY DANH SÁCH LỜI CHÚC RA SẢNH TIỆC (GET)
// ==========================================
export async function GET() {
  try {
    const auth = getGoogleAuth();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Wishes'];
    const rows = await sheet.getRows();

    const cleanWishes = rows.map(row => {
      const raw = row._rawData || [];
      return {
        id: raw[0] || row.get('id') || Date.now().toString(),
        ten_khach: raw[1] || row.get('ten_khach') || 'Khách ẩn danh',
        loi_chuc: raw[2] || row.get('loi_chuc') || '',
        hinh_anh_url: raw[3] || row.get('hinh_anh_url') || '', // Trả chuỗi Base64 về cho Frontend render
        thoi_gian: raw[4] || row.get('thoi_gian') || ''
      };
    });

    return NextResponse.json(cleanWishes.reverse(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}