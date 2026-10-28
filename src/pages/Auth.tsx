import { useState } from 'react';
import { Film, Mail, Lock, User, Heart, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useRouter } from '@/context/Router';
import { useApp } from '@/context/AppContext';
import { FloatingAccents } from '@/components/Decorations';

export default function Auth({ mode }: { mode: 'signin' | 'signup' }) {
  const { navigate } = useRouter();
  const { signIn } = useApp();
  const isSignUp = mode === 'signup';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const displayName = isSignUp ? name.trim() : email.split('@')[0];
      signIn(displayName, email.trim());
      navigate({ name: 'home' });
    }, 900);
  };

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-plum-gradient">
      <FloatingAccents />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blush-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-lavender-600/20 blur-3xl" />

      <div className="container-x relative flex min-h-[80vh] items-center justify-center py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="rounded-3xl bg-white/90 p-8 shadow-card backdrop-blur-xl sm:p-10">
            {/* Logo */}
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-gradient shadow-glow">
                <Film className="h-7 w-7 text-white" />
              </span>
              <h1 className="mt-4 font-serif text-3xl font-bold text-plum-900">
                {isSignUp ? 'Join IMovies' : 'Welcome Back'}
              </h1>
              <p className="mt-1 text-sm text-mauve-500">
                {isSignUp ? 'Create your account to start booking' : 'Sign in to see your bookings'}
              </p>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              {isSignUp && (
                <Field icon={<User className="h-5 w-5" />} label="Full Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aria Vance"
                    className="w-full bg-transparent px-4 py-3 text-plum-900 placeholder:text-mauve-300 focus:outline-none"
                  />
                </Field>
              )}
              <Field icon={<Mail className="h-5 w-5" />} label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-4 py-3 text-plum-900 placeholder:text-mauve-300 focus:outline-none"
                />
              </Field>
              <Field icon={<Lock className="h-5 w-5" />} label="Password">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-4 py-3 text-plum-900 placeholder:text-mauve-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="text-mauve-400 transition-colors hover:text-blush-500"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </Field>

              {error && (
                <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Please wait…
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" /> {isSignUp ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-mauve-500">
              {isSignUp ? 'Already have an account?' : "Don't have one yet?"}{' '}
              <button
                onClick={() => navigate({ name: isSignUp ? 'signin' : 'signup' })}
                className="font-semibold text-blush-600 hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Create one'}
              </button>
            </p>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-mauve-400">
              <Heart className="h-3 w-3 text-blush-400" fill="currentColor" />
              Demo only — no real account is created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-plum-700">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-blush-200 bg-white/80 px-3 transition-all focus-within:border-blush-400 focus-within:ring-2 focus-within:ring-blush-300/40">
        <span className="text-mauve-300">{icon}</span>
        {children}
      </div>
    </label>
  );
}
