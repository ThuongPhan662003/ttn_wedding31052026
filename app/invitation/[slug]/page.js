import { getGoogleSheet } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0; // Đảm bảo quét dữ liệu realtime liên tục từ Google Sheets

export default async function InvitationPage({ params }) {
  // Giải nén Promise params theo chuẩn kiến trúc bất đồng bộ Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    // 1. Kết nối Google Sheets Database
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['DanhSachKhach'];
    const rows = await sheet.getRows();

    // 2. Tra cứu khách mời dựa trên chuỗi định danh slug từ URL
    const guest = rows.find(row => row.get('slug') === slug);

    if (!guest) {
      return notFound(); 
    }

    // Bóc tách chính xác mảng dữ liệu thô từ hàng Google Sheets tránh lỗi hiển thị
    const tenKhach = guest._rawData[1] || guest.get('ten_khach'); 
    const nhomKhach = guest._rawData[2] || guest.get('nhom_khach'); 

    // 3. Hệ thống cấu hình nội dung hoán đổi linh hoạt theo nhóm khách
    const weddingConfig = {
      nha_trai: {
        title: "TIỆC CƯỚI NHÀ TRAI",
        time: "18:00 — Chủ Nhật, 18/10/2026",
        location: "Trung tâm Hội nghị Yến tiệc Đại Hỷ",
        address: "Sảnh Hoàng Kim, Lầu 3, Số 156 Lý Chiêu Hoàng, Phường Bình Phú, Quận 6, TP.HCM",
        mapLink: "https://maps.google.com" 
      },
      nha_gai: {
        title: "TIỆC CƯỚI NHÀ GÁI",
        time: "17:30 — Thứ Bảy, 17/10/2026",
        location: "Tư Gia Nhà Gái — Tộc Phan",
        address: "Đường Số 4, Khu Phố 2, Phường An Phú, TP. Thủ Đức, TP.HCM",
        mapLink: "https://maps.google.com" 
      }
    };

    const currentInfo = weddingConfig[nhomKhach] || weddingConfig['nha_trai'];

    return (
      // Không gian bao cảnh màu Trắng thanh lịch tuyệt đối (bg-wedding-bg) tinh khiết
      <main className="min-h-screen bg-wedding-bg flex flex-col items-center justify-center p-6 md:p-12 text-wedding-dark antialiased">
        
        {/* Nút quay lại thiết kế dạng chữ mảnh tối giản */}
        <Link href="/" className="mb-12 flex items-center gap-1.5 text-[10px] font-normal tracking-[0.2em] uppercase text-wedding-dark/40 hover:text-wedding-dark transition-colors">
          ← Trang chủ
        </Link>

        {/* ✉️ KHUNG THIỆP PHONG CÁCH MINIMALISM (TỐI GIẢN CHÂN PHƯƠNG) */}
        <div className="max-w-md w-full py-12 px-6 md:px-8 bg-wedding-bg border border-wedding-dark/5 rounded-none text-center space-y-10 relative">
          
          {/* Đường kẻ dọc góc tinh tế làm điểm nhấn mỹ thuật Bắc Âu */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-wedding-gold/40" />

          {/* Tiêu đề viết tắt tinh giản */}
          <div className="text-[10px] font-medium tracking-[0.4em] text-wedding-gold uppercase">
            M &amp; T • WEDDING
          </div>

          {/* Tên cặp đôi với Font Playfair có chân, căn chỉnh kích thước tương phản mảnh mai */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-playfair font-light tracking-wide text-wedding-dark">
              Minh Hiếu
            </h2>
            <p className="text-sm font-playfair italic text-wedding-gold/60">&amp;</p>
            <h2 className="text-3xl md:text-4xl font-playfair font-light tracking-wide text-wedding-dark">
              Thảo Tiên
            </h2>
          </div>

          {/* Đường kẻ ngang mảnh phân chia bố cục ngăn nắp */}
          <div className="w-12 h-[1px] bg-wedding-dark/10 mx-auto" />

          {/* Khối lời mời cá nhân hóa - Không đổ màu nền, giữ trọn nét chữ thanh thoát */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-wedding-dark/40 font-light">
              Trân trọng kính mời
            </p>
            <h1 className="text-xl md:text-2xl font-light text-wedding-dark tracking-wide">
              {tenKhach}
            </h1>
            <p className="text-[11px] text-wedding-dark/60 font-light max-w-xs mx-auto leading-relaxed pt-2">
              Đến dự buổi tiệc chung vui cùng gia đình chúng mình tại sảnh cưới.
            </p>
          </div>

          {/* Khối thông tin địa điểm và thời gian động */}
          <div className="border-t border-b border-wedding-dark/5 py-8 space-y-4">
            <p className="text-[10px] font-medium tracking-[0.25em] text-wedding-gold uppercase">
              {currentInfo.title}
            </p>
            
            <div className="space-y-1">
              <p className="text-sm font-medium tracking-wide text-wedding-dark">
                {currentInfo.time}
              </p>
              <p className="text-base font-playfair text-wedding-dark pt-2">
                {currentInfo.location}
              </p>
              <p className="text-[11px] max-w-xs mx-auto text-wedding-dark/50 leading-relaxed font-light">
                {currentInfo.address}
              </p>
            </div>
          </div>

          {/* Hệ thống tương tác tối giản: Các nút bấm chuyển thành viền vuông vuông vức hoặc bo nhẹ gọn gàng */}
          <div className="space-y-3 pt-4 px-4">
            <a 
              href={currentInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-[10px] uppercase font-medium text-wedding-dark/60 hover:text-wedding-dark border border-wedding-dark/10 hover:border-wedding-dark/30 py-3 transition-all tracking-[0.2em]"
            >
              Xem Bản Đồ
            </a>

            <Link 
              href={`/send-wish?slug=${slug}`} 
              className="block w-full bg-wedding-dark hover:bg-wedding-dark/90 text-white font-medium py-3 text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Gửi lời chúc &amp; RSVP
            </Link>
          </div>

          {/* Hạt chấm kết bài tối giản */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-wedding-dark/10" />

        </div>

        {/* Chân trang thanh tao dùng màu chữ tối mờ */}
        <p className="text-[9px] text-wedding-dark/30 font-light uppercase tracking-[0.3em] mt-12">
          2026 • HIẾU &amp; TIÊN
        </p>

      </main>
    );
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-bg p-4 text-wedding-dark">
        <div className="max-w-xs w-full py-8 px-4 border border-wedding-dark/10 text-center space-y-2">
          <h2 className="font-playfair text-base tracking-wide text-wedding-gold">Đang kết nối dữ liệu</h2>
          <p className="text-[11px] text-wedding-dark/50 font-light leading-relaxed">Hệ thống thiệp đang đồng bộ tự động từ Google Sheets. Vui lòng tải lại trang sau ít giây nhé!</p>
        </div>
      </div>
    );
  }
}