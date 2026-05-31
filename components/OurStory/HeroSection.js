export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Ảnh nền */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding Cover"
          className="w-full h-full object-cover brightness-75"
        />

        {/* Overlay xanh olive */}
        <div className="absolute inset-0 bg-[#66785F]/40"></div>

        {/* Gradient vàng nhẹ */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#C9A227]/20 via-transparent to-transparent"></div>
      </div>

      {/* Nội dung */}
      <div className="relative z-10 text-center flex flex-col items-center animate-fade-in px-4">
        
        <p className="text-[#F8F6F1] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 font-medium">
          We are getting married
        </p>

        <h1
          className="text-6xl md:text-8xl mb-7 leading-tight text-white drop-shadow-lg"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Trọng Nghĩa
          <br className="md:hidden" />
          <span className="hidden md:inline text-[#E6D6A8]">
            {" "}
            &{" "}
          </span>
          <span className="md:hidden text-[#E6D6A8] text-4xl block my-2">
            &
          </span>
          Thu Thảo
        </h1>

        <div className="w-24 h-px bg-[#E6D6A8] mb-4"></div>

        <p className="text-[#F8F6F1] text-sm md:text-base tracking-[0.25em] font-light">
          18 . 10 . 2026
        </p>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#E6D6A8] animate-pulse text-2xl">
        ↓
      </div>
    </section>
  );
}