import Link from 'next/link';

export default function StoryTimeline({ timelines, isLoading }) {
  return (
    <section className="px-6 py-20 relative flex flex-col items-center">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#FFF0F5_0%,_transparent_50%)] pointer-events-none"></div>

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Nút quay lại & Tiêu đề */}
        <div className="text-center mb-24 flex flex-col items-center">
          <Link href="/" className="text-[10px] text-gray-400 hover:text-[#D4AF37] uppercase tracking-widest transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1 mb-12 inline-block">
            ← Trở về Sảnh Chính
          </Link>
          <span className="block w-px h-16 bg-[#D4AF37]/40 mb-6"></span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Chapter of Us</p>
          <h2 className="text-4xl md:text-6xl text-[#D4AF37] mb-6 italic tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Our Journey
          </h2>
          <span className="block w-px h-16 bg-[#D4AF37]/40 mt-6"></span>
        </div>

        {/* Trạng thái Loading hoặc Render dữ liệu */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <div className="text-[#D4AF37] text-4xl mb-4 animate-spin-slow">✧</div>
            <p className="text-sm text-gray-400 italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Đang mở lại những kỷ niệm...
            </p>
          </div>
        ) : timelines.length === 0 ? (
          <div className="text-center py-20 text-gray-400 italic font-serif">
            Câu chuyện tình yêu đang được cập nhật...
          </div>
        ) : (
          <div className="relative pt-10 pb-20">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent -translate-x-1/2"></div>

            {timelines.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id || index} className={`relative flex flex-col md:flex-row items-center justify-between mb-32 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Cột Ảnh */}
                  <div className={`w-full md:w-5/12 mb-10 md:mb-0 relative ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="relative p-3 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#F3E5D8] transform transition-transform duration-700 hover:scale-[1.02] group-hover:rotate-1">
                      <div className="absolute inset-4 border border-white/50 z-10 pointer-events-none"></div>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full aspect-[4/5] md:aspect-square object-cover filter contrast-[0.95] sepia-[10%] transition-all duration-700 hover:sepia-0 hover:contrast-100" />
                      ) : (
                        <div className="w-full aspect-[4/5] md:aspect-square bg-[#F9F7F3] flex items-center justify-center text-gray-300 italic text-sm">Chưa có hình ảnh</div>
                      )}
                    </div>
                    <div className="absolute -z-10 top-6 left-6 w-full h-full bg-[#FFB7B2]/20 blur-2xl rounded-full"></div>
                  </div>

                  {/* Biểu tượng giữa */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF9F6] items-center justify-center rounded-full z-20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm transition-transform duration-500 hover:scale-110">✧</div>

                  {/* Cột Nội dung */}
                  <div className={`w-full md:w-5/12 text-center md:text-left ${isEven ? 'md:text-right' : ''}`}>
                    <p className="italic text-[#D4AF37]/80 text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>{item.date}</p>
                    <h3 className="text-3xl md:text-4xl text-gray-800 mb-6 leading-snug" style={{ fontFamily: "var(--font-playfair), serif" }}>{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light md:w-5/6 inline-block whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex justify-center mt-10">
          <span className="block w-px h-24 bg-gradient-to-b from-[#D4AF37]/40 to-transparent"></span>
        </div>
      </div>
    </section>
  );
}