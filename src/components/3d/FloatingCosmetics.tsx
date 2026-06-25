'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FloatingCosmetics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center pointer-events-none">
      {/* Center Image */}
      <motion.div 
        className="absolute z-20 animate-float"
        style={{ y: y1 }}
      >
        <img 
          src="/images/hero-salon-v2.png" 
          alt="Luxury Salon Interior" 
          className="w-64 h-64 object-cover rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(212,175,55,0.4)] border-4 border-white"
        />
      </motion.div>

      {/* Floating Element 1 */}
      <motion.div 
        className="absolute top-10 right-10 z-30 animate-float-slow"
        style={{ y: y2, rotate: rotate1 }}
      >
        <div className="w-32 h-32 rounded-full overflow-hidden border-[3px] border-white shadow-[0_15px_40px_-10px_rgba(212,175,55,0.3)]">
          <img 
            src="/images/hero-makeup-v2.png" 
            alt="Luxury Makeup" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Floating Element 2 */}
      <motion.div 
        className="absolute bottom-20 left-10 z-10 animate-float-reverse"
        style={{ y: y3, rotate: rotate2 }}
      >
        <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-[3px] border-white shadow-[0_15px_40px_-10px_rgba(212,175,55,0.3)] rotate-[-10deg]">
          <img 
            src="/images/hero-nails-v2.png" 
            alt="Aesthetic Nails" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-primary-container/20 to-rose-gold/20 rounded-full blur-3xl -z-10 animate-orb-pulse" />
    </div>
  );
}
