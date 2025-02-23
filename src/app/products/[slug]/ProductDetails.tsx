// app/products/[slug]/ProductDetails.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BsWhatsapp } from 'react-icons/bs';
import { useCart } from '@/app/cart/CartContext';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

// Sanity Setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export default function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price || 0,
      image: product.image || '',
      quantity: 1,
    });
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          {product.image && (
            <Image
              src={builder.image(product.image).width(1200).height(1200).url()}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 dark:text-gold-500">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Rs.{product.price?.toFixed(2)}
          </p>
          {product.description && (
            <div className="prose max-w-none font-bold text-gray-600 dark:prose-dark">
              <p>{product.description}</p>
            </div>
          )}
          <Button onClick={handleAddToCart} className="w-full md:w-1/2 py-4 text-lg font-medium">
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-24 p-4 flex items-center justify-center gap-2">
        <BsWhatsapp className="h-10 w-10 text-green-500" />
        <p className="font-bold dark:text-white">
          For Cash on Delivery Contact On:
        </p>
        <Link
          href="https://wa.me/923073532413"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-green-500 hover:underline"
        >
          +923073532413
        </Link>
      </div>
    </section>
  );
}
