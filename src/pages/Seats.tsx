import { useState, useMemo } from 'react';
import { ChevronLeft, Ticket, Armchair, Check, X } from 'lucide-react';
import { getMovie } from '@/data/movies';
import { useRouter } from '@/context/Router';
import { useApp } from '@/context/AppContext';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = 12;
const PREMIUM_ROWS = ['F', 'G', 'H'];

// deterministic "booked" seats per movie
function bookedFor(movieId: string): Set<string> {
  const set = new Set<string>();
  let h = 0;
  for (let i = 0; i < movieId.length; i++) h = (h * 31 + movieId.charCodeAt(i)) >>> 0;
  for (let i = 0; i < 18; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const row = ROWS[h % ROWS.length];
    const col = (h >> 4) % COLS;
    set.add(`${row}${col + 1}`);
  }
  return set;
}

export default function Seats() {
  const { route, navigate } = useRouter();
  const { addBooking } = useApp();
  const movie = route.name === 'seats' ? getMovie(route.id) : undefined;

  const [selected, setSelected] = useState<string[]>([]);
  const booked = useMemo(() => (movie ? bookedFor(movie.id) : new Set<string>()), [movie]);

  if (!movie || route.name !== 'seats') {
    return (
      <div className="container-x py-20 text-center">
        <p className="font-serif text-2xl font-bold text-plum-800">Showtime not found</p>
        <button onClick={() => navigate({ name: 'explore' })} className="btn-primary mt-5">Browse Movies</button>
      </div>
    );
  }

  const unitPrice = route.price;
  const isPremium = (seat: string) => PREMIUM_ROWS.includes(seat[0]);
  const seatPrice = (seat: string) => unitPrice + (isPremium(seat) ? 80 : 0);
  const total = selected.reduce((s, seat) => s + seatPrice(seat), 0);
  const convenience = selected.length > 0 ? Math.round(total * 0.04) : 0;
  const grandTotal = total + convenience;

  const toggle = (seat: string) => {
    if (booked.has(seat)) return;
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat].sort()
    );
  };

  const confirm = () => {
    if (selected.length === 0) return;
    const booking = {
      id: `bk_${Date.now()}`,
      movieId: movie.id,
      movieTitle: movie.title,
      poster: movie.poster,
      date: route.date,
      time: route.time,
      format: route.format,
      seats: [...selected].sort(),
      total: grandTotal,
      ref: `IMV-${Math.random().toString(36).slice(2, 7).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
      createdAt: Date.now(),
    };
    addBooking(booking);
    navigate({ name: 'confirmation', bookingId: booking.id });
  };

  return (
    <div className="container-x py-8">
      <button
        onClick={() => navigate({ name: 'movie', id: movie.id })}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-plum-700 backdrop-blur transition-all hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" /> Back to {movie.title}
      </button>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Seat map */}
        <div className="rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur sm:p-8">
          <h1 className="font-serif text-2xl font-bold text-plum-900">Choose Your Seats</h1>
          <p className="mt-1 text-sm text-mauve-500">{movie.title} · {route.date} · {route.time}</p>

          {/* Screen */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative h-2 w-3/4 rounded-full bg-rose-gradient shadow-glow" />
            <div className="mt-1 h-8 w-3/4 rounded-b-[100%] bg-gradient-to-b from-blush-300/40 to-transparent" />
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-mauve-400">Screen</p>
          </div>

          {/* Seats */}
          <div className="mt-8 overflow-x-auto">
            <div className="mx-auto w-fit space-y-2.5">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <span className="w-5 text-center text-xs font-bold text-mauve-400">{row}</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: COLS }).map((_, i) => {
                      const seat = `${row}${i + 1}`;
                      const isBooked = booked.has(seat);
                      const isSelected = selected.includes(seat);
                      const premium = isPremium(seat);
                      return (
                        <button
                          key={seat}
                          onClick={() => toggle(seat)}
                          disabled={isBooked}
                          aria-label={`Seat ${seat}`}
                          className={`relative flex h-7 w-7 items-center justify-center rounded-md transition-all sm:h-8 sm:w-8 ${
                            isBooked
                              ? 'cursor-not-allowed bg-mauve-200 text-mauve-400'
                              : isSelected
                              ? 'bg-rose-gradient text-white shadow-glow scale-110'
                              : premium
                              ? 'bg-lavender-100 text-lavender-600 hover:bg-lavender-200 hover:scale-105'
                              : 'bg-blush-100 text-blush-500 hover:bg-blush-200 hover:scale-105'
                          }`}
                        >
                          <Armchair className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      );
                    })}
                  </div>
                  <span className="w-5 text-center text-xs font-bold text-mauve-400">{row}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs font-medium text-plum-600">
            <Legend color="bg-blush-100" label="Available" />
            <Legend color="bg-lavender-100" label="Premium (+₹80)" />
            <Legend color="bg-rose-gradient" label="Selected" />
            <Legend color="bg-mauve-200" label="Booked" />
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur">
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-plum-900">
              <Ticket className="h-5 w-5 text-blush-500" /> Booking Summary
            </h2>

            <div className="mt-4 flex gap-4">
              <img src={movie.poster} alt={movie.title} className="h-28 w-20 rounded-xl object-cover shadow-soft" />
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-plum-900">{movie.title}</h3>
                <p className="mt-1 text-sm text-mauve-500">{route.date}</p>
                <p className="text-sm text-mauve-500">{route.time} · {route.format}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-blush-100 pt-4">
              <p className="text-sm font-semibold text-plum-700">Selected Seats</p>
              {selected.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selected.map((s) => (
                    <span key={s} className="chip bg-blush-100 text-blush-600">
                      <Check className="h-3 w-3" /> {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-mauve-400">
                  <X className="h-4 w-4" /> No seats selected yet
                </p>
              )}
            </div>

            {selected.length > 0 && (
              <div className="mt-5 space-y-2 border-t border-blush-100 pt-4 text-sm">
                <Row label={`Tickets (${selected.length})`} value={`₹${total}`} />
                <Row label="Convenience fee" value={`₹${convenience}`} />
                <div className="flex items-center justify-between border-t border-blush-100 pt-3">
                  <span className="font-serif text-lg font-bold text-plum-900">Total</span>
                  <span className="font-serif text-xl font-bold text-blush-600">₹{grandTotal}</span>
                </div>
              </div>
            )}

            <button
              onClick={confirm}
              disabled={selected.length === 0}
              className={`mt-6 w-full rounded-full px-7 py-3.5 text-base font-bold transition-all ${
                selected.length === 0
                  ? 'cursor-not-allowed bg-mauve-100 text-mauve-400'
                  : 'btn-primary'
              }`}
            >
              {selected.length === 0 ? 'Select seats to continue' : `Confirm Booking · ₹${grandTotal}`}
            </button>
            <p className="mt-3 text-center text-xs text-mauve-400">Demo booking — no payment required</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${color}`} />
      {label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-plum-700">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
