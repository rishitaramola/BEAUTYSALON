'use client';
import { motion } from 'framer-motion';

export default function FloatingBows() {
  const bows = [
    { top: '10%', left: '5%', scale: 1.2, delay: 0, duration: 4, rotate: -15 },
    { top: '20%', right: '10%', scale: 0.8, delay: 1, duration: 5, rotate: 20 },
    { top: '50%', left: '15%', scale: 1, delay: 2, duration: 4.5, rotate: 5 },
    { bottom: '20%', right: '15%', scale: 1.5, delay: 0.5, duration: 5.5, rotate: -10 },
    { bottom: '10%', left: '30%', scale: 0.9, delay: 1.5, duration: 4.2, rotate: 12 },
    { top: '35%', right: '35%', scale: 1.1, delay: 0.8, duration: 4.8, rotate: -8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bows.map((bow, i) => (
        <motion.div
          key={i}
          className="absolute drop-shadow-[0_10px_20px_rgba(219,39,119,0.3)]"
          style={{
            top: bow.top,
            left: bow.left,
            right: bow.right,
            bottom: bow.bottom,
            transform: `scale(${bow.scale}) rotate(${bow.rotate}deg)`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [bow.rotate, bow.rotate + 5, bow.rotate],
          }}
          transition={{
            duration: bow.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bow.delay,
          }}
        >
          {/* Aesthetic SVG Bow */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`bowGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" /> {/* pink-200 */}
                <stop offset="50%" stopColor="#f472b6" /> {/* pink-400 */}
                <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
              </linearGradient>
              <linearGradient id={`ribbonGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
              <filter id={`glow${i}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Left loop */}
            <path d="M50 45 C 10 15, -10 60, 45 45" fill={`url(#bowGrad${i})`} opacity="0.95" filter={`url(#glow${i})`} />
            {/* Right loop */}
            <path d="M50 45 C 90 15, 110 60, 55 45" fill={`url(#bowGrad${i})`} opacity="0.95" filter={`url(#glow${i})`} />
            {/* Left tail */}
            <path d="M45 45 Q 30 70 20 95 Q 35 90 50 60" fill={`url(#ribbonGrad${i})`} opacity="0.85" filter={`url(#glow${i})`} />
            {/* Right tail */}
            <path d="M55 45 Q 70 70 80 95 Q 65 90 50 60" fill={`url(#ribbonGrad${i})`} opacity="0.85" filter={`url(#glow${i})`} />
            {/* Center knot */}
            <ellipse cx="50" cy="45" rx="8" ry="10" fill={`url(#bowGrad${i})`} filter={`url(#glow${i})`} />
            {/* Glossy highlights */}
            <path d="M30 35 Q 40 30 45 40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M70 35 Q 60 30 55 40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M47 43 Q 50 40 53 43" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
