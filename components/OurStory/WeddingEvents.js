export default function WeddingEvents() {
  return (
    <section className="py-24 px-6 bg-white text-gray-800 relative flex flex-col items-center">
      
      {/* --- Tiêu đề Section --- */}
      <div className="text-center mb-20 flex flex-col items-center">
        <span className="block w-px h-16 bg-[#D4AF37]/40 mb-6"></span>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">
          Save the Date
        </p>
        <h2 className="text-4xl md:text-5xl text-[#D4AF37] mb-6 italic tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Sự Kiện Cưới
        </h2>
        <span className="block w-px h-16 bg-[#D4AF37]/40 mt-2"></span>
      </div>

      {/* --- Khung hiển thị 2 Sự kiện --- */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        
        {/* ========================================== */}
        {/* THIỆP 1: NHÀ GÁI (LỄ VU QUY) */}
        {/* ========================================== */}
        <div className="relative p-10 bg-[#FAF9F6] border border-[#F3E5D8] flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500">
          {/* Biểu tượng góc trên */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[#D4AF37] text-3xl">
            ✧
          </div>
          
          <h3 className="text-3xl text-[#D4AF37] mb-2 uppercase tracking-widest mt-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Lễ Vu Quy
          </h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-8 font-bold">
            Nhà Gái
          </p>

          {/* Khối Ngày tháng */}
          <div className="w-full border-t border-b border-[#D4AF37]/20 py-8 mb-8 bg-white/50">
            <p className="text-6xl text-gray-800 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              03
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
              Tháng 07 . 2026
            </p>
          </div>

          {/* Khối Thông tin chi tiết */}
          <p className="text-sm text-gray-600 mb-3 font-semibold uppercase tracking-widest">
            Vào lúc 11:00 
          </p>
          <p className="text-sm text-gray-800 mb-3 font-medium" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Tại Tư Gia Nhà Gái
          </p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[280px] mb-10">
            Đường 28 - Khối Hà My Tây, Phường Điện Bàn Đông, TP.Đà Nẵng
          </p>

          {/* Nút Xem Bản Đồ */}
          <a 
            href="https://maps.app.goo.gl/aUNRR6Hw8y9t7Hdx5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm"
          >
            📍 Xem Bản Đồ
          </a>
        </div>

        {/* ========================================== */}
        {/* THIỆP 2: NHÀ TRAI (LỄ TÂN HÔN / TIỆC CƯỚI) */}
        {/* ========================================== */}
        <div className="relative p-10 bg-[#FAF9F6] border border-[#F3E5D8] flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 mt-10 md:mt-0">
          {/* Biểu tượng góc trên */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[#D4AF37] text-3xl">
            ✧
          </div>
          
          <h3 className="text-3xl text-[#D4AF37] mb-2 uppercase tracking-widest mt-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Lễ Tân Hôn
          </h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-8 font-bold">
            Nhà Trai
          </p>

          {/* Khối Ngày tháng */}
          <div className="w-full border-t border-b border-[#D4AF37]/20 py-8 mb-8 bg-white/50">
            <p className="text-6xl text-gray-800 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              10
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
              Tháng 07 . 2026
            </p>
          </div>

          {/* Khối Thông tin chi tiết */}
          <p className="text-sm text-gray-600 mb-3 font-semibold uppercase tracking-widest">
            Vào lúc 10:30
          </p>
          <p className="text-sm text-gray-800 mb-3 font-medium" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Nhà hàng Công Đoàn
          </p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[280px] mb-10">
            Tầng trệt 53 Độc Lập, P.Tuy Hòa, Tỉnh Đắk Lắk
          </p>

          {/* Nút Xem Bản Đồ */}
          <a 
            href="https://maps.app.goo.gl/iyvqDWoJPtByyHRg9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#D4AF37] border border-[#D4AF37] text-white text-[10px] uppercase tracking-widest hover:bg-[#c4a02e] transition-colors duration-300 shadow-md"
          >
            📍 Xem Bản Đồ
          </a>
        </div>

      </div>
    </section>
  );
}