import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';

export default function Footer() {
  return (
	
    <footer className="bg-gray-800 text-white py-8">
		 <section className="dark:bg-gray-800 py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="font-heading text-3xl font-bold text-white dark:text-white mb-4">
            Visit Us on:
          </h2>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://www.instagram.com/timeless_fragrance_official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-8 w-8 text-pink-500 hover:text-pink-600 transition-colors" />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61572591627602"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-8 w-8 text-blue-600 hover:text-blue-700 transition-colors" />
            </Link>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Z&S Perfume Store. All rights reserved.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <BsWhatsapp className="h-6 w-6 text-green-500" />
          <Link
            href="https://wa.me/923073532413"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            +923073532413
          </Link>
        </div>
      </div>
    </footer>
  );
}
