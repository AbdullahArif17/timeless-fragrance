// app/products/[slug]/page.tsx
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Define TypeScript interface for a product
interface SanityProduct {
  _id: string;
  name: string;
  price?: number;
  description?: string;
  productType?: string;
  image?: string;
  slug?: {
    current: string;
  };
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true
});

const builder = imageUrlBuilder(client);

// Function to fetch a product based on its slug
async function getProduct(slug: string): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    productType,
    slug,
    "image": image.asset->url
  }`;
  
  return client.fetch(query, { slug });
}

// Define the props for the page.
// To satisfy Next.js’ type constraint, we allow `params` to be either
// an object or a Promise that resolves to an object.
interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await params in case it's a promise (awaiting a plain object is fine)
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div className="container py-20 text-center">Product not found</div>;
  }

  return (
    <section className="py-20">
      <div className="container grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-muted/50 relative overflow-hidden rounded-lg">
          {product.image && (
            <Image
              src={builder.image(product.image).width(1200).height(1200).url()}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">
            ${product.price?.toFixed(2)}
          </p>

          {product.productType && (
            <p className="text-muted-foreground capitalize">
              {product.productType.replace('-', ' ')}
            </p>
          )}

          {product.description && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          <Button className="w-full md:w-1/2 py-6 text-lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}

// Generate static paths for dynamic routing
export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch<SanityProduct[]>(query);
  
  return products.map((product) => ({
    slug: product.slug?.current || '',
  }));
}
