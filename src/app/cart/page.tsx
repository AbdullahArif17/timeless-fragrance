"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

function getItemImageUrl(image: string | undefined) {
  if (!image) return "/zaid logo.jpeg";
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
    return image;
  }
  try {
    return urlFor(image).url();
  } catch {
    return "/zaid logo.jpeg";
  }
}

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, calculateTotal, clearCart } = useCart();

  const total = calculateTotal();

  return (
    <div className="min-h-[80vh] bg-background py-12 md:py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground">
            Shopping <span className="text-gold-gradient">Bag</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your selected fragrances before proceeding to checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-border/80 bg-card/40 max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">Explore our curated collections and choose your signature scent.</p>
            </div>
            <Link href="/products" className="inline-block">
              <Button className="px-8 py-5 bg-gold-500 text-black hover:bg-gold-600 font-bold rounded-xl shadow-lg shadow-gold-500/20">
                Browse Collections
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-card border border-border/80 dark:border-gold-500/20 p-4 sm:p-5 rounded-2xl shadow-sm hover:border-gold-500/40 transition-all duration-300 gap-4 sm:gap-6"
                >
                  <div className="relative w-24 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={getItemImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      {item.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Rs. {item.price.toFixed(2)} each
                    </p>
                    <p className="font-bold text-gold-500 text-base pt-1">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-xl border border-border/60">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-foreground hover:bg-background transition disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-7 text-center text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        item.quantity < 5 &&
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-foreground hover:bg-background transition disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={item.quantity >= 5}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from bag`}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="p-6 rounded-2xl bg-card border border-border/80 dark:border-gold-500/20 space-y-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Shipping within Pakistan</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Payment Method</span>
                <span className="font-medium text-foreground">Cash On Delivery</span>
              </div>
              <div className="border-t border-border/80 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Amount</span>
                <span className="text-2xl sm:text-3xl font-bold text-gold-500">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto px-6 py-5 rounded-xl border-border hover:border-gold-500/50">
                  Continue Shopping
                </Button>
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Empty Bag
                </Button>

                <Link href="/checkout" className="flex-1 sm:flex-initial">
                  <Button className="w-full px-8 py-6 bg-gold-500 text-black text-base font-bold rounded-xl shadow-xl shadow-gold-500/20 hover:bg-gold-600 transition flex items-center justify-center gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
              <ShieldCheck className="h-4 w-4 text-gold-500" />
              <span>Safe &amp; Secure Order Processing via WhatsApp</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
