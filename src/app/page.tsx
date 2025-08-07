"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Check date: only show video until 14 August (inclusive)
    const today = new Date();
    const endDate = new Date("2025-08-14T23:59:59");
    if (today <= endDate) {
      setShowVideo(true);
    }
  }, []);

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h1 className="mt-6 p-2 font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-white dark:bg-black text-gold-500">
                Crafted Elegance in Every Drop
              </h1>
              <p className="text-lg text-muted-foreground dark:text-neutral-400 max-w-prose">
                Discover the art of luxury fragrances curated for the discerning
                individual. Experience timeless scents that define sophistication.
              </p>
              <Link href="/products">
                <Button className="group mt-8 px-8 py-6 text-lg dark:bg-gold-500 dark:text-black text-gold-500 dark:hover:bg-gold-600 transition-colors">
                  Explore Collection
                  <ChevronRight className="animate-bounce ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 dark:text-black" />
                </Button>
              </Link>
            </div>

            {/* Video or Logo */}
            <div
              className="flex-1 relative max-w-[500px] mx-auto rounded-lg 
                shadow-xl dark:shadow-gold-500/20 
                overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              {showVideo ? (
                <video
                  src="/promo.mp4" // Make sure this file exists in the /public directory
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[600px] rounded-lg"
                />
              ) : (
                <Image
                  src="/logo.jpeg"
                  alt="Luxury perfume logo"
                  width={500}
                  height={600}
                  className="w-full aspect-square h-[600px] object-cover rounded-lg"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="relative py-12 md:py-20 dark:bg-black/50">
        <div className="relative w-full h-[80vh] md:h-[90vh] rounded-xl overflow-hidden group border dark:border-gold-500/30">
          <Image
            src="/all.jpeg"
            alt="Perfume collection"
            fill
            className="object-fit object-center transition-transform duration-500 group-hover:scale-105"
            quality={100}
            sizes="100vw"
          />
          {/* Centered Overlay */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h2 className="mb-6 font-heading text-3xl sm:text-4xl md:text-5xl text-white">
              New Collections
            </h2>
            <Link href="/products" className="z-10">
              <Button
                size="lg"
                className="px-6 py-4 md:px-8 md:py-6 text-base md:text-lg bg-background text-foreground hover:bg-primary hover:text-background dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 transition-colors"
              >
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
