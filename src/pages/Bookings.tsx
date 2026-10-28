import { Ticket, Calendar, Clock, Film, Trash2, Heart, Sparkles } from 'lucide-react';
import { useRouter } from '@/context/Router';
import { useApp } from '@/context/AppContext';

export default function Bookings() {
  const { navigate } = useRouter();
  const { bookings, removeBooking } = useApp();

  return (
    <div className="container-x py-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-sm font-semibold text-blush-600">
          <Ticket className="h-4 w-4" /> My Bookings
        </span>
        <h1 className="section-title mt-3">Your Movie Nights</h1>
        <p className="mx-auto mt-2 max-w-lg text-mauve-500">
          All your saved bookings live here — they stay even after you refresh the page.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-3xl bg-white/80 p-10 text-center shadow-card backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush-100">
            <Heart className="h-8 w-8 text-blush-400" fill="currentColor" />
          </div>
          <h2 className="mt-4 font-serif text-xl font-bold text-plum-900">No bookings yet</h2>
          <p className="mt-2 text-sm text-mauve-500">
            Your confirmed tickets will appear here with a beautiful digital ticket for each one.
          </p>
          <button onClick={() => navigate({ name: 'explore' })} className="btn-primary mt-6">
            <Sparkles className="h-4 w-4" /> Explore Movies
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b, i) => (
            <article
              key={b.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 80, 400)}ms` }}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={b.poster} alt={b.movieTitle} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-white drop-shadow">{b.movieTitle}</h3>
                  <p className="text-xs text-blush-100/90">{b.format}</p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {b.ref}
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Mini icon={<Calendar className="h-3.5 w-3.5" />} label="Date" value={b.date} />
                  <Mini icon={<Clock className="h-3.5 w-3.5" />} label="Time" value={b.time} />
                  <Mini icon={<Ticket className="h-3.5 w-3.5" />} label="Seats" value={b.seats.join(', ')} />
                  <Mini icon={<Film className="h-3.5 w-3.5" />} label="Total" value={`₹${b.total}`} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-blush-100 pt-4">
                  <button
                    onClick={() => navigate({ name: 'confirmation', bookingId: b.id })}
                    className="text-sm font-semibold text-blush-600 transition-all hover:gap-1 hover:underline"
                  >
                    View Ticket →
                  </button>
                  <button
                    onClick={() => removeBooking(b.id)}
                    className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-all hover:bg-rose-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-mauve-400">{icon}{label}</p>
      <p className="mt-0.5 truncate font-semibold text-plum-900">{value}</p>
    </div>
  );
}
