import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Palmtree, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveChatWidgetProps {
  darkMode: boolean;
  onOpenEstimate: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ darkMode, onOpenEstimate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Welcome to Verdant Coast Florida! I am Verdant AI, your Florida luxury outdoor living specialist. How can I assist with your estate, palm care, or hardscape project today?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Best palms for coastal Miami?',
    'St. Augustine vs Zoysia grass?',
    'Cost for 2700K night lighting?',
    'Schedule 3D design consultation',
  ];

  const handleSend = async (textToSend?: string) => {
    const msgText = textToSend || input.trim();
    if (!msgText) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText }),
      });

      const data = await res.json();
      const botReply = data.reply || "Thank you! Our Florida landscape architects are ready to assist. Would you like to schedule a free 3D design estimate?";

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_err_' + Date.now(),
          sender: 'bot',
          text: 'Thank you for reaching out! We recommend speaking with our Florida design team at (800) 555-FL-LANDSCAPE or getting an instant estimate above.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold shadow-2xl shadow-emerald-950/60 hover:scale-110 transition-all cursor-pointer flex items-center justify-center gap-2"
          title="Chat with Florida Landscaping AI Assistant"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold pr-1">
            Live Chat
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-lime-400 rounded-full border-2 border-slate-950 animate-ping" />
        </button>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className={`w-[90vw] sm:w-[380px] h-[520px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          
          {/* Chat Window Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Palmtree className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  Verdant AI
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Online
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Florida Outdoor Living Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-semibold rounded-br-none'
                      : darkMode
                      ? 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span className="block text-[9px] opacity-60 mt-1 text-right font-mono">{m.timestamp}</span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-emerald-400 text-[11px] font-mono italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Verdant AI is thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-slate-800/40 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer border border-slate-700/60"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <div className="p-3 border-t border-slate-800/80 flex items-center gap-2 bg-slate-950/60">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about palms, grass, hardscaping..."
              className={`flex-1 px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
