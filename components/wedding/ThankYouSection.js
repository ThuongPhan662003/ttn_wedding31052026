"use client";

export default function ThankYouSection() {
  return (
    <section className="relative h-[700px] overflow-hidden">
      <img
        src="/images/thank.jpg"
        alt="Thank You"
        className="
  absolute
  inset-0
  w-full
  h-full
  object-cover
  object-left
  md:object-center
  "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white">
          <p className="uppercase tracking-[0.45em] text-xs text-[#d4af37] mb-5">
            THANK YOU
          </p>

          <h2 className="font-great-vibes text-6xl md:text-8xl text-[#f6e3a1] mb-8">
            Xin Chân Thành Cảm Ơn
          </h2>

          <div className="w-24 h-px bg-[#d4af37] mx-auto mb-10" />

          <p className="text-lg md:text-xl leading-10 text-white/90">
            Sự hiện diện, những lời chúc phúc và tình cảm yêu thương của Quý
            Khách là món quà quý giá nhất đối với chúng tôi.
          </p>

          <p className="mt-6 text-lg md:text-xl leading-10 text-white/90">
            Chúng tôi vô cùng trân trọng và mong được đón tiếp Quý Khách trong
            ngày trọng đại của gia đình.
          </p>

          <div className="mt-14">
            <p className="font-great-vibes text-4xl text-[#f6e3a1]">
              Trân Trọng
            </p>

            <p className="mt-4 tracking-[0.3em] uppercase text-sm text-white/80">
              Gia Đình & Cô Dâu - Chú Rể
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
