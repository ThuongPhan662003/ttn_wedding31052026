import { getGoogleSheet } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import RsvpForm from './RsvpForm';

// Ép buộc Next.js luôn lấy dữ liệu mới nhất từ Google Sheets khi deploy trên Vercel
export const revalidate = 0; 

export default async function InvitationPage({ params }) {
  const { slug } = params;

  try {
    // 1. Kết nối và lấy dữ liệu từ Tab "DanhSachKhach"
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['DanhSachKhach'];
    const rows = await sheet.getRows();

    // 2. Tìm kiếm khách mời có slug trùng khớp trên URL
    const guest = rows.find(row => row.get('slug') === slug);

    // Nếu không tìm thấy khách mời trong file Excel, chuyển hướng sang trang 404
    if (!guest) {
      notFound();
    }

    const tenKhach = guest.get('ten_khach');
    const nhomKhach = guest.get('nhom_khach'); // nha_trai hoặc nha_gai

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF5F5] to-[#FFFFFF]">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-[#F3E5D8] text-center">
          
          {/* Tiêu đề lãng mạn - Font chữ viết tay cổ điển */}
          <h1 className="text-4xl md:text-5xl text-[#D4AF37] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
  Wedding Invitation
</h1>
          
          <div className="mb-8">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Trân trọng kính mời</p>
            <h2 className="text-2xl font-bold text-[#FFB7B2] font-serif">
              {tenKhach}
            </h2>
          </div>

          {/* Thay đổi thông tin địa điểm linh hoạt theo Nhóm Khách */}
          <div className="bg-[#FAF6F0] rounded-xl p-6 mb-8 text-sm text-gray-600 space-y-3">
            <p className="font-bold text-[#D4AF37]">
              {nhomKhach === 'nha_trai' ? '✨ TIỆC NHÀ TRAI ✨' : '✨ TIỆC NHÀ GÁI ✨'}
            </p>
            <p>🗓️ **Thời gian:** 11:00 Ngày 18 Tháng 10 Năm 2026</p>
            <p>📍 **Địa điểm:** {nhomKhach === 'nha_trai' ? 'Trung tâm Tiệc cưới Toàn Cầu' : 'Tư gia Nhà Gái'}</p>
          </div>

          {/* Form xác nhận RSVP phía Client */}
          <RsvpForm slug={slug} />
          
        </div>
      </main>
    );
  } catch (error) {
    console.error("Lỗi fetch dữ liệu cấu hình Vercel:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5F5]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md border border-red-200">
          <h2 className="text-xl font-bold text-red-500 mb-2">Hệ thống đang bảo trì</h2>
          <p className="text-gray-600 text-sm">Xin lỗi bạn, thiệp mời online tạm thời chưa thể nạp nội dung. Vui lòng quay lại sau ít phút!</p>
        </div>
      </div>
    );
  }
}