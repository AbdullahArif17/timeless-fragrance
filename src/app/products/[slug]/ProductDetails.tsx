"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsWhatsapp } from "react-icons/bs";
import { ShoppingCart, Sparkles, ShieldCheck, Award } from "lucide-react";
import { useCart } from "@/app/cart/CartContext";
import { SOCIAL_LINKS } from "@/lib/constants";

interface SanityProduct {
  _id: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  slug?: { current: string };
  hasDiscount?: boolean;
  discountPercent?: number;
  category?: { name: string; slug: string };
}

export default function ProductDetails({
  product,
}: {
  product: SanityProduct;
}) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const finalPrice =
      product.hasDiscount && product.discountPercent
        ? product.price! * (1 - product.discountPercent / 100)
        : product.price || 0;

    addToCart({
      id: product._id,
      name: product.name,
      price: parseFloat(finalPrice.toFixed(2)),
      image: product.image || "",
      quantity: 1,
      heading: product._id,
    });
  };

  const finalPrice =
    product.hasDiscount && product.discountPercent
      ? (product.price! * (1 - product.discountPercent / 100)).toFixed(2)
      : product.price?.toFixed(2);

  return (
    <section className="py-12 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image Stage */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-gold-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/80 dark:border-gold-500/30">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={Boolean(product.image?.startsWith('data:'))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">Fragrance imagery coming soon</span>
                </div>
              )}

              {product.hasDiscount && product.discountPercent ? (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white shadow-lg">
                  {product.discountPercent}% OFF
                </div>
              ) : null}
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              {product.category?.name && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 text-gold-500 border border-gold-500/20 mb-3">
                  {product.category.name}
                </span>
              )}
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price section */}
            {product.price && (
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-gold-500">
                    Rs. {finalPrice}
                  </span>
                  {product.hasDiscount && product.discountPercent ? (
                    <span className="text-base line-through text-muted-foreground">
                      Rs. {product.price.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes.</p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Fragrance Profile</h2>
                <p className="text-muted-foreground leading-relaxed text-base font-light">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full py-7 text-base font-bold bg-gold-500 text-black hover:bg-gold-600 dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 rounded-xl transition-all duration-300 shadow-xl shadow-gold-500/20 hover:shadow-gold-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Link
                href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(`Salam! I'm interested in ordering ${product.name} (Rs. ${finalPrice}). Please share order details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-6 text-sm font-semibold border-green-600/40 hover:border-green-600 hover:bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <BsWhatsapp className="h-5 w-5" />
                  Order Directly on WhatsApp
                </Button>
              </Link>
            </div>

            {/* Feature Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border/70 text-center">
              <div className="p-3 rounded-lg bg-card/40 border border-border/40">
                <Award className="h-4 w-4 mx-auto text-gold-500 mb-1" />
                <p className="text-xs font-semibold text-foreground">Artisanal Blends</p>
                <p className="text-[10px] text-muted-foreground">Master Formula</p>
              </div>
              <div className="p-3 rounded-lg bg-card/40 border border-border/40">
                <Sparkles className="h-4 w-4 mx-auto text-gold-500 mb-1" />
                <p className="text-xs font-semibold text-foreground">50ml Extrait</p>
                <p className="text-[10px] text-muted-foreground">Rich Concentration</p>
              </div>
              <div className="p-3 rounded-lg bg-card/40 border border-border/40">
                <ShieldCheck className="h-4 w-4 mx-auto text-gold-500 mb-1" />
                <p className="text-xs font-semibold text-foreground">Premium Quality</p>
                <p className="text-[10px] text-muted-foreground">100% Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
