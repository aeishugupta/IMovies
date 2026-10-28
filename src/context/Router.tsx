import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Route =
  | { name: 'home' }
  | { name: 'explore'; genre?: string; q?: string }
  | { name: 'movie'; id: string }
  | { name: 'seats'; id: string; date: string; time: string; format: string; price: number }
  | { name: 'confirmation'; bookingId: string }
  | { name: 'bookings' }
  | { name: 'signin' }
  | { name: 'signup' };

interface RouterValue {
  route: Route;
  navigate: (r: Route) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const [path, query] = hash.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query || '');
  if (parts.length === 0) return { name: 'home' };
  switch (parts[0]) {
    case 'explore':
      return {
        name: 'explore',
        genre: params.get('genre') || undefined,
        q: params.get('q') || undefined,
      };
    case 'movie':
      return parts[1] ? { name: 'movie', id: decodeURIComponent(parts[1]) } : { name: 'home' };
    case 'seats': {
      if (!parts[1]) return { name: 'home' };
      return {
        name: 'seats',
        id: decodeURIComponent(parts[1]),
        date: params.get('date') || '',
        time: params.get('time') || '',
        format: params.get('format') || '',
        price: Number(params.get('price') || 0),
      };
    }
    case 'confirmation':
      return parts[1]
        ? { name: 'confirmation', bookingId: decodeURIComponent(parts[1]) }
        : { name: 'home' };
    case 'bookings':
      return { name: 'bookings' };
    case 'signin':
      return { name: 'signin' };
    case 'signup':
      return { name: 'signup' };
    default:
      return { name: 'home' };
  }
}

function toHash(r: Route): string {
  switch (r.name) {
    case 'home':
      return '#/';
    case 'explore': {
      const p = new URLSearchParams();
      if (r.genre) p.set('genre', r.genre);
      if (r.q) p.set('q', r.q);
      const qs = p.toString();
      return `#/explore${qs ? '?' + qs : ''}`;
    }
    case 'movie':
      return `#/movie/${encodeURIComponent(r.id)}`;
    case 'seats': {
      const p = new URLSearchParams({
        date: r.date,
        time: r.time,
        format: r.format,
        price: String(r.price),
      });
      return `#/seats/${encodeURIComponent(r.id)}?${p.toString()}`;
    }
    case 'confirmation':
      return `#/confirmation/${encodeURIComponent(r.bookingId)}`;
    case 'bookings':
      return '#/bookings';
    case 'signin':
      return '#/signin';
    case 'signup':
      return '#/signup';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = toHash(r);
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
