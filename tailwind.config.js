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
          bg: "#FFFFFF", // Trắng chủ đạo
          cream: "#F8F6F1", // Trắng kem
          gold: "#C9A227", // Vàng gold
          goldLight: "#E6D6A8", // Vàng nhạt
          green: "#66785F", // Xanh olive
          greenLight: "#A8BBA2", // Xanh sage
          dark: "#2D3748", // Chữ chính
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        arcittya: ["var(--font-arcittya)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
