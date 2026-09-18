"use client";

import { useCart } from "@/app/cart/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function CheckoutPage() {
  const { cart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Build an order message with product details
  let orderMessage = "Salam! I would like to place an order with Timeless Collections:\n\n";
  cart.forEach((item, index) => {
    orderMessage += `${index + 1}. ${item.name}\n   Qty: ${item.quantity} | Price: Rs. ${item.price.toFixed(2)} | Subtotal: Rs. ${(item.price * item.quantity).toFixed(2)}\n`;
  });
  orderMessage += `\n-------------------------------------\nGrand Total: Rs. ${totalPrice.toFixed(2)}\nPayment Mode: Cash On Delivery (Free Shipping)\n-------------------------------------\nPlease confirm delivery address & delivery time.`;

  const encodedMessage = encodeURIComponent(orderMessage);
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 min-h-[80vh] max-w-4xl">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Bag
        </Link>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Complete Your <span className="text-gold-gradient">Order</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your order details below and connect with us on WhatsApp for fast COD confirmation.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-border/80 bg-card/40 max-w-md mx-auto space-y-4">
          <p className="text-xl font-bold text-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">Add some luxury fragrances to proceed to checkout.</p>
          <Link href="/products">
            <Button className="mt-2 bg-gold-500 text-black hover:bg-gold-600 font-bold rounded-xl shadow-lg">
              Browse Collections
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Items List (Left 3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Order Items ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border border-border/80 dark:border-gold-500/20 p-3.5 rounded-xl bg-card gap-4 shadow-sm"
                >
                  {item.image && (
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground text-base">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × Rs. {item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground text-base">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-xs space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>How WhatsApp Checkout Works</span>
              </div>
              <p>
                Clicking the button will open WhatsApp with your order items pre-formatted. Simply send the message and share your delivery address with our representative.
              </p>
            </div>
          </div>

          {/* Order Summary & WhatsApp CTA (Right 2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/80 dark:border-gold-500/30 shadow-xl space-y-5">
              <h2 className="font-heading text-xl font-bold text-foreground">Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Delivery</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">FREE (COD)</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg text-foreground">
                  <span>Total Payable</span>
                  <span className="text-gold-500 text-xl font-bold">Rs. {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={whatsappURL} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button
                    size="lg"
                    className="w-full py-7 text-base font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-xl shadow-green-600/25 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <BsWhatsapp className="h-5 w-5" />
                    Place Order via WhatsApp
                  </Button>
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-gold-500" />
                  Free COD Pakistan
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
                  Verified Store
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
