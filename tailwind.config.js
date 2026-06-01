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
          bg: "#FAF8F3",
          cream: "#F8F6F1",

          gold: "#C9A227",
          goldLight: "#E6D6A8",

          green: "#66785F",
          greenLight: "#A8BBA2",

          red: "#8B1E2D",
          redLight: "#B33A4A",
          rose: "#F7E8EA",

          dark: "#2D3748",
        },
      },

      fontFamily: {
        // Xóa bớt 1 dòng playfair bị trùng
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        arcittya: ["FC-Arcittya-Begatri", "serif"],
        coldwell: ["FC-Coldwell-Bridges", "serif"],
        "great-vibes": ["var(--font-great-vibes)", "cursive"],
        // Sửa lại chỗ này cho khớp với biến CSS ở layout.js của bạn
        dancing: ["var(--font-dancing)", "cursive"],
        caveat: ["var(--font-caveat)", "cursive"],
      },

      boxShadow: {
        wedding: "0 25px 80px rgba(95,113,97,0.08)",
        weddingRed: "0 25px 80px rgba(139,30,45,0.12)",
      },

      backgroundImage: {
        weddingGradient: "linear-gradient(180deg,#fff 0%,#faf8f3 100%)",
        redGlow: "radial-gradient(circle,#8B1E2D22 0%,transparent 70%)",
        // Bổ sung thêm Green Glow nếu bạn muốn làm hiệu ứng vệt sáng xanh cho tone xanh lá
        greenGlow: "radial-gradient(circle,#66785F22 0%,transparent 70%)",
      },
    },
  },

  plugins: [],
};
