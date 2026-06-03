export default function WeddingTimeline() {
  const schedule = [
    {
      time: "10:30",
      title: "Đón Tiếp Khách Mời",
      desc: "Chụp ảnh lưu niệm cùng Cô dâu & Chú rể tại sảnh tiệc.",
    },
    {
      time: "11:00",
      title: "Lễ Thành Hôn (Khai Tiệc)",
      desc: "Thực hiện nghi lễ cưới truyền thống, cắt bánh và rót rượu champagne.",
    },
    {
      time: "11:45",
      title: "Nhập Tiệc Chúc Mừng",
      desc: "Gia đình gửi lời cảm ơn và khai tiệc mặn cùng toàn thể quan khách.",
    },
    {
      time: "13:00",
      title: "Tiễn Khách & Quà Tặng",
      desc: "Gửi tặng những phần quà nhỏ cảm ơn quý khách đã đến chung vui.",
    },
  ];

  return (
    // Responsive: Giới hạn bề ngang tối đa để trục timeline không bị kéo quá rộng trên màn hình PC lớn
    <div className="space-y-6 md:space-y-8 relative border-l-2 border-dashed border-wedding-green/20 ml-4 sm:ml-8 max-w-xl mx-auto">
      {schedule.map((item, index) => (
        <div key={index} className="relative pl-6 md:pl-8 group">
          {/* Nút mốc giờ */}
          <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-wedding-green group-hover:bg-wedding-gold transition-colors duration-300" />

          {/* Giờ giấc hiển thị */}
          <span className="block font-playfair font-bold text-xs md:text-sm text-wedding-gold tracking-wider">
            {item.time}
          </span>

          {/* Tiêu đề sự kiện nhỏ */}
          <h4 className="font-inter text-sm md:text-base font-semibold text-wedding-dark mt-0.5">
            {item.title}
          </h4>

          {/* Mô tả chi tiết */}
          <p className="font-inter text-xs md:text-[13px] text-wedding-dark/60 font-light mt-0.5 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
