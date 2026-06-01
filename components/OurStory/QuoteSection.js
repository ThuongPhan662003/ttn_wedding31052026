export default function QuoteSection() {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-between p-6 md:p-12 lg:p-20 overflow-hidden select-none"
      style={{
        backgroundImage: "url('/images/wedding-forest.jpg')", // <-- Thay bằng ảnh rừng sâu của bạn (image_efe019.jpg)
      }}
    >
      {/* Lớp overlay shadow chuẩn điện ảnh để cân bằng sáng và giúp chữ nổi bật trên mọi màn hình */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent max-md:bg-gradient-to-b max-md:from-black/30 max-md:via-transparent max-md:to-black/55 pointer-events-none" />

      {/* PHẦN TRÊN: Chữ mờ phóng đại phóng to theo tỉ lệ màn hình (Responsive Text) */}
      <div className="relative z-10 w-full pt-6 md:pt-10">
        <h2
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold uppercase tracking-widest text-white/10 leading-none pointer-events-none font-serif select-none transition-all duration-300"
          style={{ lineHeight: "0.85" }}
        >
          FOREST
          <br />
          OF
          <br />
          LOVE.
        </h2>
      </div>

      {/* PHẦN DƯỚI: Nội dung câu nói tự động co giãn linh hoạt */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md text-left space-y-4 md:space-y-6 pb-8 md:pb-4">
        {/* Biểu tượng dấu nháy kép */}
        <span className="text-4xl md:text-5xl text-[#E6D6A8]/60 font-serif block leading-none">
          “
        </span>

        <p className="text-xs sm:text-sm md:text-base text-white/95 font-light leading-relaxed tracking-wide drop-shadow-sm max-w-sm md:max-w-xl">
          Giữa dòng đời thênh thang, cảm ơn anh vì đã tìm thấy em, cùng em đi
          qua những lối nhỏ, chạm tay vào hạnh phúc mang tên chúng mình.
        </p>

        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold font-serif">
          — Trọng Nghĩa & Thu Thảo
        </p>
      </div>

      {/* Đường chỉ góc mạ vàng tinh xảo góc dưới bên trái */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-10 h-[1px] bg-[#C9A227]/40" />
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-[1px] h-10 bg-[#C9A227]/40" />
    </section>
  );
}
