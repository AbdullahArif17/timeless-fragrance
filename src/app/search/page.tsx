'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price?: number;
  description?: string;
  image?: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      let groq: string;
      const params: Record<string, string> = {}; // Use const instead of let
      if (query.length > 0) {
        groq = `*[_type=="product" && name match $searchTerm]{
          _id,
          name,
          slug,
          price,
          description,
          "image": image.asset->url
        }[0...5]`;
        params.searchTerm = `*${query}*`;
      } else {
        groq = `*[_type=="product"]{
          _id,
          name,
          slug,
          price,
          description,
          "image": image.asset->url
        }[0...10]`;
      }
      const results = await client.fetch<Product[]>(groq, params);
      setProducts(results);
      setIsLoading(false);
    }
    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {query.length > 0 
          ? `Search Results for "${query}"`
          : "Our Products"}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded hover:shadow-lg transition">
              <Link href={`/products/${product.slug.current}`}>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  {product.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  {product.price !== undefined && (
                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
