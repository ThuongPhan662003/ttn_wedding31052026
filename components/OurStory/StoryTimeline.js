import Link from 'next/link';

export default function StoryTimeline({ timelines, isLoading }) {
  return (
    <section className="px-6 py-20 relative flex flex-col items-center bg-white">

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#5F7161_0%,_transparent_60%)] pointer-events-none"></div>

      <div className="max-w-5xl w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-24 flex flex-col items-center">
          <Link
            href="/"
            className="text-[10px] text-[#5F7161] hover:text-[#C9A227] uppercase tracking-widest transition-colors border-b border-transparent hover:border-[#C9A227] pb-1 mb-12 inline-block"
          >
            ← Trở về Sảnh Chính
          </Link>

          <span className="block w-px h-16 bg-[#C9A227]/40 mb-6"></span>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#5F7161] font-bold mb-4">
            Chapter of Us
          </p>

          <h2
            className="text-4xl md:text-6xl text-[#C9A227] mb-6 italic tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our Journey
          </h2>

          <span className="block w-px h-16 bg-[#C9A227]/40 mt-6"></span>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <div className="text-[#C9A227] text-4xl mb-4 animate-spin-slow">
              ✧
            </div>

            <p
              className="text-sm text-[#5F7161] italic"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Đang mở lại những kỷ niệm...
            </p>
          </div>
        ) : timelines.length === 0 ? (
          <div className="text-center py-20 text-[#5F7161] italic font-serif">
            Câu chuyện tình yêu đang được cập nhật...
          </div>
        ) : (
          <div className="relative pt-10 pb-20">

            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#5F7161]/40 to-transparent -translate-x-1/2"></div>

            {timelines.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id || index}
                  className={`relative flex flex-col md:flex-row items-center justify-between mb-32 group ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`w-full md:w-5/12 mb-10 md:mb-0 relative ${
                      isEven ? 'md:pl-12' : 'md:pr-12'
                    }`}
                  >
                    <div className="relative p-3 bg-white shadow-[0_20px_50px_rgba(95,113,97,0.15)] border border-[#C9A227]/30 transform transition-transform duration-700 hover:scale-[1.02] group-hover:rotate-1">

                      <div className="absolute inset-4 border border-white z-10 pointer-events-none"></div>

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-[4/5] md:aspect-square object-cover transition-all duration-700 hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full aspect-[4/5] md:aspect-square bg-white flex items-center justify-center text-[#5F7161] italic text-sm">
                          Chưa có hình ảnh
                        </div>
                      )}
                    </div>

                    {/* Glow */}
                    <div className="absolute -z-10 top-6 left-6 w-full h-full bg-[#5F7161]/20 blur-3xl rounded-full"></div>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white items-center justify-center rounded-full z-20 text-[#C9A227] border border-[#C9A227]/40 shadow-md transition-transform duration-500 hover:scale-110">
                    ✧
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 text-center md:text-left ${
                      isEven ? 'md:text-right' : ''
                    }`}
                  >
                    <p
                      className="italic text-[#C9A227] text-lg mb-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.date}
                    </p>

                    <h3
                      className="text-3xl md:text-4xl text-[#5F7161] mb-6 leading-snug"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#5F7161] leading-relaxed font-light md:w-5/6 inline-block whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-10">
          <span className="block w-px h-24 bg-gradient-to-b from-[#C9A227]/40 to-transparent"></span>
        </div>
      </div>
    </section>
  );
}