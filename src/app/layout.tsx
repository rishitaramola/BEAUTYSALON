import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Lumière | AI Beauty Salon Marketplace',
  description: 'The premier AI-powered beauty marketplace connecting you with world-class salons and stylists.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-primary-container/30">
        <div className="ambient-orb top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-gold/10 animate-orb-pulse" />
        <div className="ambient-orb bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary-container/10 animate-orb-pulse" style={{ animationDelay: '2s' }} />
        
        <Navbar />
        <main className="min-h-screen pt-16 md:pt-16 pb-safe mb-14 md:mb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
