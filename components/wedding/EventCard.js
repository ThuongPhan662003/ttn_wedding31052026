function EventCard({ event }) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#d4af37]/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-px bg-[#d4af37]" />

        <h3 className="text-[#8b1c25] font-semibold tracking-[0.25em] text-sm">
          {event.title}
        </h3>
      </div>

      <p className="text-gray-500 text-sm">{event.time}</p>

      <div className="my-5">
        <div className="font-serif text-5xl text-[#8b1c25]">{event.date}</div>

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
  );
}
