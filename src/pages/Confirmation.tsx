import { useEffect, useState } from 'react';
import { CheckCircle2, Ticket, Calendar, Clock, Film, Download, Home, Sparkles, Heart } from 'lucide-react';
import { useRouter } from '@/context/Router';
import { useApp } from '@/context/AppContext';
import { FloatingAccents } from '@/components/Decorations';
import type { Booking } from '@/types';

export default function Confirmation() {
  const { route, navigate } = useRouter();
  const { bookings } = useApp();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (route.name === 'confirmation') {
      const b = bookings.find((bk) => bk.id === route.bookingId) || null;
      setBooking(b);
    }
  }, [route, bookings]);

  if (!booking) {
    return (
      <div className="container-x py-20 text-center">
        <p className="font-serif text-2xl font-bold text-plum-800">Booking not found</p>
        <button onClick={() => navigate({ name: 'bookings' })} className="btn-primary mt-5">View My Bookings</button>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      {/* Success banner */}
      <div className="mx-auto max-w-2xl text-center animate-pop">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-gradient shadow-glow-lg animate-pulse-glow">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-5 font-serif text-3xl font-bold text-plum-900 sm:text-4xl">
          Your tickets are confirmed!
        </h1>
        <p className="mt-2 text-mauve-500">
          Get cozy — your movie night is all set. Present your digital ticket at the cinema entrance.
        </p>
      </div>

      {/* Digital ticket */}
      <div className="mx-auto mt-10 max-w-3xl animate-fade-up">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-card">
          <FloatingAccents />

          {/* Top: poster + details */}
          <div className="relative grid gap-0 sm:grid-cols-[200px_1fr]">
            <div className="relative h-48 overflow-hidden sm:h-full">
              <img src={booking.poster} alt={booking.movieTitle} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/60 to-transparent sm:bg-gradient-to-r" />
            </div>
            <div className="relative p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-100 px-3 py-1 text-xs font-bold text-blush-600">
                <Sparkles className="h-3 w-3" /> IMovies Digital Ticket
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-plum-900">{booking.movieTitle}</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <Detail icon={<Calendar className="h-4 w-4" />} label="Date" value={booking.date} />
                <Detail icon={<Clock className="h-4 w-4" />} label="Time" value={booking.time} />
                <Detail icon={<Film className="h-4 w-4" />} label="Format" value={booking.format} />
                <Detail icon={<Ticket className="h-4 w-4" />} label="Seats" value={booking.seats.join(', ')} />
              </div>
            </div>
          </div>

          {/* Notch divider */}
          <div className="relative flex items-center">
            <span className="absolute -left-4 h-8 w-8 rounded-full bg-ivory" />
            <div className="flex-1 border-t-2 border-dashed border-blush-200" />
            <span className="absolute -right-4 h-8 w-8 rounded-full bg-ivory" />
          </div>

          {/* Bottom: QR + ref */}
          <div className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-mauve-400">Booking Reference</p>
              <p className="mt-1 font-serif text-2xl font-bold text-gradient-romance">{booking.ref}</p>
              <p className="mt-2 text-sm text-plum-700">
                <Heart className="mr-1 inline h-3.5 w-3.5 text-blush-400" fill="currentColor" />
                {booking.seats.length} {booking.seats.length === 1 ? 'seat' : 'seats'} · Total ₹{booking.total}
              </p>
            </div>

            {/* QR-style visual */}
            <div className="flex flex-col items-center">
              <div className="relative rounded-2xl bg-white p-3 shadow-soft ring-1 ring-blush-200">
                <QRCode seed={booking.ref} />
              </div>
              <p className="mt-2 text-xs font-medium text-mauve-400">Scan at entrance</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate({ name: 'bookings' })} className="btn-primary">
            <Ticket className="h-4 w-4" /> View My Bookings
          </button>
          <button onClick={() => window.print()} className="btn-ghost">
            <Download className="h-4 w-4" /> Save / Print
          </button>
          <button onClick={() => navigate({ name: 'home' })} className="btn-ghost">
            <Home className="h-4 w-4" /> Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mauve-400">{icon}{label}</p>
      <p className="mt-0.5 font-semibold text-plum-900">{value}</p>
    </div>
  );
}

// Pseudo-QR: deterministic grid from a seed string
function QRCode({ seed }: { seed: string }) {
  const size = 9;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  // corner finder patterns
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 3 && c >= bc && c < bc + 3;
    return inBox(0, 0) || inBox(0, size - 3) || inBox(size - 3, 0);
  };
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {cells.map((on, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        const filled = isFinder(r, c) ? true : on;
        return (
          <span
            key={i}
            className={`h-3 w-3 rounded-[1px] ${filled ? 'bg-plum-900' : 'bg-transparent'}`}
          />
        );
      })}
    </div>
  );
}
