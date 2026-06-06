"use client";

export default function PhotoGallery() {
  const images = [
    "/images/gallery/1.png",
    "/images/gallery/2.jpg",
    "/images/gallery/3.jpg",
    "/images/gallery/4.jpg",
    "/images/gallery/5.jpg",
    "/images/gallery/6.jpg",
    "/images/gallery/7.jpg",
    "/images/gallery/8.jpg",
    "/images/gallery/9.jpg",
    "/images/gallery/10.jpg",
  ];

  return (
    <section className="relative w-full bg-[#fcfaf6] py-20 px-4 overflow-hidden">
      {/* Hoa nền */}
      <img
        src="/images/hoa.png"
        className="absolute top-0 left-0 w-40 md:w-72 opacity-[0.12] pointer-events-none select-none"
      />
      <img
        src="/images/hoa.png"
        className="absolute top-0 right-0 w-40 md:w-72 rotate-90 opacity-[0.12] pointer-events-none select-none"
      />
      <img
        src="/images/hoa.png"
        className="absolute bottom-0 left-0 w-40 md:w-72 -rotate-90 opacity-[0.12] pointer-events-none select-none"
      />
      <img
        src="/images/hoa.png"
        className="absolute bottom-0 right-0 w-40 md:w-72 rotate-180 opacity-[0.12] pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#8b1c25]">
            Album Ảnh Cưới
          </h2>
          <div className="w-20 h-px bg-[#d4af37] mx-auto mt-3" />
          <p className="mt-4 text-sm text-gray-500">
            Những khoảnh khắc đẹp nhất của chúng mình
          </p>
        </div>

        {/* GRID ALL IMAGES */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-xl shadow-lg border border-[#8b1c25]/20 hover:scale-[1.02] transition"
            >
              <img
                src={img}
                alt={`photo-${index}`}
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <div className="w-12 h-px bg-[#d4af37] mx-auto mb-4" />

          <p className="italic text-[#8b1c25] font-great-vibes text-xl">
            Có lẽ tình yêu không phải là gặp được một người hoàn hảo, mà là tìm
            được một người sẵn sàng cùng mình trưởng thành qua năm tháng.
          </p>

          <div className="w-12 h-px bg-[#d4af37] mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}
