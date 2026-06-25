'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mic } from 'lucide-react';
import { INITIAL_AI_MESSAGE, AI_RESPONSES, SUGGESTED_PROMPTS } from '@/lib/data/ai-responses';
import { AIMessage } from '@/types';
import Rating from '@/components/ui/Rating';

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([INITIAL_AI_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let aiResponse = AI_RESPONSES['analyze skin']; // default fallback
      
      // Basic matching logic for mock
      if (lowerText.includes('hair')) aiResponse = AI_RESPONSES['hair suggestions'];
      if (lowerText.includes('routine')) aiResponse = AI_RESPONSES['generate daily routine'];

      const newAiMsg = { ...aiResponse, id: Date.now().toString() };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-container to-rose-gold flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl">Lumière Assistant</h1>
          <p className="text-sm text-primary font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Always ready to help
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-t-[2.5rem] bg-white/60 p-4 md:p-8 overflow-y-auto flex flex-col gap-6 scrollbar-hide border-b-0">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-rose-gold shrink-0 flex items-center justify-center mt-1">
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

              {/* AI Cards Render */}
              {msg.cards && msg.cards.length > 0 && (
                <div className="ml-11 mt-3 flex flex-wrap gap-3">
                  {msg.cards.map((card, i) => (
                    <div key={i} className="glass-card bg-white p-3 rounded-2xl w-64 flex flex-col gap-3 cursor-pointer">
                      <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{card.title}</h4>
                        <p className="text-xs text-on-surface-variant line-clamp-1">{card.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Prompts */}
              {msg.prompts && (
                <div className="ml-11 mt-4 flex flex-wrap gap-2">
                  {msg.prompts.map((prompt) => (
                    <button 
                      key={prompt} 
                      onClick={() => handleSend(prompt)}
                      className="px-4 py-2 rounded-full bg-surface-container-low border border-primary/20 text-xs font-bold text-primary hover:bg-primary-container/10 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-rose-gold shrink-0 flex items-center justify-center mt-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-outline-variant/20 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center h-12 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-[typing-dot_1.4s_infinite_0s]" />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-[typing-dot_1.4s_infinite_0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-[typing-dot_1.4s_infinite_0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-panel p-4 rounded-b-[2.5rem] bg-white border-t border-outline-variant/20">
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-2">
          {SUGGESTED_PROMPTS.slice(0, 3).map(p => (
            <button key={p} onClick={() => setInput(p)} className="px-3 py-1.5 rounded-full bg-surface-container text-xs font-medium whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors">
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shrink-0">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask anything about your beauty routine..."
            className="input-gold flex-1 text-base shadow-sm"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md disabled:opacity-50 transition-all hover:opacity-90 shrink-0"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
