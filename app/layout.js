import './globals.css';
import { Playfair_Display, Inter } from 'next/font-google';

const playfair = Playfair_Display({ 
  subsets: ['vietnamese'], 
  variable: '--font-playfair' 
});

const inter = Inter({ 
  subsets: ['vietnamese'], 
  variable: '--font-inter' 
});

export const metadata = {
  title: 'Our Wedding Invitation',
  description: 'Thân mời bạn đến dự đám cưới của chúng mình!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF9F6] text-[#333333] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}