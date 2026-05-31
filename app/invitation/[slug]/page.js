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

    const tenKhach = guest.get('ten_khach');
    const nhomKhach = guest.get('nhom_khach'); 

    // 3. Hệ thống cấu hình nội dung sang trọng hoán đổi linh hoạt theo nhóm khách
    const weddingConfig = {
      nha_trai: {
        title: "LỄ THÀNH HÔN • TIỆC NHÀ TRAI",
        time: "18:00 — Chủ Nhật, Ngày 18 Tháng 10 Năm 2026",
        location: "Trung tâm Hội nghị Yến tiệc Đại Hỷ",
        address: "Sảnh Hoàng Kim (Lầu 3), Số 156 Lý Chiêu Hoàng, Phường Bình Phú, Quận 6, TP. Hồ Chí Minh",
        mapLink: "https://maps.google.com" 
      },
      nha_gai: {
        title: "LỄ VU QUY • TIỆC NHÀ GÁI",
        time: "17:30 — Thứ Bảy, Ngày 17 Tháng 10 Năm 2026",
        location: "Tư Gia Nhà Gái — Gia Đình Tộc Phan",
        address: "Đường Số 4, Khu Phố 2, Phường An Phú, TP. Thủ Đức, TP. Hồ Chí Minh",
        mapLink: "https://maps.google.com" 
      }
    };

    const currentInfo = weddingConfig[nhomKhach] || weddingConfig['nha_trai'];

    return (
      // Không gian bao cảnh tinh tế phối màu Trắng thanh lịch (wedding-bg) xen kẽ hạt sương mờ [source: 1]
      <main className="min-h-screen bg-wedding-bg flex flex-col items-center justify-center p-4 md:p-8 antialiased relative overflow-hidden">
        
        {/* Họa tiết nghệ thuật chìm mờ ảo làm sang trọng nền ngoài */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-wedding-pastel/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-wedding-pastel/40 rounded-full blur-3xl pointer-events-none" />

        {/* Nút điều hướng tinh tế sử dụng tone wedding-dark thanh mảnh [source: 1] */}
        <Link href="/" className="group mb-8 flex items-center gap-2 text-[10px] font-medium text-wedding-dark/60 hover:text-wedding-gold tracking-[0.3em] uppercase transition-all relative z-20">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Sảnh đón tiếp chính
        </Link>

        {/* ✉️ KIẾN TRÚC THIỆP MỜI SANG TRỌNG BẬC NHẤT (ULTRA-LUXURY DIGITAL INVITATION) [source: 1] */}
        <div className="max-w-md w-full bg-white rounded-3xl p-6 md:p-8 text-center relative border border-wedding-gold/15 shadow-[0_30px_70px_-15px_rgba(212,175,55,0.12)] backdrop-blur-md">
          
          {/* Lớp khung viền kép hình vòm hoa mỹ dát vàng (wedding-gold) chạy dọc mép trong [source: 1] */}
          <div className="absolute inset-3 border border-wedding-gold/25 rounded-[20px] pointer-events-none" />
          <div className="absolute inset-4 border border-wedding-gold/5 rounded-[16px] pointer-events-none" />

          {/* Phần đầu tấm thiệp: Logo Monogram Hoàng Gia */}
          <div className="relative z-10 mt-4 mb-6">
            <div className="w-12 h-12 rounded-full border border-wedding-gold/30 flex items-center justify-center mx-auto mb-2 bg-wedding-bg shadow-sm">
              <span className="text-wedding-gold text-lg font-playfair tracking-tighter">H&amp;T</span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-wedding-gold font-semibold">The Wedding Celebration</p>
          </div>

          {/* Tên cặp đôi thiết kế với nét chữ Playfair thanh thoát đầy quý phái [source: 1] */}
          <div className="relative z-10 mb-8 px-4">
            <h2 className="text-3xl md:text-4xl text-wedding-dark tracking-wide font-playfair font-light leading-tight">
              Minh Hiếu
            </h2>
            <div className="flex justify-center items-center gap-3 my-2 text-wedding-gold/60 font-serif italic text-lg">
              <span className="w-8 h-[1px] bg-wedding-gold/20" />
              <span>&amp;</span>
              <span className="w-8 h-[1px] bg-wedding-gold/20" />
            </div>
            <h2 className="text-3xl md:text-4xl text-wedding-dark tracking-wide font-playfair font-light leading-tight">
              Thảo Tiên
            </h2>
          </div>

          {/* 🎫 KHỐI CỔNG VÒM "THE ROYAL ARCH" CHỨA DANH TÍNH KHÁCH MỜI ĐỘC QUYỀN [source: 1] */}
          <div className="relative z-10 bg-wedding-pastel/40 border border-wedding-gold/15 rounded-t-full pt-8 pb-6 px-6 mb-8 max-w-[280px] mx-auto shadow-sm">
            <p className="text-[9px] text-wedding-gold uppercase tracking-[0.25em] mb-2 font-medium">Trân trọng kính mời</p>
            <h1 className="text-2xl md:text-3xl font-normal text-wedding-dark tracking-wide font-playfair border-b border-wedding-gold/10 pb-4 max-w-[200px] mx-auto">
              {tenKhach}
            </h1>
            <p className="text-[10px] text-wedding-dark/60 max-w-xs mx-auto mt-4 leading-relaxed font-light">
              Đến dự buổi tiệc chung vui cùng đại gia đình chúng mình tại không gian sảnh tiệc lãng mạn
            </p>
          </div>

          {/* 🏛️ KHỐI THÔNG TIN ĐỊA ĐIỂM DỮ LIỆU ĐỘNG KIỂU CỔ ĐIỂN [source: 1] */}
          <div className="relative z-10 border-t border-b border-wedding-gold/20 py-6 my-6 text-wedding-dark space-y-4">
            <p className="font-medium text-[11px] tracking-[0.3em] text-wedding-gold uppercase">
              {currentInfo.title}
            </p>
            
            <div className="text-xs space-y-3 font-light tracking-wide">
              <div className="flex items-center justify-center gap-2 opacity-90 text-wedding-dark/80">
                <span>⏱️</span>
                <p className="font-medium">{currentInfo.time}</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-normal text-wedding-dark tracking-wide font-playfair mt-1">
                  {currentInfo.location}
                </p>
                <p className="text-[11px] leading-relaxed max-w-xs mx-auto opacity-75 italic font-light px-2">
                  {currentInfo.address}
                </p>
              </div>
            </div>
          </div>

          {/* HỆ THỐNG NÚT BẤM ĐIỀU HƯỚNG SANG TRỌNG VÀ SẮC NÉT [source: 1] */}
          <div className="relative z-10 mt-8 space-y-3 px-2 sm:px-6">
            <a 
              href={currentInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-[10px] uppercase font-medium bg-white hover:bg-wedding-pastel/20 text-wedding-gold border border-wedding-gold/40 py-3 rounded-full transition-all tracking-[0.2em] shadow-sm flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              🗺️ Chỉ đường Google Maps
            </a>

            <Link 
              href={`/send-wish?slug=${slug}`} 
              className="block w-full bg-wedding-pink hover:bg-wedding-pink/90 text-white font-medium py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase shadow-lg shadow-wedding-pink/20 transition-all active:scale-[0.99]"
            >
              Mở thiệp &amp; Xác nhận tham dự
            </Link>
          </div>

          {/* Họa tiết biểu tượng chấm vàng kết bài tinh xảo */}
          <div className="text-wedding-gold/40 text-xs mt-6 mb-2">✦ 🌸 ✦</div>

        </div>

        {/* Chân trang thanh lịch phối tone màu tối nhẹ [source: 1] */}
        <p className="text-[9px] text-wedding-dark/40 font-medium uppercase tracking-[0.4em] mt-8 transition-colors">
          Hiếu &amp; Tiên Wedding • 2026
        </p>

      </main>
    );
  } catch (error) {
    console.error("Lỗi kết nối đồng bộ cơ sở dữ liệu:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-bg p-4">
        <div className="bg-white p-8 rounded-2xl border border-wedding-gold/20 text-center shadow-xl max-w-xs relative">
          <div className="absolute inset-3 border border-wedding-gold/10 rounded-xl pointer-events-none" />
          <h2 className="text-wedding-gold font-playfair text-lg tracking-wide mb-2">Hệ thống đang đồng bộ</h2>
          <p className="text-xs text-wedding-dark/70 leading-relaxed font-light">Mã nguồn thiệp mời điện tử đang được cập nhật dữ liệu tự động từ Google Sheets. Bạn vui lòng tải lại trang sau ít giây!</p>
        </div>
      </div>
    );
  }
}