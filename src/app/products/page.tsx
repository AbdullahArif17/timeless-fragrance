import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { getProducts, getCategories } from "@/lib/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ category }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Exquisite Aromas
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground">
            Our <span className="text-gold-gradient">Collections</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in our collection of artisanal perfumes. Each bottle is masterfully crafted for longevity, depth, and unmistakable allure.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          <Link href="/products">
            <Button
              variant={!category ? "default" : "outline"}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                !category
                  ? "bg-gold-500 text-black shadow-md shadow-gold-500/30 hover:bg-gold-600"
                  : "border-border hover:border-gold-500/50 hover:bg-accent text-foreground"
              }`}
            >
              All Fragrances
            </Button>
          </Link>
          {categories.map((cat) => {
            const isActive = category?.toLowerCase() === cat.slug.toLowerCase() || category?.toLowerCase() === cat.name.toLowerCase();
            return (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gold-500 text-black shadow-md shadow-gold-500/30 hover:bg-gold-600"
                      : "border-border hover:border-gold-500/50 hover:bg-accent text-foreground"
                  }`}
                >
                  {cat.name}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-xl text-muted-foreground">No fragrances found in this collection.</p>
            <Link href="/products">
              <Button className="bg-gold-500 text-black hover:bg-gold-600">
                View All Collections
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const price = Number(product.price);
              const discountedPrice =
                product.has_discount && product.discount_percent && price
                  ? (price * (1 - Number(product.discount_percent) / 100)).toFixed(2)
                  : null;

              return (
                <Card
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 dark:border-gold-500/20 bg-card hover:border-gold-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Area with Zoom */}
                    <CardHeader className="p-0">
                      <div className="aspect-[4/5] relative overflow-hidden bg-muted/40">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="text-muted-foreground text-sm">Image Coming Soon</span>
                          </div>
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                          {product.category_name ? (
                            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-gold-300 border border-white/10">
                              {product.category_name}
                            </span>
                          ) : <span />}

                          {product.has_discount && product.discount_percent ? (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-600/90 text-white shadow-md">
                              {product.discount_percent}% OFF
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="p-6">
                      <CardTitle className="font-heading text-2xl font-bold text-foreground group-hover:text-gold-500 transition-colors duration-300">
                        {product.name}
                      </CardTitle>

                      {product.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                          {product.description}
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="mt-4 flex items-baseline gap-2.5">
                        {discountedPrice ? (
                          <>
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                              Rs. {discountedPrice}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              Rs. {price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-foreground">
                            Rs. {price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  {/* CTA Footer */}
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full py-6 font-semibold text-sm bg-neutral-900 text-white hover:bg-gold-500 hover:text-black dark:bg-neutral-800 dark:text-white dark:hover:bg-gold-500 dark:hover:text-black rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group/btn"
                      asChild
                    >
                      <Link href={`/products/${product.slug}`}>
                        <span>View Fragrance Details</span>
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
    </div>
  );
}
