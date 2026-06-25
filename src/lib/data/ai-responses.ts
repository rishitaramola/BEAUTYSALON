import { AIMessage } from '@/types';

export const INITIAL_AI_MESSAGE: AIMessage = {
  id: 'msg-0',
  role: 'ai',
  content: "Hello! I am your Lumière Beauty Assistant. I'm here to provide personalized recommendations for your skin, hair, and overall wellness journey.\n\nHow can I elevate your beauty routine today?",
  timestamp: new Date().toISOString(),
  prompts: ['Analyze Skin', 'Hair Suggestions', 'Generate Daily Routine'],
};

export const AI_RESPONSES: Record<string, AIMessage> = {
  'analyze skin': {
    id: 'ai-1',
    role: 'ai',
    content: 'I understand. Seasonal changes often lead to dehydration. Let me do a quick analysis to tailor a hydration protocol for you.',
    timestamp: new Date().toISOString(),
    cards: [
      {
        type: 'product',
        title: 'Hyaluronic Essence',
        subtitle: 'Deep hydration serum • 4.9 ★ • By Aurelia',
        price: 89,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80',
        match: 98,
      },
      {
        type: 'salon',
        title: 'Aura Clinic',
        subtitle: 'Oxygen Infusion Facial • $185 • Kensington',
        price: 185,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80',
        match: 95,
      },
    ],
  },
  'hair suggestions': {
    id: 'ai-2',
    role: 'ai',
    content: 'Based on common hair profiles, I recommend a balayage or highlights for added dimension. Here are some highly rated salons that specialize in your hair type.',
    timestamp: new Date().toISOString(),
    cards: [
      {
        type: 'salon',
        title: 'Maison de Beauté',
        subtitle: 'Balayage Elegance • $250 • Mayfair',
        price: 250,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80',
        match: 97,
      },
    ],
  },
  'generate daily routine': {
    id: 'ai-3',
    role: 'ai',
    content: 'Based on your recent hydrating facials, I recommend switching to a heavier ceramide cream to combat upcoming seasonal dryness. Here is your personalized Autumn routine:',
    timestamp: new Date().toISOString(),
    cards: [
      {
        type: 'routine',
        title: 'Transition to Autumn Skincare',
        subtitle: 'Morning: Ceramide Cream → SPF 50. Evening: Retinol + Hyaluronic Acid.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80',
      },
    ],
  },
};

export const SUGGESTED_PROMPTS = [
  'Analyze my skin type',
  'Best hair treatments for dry hair',
  'Recommend a salon near me',
  'Build my skincare routine',
  'What\'s trending in beauty?',
  'Pre-bridal beauty plan',
];
