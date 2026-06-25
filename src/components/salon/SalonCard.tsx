'use client';
import Link from 'next/link';
import { MapPin, Star, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Salon } from '@/types';
import { useState } from 'react';
import Badge from '@/components/ui/Badge';

interface SalonCardProps {
  salon: Salon;
  variant?: 'list' | 'grid';
}

export default function SalonCard({ salon, variant = 'list' }: SalonCardProps) {
  const [fav, setFav] = useState(salon.isFavorite);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden bg-white relative group"
    >
      <Link href={`/salons/${salon.id}`} className="absolute inset-0 z-0" />
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-[1.5rem]">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {salon.badges.includes('AI Recommended') && <Badge type="ai" />}
          {salon.badges.includes('Top Rated') && <Badge type="top-rated" />}
          {salon.badges.includes('Premium Salon') && <Badge type="premium" />}
        </div>
        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); setFav(!fav); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform hover:scale-110 z-10"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : 'text-on-surface-variant'}`} />
        </button>
        {/* Rating pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <Star className="w-3 h-3 fill-primary-container text-primary-container" />
          <span className="text-xs font-bold text-on-surface">{salon.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-heading font-semibold text-base text-on-surface leading-tight">{salon.name}</h3>
          <span className="text-sm text-on-surface-variant font-medium ml-2 shrink-0">{salon.priceLevel}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-on-surface-variant mb-2">
          <MapPin className="w-3 h-3" />
          {salon.location} • {salon.distance}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary-container text-primary-container" />
            <span className="text-sm font-semibold text-on-surface">{salon.rating}</span>
            <span className="text-xs text-on-surface-variant">({salon.reviewCount})</span>
          </div>
          <Link
            href={`/salons/${salon.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container transition-colors relative z-10"
          >
            View Services <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
