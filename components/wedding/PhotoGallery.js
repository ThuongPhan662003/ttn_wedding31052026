"use client";
export default function PhotoGallery() {
  // Danh sách ảnh mẫu từ dữ liệu đính kèm
  const images = [
    { id: 1, src: "/images/hero-wedding.jpg", aspect: "aspect-[3/4]" },
    { id: 2, src: "/images/hero-wedding.jpg", aspect: "aspect-[3/4]" },
    { id: 3, src: "/images/hero-wedding.jpg", aspect: "aspect-[4/3]" },
    { id: 4, src: "/images/hero-wedding.jpg", aspect: "aspect-[3/4]" },
    { id: 5, src: "/images/hero-wedding.jpg", aspect: "aspect-[3/4]" },
    { id: 6, src: "/images/hero-wedding.jpg", aspect: "aspect-[4/3]" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 bg-[#fcfaf6]">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-[#8b1c25] italic">
          Album Ảnh Cưới
        </h2>
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-2"></div>
      </div>

      {/* Lưới phân bổ: Mobile chạy 1-2 cột đứng, PC gom cụm đối xứng song song */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {images.map((img) => (
          <div
            key={img.id}
            className={`relative w-full ${img.aspect} rounded-xl overflow-hidden shadow-md bg-white border-4 border-white transition-transform duration-300 hover:scale-[1.01]`}
          >
            <img
              src={img.src}
              alt="Wedding Gallery"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
