'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductSuggestion {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
  price?: number;
}

async function searchProducts(searchTerm: string): Promise<ProductSuggestion[]> {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Search query error:", error);
    return [];
  }
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length > 0) {
      const timer = setTimeout(async () => {
        const results = await searchProducts(query.trim());
        setSuggestions(results);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-56 lg:w-72">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search fragrance collections..."
          value={query}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          className="w-full rounded-full border border-border/80 dark:border-gold-500/30 bg-card/80 dark:bg-neutral-900/90 backdrop-blur-md px-4 py-2 pl-9 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm transition-all duration-300 placeholder:text-muted-foreground"
        />
        <Search className="h-4 w-4 text-muted-foreground absolute left-3 pointer-events-none" />

        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            className="absolute right-1.5 h-6 px-2 text-[11px] font-semibold bg-gold-500 text-black hover:bg-gold-600 rounded-full"
          >
            Go
          </Button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-card/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-border dark:border-gold-500/40 rounded-2xl mt-2 max-h-80 overflow-y-auto z-50 shadow-2xl divide-y divide-border/60">
          <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gold-500 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            Matching Perfumes
          </div>
          {suggestions.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug.current}`}
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gold-500/10 transition-colors group"
            >
              <div className="relative w-11 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/60">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground group-hover:text-gold-500 transition-colors block truncate">
                  {product.name}
                </span>
                {product.price && (
                  <span className="text-xs text-muted-foreground">
                    Rs. {Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
