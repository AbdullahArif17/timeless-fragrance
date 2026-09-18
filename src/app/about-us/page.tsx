import { Metadata } from "next";
import Image from "next/image";
import { Separator } from '@/components/ui/separator';
import { Sparkles, Heart, Award, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: 'Our Story | Timeless Collections',
  description: 'Learn about Timeless Collections, our heritage of luxury, and commitment to excellence across Pakistan.',
};

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            The House of Timeless
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Our <span className="text-gold-gradient">Story</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Where enduring elegance meets master perfumery. We curate and craft luxurious fragrances for those who appreciate rare refinement.
          </p>

          <Separator className="h-[1px] max-w-xs mx-auto dark:bg-gold-500/30" />
        </div>

        {/* Narrative & Values */}
        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-500">Artisanal Roots</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                A Heritage of Excellence &amp; Uncompromised Purity
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                Founded with a deep passion for the transformative power of scents, Timeless Collections creates perfumes that linger in memory. Our perfumers meticulously blend high-concentration perfume oils with balanced notes to guarantee unmatched longevity and sillage.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light">
                Every bottle shipped across Pakistan carries the promise of luxury craftsmanship, packaged to perfection.
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/80 dark:border-gold-500/20 group">
              <Image
                src="/all.jpeg"
                alt="Timeless Perfumes Craftsmanship"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold">
                Curated Luxury Available All Over Pakistan 🇵🇰
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border/70 dark:border-gold-500/20 shadow-sm hover:border-gold-500/40 transition-all duration-300">
              <Award className="h-8 w-8 text-gold-500 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Master Formulation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Carefully calibrated top, heart, and base notes that evolve gracefully on your skin throughout the day.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/70 dark:border-gold-500/20 shadow-sm hover:border-gold-500/40 transition-all duration-300">
              <Leaf className="h-8 w-8 text-gold-500 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Ethical Sourcing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Cruelty-free, skin-safe ingredients sourced from top global fragrance houses with environmental mindfulness.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/70 dark:border-gold-500/20 shadow-sm hover:border-gold-500/40 transition-all duration-300">
              <Heart className="h-8 w-8 text-gold-500 mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Customer Devotion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Personalized customer support, prompt cash-on-delivery service, and total satisfaction commitment.
              </p>
            </div>
          </div>

          {/* Fragrance Gallery Grid */}
          <div className="pt-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-500">Visual Journey</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                The Essence of Our Collections
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/passsionmobile.jpeg", alt: "Passion Collection", name: "Passion" },
                { src: "/magicdreamsmobile.jpeg", alt: "Magic Dreams Collection", name: "Magic Dreams" },
                { src: "/lovedropmobile.jpeg", alt: "Love Drop Collection", name: "Love Drop" },
                { src: "/justbeyoumobile.jpeg", alt: "Just Be You Collection", name: "Just Be You" },
                { src: "/floramobile.jpeg", alt: "Flora Collection", name: "Flora" },
                { src: "/elegantmobile.jpeg", alt: "Elegant Collection", name: "Elegant" },
              ].map((image, index) => (
                <div 
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden group border border-border/70 dark:border-gold-500/20 hover:border-gold-500/60 transition-all duration-500 shadow-md hover:-translate-y-1"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-semibold tracking-wide">{image.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}