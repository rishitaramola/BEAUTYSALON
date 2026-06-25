'use client';
import { motion } from 'framer-motion';
import { User, Wallet, Calendar, Heart, Settings, ChevronRight, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { SALONS } from '@/lib/data/salons'; 
import { BOOKINGS } from '@/lib/data/bookings';
export default function UserDashboard() {
  const upcomingBooking = BOOKINGS[0];
  const savedSalons = SALONS.filter(s => s.isFavorite).slice(0, 2);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="flex items-center gap-6 mb-12">
        <img 
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200" 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <div>
          <h1 className="font-heading font-bold text-3xl">Welcome back, Rishita!</h1>
          <p className="text-on-surface-variant">BE YOU Premium Member</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Wallet */}
          <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-primary-container/20 to-rose-gold/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 blur-2xl rounded-full" />
            <div className="flex items-center gap-2 text-on-surface-variant font-medium mb-2">
              <Wallet className="w-5 h-5" /> BE YOU Wallet
            </div>
            <p className="font-heading font-bold text-4xl text-on-surface mb-1">₹4,500.00</p>
            <p className="text-xs text-on-surface-variant">Available Balance</p>
            <button className="mt-6 w-full py-2 rounded-xl bg-white text-primary font-semibold text-sm hover:shadow-md transition-all">
              Add Funds
            </button>
          </div>

          {/* Quick Links */}
          <div className="glass-panel p-2 rounded-3xl bg-white space-y-1">
            {[
              { icon: User, label: 'Personal Information' },
              { icon: Calendar, label: 'Booking History' },
              { icon: Heart, label: 'Saved Salons' },
              { icon: Settings, label: 'Preferences' },
            ].map(link => (
              <button key={link.label} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container transition-colors text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                    <link.icon className="w-4 h-4 text-primary" />
                  </div>
                  {link.label}
                </div>
                <ChevronRight className="w-4 h-4 text-outline" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Upcoming Appointment */}
          <div>
            <h2 className="font-heading font-bold text-xl mb-4">Upcoming Appointment</h2>
            <div className="glass-panel p-6 rounded-3xl bg-white flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="w-full sm:w-1/3 space-y-2 border-b sm:border-b-0 sm:border-r border-outline-variant/30 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-xs font-bold tracking-widest uppercase text-primary">Oct 4, 2023</p>
                <p className="font-heading font-bold text-2xl">02:30 PM</p>
                <p className="text-sm text-on-surface-variant">In 3 days</p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{upcomingBooking.salonName}</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1 mb-4">
                  <MapPin className="w-4 h-4" /> {upcomingBooking.salonAddress}
                </p>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low">
                  <div className="flex items-center gap-3">
                    <img src={upcomingBooking.staffAvatar} className="w-10 h-10 rounded-full object-cover" alt="Stylist" />
                    <div>
                      <p className="text-sm font-semibold">{upcomingBooking.staffName}</p>
                      <p className="text-xs text-primary">{upcomingBooking.serviceName}</p>
                    </div>
                  </div>
                  <Link href="/confirmation" className="text-xs font-bold text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Salons */}
          <div>
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-heading font-bold text-xl">Saved Salons</h2>
              <Link href="/salons" className="text-sm font-semibold text-primary hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedSalons.map(salon => (
                <div key={salon.id} className="glass-panel p-4 rounded-3xl bg-white flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                  <img src={salon.image} className="w-20 h-20 rounded-2xl object-cover" alt={salon.name} />
                  <div className="flex-1">
                    <h3 className="font-bold">{salon.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-1">
                      <Star className="w-3 h-3 fill-primary-container text-primary-container" />
                      <span className="font-semibold text-on-surface">{salon.rating}</span>
                      <span>({salon.reviewCount})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
