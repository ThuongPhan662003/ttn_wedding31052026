import {
  Inter,
  Playfair_Display,
  Great_Vibes,
  Dancing_Script,
  Caveat,
  Allura,
  Alex_Brush,
  Parisienne,
  Sacramento,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["vietnamese"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const dancing = Dancing_Script({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
  variable: "--font-dancing",
});

export const metadata = {
  title: "Our Wedding Invitation",
  description: "Thân mời bạn đến dự đám cưới của chúng mình!",
};
const caveat = Caveat({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
  variable: "--font-caveat", // Đặt tên biến CSS
});
export const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

export const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
});

export const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parisienne",
});

export const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      // 3. Bắt buộc phải thêm biến font mới vào class ở đây để Next.js kích hoạt kích thước định danh ngầm
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${dancing.variable} ${caveat.variable}     ${allura.variable} ${alexBrush.variable} ${parisienne.variable} ${sacramento.variable} `}
    >
      <body className="bg-[#FAF9F6] text-[#333333] antialiased font-inter">
        {children}
      </body>
    </html>
  );
}
