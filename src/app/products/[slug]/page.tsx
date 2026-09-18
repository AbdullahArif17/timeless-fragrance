import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
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
  category?: { name: string; slug: string };
}

async function getProduct(slug: string): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    slug,
    hasDiscount,
    discountPercent,
    "image": image.asset->url,
    category->{name, "slug": slug.current}
  }`;
  try {
    return await client.fetch<SanityProduct | null>(query, { slug });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Timeless Collections',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | Timeless Collections`,
    description: product.description || `Discover ${product.name} at Timeless Collections.`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
