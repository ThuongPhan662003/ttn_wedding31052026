import { getGoogleSheet } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0; // Quét dữ liệu realtime liên tục từ Google Sheets

export default async function InvitationPage({ params }) {
  // Giải nén Promise params theo chuẩn Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['DanhSachKhach'];
    const rows = await sheet.getRows();

    const guest = rows.find(row => row.get('slug') === slug);

    if (!guest) {
      return notFound(); 
    }

    const tenKhach = guest._rawData[1] || guest.get('ten_khach'); 
    const nhomKhach = guest._rawData[2] || guest.get('nhom_khach'); 

    // Cấu hình nội dung được tách nhỏ để ghép vào thiết kế 3 cột giống ảnh mẫu
    const weddingConfig = {
      nha_trai: {
        title: "NHÀ TRAI",
        dayOfWeek: "CHỦ NHẬT",
        day: "18",
        monthYear: "THÁNG 10, 2026",
        hour: "18:00",
        locationName: "Đại Hỷ Center",
        city: "QUẬN 6, TP.HCM",
        address: "Sảnh Hoàng Kim, Số 156 Lý Chiêu Hoàng, P. Bình Phú",
        mapLink: "https://maps.google.com" 
      },
      nha_gai: {
        title: "NHÀ GÁI",
        dayOfWeek: "THỨ BẢY",
        day: "17",
        monthYear: "THÁNG 10, 2026",
        hour: "17:30",
        locationName: "Tư Gia Tộc Phan",
        city: "THỦ ĐỨC, TP.HCM",
        address: "Đường Số 4, Khu Phố 2, Phường An Phú",
        mapLink: "https://maps.google.com" 
      }
    };

    const currentInfo = weddingConfig[nhomKhach] || weddingConfig['nha_trai'];

    return (
      // Background sử dụng màu nền Trắng thanh lịch theo chuẩn biến wedding-bg
      <main className="min-h-screen bg-wedding-bg flex flex-col items-center p-4 md:p-8 antialiased relative overflow-hidden">
        
        {/* Lớp nền giả lập vệt màu nước (Watercolor Splashes) sử dụng màu Pastel và Pink */}
        <div className="absolute top-[-5%] right-[-15%] w-[350px] h-[350px] bg-wedding-pastel rounded-full blur-[80px] opacity-80 pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-15%] w-[400px] h-[400px] bg-wedding-pink rounded-full blur-[80px] opacity-30 pointer-events-none" />
        
        <Link href="/" className="mb-6 mt-2 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-wedding-dark/60 hover:text-wedding-gold transition-colors relative z-20">
          ← Sảnh đón tiếp
        </Link>

        {/* ✉️ KHUNG THIỆP CHÍNH (ARCH WRAPPER) */}
        <div className="relative w-full max-w-md flex flex-col items-center px-6 pb-12 z-10 min-h-[80vh]">
          
          {/* Họa tiết viền vòm khuyết chân (Open Arch Border) mạ Vàng Gold */}
          <div className="absolute top-0 left-4 right-4 bottom-0 border-t-[1.5px] border-x-[1.5px] border-wedding-gold/60 rounded-t-[200px] opacity-80 pointer-events-none" />

          {/* Logo Monogram tinh tế đỉnh thiệp áp dụng Font Playfair */}
          <div className="mt-12 mb-6 flex flex-col items-center">
            <span className="text-xl text-wedding-dark tracking-widest font-playfair">
              H <span className="text-wedding-gold mx-1">|</span> T
            </span>
            <span className="text-wedding-gold text-sm mt-1 opacity-70">🌿</span>
          </div>

          <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-wedding-dark/70 mb-8 text-center">
            Sự hiện diện của bạn là niềm vinh hạnh
          </p>

          {/* TÊN CẶP ĐÔI - Áp dụng cấu hình font Arcittya và Coldwell từ Tailwind */}
          <div className="flex flex-col items-center mb-8 w-full">
            <h1 className="text-4xl text-wedding-dark tracking-widest uppercase font-arcittya">
              Trọng Nghĩa
            </h1>
            <span className="text-4xl text-wedding-gold my-2 leading-none font-coldwell">
              and
            </span>
            {/* Mình đã đồng bộ font Arcittya cho cả 2 tên để bố cục hoàn mỹ hơn */}
            <h1 className="text-4xl text-wedding-dark tracking-widest uppercase font-arcittya">
              Thu Thảo
            </h1>
          </div>

          <p className="text-[9px] uppercase tracking-[0.25em] font-medium text-wedding-dark/70 mb-6 text-center">
            Trân trọng kính mời <br/>
            <span className="text-xl text-wedding-gold block mt-3 capitalize font-playfair">
              {tenKhach}
            </span>
          </p>

          <div className="w-10 h-[1px] bg-wedding-gold/50 mb-6" />

          {/* 📅 KHỐI NGÀY THÁNG 3 CỘT (Hoàn toàn dùng biến màu Tailwind) */}
          <div className="flex items-center justify-center gap-5 mb-8 w-full">
            <p className="text-[10px] uppercase tracking-widest text-wedding-dark/70 w-[70px] text-right font-medium">
              {currentInfo.dayOfWeek}
            </p>
            <div className="w-[1px] h-12 bg-wedding-gold/40" />
            <div className="flex flex-col items-center justify-center min-w-[60px]">
              <span className="text-4xl text-wedding-dark leading-none font-playfair">
                {currentInfo.day}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-wedding-dark/70 mt-2 font-medium">
                {currentInfo.monthYear}
              </span>
            </div>
            <div className="w-[1px] h-12 bg-wedding-gold/40" />
            <p className="text-[10px] uppercase tracking-widest text-wedding-dark/70 w-[70px] text-left font-medium">
              {currentInfo.hour}
            </p>
          </div>

          {/* 🏛️ ĐỊA ĐIỂM (Chữ Script nghệ thuật dùng biến font-coldwell) */}
          <div className="text-center mb-8">
            <p className="text-3xl text-wedding-gold mb-2 font-coldwell">
              {currentInfo.locationName}
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-wedding-dark mb-2">
              {currentInfo.city}
            </p>
            <p className="text-[10px] text-wedding-dark/70 max-w-[240px] mx-auto leading-relaxed">
              {currentInfo.address}
            </p>
          </div>

          {/* Họa tiết chiếc lá */}
          <div className="text-wedding-gold text-lg mb-2 opacity-70">❦</div>
          <p className="text-xl text-wedding-gold mb-10 font-coldwell">
            Tiệc mừng theo sau
          </p>

          {/* KHỐI NÚT TƯƠNG TÁC */}
          <div className="w-full px-4 space-y-3 relative z-20">
            <a 
              href={currentInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-[10px] uppercase font-bold text-wedding-dark border border-wedding-gold/50 hover:border-wedding-gold hover:bg-wedding-pastel/30 py-4 bg-white/30 backdrop-blur-sm transition-all tracking-[0.2em]"
            >
              Xem Bản Đồ Đường Đi
            </a>
            
            <Link 
              href={`/send-wish?slug=${slug}`} 
              className="flex items-center justify-center w-full bg-wedding-dark hover:bg-wedding-dark/80 text-white font-medium py-4 text-[10px] tracking-[0.2em] uppercase transition-all shadow-md"
            >
              Xác nhận tham dự & Lời chúc
            </Link>
          </div>
        </div>

        <p className="text-[8px] text-wedding-dark/50 font-medium uppercase tracking-[0.4em] mt-8 relative z-20">
          Trọng Nghĩa & Thu Thảo Wedding • 2026
        </p>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-bg p-4 text-wedding-dark">
        <div className="max-w-xs w-full py-8 px-4 border border-wedding-gold/40 text-center space-y-2 bg-wedding-pastel/30 backdrop-blur-sm">
          <h2 className="text-base tracking-wide text-wedding-gold font-playfair">
            Đang kết nối dữ liệu
          </h2>
          <p className="text-[11px] text-wedding-dark/70 font-light">
            Hệ thống đang đồng bộ dữ liệu thiệp. Vui lòng tải lại trang sau ít giây!
          </p>
        </div>
      </div>
    );
  }
}