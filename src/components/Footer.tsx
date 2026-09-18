import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import { SOCIAL_LINKS, WHATSAPP_DISPLAY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border/80 bg-neutral-950 text-white dark:bg-black dark:border-gold-500/20 pt-16 pb-12 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-neutral-800 dark:border-gold-500/10">
          {/* Brand Col */}
          <div className="space-y-4 text-center md:text-left">
            <span className="font-heading text-2xl font-bold tracking-wider text-gold-400">
              Timeless Collections
            </span>
            <p className="text-sm text-neutral-400 max-w-xs font-light leading-relaxed mx-auto md:mx-0">
              Curators of luxury, long-lasting artisanal perfumery crafted to inspire confidence and elegance.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-500">Explore</p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-400 transition-colors">Fragrance Collections</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-gold-400 transition-colors">Our Story &amp; Heritage</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-400 transition-colors">Shopping Bag</Link>
              </li>
            </ul>
          </div>

          {/* Connect Col */}
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-500">Connect With Us</p>
            <div className="flex justify-center md:justify-start items-center space-x-4">
              <Link
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-pink-500 hover:text-pink-400" />
              </Link>
              <Link
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                <Facebook className="h-5 w-5 text-blue-500 hover:text-blue-400" />
              </Link>
              <Link
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-green-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                <BsWhatsapp className="h-5 w-5 text-green-500 hover:text-green-400" />
              </Link>
            </div>

            <div className="text-xs text-neutral-400 pt-1">
              <span className="block text-neutral-500 mb-1">Direct WhatsApp Concierge:</span>
              <Link
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:underline font-semibold text-sm"
              >
                {WHATSAPP_DISPLAY}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Timeless Collections. All rights reserved.</p>
          <p className="text-[11px] text-neutral-600">Handcrafted Artisanal Scents • Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
