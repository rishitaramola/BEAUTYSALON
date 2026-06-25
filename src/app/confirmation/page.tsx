'use client';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Copy, Navigation, Phone, MessageSquare, Download, Share, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 md:py-16 flex flex-col items-center min-h-screen relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-primary-container/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-center space-y-4 max-w-lg mx-auto mt-8 relative z-10 w-full mb-10"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-primary-container/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(212,175,55,0.3)] backdrop-blur-md border border-primary-container/30">
          <svg className="w-12 h-12 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path className="animate-success-dash" d="M5 13l4 4L19 7" strokeDasharray="1000" strokeDashoffset="1000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-on-surface">
          Booking Confirmed!
        </h1>
        <p className="font-medium text-on-surface-variant flex items-center justify-center gap-2">
          Booking ID: <span className="font-bold text-primary">LUM-8492-AX</span>
          <button className="text-primary hover:opacity-80 transition-opacity" title="Copy ID">
            <Copy className="w-4 h-4" />
          </button>
        </p>
      </motion.div>

      {/* Appointment Passport */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-3xl w-full max-w-2xl mx-auto p-6 md:p-10 relative overflow-hidden z-10 flex flex-col md:flex-row gap-8 items-center md:items-start"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-rose-gold" />
        
        {/* QR Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-4 border-b md:border-b-0 md:border-r border-outline-variant/30 pb-6 md:pb-0 md:pr-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
              alt="QR Code" 
              className="w-32 h-32"
            />
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant text-center">
            Scan to Check-in
          </p>
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0 border border-outline-variant/50">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-1">Date & Time</h3>
              <p className="font-heading font-semibold text-xl">Oct 4, 2023</p>
              <p className="text-primary font-medium">02:30 PM - 04:30 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0 border border-outline-variant/50">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-1">Salon</h3>
              <p className="font-heading font-semibold text-xl">Maison de l'Or</p>
              <p className="text-sm text-on-surface-variant">128 Rue du Faubourg, Paris</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100" alt="Stylist" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-0.5">Stylist</p>
              <p className="font-semibold">Elena R.</p>
              <p className="text-sm text-primary">Senior Stylist</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Summary */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl mx-auto space-y-4 mt-8"
      >
        <h2 className="font-heading font-semibold text-xl px-2">Payment Summary</h2>
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
            <div>
              <p className="font-semibold">Signature Balayage & Styling</p>
              <p className="text-sm text-on-surface-variant">Includes wash and blow-dry</p>
            </div>
            <p className="font-medium">$240.00</p>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
            <p className="text-on-surface-variant">Tax & Fees</p>
            <p className="text-on-surface-variant">$24.20</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-lg font-semibold">Total Paid</p>
              <p className="text-xs text-on-surface-variant mt-1">Paid via Apple Pay</p>
            </div>
            <p className="font-heading font-bold text-2xl text-primary">$264.20</p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl mx-auto space-y-8 flex flex-col items-center mt-10"
      >
        <div className="flex justify-center gap-8 w-full">
          {[
            { icon: Navigation, label: 'Navigate' },
            { icon: Phone, label: 'Call Salon' },
            { icon: MessageSquare, label: 'Message' },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-outline-variant/20 flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_4px_12px_rgba(212,175,55,0.15)] transition-all duration-300">
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant group-hover:text-primary transition-colors">{action.label}</span>
            </button>
          ))}
        </div>

        <button className="btn-gold w-full py-4 px-6 rounded-full font-heading font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all max-w-sm">
          <Calendar className="w-5 h-5" />
          Add to Calendar
        </button>

        <div className="flex gap-4 w-full justify-center text-sm font-semibold text-on-surface-variant">
          <button className="hover:text-primary transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Invoice
          </button>
          <div className="w-[1px] h-4 bg-outline-variant/50 self-center" />
          <button className="hover:text-primary transition-colors flex items-center gap-2">
            <Share className="w-4 h-4" /> Share
          </button>
        </div>
        
        <Link href="/dashboard" className="mt-8 text-primary font-semibold hover:text-primary-container flex items-center gap-2">
          Back to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </div>
  );
}
