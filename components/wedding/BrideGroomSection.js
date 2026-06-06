"use client";

export default function BrideGroomSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <p className="font-great-vibes text-lg md:text-2xl text-[#c9a227] mb-3">
          Giữa vô vàn cuộc gặp gỡ trong đời, việc tìm thấy một người để thấu
          hiểu, để tin tưởng và để đồng hành vốn đã là một điều kỳ diệu.
        </p>

        <div className="w-20 h-px bg-[#c9a227] mx-auto mt-5" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {/* Groom */}
        <div className="relative overflow-hidden rounded-[36px] group shadow-2xl">
          <img
            src="/images/groom.jpg"
            alt="Chú rể"
            className="
              w-full
    h-[220px]
    md:h-[380px]
    object-cover
    transition-all
    duration-700
    group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          <div className="absolute left-8 bottom-8">
            <p className="text-[#d4af37] uppercase tracking-[0.35em] text-[10px] md:text-x">
              Chú Rể
            </p>

            <h2 className="font-great-vibes text-2xl md:text-6xl text-white">
              Trọng Nghĩa
            </h2>

            {/* <div className="w-16 h-px bg-[#d4af37] my-3" /> */}

            {/* <p className="text-white/80 tracking-wider">15 • 05 • 1998</p> */}
          </div>
        </div>

        {/* Bride */}
        <div className="relative overflow-hidden rounded-[36px] group shadow-2xl">
          <img
            src="/images/bride.jpg"
            alt="Cô dâu"
            className="
              w-full
    h-[220px]
    md:h-[380px]
    object-cover
    transition-all
    duration-700
    group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />

          <div className="absolute right-8 bottom-8 text-right">
            <p className="text-[#d4af37] uppercase tracking-[0.35em] text-[10px] md:text-x">
              Cô Dâu
            </p>

            <h2 className="font-great-vibes text-2xl md:text-6xl text-white">
              Thu Thảo
            </h2>

            {/* <div className="w-16 h-px bg-[#d4af37] my-3 ml-auto" /> */}

            {/* <p className="text-white/80 tracking-wider">03 • 12 • 2000</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
