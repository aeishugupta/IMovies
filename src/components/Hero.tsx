import { useState, useEffect } from 'react';
import { Sparkles, Ticket, Film, Star, Heart } from 'lucide-react';
import { useRouter } from '@/context/Router';
import { featuredMovies } from '@/data/movies';
import { FloatingAccents } from './Decorations';

export default function Hero() {
  const { navigate } = useRouter();
  const [active, setActive] = useState(0);
  const slides = featuredMovies.slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const movie = slides[active];

  return (
    <section className="relative overflow-hidden bg-plum-950">
      {/* Backdrop images */}
      {slides.map((m, i) => (
        <div
          key={m.id}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <img src={m.backdrops[0]} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/70 to-plum-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-plum-950/90 via-plum-950/40 to-transparent" />
        </div>
      ))}

      <FloatingAccents />

      <div className="container-x relative flex min-h-[88vh] flex-col justify-center py-20">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blush-300/30 bg-white/5 px-4 py-2 text-sm font-medium text-blush-200 backdrop-blur-md animate-fade-in">
            <Sparkles className="h-4 w-4 text-blush-300" />
            Now showing in dreamy cinemas near you
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] text-white drop-shadow-lg sm:text-5xl lg:text-6xl animate-fade-up">
            Your Next Favorite
            <br />
            <span className="text-gradient-romance">Movie Awaits</span>
            <Sparkles className="ml-3 inline h-8 w-8 text-blush-300 animate-sparkle lg:h-10 lg:w-10" />
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg animate-fade-up [animation-delay:120ms]">
            Slip into velvet seats, soft pink lighting, and stories that linger. IMovies makes
            every film night feel like a little celebration — discover, choose your seat, and let
            the magic begin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
            <button onClick={() => navigate({ name: 'explore' })} className="btn-primary text-base">
              <Film className="h-5 w-5" /> Explore Movies
            </button>
            <button
              onClick={() => navigate({ name: 'movie', id: movie.id })}
              className="btn-ghost text-base text-white border-white/30 bg-white/10 hover:bg-white/20"
            >
              <Ticket className="h-5 w-5" /> Book Tickets
            </button>
          </div>

          {/* Slide indicators */}
          <div className="mt-10 flex items-center gap-4 animate-fade-in [animation-delay:400ms]">
            <div className="flex gap-2">
              {slides.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-blush-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-ivory/70">
              <Star className="h-4 w-4 text-amber-300" fill="currentColor" />
              <span className="font-semibold text-white">{movie.rating.toFixed(1)}</span>
              <span className="text-ivory/50">·</span>
              <span>{movie.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* film strip bottom */}
      <div className="absolute inset-x-0 bottom-0 h-3 flex items-center justify-between gap-1 bg-plum-950 px-2 opacity-60">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-[1px] bg-ivory/60" />
        ))}
      </div>

      {/* heart accent */}
      <Heart className="absolute right-[6%] top-[22%] h-6 w-6 text-blush-400/40 animate-float" fill="currentColor" />
    </section>
  );
}
