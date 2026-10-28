import { useState, useEffect } from 'react';
import { Sparkles, Star, Clock, Ticket } from 'lucide-react';
import { featuredMovies } from '@/data/movies';
import { useRouter } from '@/context/Router';
import { FloatingAccents } from './Decorations';

export default function Featured() {
  const { navigate } = useRouter();
  const [active, setActive] = useState(0);
  const slides = featuredMovies;
  const movie = slides[active];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="container-x mt-16">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-sm font-semibold text-blush-600">
          <Sparkles className="h-4 w-4" /> Featured This Week
        </span>
        <h2 className="section-title mt-3">Cinematic Gems, Handpicked</h2>
      </div>

      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Big showcase */}
        <div className="relative overflow-hidden rounded-3xl shadow-card min-h-[420px] sm:min-h-[480px]">
          {slides.map((m, i) => (
            <div
              key={m.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <img src={m.poster} alt={m.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/95 via-plum-900/30 to-transparent" />
            </div>
          ))}

          <FloatingAccents />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g: string) => (
                <span key={g} className="chip bg-white/15 text-white backdrop-blur-sm">{g}</span>
              ))}
            </div>
            <h3 className="mt-3 font-serif text-3xl font-bold text-white drop-shadow sm:text-4xl">{movie.title}</h3>
            <p className="mt-1 text-sm text-blush-100/90">{movie.tagline}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-ivory/80">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-300" fill="currentColor" />{movie.rating.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{movie.duration}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{movie.certificate}</span>
            </div>
            <button
              onClick={() => navigate({ name: 'movie', id: movie.id })}
              className="btn-primary mt-5"
            >
              <Ticket className="h-4 w-4" /> Book Now
            </button>
          </div>
        </div>

        {/* Thumbnail selector */}
        <div className="flex flex-col gap-3">
          {slides.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-3 text-left transition-all duration-300 ${
                i === active
                  ? 'bg-white shadow-card ring-2 ring-blush-300'
                  : 'bg-white/60 hover:bg-white/90'
              }`}
            >
              <img src={m.poster} alt={m.title} className="h-20 w-16 flex-shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-serif text-lg font-bold text-plum-900">{m.title}</h4>
                <p className="truncate text-xs text-mauve-500">{m.tagline}</p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-plum-600">
                  <Star className="h-3 w-3 text-amber-500" fill="currentColor" />
                  <span className="font-semibold">{m.rating.toFixed(1)}</span>
                  <span className="text-mauve-300">·</span>
                  <span>{m.genres[0]}</span>
                </div>
              </div>
              <Sparkles className={`h-4 w-4 flex-shrink-0 transition-all ${i === active ? 'text-blush-500' : 'text-mauve-200'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
