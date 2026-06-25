'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Compass, Calendar, Heart, User, Sparkles, Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { href: '/salons', label: 'Saved', icon: Heart },
  { href: '/auth', label: 'Profile', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-panel border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-on-surface">
              Lumi<span className="text-primary-container">è</span>re
            </span>
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
            <Link href="/salons" className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <Search className="w-5 h-5 text-on-surface-variant" />
            </Link>
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
            <span className="font-heading font-bold text-lg text-on-surface">
              Lumi<span className="text-primary-container">è</span>re
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/salons">
              <Search className="w-5 h-5 text-on-surface-variant" />
            </Link>
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
