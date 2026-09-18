import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import ProductDetails from './ProductDetails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Fragrance Not Found | Timeless Collections',
      description: 'The requested fragrance could not be found.',
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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails
      product={{
        _id: product.id,
        name: product.name,
        price: Number(product.price),
        description: product.description || undefined,
        image: product.image,
        slug: { current: product.slug },
        hasDiscount: product.has_discount,
        discountPercent: Number(product.discount_percent),
        category: product.category_name ? { name: product.category_name, slug: product.category_name.toLowerCase() } : undefined,
      }}
    />
  );
}
