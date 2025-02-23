// app/products/[slug]/page.tsx
import { createClient } from '@sanity/client';
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

// Allow params to be either a plain object or a Promise resolving to that object.
interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Resolve params in case it's a Promise.
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch<{ slug: { current: string } }[]>(query);
  return products.map((product) => ({
    slug: product.slug?.current || '',
  }));
}
