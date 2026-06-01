import clientPromise from "@/lib/mongodb"; // Đường dẫn tới file kết nối MongoDB của bạn
import { notFound } from "next/navigation";
import Link from "next/link";

// NHÚNG CÁC COMPONENT VÀO ĐÂY:
import RSVPButtons from "@/components/Invitation/RSVPButtons";

export const revalidate = 0;

export default async function InvitationPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    // 1. Kết nối tới MongoDB và truy vấn trực tiếp bản ghi bằng slug
    const client = await clientPromise;
    const db = client.db("wedding_db");

    // Khớp chính xác với cấu trúc bảng "guests" lưu danh sách khách mời của bạn
    const guest = await db.collection("guests").findOne({ slug: slug });

    // Nếu không tồn tại slug này trong MongoDB, kích hoạt trang 404 không tìm thấy khách
    if (!guest) {
      return notFound();
    }

    // 2. Trích xuất thông tin khớp hoàn toàn với tên cột tiếng Việt trong file CSV của bạn
    const tenKhach = guest.ten_khach || "Khách mời";
    const nhomKhach = guest.nhom_khach || "nha_trai";
    const trangThaiRsvp = guest.trang_thai || "";

    // Cấu hình thông tin sự kiện đám cưới 2026
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
      <main className="min-h-screen bg-[#faf8f3] flex flex-col items-center p-4 md:p-8 antialiased relative overflow-hidden">
        {/* Nền đổ hạt sáng xanh lá (Glow) thay cho màu đỏ cũ */}
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#a8bba2] blur-[120px] pointer-events-none opacity-40" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#a8bba2] blur-[100px] pointer-events-none opacity-20" />

        {/* Nút quay lại sảnh */}
        <Link
          href="/"
          className="mb-8 mt-2 flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-[#2d3748]/50 hover:text-[#66785f] transition-colors duration-300 relative z-20"
        >
          ← Sảnh đón tiếp
        </Link>

        {/* Khung bao ngoài thiệp */}
        <div className="relative w-full max-w-md mx-auto animate-openInvitation z-10 px-2">
          {/* THIỆP CHÍNH: Thay nền đỏ nhung bằng nền Xanh Lá Cưới (#66785f) cực kỳ quý phái */}
          <div
            className="relative bg-[#66785f] border-2 border-[#c9a227] shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col items-center text-center"
            style={{
              borderRadius: "240px 240px 32px 32px",
            }}
          >
            {/* Đường viền đôi mạ vàng tinh xảo chạy dọc khung cửa sổ */}
            <div
              className="absolute inset-2 border border-[#e6d6a8]/30 pointer-events-none"
              style={{ borderRadius: "232px 232px 24px 24px" }}
            />
            <div
              className="absolute inset-3 border border-[#c9a227]/40 pointer-events-none"
              style={{ borderRadius: "228px 228px 20px 20px" }}
            />

            {/* Vệt sáng đổ từ đỉnh cửa sổ xuống */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#e6d6a8]/15 to-transparent pointer-events-none" />

            {/* Chữ Hỷ Vàng Kim */}
            <div className="flex flex-col items-center mt-12 mb-6 relative z-10">
              <span className="text-5xl text-[#c9a227] font-playfair tracking-normal drop-shadow-sm">
                囍
              </span>
              <div className="w-12 h-[1px] bg-[#c9a227]/50 mt-3" />
            </div>

            {/* Slogan chữ vàng nhạt */}
            <p className="text-[9px] uppercase tracking-[0.35em] font-medium text-[#e6d6a8]/80 mb-10 max-w-[280px] leading-relaxed">
              Sự hiện diện của bạn là niềm vinh hạnh lớn cho gia đình chúng tôi
            </p>

            {/* Tên cô dâu chú rể màu Vàng Kim [#c9a227] rực rỡ nổi bật trên nền xanh */}
            <div className="space-y-1 mb-10 relative z-10 w-full">
              <h1 className="text-5xl md:text-6xl text-[#c9a227] font-coldwell leading-tight font-normal px-4 drop-shadow-md">
                Trọng Nghĩa
              </h1>

              <div className="flex flex-col items-center my-4">
                <span className="text-[#e6d6a8] text-lg opacity-90">❦</span>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
              </div>

              <h1 className="text-5xl md:text-6xl text-[#c9a227] font-coldwell leading-tight font-normal px-4 drop-shadow-md">
                Thu Thảo
              </h1>
            </div>

            {/* Khung Mời Khách: Nền tối tiệp màu xanh lá cây, viền vàng kim làm nổi bật Tên */}
            <div className="mb-10 w-full bg-black/15 backdrop-blur-sm py-4 px-6 rounded-2xl border border-[#c9a227]/30 relative z-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#e6d6a8]/70 font-medium mb-2">
                Trân trọng kính mời
              </p>
              <span className="block text-2xl md:text-3xl text-[#c9a227] font-playfair font-semibold tracking-wide">
                {tenKhach}
              </span>
            </div>

            {/* Khối RSVP */}
            <div className="w-full mb-10 relative z-20">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#e6d6a8]/80 mb-4 font-medium">
                Xác nhận tham dự
              </p>
              <div className="scale-95 origin-center">
                <RSVPButtons slug={slug} initialStatus={trangThaiRsvp} />
              </div>
            </div>

            {/* Thanh ngăn cách hoa văn vàng */}
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent mb-8" />

            {/* Thông tin ngày giờ - Toàn bộ chữ chuyển sang Vàng Kim */}
            <div className="flex items-center justify-center gap-4 mb-10 w-full relative z-10 text-[#c9a227]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#e6d6a8]/90 w-[75px] text-right font-medium font-arcittya">
                {currentInfo.dayOfWeek}
              </p>

              <div className="w-[1px] h-12 bg-[#c9a227]/30" />

              <div className="flex flex-col items-center justify-center min-w-[75px]">
                <span className="text-4xl text-[#e6d6a8] font-playfair font-light leading-none">
                  {currentInfo.day}
                </span>
                <span className="text-[8px] uppercase tracking-[0.15em] text-[#c9a227]/70 mt-2 font-semibold">
                  {currentInfo.monthYear}
                </span>
              </div>

              <div className="w-[1px] h-12 bg-[#c9a227]/30" />

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#e6d6a8]/90 w-[75px] text-left font-medium font-arcittya">
                {currentInfo.hour}
              </p>
            </div>

            {/* Địa điểm tổ chức tiệc */}
            <div className="text-center mb-12 relative z-10 max-w-[280px]">
              <p className="text-2xl text-[#c9a227] font-playfair italic mb-2 font-medium">
                {currentInfo.locationName}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#e6d6a8] mb-3">
                {currentInfo.city}
              </p>
              <p className="text-[11px] text-[#e6d6a8]/80 font-light leading-relaxed">
                {currentInfo.address}
              </p>
            </div>

            {/* Nút bấm: Nền Vàng Kim rực rỡ, Chữ Xanh Lá tương tương phản */}
            <div className="w-full relative z-20 mt-auto pb-4">
              <Link
                href="/our-story"
                className="
                  block
                  text-center
                  py-3.5
                  px-8
                  rounded-full
                  bg-[#c9a227]
                  text-[#66785f]
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  font-bold
                  shadow-md
                  hover:bg-[#e6d6a8]
                  hover:shadow-2xl
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                Mở câu chuyện tình yêu
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[8px] text-[#2d3748]/40 font-medium uppercase tracking-[0.4em] mt-8 mb-4 relative z-20">
          Trọng Nghĩa & Thu Thảo Wedding • 2026
        </p>
      </main>
    );
  } catch (error) {
    console.error("Lỗi trang Invitation:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f3] p-4 text-[#2d3748]">
        <div className="max-w-xs w-full py-8 px-5 border-2 border-[#c9a227] text-center space-y-3 bg-[#66785f] rounded-2xl shadow-2xl">
          <h2 className="text-sm tracking-widest text-[#c9a227] font-playfair font-semibold uppercase">
            Đang kết nối dữ liệu
          </h2>
          <p className="text-[11px] text-[#e6d6a8]/80 font-light leading-relaxed">
            Hệ thống đang đồng bộ dữ liệu thiệp đám cưới. Vui lòng tải lại trang
            sau ít giây!
          </p>
        </div>
      </div>
    );
  }
}
