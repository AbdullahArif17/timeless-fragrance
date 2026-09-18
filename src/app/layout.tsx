import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import { ReactNode } from 'react';
import { CartProvider } from './cart/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  title: 'Timeless Collections | Luxury Fragrances & Artisanal Perfumes',
  description: 'Curated luxury fragrances, long-lasting artisanal perfume oils, and exquisite collections available all across Pakistan with Cash on Delivery.',
  keywords: ['luxury fragrances', 'timeless collections', 'perfumes pakistan', 'artisanal perfumes', 'luxury scents', 'cash on delivery perfumes'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${heading.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} theme="colored" hideProgressBar={false} />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
