import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* First Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight dark:text-gold-500">
                Crafted Elegance in Every Drop
              </h1>
              <p className="text-lg text-muted-foreground dark:text-neutral-400 max-w-prose">
                Discover the art of luxury fragrances curated for the discerning
                individual. Experience timeless scents that define
                sophistication.
              </p>
              <Link href="/products">
                <Button className="group mt-8 px-8 py-6 text-lg dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 transition-all">
                  Explore Collection
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 dark:text-black" />
                </Button>
              </Link>
            </div>

            {/* Logo Image */}
            <div
              className="flex-1 relative max-w-[500px] mx-auto rounded-lg 
  shadow-xl dark:shadow-gold-500/20 border dark:border-gold-500/30 
  overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/logo.jpeg"
                alt="Luxury perfume logo"
                width={500}
                height={600}
                className="w-full aspect-square h-[600px] object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-12 md:py-20 dark:bg-black/50">
        <div className="container">
          <div
            className="relative mt-10 aspect-square md:aspect-video rounded-xl overflow-hidden group 
            border dark:border-gold-500/30"
          >
            <Image
              src="/all.jpeg"
              alt="Perfume collection"
              fill
              className="object-fit object-center w-full transition-transform duration-500 group-hover:scale-105"
              quality={100}
              sizes="100vw"
            />

            {/* Centered Shop Now Button */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center">
              <Link href="/products" className="z-10">
                <Button
                  size="lg"
                  className="text-base mt-56 md:mt-[500px] md:text-lg bg-background text-foreground hover:bg-primary hover:text-background 
                  dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 px-6 py-4 md:px-8 md:py-6"
                >
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
