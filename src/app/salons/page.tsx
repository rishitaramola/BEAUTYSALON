'use client';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import SalonCard from '@/components/salon/SalonCard';
import { SALONS } from '@/lib/data/salons';
import { useState } from 'react';

export default function SalonsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Hair Styling', 'Spa', 'Nail Art', 'Skincare'];

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading font-bold text-4xl text-on-surface mb-4">Discover Salons</h1>
        
        {/* Search Bar */}
        <div className="glass-panel p-2 rounded-full flex items-center gap-2 max-w-2xl">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-outline" />
            <input 
              type="text" 
              placeholder="Search by name or treatment..." 
              className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
            />
          </div>
          <div className="w-[1px] h-8 bg-outline-variant/30" />
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <MapPin className="w-5 h-5 text-outline" />
            <input 
              type="text" 
              placeholder="London, UK" 
              className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
            />
          </div>
          <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === f 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant/20'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SALONS.filter(s => activeFilter === 'All' || s.tags.includes(activeFilter)).map((salon, i) => (
          <motion.div
            key={salon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SalonCard salon={salon} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
