'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_AI_MESSAGE, AI_RESPONSES } from '@/lib/data/ai-responses';
import { AIMessage } from '@/types';
import Link from 'next/link';

const OPTION_ICONS: Record<string, string> = {
  'Hair': '✂️',
  'Nails': '💅',
  'Makeup': '💄',
  'Skincare': '🌿',
  'Spa & Massage': '🛁',
  'Bridal Couture': '💍',
  'Best in category (Premium)': '⭐',
  'Cost effective (Budget)': '💰',
  'Trending Haircuts': '🔥',
  'Nail Art Specialists': '🎨',
  'Bridal Makeover': '👰',
  'Party Makeup': '🎉',
  'Deep Cleansing Facial': '✨',
  'Anti-Aging Treatments': '🌟',
  'Start Over': '🔄',
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([INITIAL_AI_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    if (text === 'Start Over') {
      setMessages([INITIAL_AI_MESSAGE]);
      return;
    }

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `${OPTION_ICONS[text] || ''} ${text}`.trim(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = AI_RESPONSES[text] || AI_RESPONSES['Hair'];
      const newAiMsg = { ...aiResponse, id: Date.now().toString() };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const lastAiMessage = [...messages].reverse().find(m => m.role === 'ai');
  const activePrompts = lastAiMessage?.prompts || [];
  const isAtEnd = activePrompts.length === 1 && activePrompts[0] === 'Start Over';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl">BE YOU Assistant</h1>
            <p className="text-sm text-primary font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Always ready to help
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([INITIAL_AI_MESSAGE])}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-outline-variant/30 text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Start Over
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-t-[2.5rem] bg-white/60 p-4 md:p-8 overflow-y-auto flex flex-col gap-6 scrollbar-hide border-b-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-rose-gold shrink-0 flex items-center justify-center mt-1 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`p-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-2xl rounded-tr-sm'
                    : 'bg-white border border-outline-variant/20 rounded-2xl rounded-tl-sm text-on-surface'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>

              {/* Salon Recommendation Cards */}
              {msg.cards && msg.cards.length > 0 && (
                <div className="ml-11 mt-3 flex flex-wrap gap-3">
                  {msg.cards.map((card, i) => (
                    <Link key={i} href="/salons" className="glass-card bg-white p-3 rounded-2xl w-56 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5 border border-outline-variant/10">
                      <img src={card.image} alt={card.title} className="w-full h-28 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-sm">{card.title}</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">{card.subtitle}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary">View Salon →</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Progress dots — show how many steps deep we are */}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-rose-gold shrink-0 flex items-center justify-center mt-1 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-outline-variant/20 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center h-12 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-[typing-dot_1.4s_infinite_0s]" />
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-[typing-dot_1.4s_infinite_0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-[typing-dot_1.4s_infinite_0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* MCQ Option Buttons */}
      <div className="glass-panel p-5 rounded-b-[2.5rem] bg-white border-t border-outline-variant/20">
        {isAtEnd ? (
          <div className="text-center">
            <p className="text-xs text-on-surface-variant mb-3">Want to explore something else?</p>
            <button
              onClick={() => setMessages([INITIAL_AI_MESSAGE])}
              className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md"
            >
              🔄 Start a New Search
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-center text-on-surface-variant mb-3 font-medium">
              {isTyping ? 'Finding the best options for you...' : 'Select an option to continue:'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <AnimatePresence>
                {!isTyping && activePrompts.map((p, i) => (
                  <motion.button
                    key={p}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleSend(p)}
                    disabled={isTyping}
                    className="px-4 py-2.5 rounded-full bg-surface-container-low border border-primary/20 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40 shadow-sm"
                  >
                    {OPTION_ICONS[p] && <span className="mr-1.5">{OPTION_ICONS[p]}</span>}
                    {p}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
