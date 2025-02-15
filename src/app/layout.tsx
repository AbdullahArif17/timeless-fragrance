import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import { ReactNode } from 'react';

// Configure main sans font
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable', // For variable fonts
  display: 'swap',
});

// Configure display font
const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: 'variable', // Use 'variable' for variable fonts
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Z&S Perfume Store",
  description: "Luxury fragrances collection",
  keywords: ["perfume", "luxury fragrances", "designer scents"],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${sans.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}