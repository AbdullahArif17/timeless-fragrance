'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import ProductDetails from './ProductDetails';

interface SanityProduct {
  _id: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  slug?: { current: string };
  hasDiscount?: boolean;
  discountPercent?: number;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

async function getProduct(slug: string): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    slug,
    hasDiscount,
    discountPercent,
    "image": image.asset->url
  }`;
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<SanityProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getProduct(slug).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <div className="container py-20 text-center">
        <p className="text-3xl font-bold">Loading...</p>
      </div>
    );

  if (!product)
    return (
      <div className="container py-20 text-center">
        <p className="text-xl">Product not found</p>
      </div>
    );

  return <ProductDetails product={product} />;
}
