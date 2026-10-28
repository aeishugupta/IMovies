import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Booking } from '@/types';

interface AppContextValue {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  removeBooking: (id: string) => void;
  user: { name: string; email: string } | null;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const BOOKINGS_KEY = 'imovies:bookings';
const USER_KEY = 'imovies:user';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => load(BOOKINGS_KEY, []));
  const [user, setUser] = useState<{ name: string; email: string } | null>(() =>
    load(USER_KEY, null as { name: string; email: string } | null)
  );

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const addBooking = (b: Booking) => setBookings((prev) => [b, ...prev]);
  const removeBooking = (id: string) =>
    setBookings((prev) => prev.filter((b) => b.id !== id));

  const signIn = (name: string, email: string) => setUser({ name, email });
  const signOut = () => setUser(null);

  return (
    <AppContext.Provider value={{ bookings, addBooking, removeBooking, user, signIn, signOut }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
