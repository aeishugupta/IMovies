import { Film, Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { useRouter } from '@/context/Router';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative mt-20 overflow-hidden bg-plum-950 text-ivory">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blush-500/20 blur-3xl" />
      <div className="absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-lavender-600/20 blur-3xl" />

      <div className="container-x relative py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-gradient shadow-glow">
                <Film className="h-5 w-5 text-white" />
              </span>
              <span className="font-serif text-2xl font-bold">
                <span className="text-blush-300">I</span>Movies
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              Movie nights, made magical. Discover dreamy films, pick your seat, and let the
              lights dim on a night to remember.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-blush-500 hover:scale-110"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <FooterCol title="Explore">
            <FooterLink onClick={() => navigate({ name: 'home' })}>Home</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore' })}>All Movies</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Romance' })}>Romantic Picks</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Feel-Good' })}>Feel-Good</FooterLink>
          </FooterCol>

          <FooterCol title="Account">
            <FooterLink onClick={() => navigate({ name: 'bookings' })}>My Bookings</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'signin' })}>Sign In</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'signup' })}>Create Account</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Sci-Fi' })}>Sci-Fi Nights</FooterLink>
          </FooterCol>

          <FooterCol title="Cinema">
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Comedy' })}>Comedy</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Mystery' })}>Mystery</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore', genre: 'Adventure' })}>Adventure</FooterLink>
            <FooterLink onClick={() => navigate({ name: 'explore' })}>Coming Soon</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ivory/60 sm:flex-row">
          <p>© 2026 IMovies. Crafted with <Heart className="inline h-3.5 w-3.5 text-blush-400" fill="currentColor" /> for film lovers.</p>
          <p>Demo experience — no real tickets are issued.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-lg font-semibold text-blush-200">{title}</h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-sm text-ivory/70 transition-colors hover:text-blush-300"
      >
        {children}
      </button>
    </li>
  );
}
