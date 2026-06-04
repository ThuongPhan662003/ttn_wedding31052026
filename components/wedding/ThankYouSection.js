"use client";

export default function ThankYouSection() {
  return (
    <section className="relative bg-[#8b1c25] text-white py-24 px-6 overflow-hidden">
      <img
        src="/images/hoa.png"
        alt=""
        className="absolute top-0 right-0 w-56 opacity-10 rotate-90"
      />

      <img
        src="/images/hoa.png"
        alt=""
        className="absolute bottom-0 left-0 w-56 opacity-10 -rotate-90"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          {/* <p className="uppercase tracking-[0.4em] text-xs text-[#e6d6a8] mb-3">
            THANK YOU
          </p> */}

          <h2 className="font-serif italic text-4xl md:text-5xl text-[#e6d6a8]">
            Lời Cảm Ơn
          </h2>

          <div className="w-20 h-px bg-[#d4af37] mx-auto mt-5" />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-[#d4af37]/20 p-8 md:p-12">
          <div className="space-y-7 text-red-50 leading-9 text-[15px] md:text-[17px]">
            <p>
              Tấm thiệp này không chỉ là lời báo tin vui, mà còn là lời cảm ơn
              chân thành gửi đến những người đã yêu thương, đồng hành và hiện
              diện trong hành trình của chúng tôi suốt những năm tháng qua.
            </p>

            <p>
              Sự quan tâm, những lời chúc phúc và sự hiện diện của quý vị trong
              ngày trọng đại sắp tới là niềm hạnh phúc vô cùng lớn lao đối với
              gia đình chúng tôi.
            </p>

            <p>
              Chúng tôi xin được gửi lời cảm ơn sâu sắc nhất và mong sẽ được đón
              tiếp quý vị trong ngày vui của gia đình.
            </p>
          </div>

          <div className="text-center mt-12">
            <p className="font-serif text-2xl italic text-[#e6d6a8]">
              Trân Trọng
            </p>

            <div className="mt-4 text-sm tracking-[0.25em] uppercase text-red-100">
              Gia đình & Cô dâu - Chú rể
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
