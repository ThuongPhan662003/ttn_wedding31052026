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
        playfair: ["var(--font-playfair)", "serif"],
        arcittya: ["FC-Arcittya-Begatri", "serif"],
        coldwell: ["FC-Coldwell-Bridges", "serif"],
      },

      boxShadow: {
        wedding: "0 25px 80px rgba(95,113,97,0.08)",
        weddingRed: "0 25px 80px rgba(139,30,45,0.12)",
      },

      backgroundImage: {
        weddingGradient: "linear-gradient(180deg,#fff 0%,#faf8f3 100%)",

        redGlow: "radial-gradient(circle,#8B1E2D22 0%,transparent 70%)",
      },
    },
  },

  plugins: [],
};
