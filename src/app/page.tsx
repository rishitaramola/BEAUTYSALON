'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Star, ChevronRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import FloatingCosmetics from '@/components/3d/FloatingCosmetics';
import SalonCard from '@/components/salon/SalonCard';
import { SALONS, CATEGORIES, REVIEWS } from '@/lib/data/salons';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import FloatingBows from '@/components/3d/FloatingBows';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const featuredSalons = SALONS.filter(s => s.badges.includes('Top Rated') || s.badges.includes('Premium Salon')).slice(0, 4);
  const totalReviews = SALONS.reduce((acc, s) => acc + s.reviewCount, 0);
  const totalSalons = SALONS.length;

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    router.push(`/salons${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full max-w-[1280px] mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[90vh]">
        <FloatingBows />
        <div className="flex-1 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Beauty Marketplace</span>
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-on-surface leading-[1.1] tracking-tight">
              Mumbai's Premier <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-rose-gold">
                Beauty Journey
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Discover and book top-tier salons, spas, and aesthetic clinics curated just for you by our intelligent beauty assistant.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-2 rounded-full flex flex-col sm:flex-row items-center gap-2 max-w-2xl shadow-lg"
          >
            <form onSubmit={handleHeroSearch} className="flex-1 flex flex-col sm:flex-row items-center gap-2 w-full">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
                <Search className="w-5 h-5 text-outline shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Services, salons, or treatments" 
                  className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
                />
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-outline-variant/30" />
              <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
                <MapPin className="w-5 h-5 text-outline shrink-0" />
                <input 
                  type="text"
                  value={locationQuery}
                  onChange={e => setLocationQuery(e.target.value)}
                  placeholder="Mumbai, IN" 
                  className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline-variant font-medium"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full">Search</Button>
            </form>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 text-sm font-medium text-on-surface-variant"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <p>Join <span className="text-on-surface font-bold">{totalReviews}+</span> happy clients across Mumbai</p>
          </motion.div>
        </div>

        <div className="flex-1 w-full lg:w-1/2 relative h-[400px] lg:h-auto">
          <FloatingCosmetics />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-surface-container-low py-20 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-on-surface mb-3">Explore Categories</h2>
              <p className="text-on-surface-variant text-lg">Find the perfect treatment for your needs</p>
            </div>
            <Link href="/salons" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:text-primary-container transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/salons?category=${encodeURIComponent(cat.name)}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group h-full"
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                  <div>
                    <h3 className="font-heading font-semibold text-on-surface group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-xs text-on-surface-variant mt-1">{cat.count} {cat.count === 1 ? 'Salon' : 'Salons'} in Mumbai</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CURATED SALONS SECTION */}
      <section className="py-24 relative max-w-[1280px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mb-2 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> BE YOU Curated
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-on-surface">Premium Experiences</h2>
          </div>
          <Link href="/salons" className="flex items-center gap-1 text-primary font-semibold hover:text-primary-container transition-colors">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredSalons.map((salon, i) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SalonCard salon={salon} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI ASSISTANT PROMO SECTION */}
      <section className="py-20 bg-gradient-to-b from-surface to-surface-container-low overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/10 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-gold/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-1 space-y-6 z-10">
              <Badge type="ai" />
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-on-surface leading-tight">
                Meet Your Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-rose-gold">
                  Beauty Concierge
                </span>
              </h2>
              <p className="text-lg text-on-surface-variant">
                Not sure what you need? Chat with our AI assistant to get personalized recommendations, build routines, and find the perfect salon based on your unique profile.
              </p>
              <ul className="space-y-3 mt-4">
                {['Skin type analysis', 'Personalized salon matching', 'Trend forecasting'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      ✓
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/ai-assistant">
                  <Button size="lg" icon={<Sparkles className="w-4 h-4" />}>
                    Chat with AI
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full relative h-[400px]">
              <motion.div 
                className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col"
                initial={{ y: 50, opacity: 0, rotate: 2 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-14 bg-surface-container-low border-b border-outline-variant/20 flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">BE YOU AI</p>
                    <p className="text-[10px] text-primary font-medium">Online</p>
                  </div>
                </div>
                <div className="p-4 space-y-4 flex-1 bg-surface/50">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-container to-rose-gold shrink-0 flex items-center justify-center mt-1">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white border border-outline-variant/20 rounded-2xl rounded-tl-sm p-3 shadow-sm text-sm text-on-surface">
                      I noticed your skin has been dry lately from the Mumbai humidity. I recommend a hydrating facial. Here are the top rated ones near you!
                    </div>
                  </div>
                  <div className="glass-card p-3 ml-9 max-w-[85%] flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=100&q=80" alt="Facial" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold">Oxygen Glow Facial</p>
                      <Rating value={4.9} count={128} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-on-surface mb-4">Loved by {totalReviews}+ Clients</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Across {totalSalons} premium salons in Mumbai — real experiences from real people.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0,3).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <Rating value={review.rating} />
              <p className="my-4 text-on-surface-variant leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                <img src={review.authorAvatar} alt={review.authorName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-on-surface">{review.authorName}</p>
                  <p className="text-xs text-primary">{review.serviceUsed}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
