'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';

const navLinkClass = cn(
  "text-sm font-medium transition-all",
  "text-foreground/80 hover:text-foreground font-semibold",
  "dark:text-gold-300 dark:hover:text-gold-500", // Changed to gold colors
  "flex items-center px-4 py-2 rounded-lg",
  "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2", // Gold focus ring
  "dark:focus:ring-gold-500 dark:focus:ring-offset-black", // Dark mode adjustments
  "active:scale-95 transform transition-transform duration-100"
);

const mobileNavLinkClass = cn(
  "block w-full px-4 py-3 rounded-md font-medium",
  "text-foreground/80 hover:bg-neutral-100 active:scale-95",
  "dark:text-gold-300 dark:hover:bg-black/50 dark:hover:text-gold-500", // Gold text and dark bg
  "transition-all duration-200"
);

export function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(savedTheme === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      };
  
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
        setIsMenuOpen(false);
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
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
      "dark:border-gold-500/30 dark:bg-black", // Black background with gold border
      "supports-[backdrop-filter]:bg-background/60"
    )}>
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
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 md:flex md:justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-lg gap-1 font-bold text-primary dark:text-gold-500 md:text-3xl"> {/* Gold text */}
              Timeless Fragrances
            </span>
          </Link>
        </div>

        {/* Desktop Navigation (Left Side) */}
        <NavigationMenu className="hidden font-bold md:flex flex-1 justify-start">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={navLinkClass}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div className="relative group">
                  <Link href="/products" className={navLinkClass}>
                    Collection
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180 dark:text-gold-500" /> {/* Gold icon */}
                  </Link>
                </div>
              </NavigationMenuLink>
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

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto md:gap-4 md:flex-1 md:justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="dark:hover:bg-gold-500/10 dark:text-gold-500" // Gold theme
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-foreground dark:text-gold-500" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </Button>
          <div className="hidden md:flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500/20"
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-black" // Gold button
            >
              Register
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background dark:bg-black md:hidden shadow-lg border-t dark:border-gold-500/30">
            <nav className="container py-4 space-y-2">
              <Link href="/" className={mobileNavLinkClass} onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/products" className={mobileNavLinkClass} onClick={toggleMenu}>
                Collection
              </Link>
              <Link href="/about-us" className={mobileNavLinkClass} onClick={toggleMenu}>
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t dark:border-gold-500/30">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500/20"
                  onClick={toggleMenu}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="w-full dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-black"
                  onClick={toggleMenu}
                >
                  Register
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}