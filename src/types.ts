export type Genre =
  | 'Romance'
  | 'Drama'
  | 'Comedy'
  | 'Adventure'
  | 'Sci-Fi'
  | 'Mystery'
  | 'Feel-Good'
  | 'Thriller';

export interface Showtime {
  time: string; // e.g. "7:30 PM"
  format: string; // e.g. "Dolby Atmos"
  price: number; // per seat
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  description: string;
  genres: Genre[];
  duration: string; // e.g. "2h 14m"
  rating: number; // 0-10
  certificate: string; // e.g. "U/A"
  releaseDate: string; // ISO date or display string
  poster: string;
  backdrops: string[];
  director: string;
  cast: string[];
  showtimes: Showtime[];
  featured: boolean;
  trending: boolean;
  romantic: boolean;
  feelGood: boolean;
  comingSoon: boolean;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  poster: string;
  date: string;
  time: string;
  format: string;
  seats: string[];
  total: number;
  ref: string;
  createdAt: number;
}
