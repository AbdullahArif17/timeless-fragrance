'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      const params: Record<string, string> = {};

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
        {query.length > 0 ? `Search Results for "${query}"` : "Our Products"}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product._id}
              className="group overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-heading text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                  {product.name}
                </CardTitle>
                {product.description && (
                  <p className="mt-2 text-sm text-gray-500 font-bold dark:text-gray-400 capitalize">
                    {product.description.replace("-", " ")}
                  </p>
                )}
                {product.price !== undefined && (
                  <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Rs. {product.price.toFixed(2)}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border bg-slate-200 border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500/20 transition-colors"
                  asChild
                >
                  <Link href={`/products/${product.slug.current}`}>
                    View Product
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
