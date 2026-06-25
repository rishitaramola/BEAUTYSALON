'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Heart, Share, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { SALONS } from '@/lib/data/salons';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import { useState } from 'react';

export default function SalonDetail() {
  const { id } = useParams();
  const salon = SALONS.find(s => s.id === id) || SALONS[0];
  const [activeTab, setActiveTab] = useState<'services' | 'staff' | 'reviews'>('services');

  return (
    <div className="pb-24">
      {/* Header Gallery */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-surface-container">
        <div className="absolute inset-0 grid grid-cols-4 gap-1 md:gap-2">
          <div className="col-span-4 md:col-span-2 relative">
            <img src={salon.images[0]} alt={salon.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
            <img src={salon.images[1] || salon.images[0]} alt={salon.name} className="w-full h-full object-cover" />
            <img src={salon.images[2] || salon.images[0]} alt={salon.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block col-span-1 relative">
            <img src={salon.images[3] || salon.images[0]} alt={salon.name} className="w-full h-full object-cover" />
            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              View All Photos
            </button>
          </div>
        </div>
        
        {/* Top Nav Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <Link href="/salons" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Heart className={`w-5 h-5 ${salon.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 relative -mt-10 md:-mt-20">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title Card */}
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] bg-white relative">
            <div className="flex flex-wrap gap-2 mb-4">
              {salon.badges.map(b => (
                <Badge key={b} type={b === 'AI Recommended' ? 'ai' : b === 'Premium Salon' ? 'premium' : 'top-rated'} />
              ))}
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-on-surface mb-2">{salon.name}</h1>
            <p className="text-lg text-on-surface-variant font-medium mb-6">{salon.tagline}</p>
            
            <div className="flex flex-wrap gap-4 md:gap-8 border-t border-outline-variant/30 pt-6">
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-5 h-5 fill-primary-container text-primary-container" />
                <span className="font-bold text-base">{salon.rating}</span>
                <span className="text-on-surface-variant">({salon.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <MapPin className="w-5 h-5 text-outline" />
                {salon.city}
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <Clock className="w-5 h-5 text-outline" />
                Open today until 8PM
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">About</h3>
            <p className="text-on-surface-variant leading-relaxed">{salon.description}</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant/30 flex gap-8">
            {(['services', 'staff', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold capitalize transition-all relative ${
                  activeTab === tab ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'services' && (
              <div className="space-y-4">
                {salon.services.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-4 rounded-2xl hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/20">
                    <div className="flex-1">
                      <h4 className="font-semibold text-on-surface">{s.name}</h4>
                      <p className="text-sm text-on-surface-variant mt-1">{s.description}</p>
                      <p className="text-xs text-on-surface-variant mt-2 font-medium">{s.duration} min</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-heading font-bold text-lg">{s.currency}{s.price}</p>
                      <Link href={`/book?salonId=${salon.id}&serviceId=${s.id}`}>
                        <Button variant="outline" size="sm" className="mt-2">Book</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'staff' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {salon.staff.map(st => (
                  <div key={st.id} className="flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/20">
                    <img src={st.avatar} alt={st.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-on-surface">{st.name}</h4>
                      <p className="text-sm text-primary">{st.role}</p>
                      <div className="mt-1">
                        <Rating value={st.rating} size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-panel p-6 rounded-3xl bg-white space-y-6">
            <h3 className="font-heading font-bold text-xl">Book Appointment</h3>
            <p className="text-sm text-on-surface-variant">Select a service to start booking your luxury experience.</p>
            <div className="space-y-3">
              {salon.services.slice(0, 3).map(s => (
                <div key={s.id} className="flex justify-between items-center py-2 border-b border-outline-variant/20 last:border-0">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-sm font-bold">{s.currency}{s.price}</span>
                </div>
              ))}
            </div>
            <Link href={`/book?salonId=${salon.id}`}>
              <Button className="w-full">Book Now</Button>
            </Link>

            <div className="divider-gold" />

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Contact & Location</h4>
              <div className="flex items-start gap-3 text-sm text-on-surface-variant">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <span>{salon.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <span>{salon.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-on-surface-variant">
                <Clock className="w-5 h-5 shrink-0 text-primary" />
                <span className="whitespace-pre-line">{salon.openHours}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
