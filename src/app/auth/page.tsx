'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AuthPage() {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-container/20 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-white/80 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Phone Entry */}
            {step === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-3xl mb-2">Welcome to Lumière</h1>
                  <p className="text-on-surface-variant">Enter your phone number to sign in or create an account.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <select className="input-gold w-24 px-3 text-center appearance-none bg-white">
                      <option>+1</option>
                      <option>+44</option>
                      <option>+33</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000" 
                      className="input-gold flex-1 tracking-wide"
                    />
                  </div>
                  <Button className="w-full" onClick={() => setStep('otp')}>
                    Continue
                  </Button>
                </div>

                <div className="relative flex items-center justify-center my-6">
                  <div className="w-full h-[1px] bg-outline-variant/30 absolute" />
                  <span className="bg-white px-4 text-xs font-bold text-on-surface-variant relative z-10 uppercase tracking-widest">or continue with</span>
                </div>

                <button className="w-full p-3 rounded-full border-2 border-outline-variant/30 flex items-center justify-center gap-3 font-semibold hover:bg-surface-container transition-colors">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Google
                </button>
              </motion.div>
            )}

            {/* Step 2: OTP Entry */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8 text-center"
              >
                <div>
                  <h2 className="font-heading font-bold text-3xl mb-2">Verify Phone</h2>
                  <p className="text-on-surface-variant">We sent a code to <span className="font-bold text-on-surface">+1 (555) 000-0000</span></p>
                </div>

                <div className="flex justify-center gap-3">
                  {[1,2,3,4].map(i => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      className="w-14 h-16 rounded-2xl bg-surface-container-low border border-outline-variant/50 text-center text-2xl font-heading font-bold focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                      autoFocus={i === 1}
                    />
                  ))}
                </div>

                <Button className="w-full" onClick={() => setStep('success')}>
                  Verify & Sign In
                </Button>

                <p className="text-sm font-semibold text-on-surface-variant">
                  Didn't receive code? <button className="text-primary hover:underline">Resend</button>
                </p>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-8"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="font-heading font-bold text-3xl">You're Verified!</h2>
                <p className="text-on-surface-variant">Welcome to the future of beauty.</p>
                
                <Link href="/dashboard" className="block pt-4">
                  <Button className="w-full" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Go to Dashboard
                  </Button>
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
