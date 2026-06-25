import Link from 'next/link';
import { Sparkles, MessageCircle, Share2, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant/20 mt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-16 mb-nav md:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-baseline">
                <span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900}} className="text-2xl text-on-surface tracking-tight">BE</span>
                <span style={{fontFamily: '"Playfair Display", serif', fontWeight: 900, background: 'linear-gradient(135deg, #d91c5c 0%, #f4a0c0 60%, #c2527f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}} className="text-2xl">YOU</span>
                <span className="text-primary text-lg ml-0.5">✦</span>
              </span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              The premier AI-powered beauty marketplace connecting you with world-class salons and stylists.
            </p>
            <div className="flex items-center gap-3">
              {[MessageCircle, Share2, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-on-surface mb-4">Discover</h4>
            <ul className="space-y-3">
              {['Browse Salons', 'AI Beauty Assistant', 'Top Rated', 'New Openings', 'Luxury Experiences'].map(l => (
                <li key={l}><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-on-surface mb-4">For Business</h4>
            <ul className="space-y-3">
              {['Partner With Us', 'Owner Dashboard', 'Salon Analytics', 'Marketing Tools', 'API Access'].map(l => (
                <li key={l}><a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-on-surface mb-4">Stay Updated</h4>
            <p className="text-sm text-on-surface-variant mb-4">Get exclusive beauty tips and offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-gold flex-1 text-sm py-3"
              />
              <button className="btn-gold px-4 py-3 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-on-surface-variant mt-3">By subscribing you agree to our Privacy Policy.</p>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-variant">© 2026 BE YOU. All rights reserved. SuperXgen AI Startup Buildathon 2026.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
