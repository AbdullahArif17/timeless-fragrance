import { Sparkles } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-gold-400 border-b border-gold-500/30 py-2.5 px-4 text-xs sm:text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="h-4 w-4 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="tracking-widest uppercase font-semibold text-gold-300">
          Timeless Fragrance
        </span>
        <span className="text-neutral-500">•</span>
        <span className="text-neutral-200">
          Free Delivery Across Pakistan On All Luxury Collections
        </span>
        <Sparkles className="h-4 w-4 text-gold-400 animate-spin hidden sm:inline" style={{ animationDuration: '6s' }} />
      </div>
      {/* Subtle Shimmer line on top */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
    </div>
  );
}