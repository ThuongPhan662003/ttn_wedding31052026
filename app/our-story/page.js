import { getGoogleSheet } from '@/lib/googleSheets';
import Link from 'next/link';

export const revalidate = 0; // Ép Vercel luôn fetch dữ liệu mới khi khách mở trang

export default async function OurStoryPage() {
  let timelines = [];

  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['LoveStory'];
    const rows = await sheet.getRows();

    // Chuyển đổi dữ liệu từ Google Sheets thành mảng Object cho giao diện
    timelines = rows.map(row => ({
      date: row.get('thoi_gian'),
      title: row.get('tieu_de'),
      desc: row.get('noi_dung'),
      image: row.get('hinh_anh_url')
    }));
  } catch (error) {
    console.error("Lỗi fetch dữ liệu LoveStory từ Google Sheets:", error);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#333333] px-4 py-12 flex flex-col items-center">
      <div className="max-w-md w-full text-center">
        <Link href="/" className="text-xs text-gray-400 hover:text-[#FFB7B2] mb-8 inline-block">
          ← Quay lại Trang Chủ
        </Link>
        <h1 className="text-4xl text-[#D4AF37] mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Our Love Story
        </h1>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-12">Hành trình hạnh phúc (Dữ liệu động)</p>

        {timelines.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Câu chuyện tình yêu đang được cập nhật trên Google Sheets...</p>
        ) : (
          <div className="relative border-l border-[#F3E5D8] ml-4 text-left space-y-10">
            {timelines.map((item, index) => (
              <div className="relative pl-6" key={index}>
                <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-[#FFB7B2] border border-white" />
                <span className="text-xs font-bold text-[#D4AF37]">{item.date}</span>
                <h3 className="font-serif text-lg text-gray-700 mt-0.5">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mt-3 border border-[#F3E5D8]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}