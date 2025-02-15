import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Z&S Perfume Store",
  description: "Luxury fragrances collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${sans.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}