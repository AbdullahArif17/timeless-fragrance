import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interfaces
interface SanitySlug {
  current: string;
}

interface SanityProduct {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  slug?: SanitySlug;
  image?: string;
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// Fetch products with TypeScript return type
async function getProducts(): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] {
    _id,
    name,
    description,
    price,
    slug,
    "image": image.asset->url
  }`;
  const products: SanityProduct[] = await client.fetch(query);
  console.log("Fetched products:", products);
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    console.warn("No products found. Check your Sanity dataset and query.");
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl font-bold text-gray-800 dark:text-gold-500 mb-12 text-center">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: SanityProduct) => (
            <Card
              key={product._id}
              className="group overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.image && (
                    <Image
                      src={builder
                        .image(product.image)
                        .width(600)
                        .height(600)
                        .url()}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-heading text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                  {product.name}
                </CardTitle>
                {product.description && (
                  <p className="mt-2 text-sm text-gray-500 font-bold dark:text-gray-400 capitalize">
                    {product.description.replace("-", " ")}
                  </p>
                )}
                {product.price !== undefined && (
                  <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Rs.{product.price.toFixed(2)}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border bg-slate-200 border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500/20 transition-colors"
                  asChild
                >
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

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch<SanityProduct[]>(query);
  return products.map((product) => ({
    slug: product.slug?.current || "",
  }));
}
