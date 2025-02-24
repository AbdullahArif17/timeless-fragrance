"use client";

import { useCart } from "@/app/cart/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Build an order message with product details, using product name
  let orderMessage = "I would like to place an order:\n\n";
  cart.forEach((item) => {
	orderMessage += `Product: ${item.name}\nQuantity: ${item.quantity}\nUnit Price: Rs.${item.price.toFixed(2)}\nSubtotal: Rs.${(item.price * item.quantity).toFixed(2)}\n`;
	orderMessage += "-------------------------------------\n\n"; // Divider line for clarity
  });
  orderMessage += `Total: Rs.${totalPrice.toFixed(2)}`;
  orderMessage += `Total: Rs.${totalPrice.toFixed(2)}`;
  const encodedMessage = encodeURIComponent(orderMessage);
  // Replace with your WhatsApp number in international format (without spaces)
  const whatsappURL = `https://wa.me/+923073532413?text=${encodedMessage}`;

  return (
    <div className="container mx-auto py-8 px-4 bg-white dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Checkout
      </h1>
      {cart.length === 0 ? (
        <p className="text-xl">
          Your cart is empty.{" "}
          <Link href="/products" className="text-primary underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center border border-gray-300 dark:border-gray-700 p-4 rounded-md bg-white dark:bg-gray-800 gap-4"
              >
                {item.image && (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-center md:text-left text-gray-800 dark:text-gray-200">
                    {item.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.quantity} x Rs. {item.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-center md:justify-end">
            <p className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              Total: Rs. {totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="w-full mt-8 flex justify-center">
            <Link href={whatsappURL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="link"
                className="py-4 text-lg font-medium text-green-600 hover:underline"
              >
                Place Order via WhatsApp
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
