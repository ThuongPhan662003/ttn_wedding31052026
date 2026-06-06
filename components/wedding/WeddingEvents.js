"use client";

export default function WeddingEvents({ type = "nha_trai" }) {
const eventData = {
nha_gai: {
title: "Lễ Vu Quy",
time: "11:00 - Thứ Sáu",
date: "03.07.2026",
lunar: "19 Tháng 05 Âm lịch",
place:
"Tại Tư Gia Nhà Gái, Đường 28 - Khối Hà My Tây, Phường Điện Bàn Đông, TP. Đà Nẵng",
mapLink: "https://maps.app.goo.gl/aUNRR6Hw8y9t7Hdx5",
highlightDay: 3,
},


nha_trai: {
  title: "Lễ Tân Hôn",
  time: "10:30 - Thứ Sáu",
  date: "10.07.2026",
  lunar: "26 Tháng 05 Âm lịch",
  place:
    "Nhà hàng Công Đoàn, Tầng trệt 53 Độc Lập, P. Tuy Hòa, Tỉnh Đắk Lắk",
  mapLink: "https://maps.app.goo.gl/iyvqDWoJPtByyHRg9",
  highlightDay: 10,
},


};

const event = eventData[type] || eventData.nha_trai;

return ( <section className="relative overflow-hidden w-full max-w-6xl mx-auto px-6 py-20 bg-gradient-to-b from-[#fcfaf6] to-white">
{/* Hoa trang trí */} <img
     src="/images/hoa_chuong.png"
     alt="hoa"
     className="absolute right-0 top-16 w-28 opacity-30 pointer-events-none"
   />


  <img
    src="/images/hoa_chuong.png"
    alt="hoa"
    className="absolute right-4 bottom-16 w-24 opacity-20 rotate-180 pointer-events-none"
  />

  {/* Heading */}
  <div className="text-center mb-16">
    <p className="uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3">
      Wedding Event
    </p>

    <h2 className="font-serif text-4xl text-[#8b1c25] italic">
      Thông Tin Sự Kiện
    </h2>

    <div className="w-20 h-px bg-[#d4af37] mx-auto mt-5"></div>
  </div>

  <div className="grid lg:grid-cols-2 gap-14 items-start">
    {/* LEFT */}
    <div>
      <div className="bg-white rounded-[32px] p-8 border border-[#d4af37]/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-[#d4af37]" />

          <h3 className="text-[#8b1c25] font-semibold tracking-[0.25em] text-sm">
            {event.title}
          </h3>
        </div>

        <p className="text-gray-500 text-sm">{event.time}</p>

        <div className="my-5">
          <div className="font-serif text-5xl text-[#8b1c25]">
            {event.date}
          </div>

          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#8b1c25] text-xs italic">
            {event.lunar}
          </div>
        </div>

        <div className="border-t border-[#d4af37]/20 pt-5">
          <span className="block text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-2">
            Địa điểm
          </span>

          <p className="text-gray-700 leading-relaxed">{event.place}</p>

          <a
            href={event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              mt-4
              px-5
              py-2
              rounded-full
              border
              border-[#d4af37]
              text-[#8b1c25]
              bg-[#fffaf0]
              text-xs
              tracking-[0.2em]
              uppercase
              hover:bg-[#d4af37]
              hover:text-white
              transition-all
              duration-300
            "
          >
            📍 Chỉ đường
          </a>
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="bg-white rounded-[32px] p-8 border border-[#d4af37]/20 shadow-sm">
      <div className="text-center mb-8">
        <p className="text-[#d4af37] uppercase text-xs tracking-[0.3em] mb-2">
          Save The Date
        </p>

        <h4 className="font-serif text-3xl text-[#8b1c25]">
          Tháng 07 / 2026
        </h4>
      </div>

      <div className="grid grid-cols-7 mb-5 text-center text-xs font-medium text-gray-400">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i}></span>
        ))}

        {Array.from({ length: 31 }).map((_, i) => {
          const day = i + 1;
          const highlight = day === event.highlightDay;

          return (
            <div
              key={day}
              className={`
                h-10 w-10 mx-auto rounded-full
                flex items-center justify-center
                font-serif transition-all
                ${
                  highlight
                    ? "bg-[#8b1c25] text-white shadow-lg"
                    : "text-gray-700 hover:bg-[#d4af37]/10"
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <div className="px-5 py-2 rounded-full bg-[#d4af37]/10 text-[#8b1c25] text-sm">
          ♥ {event.date}
        </div>
      </div>
    </div>
  </div>
</section>


);
}
