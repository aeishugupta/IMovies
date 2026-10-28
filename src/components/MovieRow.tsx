import type { Movie } from '@/types';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';
import { useRouter } from '@/context/Router';

export default function MovieRow({
  title,
  subtitle,
  movies,
  icon,
  exploreGenre,
}: {
  title: string;
  subtitle?: string;
  movies: Movie[];
  icon?: React.ReactNode;
  exploreGenre?: string;
}) {
  const { navigate } = useRouter();
  if (movies.length === 0) return null;

  return (
    <section className="container-x mt-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="section-title flex items-center gap-2">
            {icon}
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-mauve-500">{subtitle}</p>}
        </div>
        {exploreGenre && (
          <button
            onClick={() => navigate({ name: 'explore', genre: exploreGenre })}
            className="group flex items-center gap-1 text-sm font-semibold text-blush-600 transition-all hover:gap-2"
          >
            View all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {movies.map((m, i) => (
          <MovieCard key={m.id} movie={m} index={i} />
        ))}
      </div>
    </section>
  );
}
