'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
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

const navLinkClass = cn(
  "text-sm font-medium transition-all",
  "text-foreground/80 hover:text-foreground font-semibold",
  "dark:text-gold-300 dark:hover:text-gold-500",
  "flex items-center px-4 py-2 rounded-lg",
  "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
  "dark:focus:ring-gold-500 dark:focus:ring-offset-black",
  "active:scale-95 transform transition-transform duration-100"
);
const mobileNavLinkClass = cn(
  "block w-full px-4 py-3 rounded-md font-bold",
  "text-foreground/80 hover:bg-neutral-100 active:scale-95",
  "dark:text-gold-300 dark:hover:bg-black/50 dark:hover:text-gold-500",
  "transition-all duration-200"
);

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
    };

    checkTheme();
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:border-gold-500/30 dark:bg-black">
      <div className="container flex h-16 items-center justify-between relative">
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden dark:hover:bg-gold-500/10 dark:text-gold-500"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:flex-1 md:flex md:justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-lg font-bold text-center text-primary dark:text-gold-500 md:text-3xl">
              Timeless Fragrances
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1 justify-start">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={navLinkClass}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="relative" ref={dropdownRef}>
                <button className={navLinkClass} onClick={toggleDropdown}>
                  Collection
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md p-2 z-50 border border-neutral-300 dark:border-gold-500">
                    <Link href="/products/men" className="block px-4 py-2 text-sm dark:text-white hover:bg-neutral-100 dark:hover:bg-black/20">
                      Men's Collection
                    </Link>
                    <Link href="/products/women" className="block px-4 py-2 text-sm dark:text-white hover:bg-neutral-100 dark:hover:bg-black/20">
                      Women's Collection
                    </Link>
                    <button onClick={toggleDropdown} className="mt-2 w-full text-left px-4 py-2 text-sm font-medium dark:text-white bg-neutral-100 dark:bg-black/20 hover:bg-neutral-200 dark:hover:bg-black/30 rounded-md">
                      Close Menu
                    </button>
                  </div>
                )}
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about-us" className={navLinkClass}>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section (Desktop) */}
        <div className="flex items-center md:gap-4 md:flex-1 md:justify-end md:ml-8">
          <div className="hidden md:flex items-center gap-4">
            <SearchBar />
          </div>
          <Button variant="ghost" size="icon" className="dark:hover:bg-gold-500/10 dark:text-gold-500">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="hidden md:block dark:hover:bg-gold-500/10 dark:text-gold-500">
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="w-full px-4 py-3 bg-background dark:bg-black border-b dark:border-gold-500/30">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background dark:bg-black shadow-lg border-t dark:border-gold-500/30 md:hidden">
        <nav className="container py-4 space-y-4">
          <Link href="/" className={mobileNavLinkClass} onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/products" className={mobileNavLinkClass} onClick={toggleMenu}>
            Collection
          </Link>
          <Link href="/about-us" className={mobileNavLinkClass} onClick={toggleMenu}>
            About
          </Link>
          <div className="flex flex-col gap-4 pt-4 border-t dark:border-gold-500/30">
          
            {/* Mobile Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { toggleTheme(); toggleMenu(); }}
              className="w-full dark:hover:bg-gold-500/10 dark:text-gold-500"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span className="ml-2">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span className="ml-2">Dark Mode</span>
                </>
              )}
            </Button>
          </div>
          </nav>
          </div>
      )}
    </header>
  );
}
