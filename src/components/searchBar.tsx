'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@sanity/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

interface ProductSuggestion {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
}

async function searchProducts(searchTerm: string): Promise<ProductSuggestion[]> {
  const groq = `*[_type=="product" && name match $searchTerm]{
    _id,
    name,
    slug,
    "image": image.asset->url
  }[0...5]`;
  return await client.fetch(groq, { searchTerm: `*${searchTerm}*` });
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const timer = setTimeout(async () => {
        const results = await searchProducts(query);
        setSuggestions(results);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Navigate to the search page with the query as a URL parameter.
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-64 rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gold-500 dark:focus:ring-gold-500"
      />
      <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500" />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-neutral-300 dark:border-gold-500 rounded-md mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="flex items-center hover:bg-neutral-100 dark:hover:bg-black/20"
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              )}
              <Link
                href={`/products/${product.slug.current}`}
                onClick={() => setQuery('')}
              >
                <span className="m-4 font-bold dark:text-white">{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
