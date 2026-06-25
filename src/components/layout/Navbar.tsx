'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Compass, Calendar, Heart, User, Sparkles, Bell, X, MapPin, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SALONS } from '@/lib/data/salons';

const navItems = [
  { href: '/', label: 'Explore', icon: Compass },
  { href: '/salons', label: 'Salons', icon: Search },
  { href: '/dashboard', label: 'Bookings', icon: Calendar },
  { href: '/ai-assistant', label: 'AI', icon: Sparkles },
  { href: '/auth', label: 'Profile', icon: User },
];

const mobileNavItems = [
  { href: '/', label: 'Explore', icon: Compass },
  { href: '/dashboard', label: 'Bookings', icon: Calendar },
  { href: '/salons', label: 'Salons', icon: Heart },
  { href: '/auth', label: 'Profile', icon: User },
];

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = query.trim().length > 0
    ? SALONS.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.location.toLowerCase().includes(query.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : SALONS.slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/salons?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/20">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search salons, services, areas..."
            className="flex-1 text-base outline-none bg-transparent text-on-surface placeholder:text-on-surface-variant/60"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-on-surface-variant hover:text-on-surface transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-container transition-colors">
            <X className="w-4 h-4 text-on-surface-variant" />
          </button>
        </form>

        {/* Label */}
        <div className="px-5 pt-4 pb-1">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            {query.trim() ? `Results for "${query}"` : 'Popular Salons'}
          </p>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh] pb-4">
          {results.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No salons found for "{query}"</p>
              <p className="text-xs mt-1 opacity-70">Try searching by location, service or name</p>
            </div>
          ) : (
            results.map(salon => (
              <Link
                key={salon.id}
                href={`/salons/${salon.id}`}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-3 hover:bg-surface-container/50 transition-colors group"
              >
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-sm text-on-surface truncate">{salon.name}</h4>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-on-surface">{salon.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <p className="text-xs text-on-surface-variant truncate">{salon.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {salon.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary-container/15 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{salon.priceLevel}</p>
                  <p className="text-xs text-on-surface-variant">from ₹{salon.priceFrom}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        {query.trim() && (
          <div className="border-t border-outline-variant/20 px-5 py-3">
            <button
              onClick={handleSearch}
              className="w-full py-2.5 rounded-2xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              See all results for "{query}" →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-panel border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="flex items-center"><span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900}} className="text-2xl text-on-surface tracking-tight">BE</span><span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900, background: 'linear-gradient(135deg, #d91c5c 0%, #f4a0c0 60%, #c2527f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}} className="text-2xl">YOU</span><svg className="w-6 h-6 text-primary ml-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C10 15.5817 6.41828 12 2 12C6.41828 12 10 8.41828 10 4C10 8.41828 13.5817 12 18 12C13.5817 12 10 15.5817 10 20Z"/><path d="M19 10C19 8.34315 17.6569 7 16 7C17.6569 7 19 5.65685 19 4C19 5.65685 20.3431 7 22 7C20.3431 7 19 8.34315 19 10Z"/><path d="M16 17C16 15.8954 15.1046 15 14 15C15.1046 15 16 14.1046 16 13C16 14.1046 16.8954 15 18 15C16.8954 15 16 15.8954 16 17Z"/></svg></span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container/20 text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-on-surface-variant" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
              <Bell className="w-5 h-5 text-on-surface-variant" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container" />
            </button>
            <Link href="/auth">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-container/40">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass-panel border-b border-outline-variant/20">
        <div className="flex items-center justify-between px-5 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-container" />
            <span className="flex items-center"><span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900}} className="text-xl text-on-surface tracking-tight">BE</span><span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900, background: 'linear-gradient(135deg, #d91c5c 0%, #f4a0c0 60%, #c2527f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}} className="text-xl">YOU</span><svg className="w-5 h-5 text-primary ml-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C10 15.5817 6.41828 12 2 12C6.41828 12 10 8.41828 10 4C10 8.41828 13.5817 12 18 12C13.5817 12 10 15.5817 10 20Z"/><path d="M19 10C19 8.34315 17.6569 7 16 7C17.6569 7 19 5.65685 19 4C19 5.65685 20.3431 7 22 7C20.3431 7 19 8.34315 19 10Z"/><path d="M16 17C16 15.8954 15.1046 15 14 15C15.1046 15 16 14.1046 16 13C16 14.1046 16.8954 15 18 15C16.8954 15 16 15.8954 16 17Z"/></svg></span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
            >
              <Search className="w-5 h-5 text-on-surface-variant" />
            </button>
            <Link href="/auth">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container/40">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-outline-variant/20 pb-safe">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-1"
              >
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-primary-container/20' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-primary' : 'text-on-surface-variant'
                  }`} />
                </div>
                <span className={`text-[10px] font-medium ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
