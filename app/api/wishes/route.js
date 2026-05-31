import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { NextResponse } from 'next/server';

// Hàm cấu hình xác thực Google dùng chung cho cả Sheets và Drive
function getGoogleAuth() {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive'
    ],
  });
}

// 1. API NHẬN LỜI CHÚC VÀ ĐẨY ẢNH LÊN GOOGLE DRIVE (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { ten_khach, loi_chuc, hinh_anh_url } = body; // hinh_anh_url lúc này là chuỗi base64 từ client gửi lên

    if (!ten_khach || !loi_chuc) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    let driveDownloadLink = '';

    // LỰA CHỌN XỬ LÝ: Nếu khách có gửi kèm hình ảnh
    if (hinh_anh_url && hinh_anh_url.startsWith('data:image')) {
      const auth = getGoogleAuth();
      const drive = google.drive({ version: 'v3', auth });

      // Cấu hình ID thư mục Google Drive bạn vừa tạo ở Bước 1
      const FOLDER_ID = 'ĐIỀN_FOLDER_ID_CỦA_BẠN_VÀO_ĐÂY'; 

      // Bóc tách chuỗi Base64 chuyển đổi ngược lại thành dữ liệu nhị phân (Buffer) file ảnh
      const base64Data = hinh_anh_url.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');

      // Tạo luồng stream giả lập để Google Drive API chấp nhận tải lên
      const { Readable } = require('stream');
      const bufferStream = new Readable();
      bufferStream.push(buffer);
      bufferStream.push(null);

      // Tiến hành upload file ảnh vật lý lên Google Drive
      const driveResponse = await drive.files.create({
        requestBody: {
          name: `wedding_${Date.now()}.jpg`,
          parents: [FOLDER_ID],
          mimeType: 'image/jpeg'
        },
        media: {
          mimeType: 'image/jpeg',
          body: bufferStream
        },
        fields: 'id'
      });

      const fileId = driveResponse.data.id;

      // Cấu hình quyền công khai (Public) để mọi người có thể xem được ảnh trên web
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      // Tạo link hiển thị ảnh trực tiếp (Direct Link) từ Google Drive
      driveDownloadLink = `https://lh3.googleusercontent.com/u/0/d/${fileId}`;
    }

    // GHI THÔNG TIN VÀO DATABASE GOOGLE SHEETS
    const auth = getGoogleAuth();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Wishes'];

    await sheet.addRow({
      id: Date.now().toString(),
      ten_khach: ten_khach,
      loi_chuc: loi_chuc,
      hinh_anh_url: driveDownloadLink, // Lưu link ảnh Google Drive sạch sẽ vào cột D
      thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    });

    return NextResponse.json({ message: 'Lưu dữ liệu và ảnh lên Google Drive thành công!' }, { status: 200 });
  } catch (error) {
    console.error('Lỗi API POST Wishes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. API LẤY DỮ LIỆU ĐỂ HIỂN THỊ RA SẢNH TIỆC (GET)
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
        hinh_anh_url: raw[3] || row.get('hinh_anh_url') || '', // Link Google Drive
        thoi_gian: raw[4] || row.get('thoi_gian') || ''
      };
    });

    return NextResponse.json(cleanWishes.reverse(), { status: 200 });
  } catch (error) {
    console.error('Lỗi API GET Wishes:', error);
    return NextResponse.json({ error: 'Không thể tải sảnh lời chúc' }, { status: 500 });
  }
}