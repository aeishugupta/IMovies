import { Star, Clock, Heart } from 'lucide-react';
import type { Movie } from '@/types';
import { useRouter } from '@/context/Router';
import { RatingPill } from './Decorations';

export default function MovieCard({ movie, index = 0 }: { movie: Movie; index?: number }) {
  const { navigate } = useRouter();

  const open = () => navigate({ name: 'movie', id: movie.id });

  return (
    <article
      className="group relative cursor-pointer animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 80, 600)}ms` }}
      onClick={open}
    >
      <div className="relative overflow-hidden rounded-3xl shadow-card transition-all duration-500 group-hover:shadow-glow-lg group-hover:-translate-y-2">
        <div className="aspect-[2/3] w-full overflow-hidden bg-mauve-100">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        {/* top badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <RatingPill rating={movie.rating} />
          {movie.comingSoon && (
            <span className="chip bg-lavender-500/90 text-white backdrop-blur-sm">Coming Soon</span>
          )}
        </div>

        {/* heart accent */}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-blush-400/80">
          <Heart className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-125" fill="currentColor" />
        </span>

        {/* bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-serif text-lg font-bold leading-tight text-white drop-shadow-md">
            {movie.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs font-medium text-blush-100/90">{movie.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {movie.genres.slice(0, 2).map((g) => (
              <span key={g} className="chip bg-white/15 text-white backdrop-blur-sm">{g}</span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] font-medium text-ivory/80">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{movie.duration}</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-300" fill="currentColor" />{movie.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* hover CTA */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[130%] rounded-2xl bg-rose-gradient py-2.5 text-center text-sm font-bold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View Details & Book
        </div>
      </div>
    </article>
  );
}
