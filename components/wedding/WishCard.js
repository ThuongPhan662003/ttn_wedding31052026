export default function WishCard({ item }) {
  return (
    <div className="p-4 text-left">
      {/* NAME */}
      <h3 className="text-[#8b1c25] font-serif text-lg font-semibold tracking-wide">
        {item.ten_khach}
      </h3>

      {/* underline nhỏ kiểu table header */}
      <div className="w-10 h-[2px] bg-[#d4af37]/50 mt-1 mb-3" />

      {/* MESSAGE */}
      <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line font-serif">
        {item.loi_chuc}
      </p>

      {/* IMAGE */}
      {item.hinh_anh_url && (
        <div className="mt-3 flex justify-center">
          <img
            src={item.hinh_anh_url}
            className="max-w-full h-auto object-contain rounded-lg border border-[#d4af37]/20"
            style={{
              maxHeight: "400px",
            }}
          />
        </div>
      )}

      {/* TIME */}
      <p className="text-[11px] text-gray-500 mt-3 tracking-wide">
        {item.thoi_gian}
      </p>
    </div>
  );
}
