'use client';
import { ChevronLeft, MapPin, Calendar, CheckCircle2, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/book" className="p-2 rounded-full hover:bg-surface-container transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-heading font-bold text-3xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          {/* Summary Card */}
          <div className="glass-panel p-6 rounded-3xl bg-white space-y-6">
            <h2 className="font-heading font-bold text-xl border-b border-outline-variant/20 pb-4">Booking Summary</h2>
            
            <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200" alt="Salon" className="w-20 h-20 rounded-2xl object-cover" />
              <div>
                <h3 className="font-bold text-lg">Maison de Beauté</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-primary" /> Mayfair, London
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low p-4 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Balayage Elegance</p>
                  <p className="text-sm text-on-surface-variant">with Elena R. • 120 min</p>
                </div>
                <p className="font-bold">$250.00</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant border-t border-outline-variant/20 pt-4">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold text-on-surface">Oct 4, 2023 at 02:30 PM</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass-panel p-6 rounded-3xl bg-white space-y-4">
            <h2 className="font-heading font-bold text-xl border-b border-outline-variant/20 pb-4">Payment Method</h2>
            
            <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm"></div>
                <span className="font-bold">Apple Pay</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-on-surface-variant" />
                </div>
                <span className="font-bold">Credit/Debit Card</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-outline-variant/50" />
            </label>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="glass-panel p-6 rounded-3xl bg-white sticky top-24">
            <h3 className="font-heading font-bold text-xl mb-6">Price Details</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold">$250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tax</span>
                <span className="font-semibold">$14.20</span>
              </div>
              <div className="divider-gold" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Paid</span>
                <span className="font-bold text-2xl text-primary">$264.20</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Free cancellation up to 24h before
              </div>
            </div>

            <Link href="/confirmation">
              <Button className="w-full" size="lg">Confirm & Pay</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
