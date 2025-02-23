// app/products/[slug]/page.tsx
import { createClient } from '@sanity/client';
import { Suspense } from 'react';
import ProductDetails from './ProductDetails';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    slug,
    "image": image.asset->url
  }`;
  return client.fetch(query, { slug });
}

// PageProps Interface
interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductDetails product={product} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  return products.map((product: { slug: { current: any; }; }) => ({ slug: product.slug?.current || '' }));
}
