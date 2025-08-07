import { createClient } from "@sanity/client";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price?: number;
  description?: string;
  image?: string;
  hasDiscount?: boolean;
  discountPercent?: number;
}

// Set useCdn to false during development if needed
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false, // change to true in production if desired
});

export default async function ProductsPage() {
  const groq = `*[_type=="product"]{
    _id,
    name,
    slug,
    price,
    description,
    hasDiscount,
    discountPercent,
    "image": image.asset->url
  }[0...10]`;
  let products: Product[] = [];

  try {
    products = await client.fetch<Product[]>(groq);
    console.log("Fetched products:", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-4xl md:text-5xl text-center font-bold mb-4 bg-gradient-to-r from-primary to-gold-500 dark:text-gold-500 bg-clip-text text-transparent">
        Our Products
      </h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product._id}
              className="group overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.image && (
                    <Image
                      src={product.image}
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
                  <div className="mt-4">
                    {product.hasDiscount && product.discountPercent ? (
                      <>
                        <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                          Rs. {product.price.toFixed(2)}
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          Rs.{" "}
                          {(
                            product.price *
                            (1 - product.discountPercent / 100)
                          ).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Rs. {product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border bg-slate-200 border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500/20 transition-colors"
                  asChild
                >
                  <Link href={`/products/${product.slug.current}`}>
                    View Product
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
