// app/products/[slug]/page.tsx
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
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

export default async function ProductPage({ params }: { params: { slug: string } }) {
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
    <ProductDetails product={product} />
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch<{ slug: { current: string } }[]>(query);
  return products.map((product) => ({
    slug: product.slug?.current || '',
  }));
}
