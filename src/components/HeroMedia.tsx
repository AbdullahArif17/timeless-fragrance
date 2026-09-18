import Image from "next/image";

export function HeroMedia() {
  return (
    <div className="relative max-w-[500px] w-full mx-auto group">
      {/* Decorative ambient gold glow background */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-500/30 via-gold-300/20 to-gold-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-pulse" />

      {/* Main Container */}
      <div
        className="relative rounded-2xl overflow-hidden bg-card border border-border dark:border-gold-500/30 
          shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-gold-500/10"
      >
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#f7f5f0] dark:bg-neutral-950">
          <Image
            src="/zaid logo.jpeg"
            alt="Timeless Fragrance Emblem"
            fill
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
