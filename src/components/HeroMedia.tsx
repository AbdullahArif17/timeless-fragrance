"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroMedia() {
  const [hasVideoError, setHasVideoError] = useState(false);

  return (
    <div className="relative max-w-[500px] w-full mx-auto group">
      {/* Decorative ambient gold glow background */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-500/30 via-gold-300/20 to-gold-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-pulse" />

      {/* Main Container */}
      <div
        className="relative rounded-2xl overflow-hidden bg-card border border-border dark:border-gold-500/30 
          shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-gold-500/10"
      >
        {!hasVideoError ? (
          <video
            src="/promo.mp4"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasVideoError(true)}
            className="w-full h-[460px] sm:h-[580px] object-cover rounded-2xl"
          />
        ) : (
          <Image
            src="/zaid logo.jpeg"
            alt="Timeless Fragrance Emblem"
            width={500}
            height={600}
            className="w-full aspect-square h-[460px] sm:h-[580px] object-cover rounded-2xl"
            priority
          />
        )}

        {/* Glass reflection badge on video */}
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-white text-xs">
          <span className="font-semibold tracking-wider text-gold-300">Timeless Signature</span>
          <span className="text-neutral-300 text-[11px]">Handcrafted 50ml EDP</span>
        </div>
      </div>
    </div>
  );
}
