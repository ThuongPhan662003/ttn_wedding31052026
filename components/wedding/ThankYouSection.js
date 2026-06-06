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
  object-right
  md:object-center
  "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white">
          <h2 className="font-great-vibes text-6xl md:text-8xl text-[#f6e3a1] mb-8">
            Xin Chân Thành Cảm Ơn
          </h2>

          <div className="w-24 h-px bg-[#d4af37] mx-auto mb-10" />

          <p className=" text-left text-base md:text-lg leading-8 md:leading-9 text-white/90">
            Tấm thiệp này không chỉ là lời báo tin vui, mà còn là lời cảm ơn
            chân thành gửi đến những người đã yêu thương, đồng hành và hiện diện
            trong hành trình của chúng tôi suốt những năm tháng qua. Sự quan
            tâm, những lời chúc phúc và sự hiện diện của quý vị trong ngày trọng
            đại sắp tới là niềm hạnh phúc vô cùng lớn lao. Xin được gửi lời cảm
            ơn sâu sắc nhất và mong sẽ được đón tiếp quý vị trong ngày vui của
            gia đình. Trân trọng!
          </p>

          <p className=" text-left mt-6 text-lg md:text-xl leading-10 text-white/90">
            Chúng tôi vô cùng trân trọng và mong được đón tiếp Quý Khách trong
            ngày trọng đại của gia đình.
          </p>

          <div className="mt-14">
            <p className="font-great-vibes text-4xl text-[#f6e3a1]">
              Trân Trọng!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
