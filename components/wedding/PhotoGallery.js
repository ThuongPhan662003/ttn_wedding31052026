"use client";

export default function PhotoGallery() {
  const images = [
    "/images/gallery/1.jpg",
    "/images/gallery/1.jpg",
    "/images/gallery/1.jpg",
    "/images/gallery/1.jpg",
  ];

  return (
    <section className="relative w-full bg-[#fcfaf6] py-20 px-4 overflow-hidden">
      {/* Hoa nền */}

      <img
        src="/images/hoa.png"
        alt=""
        className="
          absolute
          top-0
          left-0
          w-40
          md:w-72
          opacity-[0.12]
          pointer-events-none
          select-none
        "
      />

      <img
        src="/images/hoa.png"
        alt=""
        className="
          absolute
          top-0
          right-0
          w-40
          md:w-72
          rotate-90
          opacity-[0.12]
          pointer-events-none
          select-none
        "
      />

      <img
        src="/images/hoa.png"
        alt=""
        className="
          absolute
          bottom-0
          left-0
          w-40
          md:w-72
          -rotate-90
          opacity-[0.12]
          pointer-events-none
          select-none
        "
      />

      <img
        src="/images/hoa.png"
        alt=""
        className="
          absolute
          bottom-0
          right-0
          w-40
          md:w-72
          rotate-180
          opacity-[0.12]
          pointer-events-none
          select-none
        "
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

        {/* HERO */}
        <div className="mb-10">
          <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-[#8b1c25]">
            <img
              src={images[0]}
              alt=""
              className="
                w-full
                aspect-[4/5]
                md:aspect-[16/9]
                object-cover
                rounded-lg
              "
            />
          </div>
        </div>

        {/* 3 ảnh dọc */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {images.slice(1, 4).map((img, index) => (
            <div
              key={index}
              className="
                bg-white
                p-2
                rounded-xl
                shadow-lg
                border border-[#8b1c25]/20
                hover:-translate-y-1
                transition
              "
            >
              <img
                src={img}
                alt=""
                className="
                  w-full
                  aspect-[3/4]
                  object-cover
                  rounded-lg
                "
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <div className="w-12 h-px bg-[#d4af37] mx-auto mb-4" />

          <p className="italic text-[#8b1c25] font-serif text-xl">
            "Together is our favorite place to be."
          </p>

          <div className="w-12 h-px bg-[#d4af37] mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}
