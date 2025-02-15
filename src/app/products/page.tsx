import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import Image from 'next/image';
import Link from 'next/link';

// Define TypeScript interfaces
interface SanitySlug {
  current: string;
}

interface SanityProduct {
  _id: string;
  name: string;
  productType?: string;
  price?: number;
  slug?: SanitySlug;
  image?: string;
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true
});

const builder = imageUrlBuilder(client);

// Fetch products with TypeScript return type
async function getProducts(): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] {
    _id,
    name,
    productType,
    price,
    slug,
    "image": image.asset->url
  }`;
  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="font-heading text-4xl font-bold text-black mb-12 text-center  dark:text-gold-500">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: SanityProduct) => (
            <Card 
              key={product._id} 
              className="group overflow-hidden transition-shadow hover:shadow-lg hover:scale-[1.02] duration-300"
            >
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted/50 relative overflow-hidden">
                  {product.image && (
                    <Image
                      src={builder.image(product.image).width(600).height(600).url()}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-heading text-xl">{product.name}</CardTitle>
                <p className="text-muted-foreground mt-2 capitalize">
                  {product.productType?.replace('-', ' ')}
                </p>
                <p className="text-lg font-semibold mt-4">
                  ${product.price?.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/products/${product.slug?.current}`}>
                    View Product
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}