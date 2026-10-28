import { Star, Heart, Sparkles } from 'lucide-react';

export function FloatingAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Star className="absolute left-[8%] top-[18%] h-4 w-4 text-blush-200 animate-sparkle" fill="currentColor" />
      <Sparkles className="absolute right-[12%] top-[28%] h-5 w-5 text-lavender-200 animate-sparkle [animation-delay:0.8s]" />
      <Heart className="absolute left-[20%] bottom-[24%] h-3.5 w-3.5 text-rose-200 animate-sparkle [animation-delay:1.4s]" fill="currentColor" />
      <Star className="absolute right-[22%] bottom-[16%] h-3 w-3 text-blush-100 animate-sparkle [animation-delay:2s]" fill="currentColor" />
      <Sparkles className="absolute left-[45%] top-[12%] h-3.5 w-3.5 text-mauve-200 animate-sparkle [animation-delay:0.4s]" />
    </div>
  );
}

export function FilmStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-3 items-center justify-between gap-1 rounded-sm bg-plum-900 px-1 ${className}`}
      aria-hidden
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-[1px] bg-ivory/80" />
      ))}
    </div>
  );
}

export function RatingPill({ rating }: { rating: number }) {
  return (
    <span className="chip bg-plum-900/85 text-amber-300 backdrop-blur-sm">
      <Star className="h-3 w-3" fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}
