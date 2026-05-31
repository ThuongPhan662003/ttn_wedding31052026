export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ảnh nền */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" 
          alt="Wedding Cover" 
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Nội dung chữ */}
      <div className="relative z-10 text-center text-white flex flex-col items-center animate-fade-in px-4">
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 font-medium">
          We are getting married
        </p>
        
        <h1 className="text-6xl md:text-8xl mb-8 leading-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Trọng Nghĩa <br className="md:hidden"/> <span className="hidden md:inline"> & </span> <span className="md:hidden text-4xl block my-2">&</span> Thu Thảo
        </h1>
        
        <p className="text-sm md:text-base tracking-[0.2em] font-light border-t border-white/40 pt-4 px-8">
          18 . 10 . 2026
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/70 animate-pulse text-2xl">
        ↓
      </div>
    </section>
  );
}