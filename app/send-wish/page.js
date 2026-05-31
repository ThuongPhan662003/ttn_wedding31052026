'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SendWishPage() {
  const [name, setName] = useState(''); // [source: 1]
  const [wish, setWish] = useState(''); // [source: 1]
  const [imageBase64, setImageBase64] = useState('');
  const [status, setStatus] = useState(''); // [source: 1]

  // Hàm xử lý đọc file ảnh và nén dung lượng xuống dưới 30KB để vừa khít Google Sheets
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra nếu file không phải là ảnh
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chỉ chọn tệp tin hình ảnh.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Khởi tạo khung canvas để giảm kích thước ảnh hình học
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Giới hạn chiều rộng ảnh tối đa 400px để tối ưu dung lượng
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Xuất ảnh sang chuỗi Base64 với chất lượng nén thấp (0.4) để chuỗi ký tự cực ngắn
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.4);
        setImageBase64(compressedBase64);
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // [source: 1]
    setStatus('sending'); // [source: 1]

    try {
      const response = await fetch('/api/wishes', { // [source: 1]
        method: 'POST', // [source: 1]
        headers: { 'Content-Type': 'application/json' }, // [source: 1]
        body: JSON.stringify({ // [source: 1]
          ten_khach: name, // [source: 1]
          loi_chuc: wish, // [source: 1]
          hinh_anh_url: imageBase64 // Truyền chuỗi ảnh nén Base64 vào database
        }),
      });

      if (response.ok) { // [source: 1]
        setStatus('success'); // [source: 1]
        setName(''); // [source: 1]
        setWish(''); // [source: 1]
        setImageBase64('');
      } else {
        setStatus('error'); // [source: 1]
      }
    } catch (error) {
      console.error(error); // [source: 1]
      setStatus('error'); // [source: 1]
    }
  };

  return (
    // Sử dụng màu nền Trắng thanh lịch (wedding-bg) làm không gian bao cảnh [source: 1]
    <main className="min-h-screen bg-wedding-bg flex flex-col items-center justify-center p-4 md:p-8 antialiased relative overflow-hidden">
      
      {/* Các hạt sương mờ dải màu Hồng Pastel tạo chiều sâu cho không gian sảnh [source: 1] */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-wedding-pastel/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-wedding-pastel/40 rounded-full blur-3xl pointer-events-none" />

      {/* Điều hướng sử dụng tone màu tối nhẹ [source: 1] */}
      <Link href="/" className="group mb-8 flex items-center gap-2 text-[10px] font-medium text-wedding-dark/60 hover:text-wedding-gold tracking-[0.3em] uppercase transition-all relative z-20">
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Quay lại Trang Chủ [source: 1]
      </Link>

      {/* Khung Form thiết kế theo phong cách Cổng vòm kết hợp kính mờ tinh tế [source: 1] */}
      <div className="max-w-md w-full bg-white rounded-3xl p-6 md:p-8 text-center relative border border-wedding-gold/15 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.12)] backdrop-blur-md">
        
        {/* Viền kép hình vòm hoa mỹ dát vàng (wedding-gold) chạy dọc mép trong [source: 1] */}
        <div className="absolute inset-3 border border-wedding-gold/25 rounded-[20px] pointer-events-none" />
        <div className="absolute inset-4 border border-wedding-gold/5 rounded-[16px] pointer-events-none" />

        <h1 className="text-3xl md:text-4xl text-wedding-dark tracking-wide font-playfair font-light mb-2 relative z-10">
          Send Wishes [source: 1]
        </h1>
        <p className="text-[9px] tracking-[0.25em] text-wedding-gold uppercase mb-8 font-medium relative z-10">
          Gửi Lời Chúc &amp; Lưu Kỷ Niệm
        </p>

        {status === 'success' ? ( // [source: 1]
          <div className="bg-wedding-pastel/30 rounded-2xl p-8 border border-wedding-gold/15 shadow-sm space-y-3 relative z-10 animate-fade-in">
            <span className="text-4xl block">🎉</span>
            <h2 className="text-lg font-playfair font-normal text-wedding-dark">Gửi lời chúc thành công!</h2>
            <p className="text-xs text-wedding-dark/60 font-light leading-relaxed">
              Cảm ơn bạn rất nhiều vì đã gửi những thông điệp đong đầy yêu thương và khoảnh khắc kỷ niệm đến tụi mình. Lời chúc đang được hiển thị tại sảnh tiệc!
            </p>
            <button 
              onClick={() => setStatus('')}
              className="mt-4 text-xs text-wedding-gold border-b border-wedding-gold/40 pb-0.5 hover:text-wedding-dark transition-colors"
            >
              Tiếp tục gửi lời chúc khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 text-left space-y-5 px-2"> // [source: 1]
            
            {status === 'error' && ( // [source: 1]
              <p className="text-red-500 text-xs bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                ❌ Có lỗi xảy ra trong quá trình đồng bộ dữ liệu. Bạn vui lòng thử lại nhé! [source: 1]
              </p>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-wedding-dark/60 mb-1.5 font-medium">Tên của bạn [source: 1]</label>
              <input 
                required // [source: 1]
                type="text" // [source: 1]
                value={name} // [source: 1]
                onChange={(e) => setName(e.target.value)} // [source: 1]
                className="w-full bg-wedding-bg border border-wedding-gold/20 rounded-xl p-3 text-sm text-wedding-dark focus:outline-none focus:border-wedding-gold transition-colors shadow-inner" 
                placeholder="Ví dụ: Minh Trí (Bạn chú rể) [source: 1]" 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-wedding-dark/60 mb-1.5 font-medium">Lời chúc của bạn [source: 1]</label>
              <textarea 
                required // [source: 1]
                rows="4" // [source: 1]
                value={wish} // [source: 1]
                onChange={(e) => setWish(e.target.value)} // [source: 1]
                className="w-full bg-wedding-bg border border-wedding-gold/20 rounded-xl p-3 text-sm text-wedding-dark focus:outline-none focus:border-wedding-gold transition-colors shadow-inner resize-none" 
                placeholder="Nhập những lời chúc đong đầy yêu thương tại đây... [source: 1]" 
              />
            </div>

            {/* 📸 KHỐI TẢI ẢNH MỚI BỔ SUNG */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-wedding-dark/60 mb-1.5 font-medium">
                Đính kèm hình ảnh kỷ niệm (Tối đa 1 ảnh)
              </label>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-wedding-gold/30 rounded-xl p-4 bg-wedding-bg hover:bg-wedding-pastel/20 transition-colors group cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                
                {imageBase64 ? (
                  <div className="w-full text-center space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden border border-wedding-gold/30">
                      <img src={imageBase64} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[11px] text-green-600 font-medium">✓ Đã nạp và tối ưu ảnh thành công</p>
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <span className="text-xl block group-hover:scale-110 transition-transform">📷</span>
                    <p className="text-xs text-wedding-gold font-medium">Bấm để chụp ảnh hoặc chọn ảnh</p>
                    <p className="text-[10px] text-wedding-dark/40 font-light">Ảnh sẽ tự động hiển thị lên máy chiếu tại sảnh</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" // [source: 1]
              disabled={status === 'sending'} // [source: 1]
              className="w-full bg-wedding-pink text-white font-semibold py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase shadow-lg shadow-wedding-pink/20 hover:bg-wedding-pink/90 transition-all active:scale-[0.99] mt-2"
            >
              {status === 'sending' ? 'Đang lưu vào database... [source: 1]' : '✨ Gửi Lời Chúc Mừng [source: 1]'}
            </button>
          </form>
        )}

        <div className="text-wedding-gold/40 text-xs mt-6 mb-1">✦ 🌸 ✦</div>
      </div>

      <p className="text-[9px] text-wedding-dark/40 font-medium uppercase tracking-[0.4em] mt-8">
        Trọng Nghĩa &amp; Thu Thảo Wedding • 2026
      </p>
    </main>
  );
}