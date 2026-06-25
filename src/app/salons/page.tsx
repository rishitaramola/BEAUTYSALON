'use client';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, X } from 'lucide-react';
import SalonCard from '@/components/salon/SalonCard';
import { SALONS } from '@/lib/data/salons';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Tag-to-category keyword mapping
const filterMap: Record<string, string[]> = {
  'All':            [],
  'Hair Styling':   ['hair', 'coloring', 'extensions', 'keratin', 'blowout'],
  'Spa & Massage':  ['spa', 'massage', 'therapy'],
  'Makeup':         ['makeup', 'bridal makeup'],
  'Bridal Couture': ['bridal'],
  'Nail Art':       ['nail', 'manicure', 'pedicure', 'gel'],
  'Skincare':       ['skin', 'facial', 'anti-aging'],
  'Brows & Lashes': ['brow', 'lash'],
  'Wellness':       ['wellness'],
};

const filters = Object.keys(filterMap);

function SalonsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [activeFilter, setActiveFilter] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    setActiveFilter(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const filteredSalons = SALONS.filter(salon => {
    const matchesSearch = searchQuery === '' ||
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      salon.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === 'All') return matchesSearch;

    const keywords = filterMap[activeFilter] || [];
    const matchesCategory = keywords.some(kw =>
      salon.tags.some(t => t.toLowerCase().includes(kw)) ||
      salon.services.some(s => s.category.toLowerCase().includes(kw) || s.name.toLowerCase().includes(kw))
    );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading font-bold text-4xl text-on-surface mb-2">
          {activeFilter === 'All' ? 'Discover Salons' : activeFilter}
        </h1>
        <p className="text-on-surface-variant mb-6">
          {filteredSalons.length} {filteredSalons.length === 1 ? 'salon' : 'salons'} found in Mumbai
        </p>

        {/* Search Bar */}
        <div className="glass-panel p-2 rounded-full flex items-center gap-2 max-w-2xl">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or treatment..."
              className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X className="w-4 h-4 text-outline hover:text-primary transition-colors" />
              </button>
            )}
          </div>
          <div className="w-[1px] h-8 bg-outline-variant/30" />
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <MapPin className="w-5 h-5 text-outline" />
            <input
              type="text"
              placeholder="Mumbai, IN"
              className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
            />
          </div>
          <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
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

      {/* Salon Grid */}
      {filteredSalons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredSalons.map((salon, i) => (
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
      ) : (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="font-heading font-bold text-xl text-on-surface mb-2">No salons found</h3>
          <p className="text-on-surface-variant">Try a different category or search term.</p>
          <button
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            className="mt-6 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm"
          >
            Show All Salons
          </button>
        </div>
      )}
    </div>
  );
}

// Wrap in Suspense to satisfy Next.js useSearchParams requirement
export default function SalonsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <SalonsContent />
    </Suspense>
  );
}
