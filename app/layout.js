import './globals.css';

export const metadata = {
  title: 'Our Wedding Invitation',
  description: 'Thân mời bạn đến dự đám cưới của chúng mình!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Nạp trực tiếp phông chữ Playfair Display và Inter từ CDN Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#333333] antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Khởi tạo biến font toàn cục để các file con bên trong gọi ra sử dụng */}
        <div style={{ '--font-playfair': "'Playfair Display', serif" }}>
          {children}
        </div>
      </body>
    </html>
  );
}