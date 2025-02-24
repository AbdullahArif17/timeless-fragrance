"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total: number, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-primary dark:text-myLightOrange mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-2xl text-gray-700 dark:text-gray-300 text-center font-semibold">
          Your Cart is Empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-6"
            >
              <Image
                src={urlFor(item.image).url()}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {item.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Rs. {item.price.toFixed(2)} x {item.quantity}
                </p>
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  Total: Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    item.quantity > 1 &&
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-3 py-1 border rounded-md text-lg font-semibold text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    item.quantity < 5 &&
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-3 py-1 border rounded-md text-lg font-semibold text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={item.quantity >= 5}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="text-center font-bold text-2xl mt-24 text-gray-900 dark:text-white">
            Total: Rs. {calculateTotal().toFixed(2)}
          </div>

          {/* Checkout Button */}
          <div className="flex justify-center">
            <Link href={"/checkout"}>
            <Button className="px-6 py-3 bg-myDarkOrange text-black dark:text-white text-lg font-semibold rounded-lg shadow-md hover:bg-myLightOrange transition">
              Proceed to Checkout
            </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
