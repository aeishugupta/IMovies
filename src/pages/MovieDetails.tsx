import { useState } from 'react';
import { Star, Clock, Calendar, Film, Ticket, ChevronLeft, Users, Sparkles, Heart } from 'lucide-react';
import { getMovie } from '@/data/movies';
import { useRouter } from '@/context/Router';
import { FloatingAccents, RatingPill } from '@/components/Decorations';

export default function MovieDetails() {
  const { route, navigate } = useRouter();
  const movie = route.name === 'movie' ? getMovie(route.id) : undefined;
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedShow, setSelectedShow] = useState(0);

  if (!movie) {
    return (
      <div className="container-x py-20 text-center">
        <p className="font-serif text-2xl font-bold text-plum-800">Movie not found</p>
        <button onClick={() => navigate({ name: 'explore' })} className="btn-primary mt-5">Browse Movies</button>
      </div>
    );
  }

  const today = new Date();
  const dates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      num: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  });

  const show = movie.showtimes[selectedShow];
  const chosenDate = dates[selectedDate];

  const goToSeats = () => {
    navigate({
      name: 'seats',
      id: movie.id,
      date: `${chosenDate.day}, ${chosenDate.num} ${chosenDate.month}`,
      time: show.time,
      format: show.format,
      price: show.price,
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Cinematic banner */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <img src={movie.backdrops[0]} alt={movie.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-plum-950/40 to-plum-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-950/60 to-transparent" />
        <FloatingAccents />
        <div className="container-x absolute inset-x-0 top-6 z-10">
          <button
            onClick={() => navigate({ name: 'explore' })}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/25"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Movies
          </button>
        </div>
      </section>

      <div className="container-x -mt-40 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Poster */}
          <div className="animate-fade-up">
            <div className="overflow-hidden rounded-3xl shadow-card ring-4 ring-white/60">
              <img src={movie.poster} alt={movie.title} className="aspect-[2/3] w-full object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-plum-700">
                <Users className="h-4 w-4 text-blush-500" /> Directed by
              </div>
              <span className="text-sm font-bold text-plum-900">{movie.director}</span>
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-plum-900 sm:text-4xl">{movie.title}</h1>
                  <p className="mt-1 italic text-mauve-500">{movie.tagline}</p>
                </div>
                <RatingPill rating={movie.rating} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres.map((g: string) => (
                  <span key={g} className="chip bg-blush-100 text-blush-600">{g}</span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium text-plum-700">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-blush-400" />{movie.duration}</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blush-400" />{movie.releaseDate}</span>
                <span className="flex items-center gap-2"><Film className="h-4 w-4 text-blush-400" />{movie.certificate}</span>
                <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-400" fill="currentColor" />{movie.rating.toFixed(1)}/10</span>
              </div>

              <p className="mt-6 leading-relaxed text-plum-800">{movie.description}</p>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-plum-900">
                  <Heart className="h-4 w-4 text-blush-400" fill="currentColor" /> Starring
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.cast.map((c: string) => (
                    <span key={c} className="chip bg-mauve-100 text-plum-700">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Showtimes */}
            <div className="mt-6 rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur sm:p-8">
              <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-plum-900">
                <Sparkles className="h-5 w-5 text-blush-500" /> Select a Showtime
              </h3>

              {/* Dates */}
              <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">
                {dates.map((d, i) => (
                  <button
                    key={d.key}
                    onClick={() => setSelectedDate(i)}
                    className={`flex flex-col items-center rounded-2xl px-2 py-3 transition-all ${
                      selectedDate === i
                        ? 'bg-rose-gradient text-white shadow-glow scale-105'
                        : 'bg-blush-50 text-plum-700 hover:bg-blush-100'
                    }`}
                  >
                    <span className="text-xs font-semibold opacity-80">{i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.day}</span>
                    <span className="mt-0.5 text-lg font-bold">{d.num}</span>
                    <span className="text-[10px] opacity-80">{d.month}</span>
                  </button>
                ))}
              </div>

              {/* Showtime chips */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {movie.showtimes.map((s, i: number) => (
                  <button
                    key={s.time}
                    onClick={() => setSelectedShow(i)}
                    className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 transition-all ${
                      selectedShow === i
                        ? 'border-blush-400 bg-blush-50 shadow-glow'
                        : 'border-blush-100 bg-white/60 hover:border-blush-300'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-bold text-plum-900">{s.time}</p>
                      <p className="text-xs text-mauve-500">{s.format}</p>
                    </div>
                    <span className="font-serif text-lg font-bold text-blush-600">₹{s.price}</span>
                  </button>
                ))}
              </div>

              <button onClick={goToSeats} className="btn-primary mt-6 w-full text-base">
                <Ticket className="h-5 w-5" /> Choose Your Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
