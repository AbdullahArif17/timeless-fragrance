'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Moon,
  Sun,
  Menu,
  X,
  ShoppingCart
} from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { SearchBar } from './searchBar';
import { cn } from '@/lib/utils';
import { useCart } from '@/app/cart/CartContext';

const navLinkClass = cn(
  "text-sm font-medium transition-all duration-300",
  "text-foreground/80 hover:text-foreground hover:bg-gold-500/10",
  "dark:text-neutral-300 dark:hover:text-gold-400 dark:hover:bg-gold-500/10",
  "flex items-center px-4 py-2 rounded-full",
  "focus:outline-none focus:ring-2 focus:ring-gold-500",
  "active:scale-95 transform"
);

const mobileNavLinkClass = cn(
  "block w-full px-5 py-3.5 rounded-xl font-medium",
  "text-foreground hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 active:scale-95",
  "transition-all duration-200"
);

export function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isDarkMode = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const totalItems = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl dark:border-gold-500/20 dark:bg-black/80 transition-colors">
      <div className="container flex h-18 py-3 items-center justify-between relative max-w-7xl">
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Navigation Menu"
          className="md:hidden rounded-xl text-foreground hover:bg-gold-500/10 hover:text-gold-500"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Brand Logo with Gold Typography */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 md:flex md:justify-start">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-foreground group-hover:text-gold-500 transition-colors">
              Timeless Collections
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-2 bg-muted/40 p-1 rounded-full border border-border/60 backdrop-blur-sm">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={navLinkClass}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products" className={navLinkClass}>
                  Collections
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about-us" className={navLinkClass}>
                  Our Story
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section (Search, Cart, Dark Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 md:flex-1 md:justify-end">
          <div className="hidden md:flex items-center">
            <SearchBar />
          </div>

          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Shopping Cart"
              className="relative rounded-full text-foreground hover:bg-gold-500/10 hover:text-gold-500 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-[11px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-gold-500/40 animate-scale-in">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Toggle Theme"
            onClick={toggleTheme} 
            className="rounded-full text-foreground hover:bg-gold-500/10 hover:text-gold-500 transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-gold-400" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar Drawer */}
      {isMobile && (
        <div className="w-full px-4 py-2.5 bg-background/90 dark:bg-black/90 backdrop-blur-md border-b border-border/60 dark:border-gold-500/20">
          <SearchBar />
        </div>
      )}

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 dark:bg-black/95 backdrop-blur-2xl shadow-2xl border-t border-border/80 dark:border-gold-500/20 md:hidden animate-fade-in">
          <nav className="container py-6 px-4 space-y-2">
            <Link href="/" className={mobileNavLinkClass} onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/products" className={mobileNavLinkClass} onClick={toggleMenu}>
              Collections
            </Link>
            <Link href="/about-us" className={mobileNavLinkClass} onClick={toggleMenu}>
              Our Story
            </Link>
            <Link href="/cart" className={mobileNavLinkClass} onClick={toggleMenu}>
              Shopping Bag ({totalItems})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
