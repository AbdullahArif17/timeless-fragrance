import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, ShieldCheck, Truck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-16 md:py-24">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                <Sparkles className="h-3.5 w-3.5 text-gold-500 animate-pulse" />
                Pure Luxury Artisanal Scents
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Crafted Elegance for <span className="text-gold-gradient">Every Moment</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover the art of luxury perfumery curated for the discerning individual. Experience long-lasting, sophisticated notes designed to leave an unforgettable impression.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto px-8 py-6 text-base font-bold bg-gold-500 text-black hover:bg-gold-600 dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5">
                    Explore Collections
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/about-us" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-base font-medium border-border hover:border-gold-500/50 hover:bg-accent transition-all duration-300">
                    Our Story
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-border/60 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <Truck className="h-5 w-5 text-gold-500 mb-1" />
                  <span className="text-xs font-bold text-foreground">Cash On Delivery</span>
                  <span className="text-[11px] text-muted-foreground">All Pakistan</span>
                </div>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <Clock className="h-5 w-5 text-gold-500 mb-1" />
                  <span className="text-xs font-bold text-foreground">Long Lasting</span>
                  <span className="text-[11px] text-muted-foreground">Premium Oils</span>
                </div>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <ShieldCheck className="h-5 w-5 text-gold-500 mb-1" />
                  <span className="text-xs font-bold text-foreground">100% Guaranteed</span>
                  <span className="text-[11px] text-muted-foreground">Original Blends</span>
                </div>
              </div>
            </div>

            {/* Hero Video / Media with floating frame */}
            <div className="flex-1 w-full relative">
              <HeroMedia />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Showcase */}
      <section className="relative py-16 md:py-24 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[65vh] md:h-[80vh] rounded-2xl overflow-hidden group border border-border dark:border-gold-500/30 shadow-2xl">
            <Image
              src="/all.jpeg"
              alt="Timeless Collections Showcase"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              quality={95}
              sizes="100vw"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col items-center justify-end text-center p-8 md:p-16">
              <span className="text-gold-400 font-semibold tracking-widest text-xs uppercase mb-2">
                Curated Luxury
              </span>
              <h2 className="mb-4 font-heading text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide">
                The Signature Fragrance Line
              </h2>
              <p className="text-neutral-300 max-w-lg mb-8 text-sm md:text-base font-light">
                From alluring floral tones to bold woody oriental accents, uncover a signature scent that tells your story.
              </p>
              <Link href="/products">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base font-bold bg-white text-black hover:bg-gold-500 hover:text-black dark:bg-gold-500 dark:text-black dark:hover:bg-gold-600 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  Shop The Entire Collection
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
