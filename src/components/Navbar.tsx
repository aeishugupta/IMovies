import { useState } from 'react';
import { Search, Heart, Menu, X, Film, UserRound } from 'lucide-react';
import { useRouter } from '@/context/Router';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const { route, navigate } = useRouter();
  const { user, signOut } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const isActive = (name: string) => route.name === name;

  const goHome = () => navigate({ name: 'home' });
  const goExplore = () => navigate({ name: 'explore' });
  const goBookings = () => navigate({ name: 'bookings' });
  const goSignIn = () => navigate({ name: 'signin' });

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ name: 'explore', q: query });
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-blush-200/60">
        <nav className="container-x flex h-16 items-center justify-between gap-4">
          {/* Wordmark */}
          <button onClick={goHome} className="group flex items-center gap-2" aria-label="IMovies home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-gradient shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Film className="h-5 w-5 text-white" />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">
              <span className="text-gradient-romance">I</span>
              <span className="text-plum-900">Movies</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink active={isActive('home')} onClick={goHome}>Home</NavLink>
            <NavLink active={isActive('explore')} onClick={goExplore}>Explore Movies</NavLink>
            <NavLink active={isActive('bookings')} onClick={goBookings}>My Bookings</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-plum-700 transition-all hover:bg-blush-100 hover:text-blush-600"
              aria-label="Search movies"
            >
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="flex items-center gap-1.5 rounded-full bg-mauve-100 px-3 py-1.5 text-sm font-semibold text-plum-700">
                  <Heart className="h-3.5 w-3.5 text-blush-500" fill="currentColor" />
                  {user.name.split(' ')[0]}
                </span>
                <button onClick={signOut} className="btn-soft">Sign out</button>
              </div>
            ) : (
              <button onClick={goSignIn} className="hidden btn-primary sm:inline-flex">
                <UserRound className="h-4 w-4" /> Sign In
              </button>
            )}

            <button
              onClick={() => setMobileOpen((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-plum-700 transition-all hover:bg-blush-100 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="container-x pb-4 animate-fade-in">
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mauve-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, genres, moods…"
                className="input-field pl-12"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass animate-fade-in border-b border-blush-200/60 md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            <MobileLink active={isActive('home')} onClick={() => { goHome(); setMobileOpen(false); }}>Home</MobileLink>
            <MobileLink active={isActive('explore')} onClick={() => { goExplore(); setMobileOpen(false); }}>Explore Movies</MobileLink>
            <MobileLink active={isActive('bookings')} onClick={() => { goBookings(); setMobileOpen(false); }}>My Bookings</MobileLink>
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="btn-soft mt-2 w-full">Sign out</button>
            ) : (
              <button onClick={() => { goSignIn(); setMobileOpen(false); }} className="btn-primary mt-2 w-full">Sign In</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
        active ? 'text-blush-600' : 'text-plum-700 hover:text-blush-600'
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-rose-gradient" />
      )}
    </button>
  );
}

function MobileLink({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-left text-base font-semibold transition-all ${
        active ? 'bg-blush-100 text-blush-600' : 'text-plum-800 hover:bg-blush-50'
      }`}
    >
      {children}
    </button>
  );
}
