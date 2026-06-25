'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, User, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const STEPS = ['Service', 'Stylist', 'Date & Time'];

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/salons/salon-1" className="p-2 rounded-full hover:bg-surface-container transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="font-heading font-bold text-3xl">Book Appointment</h1>
          <p className="text-on-surface-variant">Maison de Beauté • London</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -z-10" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -z-10" 
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
        
        {STEPS.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 
                isCompleted ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant border-2 border-outline-variant/30'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{step}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Service */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-xl mb-6">Select a Service</h2>
                {[
                  { id: 1, name: 'Balayage Elegance', duration: '120 min', price: '$250' },
                  { id: 2, name: 'Precision Cut & Style', duration: '60 min', price: '$120' },
                  { id: 3, name: 'Keratin Treatment', duration: '150 min', price: '$300' },
                ].map(s => (
                  <label key={s.id} className="flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/30 hover:bg-surface-container cursor-pointer transition-colors group">
                    <div className="w-5 h-5 rounded-full border-2 border-primary-container group-hover:border-primary flex items-center justify-center">
                      {s.id === 1 && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{s.name}</p>
                      <p className="text-sm text-on-surface-variant">{s.duration}</p>
                    </div>
                    <p className="font-bold text-lg">{s.price}</p>
                  </label>
                ))}
              </div>
            )}

            {/* Step 2: Stylist */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-xl mb-6">Choose Your Stylist</h2>
                
                <label className="flex items-center gap-4 p-4 rounded-2xl border border-primary bg-primary/5 cursor-pointer transition-colors group">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">Anyone Available</p>
                    <p className="text-sm text-on-surface-variant">Maximum flexibility</p>
                  </div>
                </label>

                {[
                  { id: 1, name: 'Elena R.', role: 'Master Colorist', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100' },
                  { id: 2, name: 'Marcus T.', role: 'Senior Stylist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
                ].map(s => (
                  <label key={s.id} className="flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/30 hover:bg-surface-container cursor-pointer transition-colors group">
                    <div className="w-5 h-5 rounded-full border-2 border-outline-variant group-hover:border-primary" />
                    <img src={s.img} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{s.name}</p>
                      <p className="text-sm text-on-surface-variant">{s.role}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h2 className="font-heading font-bold text-xl mb-6">Select Date & Time</h2>
                
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {['Thu 4', 'Fri 5', 'Sat 6', 'Sun 7', 'Mon 8'].map((d, i) => (
                    <button key={d} className={`flex-shrink-0 w-20 py-4 rounded-2xl border transition-all ${
                      i === 0 ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                    }`}>
                      <p className="text-xs font-semibold uppercase mb-1">{d.split(' ')[0]}</p>
                      <p className="text-2xl font-bold">{d.split(' ')[1]}</p>
                      <p className="text-[10px] mt-1 opacity-80">Oct</p>
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Afternoon</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'].map((t, i) => (
                      <button key={t} className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                        i === 3 ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white border-outline-variant/30 text-on-surface hover:border-primary/50'
                      }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/20 p-4 pb-safe flex justify-between items-center z-40 md:static md:bg-transparent md:border-0 md:p-0 md:mt-8">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0}>
            Back
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={nextStep} icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
              Continue
            </Button>
          ) : (
            <Link href="/checkout">
              <Button>Review Booking</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
