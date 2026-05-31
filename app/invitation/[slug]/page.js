import { getGoogleSheet } from "@/lib/googleSheets";
import { notFound } from "next/navigation";
import Link from "next/link";

// NHÚNG COMPONENT NÚT BẤM VÀO ĐÂY:
import RSVPButtons from "@/components/Invitation/RSVPButtons";

export const revalidate = 0;

export default async function InvitationPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle["DanhSachKhach"];
    const rows = await sheet.getRows();

    const guest = rows.find((row) => row.get("slug") === slug);

    if (!guest) {
      return notFound();
    }

    const tenKhach = guest._rawData[1] || guest.get("ten_khach");
    const nhomKhach = guest._rawData[2] || guest.get("nhom_khach");

    // LẤY TRẠNG THÁI HIỆN TẠI TỪ GOOGLE SHEETS
    const trangThaiRsvp = guest.get("trang_thai") || "";

    // Cấu hình nội dung
    const weddingConfig = {
      nha_trai: {
        title: "NHÀ TRAI",
        dayOfWeek: "THỨ SÁU",
        day: "10",
        monthYear: "THÁNG 07, 2026",
        hour: "10:30",
        locationName: "Nhà hàng Công Đoàn",
        city: "TỈNH ĐẮK LẮK",
        address: "Tầng trệt 53 Độc Lập, Phường Tuy Hòa",
        mapLink: "https://maps.app.goo.gl/iyvqDWoJPtByyHRg9",
      },
      nha_gai: {
        title: "NHÀ GÁI",
        dayOfWeek: "THỨ SÁU",
        day: "03",
        monthYear: "THÁNG 07, 2026",
        hour: "11:00",
        locationName: "Tư Gia Nhà Gái",
        city: "TP ĐÀ NẴNG",
        address: "Đường 28 - Khối Hà My Tây, Phường Điện Bàn Đông",
        mapLink: "https://maps.app.goo.gl/aUNRR6Hw8y9t7Hdx5",
      },
    };

    const currentInfo = weddingConfig[nhomKhach] || weddingConfig["nha_trai"];

    return (
      <main className="min-h-screen bg-wedding-bg flex flex-col items-center p-4 md:p-8 antialiased relative overflow-hidden">
        <div className="absolute top-[-5%] right-[-15%] w-[350px] h-[350px] bg-wedding-pastel rounded-full blur-[80px] opacity-80 pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-15%] w-[400px] h-[400px] bg-wedding-pink rounded-full blur-[80px] opacity-30 pointer-events-none" />

        <Link
          href="/"
          className="mb-6 mt-2 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-wedding-dark/60 hover:text-wedding-gold transition-colors relative z-20"
        >
          ← Sảnh đón tiếp
        </Link>

        <div className="relative w-full max-w-lg bg-white rounded-[40px] border border-[#C9A227]/20 shadow-[0_30px_80px_rgba(95,113,97,0.08)] px-8 py-14 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#C9A227]/5 to-transparent" />

          <div className="flex flex-col items-center my-5">
            <div className="text-4xl text-[#C9A227]">🌿</div>

            <div className="w-12 h-px bg-[#C9A227]/30 mt-3"></div>
          </div>

          <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-wedding-dark/70 mb-8 text-center">
            Sự hiện diện của bạn là niềm vinh hạnh
          </p>

          <div className="text-center mb-10">
            <h1
              className="text-5xl md:text-6xl text-[#5F7161]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Trọng Nghĩa
            </h1>

            <div className="flex flex-col items-center my-4">
              <span
                className="text-4xl md:text-5xl text-[#C9A227]"
                style={{ fontFamily: "serif" }}
              >
                囍
              </span>

              <div className="w-12 h-px bg-[#C9A227]/30 mt-2"></div>
            </div>

            <h1
              className="text-5xl md:text-6xl text-[#5F7161]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Thu Thảo
            </h1>
          </div>

          <p className="text-[9px] uppercase tracking-[0.25em] font-medium text-wedding-dark/70 mb-6 text-center">
            Trân trọng kính mời <br />
            <span className="text-xl text-wedding-gold block mt-3 capitalize font-playfair">
              {tenKhach}
            </span>
          </p>

          <div className="mt-8 mb-8 relative z-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#5F7161]/60 mb-4 text-center">
              Xác nhận tham dự
            </p>

            {/* THAY THẾ KHỐI HTML CŨ BẰNG COMPONENT NÚT BẤM (Truyền 2 dữ liệu vào) */}
            <RSVPButtons slug={slug} initialStatus={trangThaiRsvp} />
          </div>
          <div className="w-10 h-[1px] mx-auto bg-wedding-gold/50 mb-6" />

          {/* ... (Đoạn mã phía dưới chứa ngày tháng và địa điểm bạn giữ nguyên) ... */}

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

          <div className="text-center mb-8 relative z-20">
            <p className="text-3xl text-wedding-gold mb-2 ">
              {currentInfo.locationName}
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-wedding-dark mb-2">
              {currentInfo.city}
            </p>
            <p className="text-[10px] text-wedding-dark/70 max-w-[240px] mx-auto leading-relaxed">
              {currentInfo.address}
            </p>
          </div>

          <div className="space-y-3 relative z-20">
            {/* Mình đã loại bỏ nút Xác nhận bên dưới để gom chung vào khối 2 nút phía trên cho đỡ rối */}

            <Link
              href={`/send-wish?slug=${slug}`}
              className="block text-center border border-[#C9A227]/30 py-4 rounded-xl text-[#C9A227] uppercase tracking-[0.25em] text-xs hover:bg-[#C9A227]/5 transition-all shadow-sm"
            >
              Gửi Lời Chúc
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
            Hệ thống đang đồng bộ dữ liệu thiệp. Vui lòng tải lại trang sau ít
            giây!
          </p>
        </div>
      </div>
    );
  }
}
