/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          bg: "#FFFFFF",        // Trắng thanh lịch
          pastel: "#FFF0F5",    // Hồng Pastel làm nền phụ hoặc thẻ
          pink: "#FFB6C1",      // Hồng điểm nhấn nút bấm
          gold: "#D4AF37",      // Vàng Gold sang trọng cho viền/tiêu đề
          dark: "#2C3E50",      // Màu chữ chính
        }
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'], // Font viết tay sang trọng
      },
    },
  },
  plugins: [],
}