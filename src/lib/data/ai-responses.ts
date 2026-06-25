import { AIMessage } from '@/types';

export const INITIAL_AI_MESSAGE: AIMessage = {
  id: 'msg-0',
  role: 'ai',
  content: "Hello! I am your BE YOU AI Beauty Assistant. 💫\n\nI can help you find the perfect salon or service tailored to your needs.\n\nWhat are you looking for today?",
  timestamp: new Date().toISOString(),
  prompts: ['Hair', 'Nails', 'Makeup', 'Skincare', 'Spa & Massage', 'Bridal Couture'],
};

export const AI_RESPONSES: Record<string, AIMessage> = {
  'Hair': {
    id: 'ai-hair',
    role: 'ai',
    content: 'Great choice! ✂️ What are you looking for with your hair?',
    timestamp: new Date().toISOString(),
    prompts: ['Best in category (Premium)', 'Cost effective (Budget)', 'Trending Haircuts']
  },
  'Nails': {
    id: 'ai-nails',
    role: 'ai',
    content: 'Lovely! 💅 What kind of nail service are you looking for?',
    timestamp: new Date().toISOString(),
    prompts: ['Best in category (Premium)', 'Cost effective (Budget)', 'Nail Art Specialists']
  },
  'Makeup': {
    id: 'ai-makeup',
    role: 'ai',
    content: 'Time to glow! 💄 What type of makeup service do you need?',
    timestamp: new Date().toISOString(),
    prompts: ['Bridal Makeover', 'Party Makeup', 'Cost effective (Budget)']
  },
  'Skincare': {
    id: 'ai-skin',
    role: 'ai',
    content: 'Healthy skin is everything! 🌿 What is your skincare priority?',
    timestamp: new Date().toISOString(),
    prompts: ['Deep Cleansing Facial', 'Anti-Aging Treatments', 'Cost effective (Budget)']
  },
  'Spa & Massage': {
    id: 'ai-spa',
    role: 'ai',
    content: 'Time to unwind! 🛁 What kind of spa experience are you after?',
    timestamp: new Date().toISOString(),
    prompts: ['Best in category (Premium)', 'Cost effective (Budget)']
  },
  'Bridal Couture': {
    id: 'ai-bridal-main',
    role: 'ai',
    content: 'Your big day is everything! 💍 What do you need for the perfect bridal look?',
    timestamp: new Date().toISOString(),
    prompts: ['Bridal Makeover', 'Best in category (Premium)']
  },
  // Final recommendations
  'Best in category (Premium)': {
    id: 'ai-premium',
    role: 'ai',
    content: 'Here are the top-rated, premium salons in Mumbai known for luxury services and world-class experts:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'BBlunt Salon',
        subtitle: 'Premium • Juhu, Mumbai',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80',
      },
      {
        type: 'salon',
        title: 'Jean-Claude Biguine',
        subtitle: 'Premium • Bandra West',
        image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200&q=80',
      }
    ]
  },
  'Cost effective (Budget)': {
    id: 'ai-budget',
    role: 'ai',
    content: 'Quality does not have to break the bank! Here are some highly-rated, affordable salons near you:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'Deeps Hair Skin & Beauty',
        subtitle: 'Affordable • Navi Mumbai',
        image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&q=80',
      },
      {
        type: 'salon',
        title: 'Lasea Hair & Beauty',
        subtitle: 'Affordable • Fort, Mumbai',
        image: 'https://images.unsplash.com/photo-1516975080661-460d3fc35ff1?w=200&q=80',
      }
    ]
  },
  'Bridal Makeover': {
    id: 'ai-bridal',
    role: 'ai',
    content: 'Your big day deserves the best! Here are the most sought-after bridal makeup artists in Mumbai:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'Nafi Makeup Artist',
        subtitle: 'Bridal Couture • Kalyan West',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
      }
    ]
  },
  'Trending Haircuts': {
    id: 'ai-trending-hair',
    role: 'ai',
    content: 'Looking for a fresh balayage or curtain bangs? These top styling experts can help:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'Enrich Salon',
        subtitle: 'Styling Experts • Bandra West',
        image: 'https://images.unsplash.com/photo-1521590832167-7bfcbaa637c9?w=200&q=80',
      }
    ]
  },
  'Nail Art Specialists': {
    id: 'ai-nails-special',
    role: 'ai',
    content: 'From acrylics to intricate designs, here are the best nail studios:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'Lakme Salon',
        subtitle: 'Nail Art Studio • Juhu',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200&q=80',
      }
    ]
  },
  'Deep Cleansing Facial': {
    id: 'ai-facial',
    role: 'ai',
    content: 'Refresh and rejuvenate your skin with these top-rated facial treatments:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'MySkin Clinic',
        subtitle: 'Advanced Facials • Powai',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80',
      }
    ]
  },
  'Anti-Aging Treatments': {
    id: 'ai-anti-aging',
    role: 'ai',
    content: 'Combat fine lines and restore your glow with specialized dermatological treatments here:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'MySkin Clinic',
        subtitle: 'Aesthetic Dermatology • Powai',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80',
      }
    ]
  },
  'Party Makeup': {
    id: 'ai-party',
    role: 'ai',
    content: 'Get ready for the night! Here are the best salons offering quick and glamorous party makeup:',
    timestamp: new Date().toISOString(),
    prompts: ['Start Over'],
    cards: [
      {
        type: 'salon',
        title: 'Maher Beauty Parlour',
        subtitle: 'Party Makeup • Virar West',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13fee7a3ef?w=200&q=80',
      }
    ]
  },
};

export const SUGGESTED_PROMPTS = [];
