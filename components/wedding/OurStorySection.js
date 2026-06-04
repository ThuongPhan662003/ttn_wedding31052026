"use client";

export default function OurStorySection() {
  return (
    <section className="relative overflow-hidden bg-[#fcfaf6] py-24 px-6">
      {/* Hoa nền */}
      <img
        src="/images/hoa.png"
        alt=""
        className="absolute top-0 left-0 w-52 opacity-10 pointer-events-none"
      />

      <img
        src="/images/hoa.png"
        alt=""
        className="absolute bottom-0 right-0 w-52 opacity-10 rotate-180 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.4em] text-xs text-[#d4af37] mb-3">
            OUR STORY
          </p>

          <h2 className="font-caveat italic text-4xl md:text-5xl text-[#8b1c25]">
            Chuyện Chúng Mình
          </h2>

          <div className="w-20 h-px bg-[#d4af37] mx-auto mt-5" />
        </div>

        {/* Nội dung */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#d4af37]/20 p-8 md:p-12">
          <div className="space-y-7 text-[#5f4b45] leading-9 text-[15px] md:text-[17px]">
            <p>
              Nhiều năm tình bạn và bốn năm tình yêu đã giúp chúng mình từ những
              con người “trái dấu” dần học cách thấu hiểu và nâng niu nhau. Một
              người IT khô khan, một cô gái học Văn mộng mơ đã giúp tình yêu này
              có thêm thật nhiều sắc màu.
            </p>

            <p>
              Anh mang đến cho em sự vững vàng, còn em mang đến cho anh những
              khoảng lặng dịu dàng. Chúng mình khác nhau trong cách nghĩ, cách
              cảm nhận thế giới, nhưng lại giống nhau ở mong muốn được đồng hành
              cùng người còn lại trên chặng đường dài phía trước.
            </p>

            <p>
              Trong rất nhiều ngã rẽ, đèn xanh rồi đèn đỏ của cuộc đời, thật may
              con đường ấy của chúng mình đều hướng về một ngõ chung. Trời chẳng
              thể thiếu nắng mưa, đời chẳng thể tránh ngược xuôi, vui buồn.
              Nhưng sau tất cả, chúng mình vẫn chọn ở lại, chọn nắm tay nhau và
              cùng bước tiếp.
            </p>

            <p>
              Có lẽ tình yêu không phải là gặp được một người hoàn hảo, mà là
              tìm được một người sẵn sàng cùng mình trưởng thành qua năm tháng.
            </p>

            <p>
              Giữa vô vàn cuộc gặp gỡ trong đời, việc tìm thấy một người để thấu
              hiểu, để tin tưởng và để đồng hành vốn đã là một điều kỳ diệu.
            </p>

            <p>
              Và từ hôm nay, mọi mùa của cuộc sống sẽ không còn là hành trình
              của riêng ai nữa, mà là câu chuyện của hai người cùng chung một
              mái nhà.
            </p>
          </div>

          <div className="text-center mt-12">
            <div className="w-12 h-px bg-[#d4af37] mx-auto mb-4" />

            <p className="font-great-vibes italic text-[#8b1c25] text-xl">
              "Từ hôm nay, mọi mùa đều có chúng ta."
            </p>

            <div className="w-12 h-px bg-[#d4af37] mx-auto mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
