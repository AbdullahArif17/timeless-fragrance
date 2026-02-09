import Image from "next/image";
import { Separator } from '@/components/ui/separator';

export default function AboutUs() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-neutral-950 dark:to-black">
      <div className="container max-w-4xl">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-gold-500 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-muted-foreground dark:text-gold-500/80 text-lg">
          Welcome to Timeless Collections, where luxury meets style. We specialize in curating high-quality, unique collections ✨
          available all over Pakistan 🇵🇰♥️
          </p>
          <Separator className="h-[2px] dark:bg-gold-500/30" />
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-black text-lg">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold dark:text-gold-500">
              Heritage of Excellence
            </h2>
            <p className="text-muted-foreground dark:text-neutral-400 leading-relaxed">
              Founded with a passion for excellence, Timeless Collections embodies generations 
              of curated luxury. Our experts combine traditional craftsmanship
              with modern innovation to create collections that transcend time.
            </p>
          </div>

          <Separator className="my-8 dark:bg-gold-500/30" />

          {/* Philosophy & Sustainability */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 rounded-xl bg-white shadow-sm border border-neutral-200 dark:bg-neutral-900/50 dark:border dark:border-gold-500/20">
              <h3 className="font-heading text-xl font-semibold dark:text-gold-500">
                Our Philosophy
              </h3>
              <p className="text-muted-foreground dark:text-neutral-400">
                We believe in creating collections that tell stories, evoke emotions, 
                and become an intrinsic part of your identity.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-xl bg-white shadow-sm border border-neutral-200 dark:bg-neutral-900/50 dark:border dark:border-gold-500/20">
              <h3 className="font-heading text-xl font-semibold dark:text-gold-500">
                Sustainability
              </h3>
              <p className="text-muted-foreground dark:text-neutral-400">
                Committed to ethical sourcing and eco-friendly practices, we ensure 
                luxury never compromises our planet&apos;s wellbeing.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {[
              { src: "/passsionmobile.jpeg", alt: "passion collection" },
              { src: "/magicdreamsmobile.jpeg", alt: "magic collection" },
              { src: "/lovedropmobile.jpeg", alt: "love collection" },
              { src: "/justbeyoumobile.jpeg", alt: "just collection" },
              { src: "/floramobile.jpeg", alt: "flora collection" },
              { src: "/elegantmobile.jpeg", alt: "elegant collection" },
            ].map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group border dark:border-gold-500/20 hover:border-gold-500/50 transition-all"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-transparent transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}