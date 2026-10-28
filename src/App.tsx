import { AppProvider } from '@/context/AppContext';
import { RouterProvider, useRouter } from '@/context/Router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import MovieDetails from '@/pages/MovieDetails';
import Seats from '@/pages/Seats';
import Confirmation from '@/pages/Confirmation';
import Bookings from '@/pages/Bookings';
import Auth from '@/pages/Auth';

function Pages() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <Home />;
    case 'explore':
      return <Explore />;
    case 'movie':
      return <MovieDetails />;
    case 'seats':
      return <Seats />;
    case 'confirmation':
      return <Confirmation />;
    case 'bookings':
      return <Bookings />;
    case 'signin':
      return <Auth mode="signin" />;
    case 'signup':
      return <Auth mode="signup" />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <div className="flex min-h-screen flex-col bg-ivory">
          <Navbar />
          <main className="flex-1">
            <Pages />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </AppProvider>
  );
}

export default App;
