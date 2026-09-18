'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price?: number;
  description?: string;
  image?: string;
  hasDiscount?: boolean;
  discountPercent?: number;
}

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.results || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 min-h-[75vh] max-w-7xl">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
          <Search className="h-3 w-3" />
          Catalog Search
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground">
          {query.trim().length > 0 ? (
            <>Search Results for &ldquo;<span className="text-gold-gradient">{query}</span>&rdquo;</>
          ) : (
            <>All Fragrance <span className="text-gold-gradient">Collections</span></>
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          Found {products.length} {products.length === 1 ? 'fragrance' : 'fragrances'}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-card border border-border animate-pulse p-4 space-y-4">
              <div className="w-full h-64 bg-muted rounded-xl" />
              <div className="h-6 w-3/4 bg-muted rounded-md" />
              <div className="h-4 w-1/2 bg-muted rounded-md" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-border/80 bg-card/40 max-w-md mx-auto space-y-4">
          <p className="text-xl font-bold text-foreground">
            No fragrances matched &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching for &ldquo;Love Drop&rdquo;, &ldquo;Flora&rdquo;, &ldquo;Elegant&rdquo;, or view our complete collection.
          </p>
          <Link href="/products" className="inline-block pt-2">
            <Button className="bg-gold-500 text-black hover:bg-gold-600 font-bold rounded-xl shadow-lg">
              Browse All Fragrances
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const discountedPrice =
              product.hasDiscount && product.discountPercent && product.price
                ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
                : null;

            return (
              <Card
                key={product._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 dark:border-gold-500/20 bg-card hover:border-gold-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1.5"
              >
                <div>
                  <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted/40">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={Boolean(product.image?.startsWith('data:'))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-sm">Image Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <CardTitle className="font-heading text-2xl font-bold text-foreground group-hover:text-gold-500 transition-colors">
                      {product.name}
                    </CardTitle>

                    {product.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-light">
                        {product.description}
                      </p>
                    )}

                    {product.price !== undefined && (
                      <div className="mt-4 flex items-baseline gap-2.5">
                        {discountedPrice ? (
                          <>
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                              Rs. {discountedPrice}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              Rs. {product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-foreground">
                            Rs. {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full py-6 font-semibold text-sm bg-neutral-900 text-white hover:bg-gold-500 hover:text-black dark:bg-neutral-800 dark:text-white dark:hover:bg-gold-500 dark:hover:text-black rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group/btn"
                    asChild
                  >
                    <Link href={`/products/${product.slug.current}`}>
                      <span>View Fragrance</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
