import { Flame, Heart, Smile, CalendarClock, Film } from 'lucide-react';
import Hero from '@/components/Hero';
import Featured from '@/components/Featured';
import MovieRow from '@/components/MovieRow';
import { useRouter } from '@/context/Router';
import { trendingMovies, romanticMovies, feelGoodMovies, comingSoonMovies } from '@/data/movies';

export default function Home() {
  const { navigate } = useRouter();

  return (
    <div>
      <Hero />
      <Featured />

      <MovieRow
        title="Trending Now"
        subtitle="The films everyone is whispering about"
        movies={trendingMovies}
        icon={<Flame className="h-7 w-7 text-blush-500" />}
        exploreGenre=""
      />

      {/* Promo strip */}
      <section className="container-x mt-16">
        <div className="relative overflow-hidden rounded-3xl bg-romance bg-[length:200%_200%] p-8 text-center shadow-card animate-gradient-x sm:p-12">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold text-white drop-shadow sm:text-4xl">
              Every Tuesday is Date Night
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              Two tickets, one shared popcorn, and a story worth staying for. Bring someone you
              love — we'll handle the mood lighting.
            </p>
            <button
              onClick={() => navigate({ name: 'explore', genre: 'Romance' })}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-plum-800 shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Heart className="h-5 w-5 text-blush-500" fill="currentColor" /> Browse Romantic Picks
            </button>
          </div>
        </div>
      </section>

      <MovieRow
        title="Romantic Picks"
        subtitle="Love stories that glow"
        movies={romanticMovies}
        icon={<Heart className="h-7 w-7 text-rose-400" fill="currentColor" />}
        exploreGenre="Romance"
      />

      <MovieRow
        title="Feel-Good Favorites"
        subtitle="Warm, witty, and wonderful"
        movies={feelGoodMovies}
        icon={<Smile className="h-7 w-7 text-lavender-500" />}
        exploreGenre="Feel-Good"
      />

      <MovieRow
        title="Coming Soon"
        subtitle="Soon to light up your screen"
        movies={comingSoonMovies}
        icon={<CalendarClock className="h-7 w-7 text-mauve-500" />}
        exploreGenre=""
      />

      {/* CTA strip */}
      <section className="container-x mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-plum-gradient p-10 text-center shadow-card sm:p-14">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blush-500/20 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-lavender-600/20 blur-2xl" />
          <Film className="mx-auto h-10 w-10 text-blush-300" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready for Your Movie Night?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ivory/70">
            Browse the full collection, pick your favorites, and reserve the perfect seats in just
            a few taps.
          </p>
          <button
            onClick={() => navigate({ name: 'explore' })}
            className="btn-primary mt-6 text-base"
          >
            <Film className="h-5 w-5" /> Explore All Movies
          </button>
        </div>
      </section>
    </div>
  );
}
