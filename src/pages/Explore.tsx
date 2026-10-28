import { useMemo, useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Film, Frown } from 'lucide-react';
import { movies, allGenres } from '@/data/movies';
import { useRouter } from '@/context/Router';
import MovieCard from '@/components/MovieCard';

export default function Explore() {
  const { route, navigate } = useRouter();
  const initialGenre = route.name === 'explore' ? route.genre || 'All' : 'All';
  const initialQuery = route.name === 'explore' ? route.q || '' : '';

  const [genre, setGenre] = useState(initialGenre);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<'rating' | 'title' | 'duration'>('rating');

  useEffect(() => {
    if (route.name === 'explore') {
      setGenre(route.genre || 'All');
      setQuery(route.q || '');
    }
  }, [route]);

  const filtered = useMemo(() => {
    let list = movies.filter((m) => {
      const matchesGenre = genre === 'All' || m.genres.includes(genre as never);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.genres.some((g: string) => g.toLowerCase().includes(q)) ||
        m.cast.some((c: string) => c.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'title') return a.title.localeCompare(b.title);
      const parse = (d: string) => {
        const h = Number(d.match(/(\d+)h/)?.[1] || 0) * 60;
        const m = Number(d.match(/(\d+)m/)?.[1] || 0);
        return h + m;
      };
      return parse(b.duration) - parse(a.duration);
    });
    return list;
  }, [genre, query, sort]);

  const pickGenre = (g: string) => {
    setGenre(g);
    navigate({ name: 'explore', genre: g === 'All' ? undefined : g, q: query || undefined });
  };

  return (
    <div className="container-x py-10">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-sm font-semibold text-blush-600">
          <Film className="h-4 w-4" /> Explore Movies
        </span>
        <h1 className="section-title mt-3">Find Your Perfect Film</h1>
        <p className="mx-auto mt-2 max-w-xl text-mauve-500">
          Search by title, mood, or cast — then filter by genre to discover your next favorite.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mauve-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, genres, cast, director…"
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {allGenres.map((g) => (
            <button
              key={g}
              onClick={() => pickGenre(g)}
              className={`chip border transition-all ${
                genre === g
                  ? 'border-transparent bg-rose-gradient text-white shadow-glow scale-105'
                  : 'border-blush-200 bg-white/70 text-plum-700 hover:border-blush-400 hover:bg-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-mauve-500">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-blush-200 bg-white/80 px-3 py-1.5 font-semibold text-plum-700 focus:outline-none focus:ring-2 focus:ring-blush-300/50"
          >
            <option value="rating">Top Rated</option>
            <option value="title">A → Z</option>
            <option value="duration">Longest</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 mb-4 text-center text-sm font-medium text-mauve-500">
        {filtered.length} {filtered.length === 1 ? 'film' : 'films'} found
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {filtered.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Frown className="h-12 w-12 text-mauve-300" />
          <p className="mt-4 font-serif text-xl font-bold text-plum-800">No films match your search</p>
          <p className="mt-1 text-sm text-mauve-500">Try a different genre or keyword.</p>
          <button
            onClick={() => { setQuery(''); setGenre('All'); navigate({ name: 'explore' }); }}
            className="btn-soft mt-5"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
