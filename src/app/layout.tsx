import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import { ReactNode } from 'react';
import { CartProvider } from './cart/CartContext';
// import Banner from '@/components/Banner'; 

// Fonts
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable',
  display: 'swap',
});

const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: 'variable',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Z&S Perfume Store',
  description: 'Luxury fragrances collection',
  keywords: ['perfume', 'luxury fragrances', 'designer scents'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${heading.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            {/* <Banner /> ✅ Add the banner here */}
            <Navbar />
            <main className="flex-1">
              <CartProvider>{children}</CartProvider>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
