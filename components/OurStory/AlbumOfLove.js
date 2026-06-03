export default function AlbumOfLove() {
  return (
    <section className="w-full py-12 flex flex-col items-center bg-[#FAF9F6] relative overflow-hidden">
      {/* KHỐI NỘI DUNG CHỮ */}
      <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center">
        {/* Châm ngôn nhỏ */}
        <p className="text-[11px] sm:text-xs text-center text-[#555555]/80 max-w-[340px] leading-relaxed mb-10 font-light px-2">
          Bước vào chương mới của cuộc đời, nơi tình yêu trở thành mái ấm, và
          hạnh phúc mang tên “chúng ta”
        </p>

        {/* Tiêu đề ALBUM Of */}
        <div className="relative flex items-baseline justify-center w-full mb-6 pl-8">
          <span
            className="text-4xl sm:text-5xl tracking-[0.15em] text-[#3D4A3E] font-light font-serif transition-all"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            ALBUM
          </span>
          <span
            className="text-5xl sm:text-6xl text-[#3D4A3E] transition-all relative z-10"
            style={{
              fontFamily:
                "'Great Vibes', 'Clicker Script', 'Alex Brush', 'Brush Script MT', cursive",
              transform: "translateY(6px) rotate(-5deg)",
              marginLeft: "-8px",
              textTransform: "none",
            }}
          >
            Of
          </span>
        </div>

        {/* Khối chữ LOVE */}
        <div className="relative w-full flex justify-center items-center select-none mb-14 px-1 overflow-hidden">
          <h2
            className="
              text-[120px] 
              xs:text-[135px] 
              sm:text-[160px] 
              md:text-[185px] 
              font-serif font-black 
              tracking-[-0.07em] 
              text-center uppercase leading-none w-full flex justify-center transition-all duration-300
            "
            style={{
              backgroundImage: "url('/images/hero-wedding1.jpg')",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "950",
              backgroundSize: "cover",
              backgroundPosition: "center 15%",
              backgroundRepeat: "no-repeat",
            }}
          >
            LOVE
          </h2>
        </div>
      </div>

      {/* KHỐI ẢNH COVER TRÀN VIỀN PHÍA DƯỚI */}
      <div className="relative w-full left-0 right-0">
        {/* Nhành hoa trang trí */}
        <div className="absolute left-4 sm:left-6 md:left-[12%] lg:left-[22%] top-[-35px] w-14 sm:w-16 h-24 sm:h-32 opacity-90 pointer-events-none z-20 transition-all">
          {/* Giữ nguyên phần bọc hoa của bạn */}
        </div>

        {/* 
          Ảnh lớn bên dưới: Đã đổi sang bg-right md:bg-center 
          để trên điện thoại sẽ ghim chặt vào lề phải, giúp góc phải của ảnh xuất hiện trọn vẹn.
        */}
        <div
          className="w-full h-[50dvh] md:h-[65dvh] bg-cover bg-right md:bg-center transition-all duration-500 shadow-sm"
          style={{
            backgroundImage: "url('/images/album-cover.jpg')",
          }}
        />
      </div>
    </section>
  );
}
