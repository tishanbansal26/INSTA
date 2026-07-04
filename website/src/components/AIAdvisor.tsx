import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
  HelpCircle,
  User,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIAdvisor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: '👋 Hi! I am your InsureAI Advisor. How can I help you today?' }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleOption = (option: string, route?: string) => {
    setMessages(prev => [...prev, { role: 'user', content: option }]);
    setShowOptions(false);
    
    setTimeout(() => {
      if (route) {
        setMessages(prev => [...prev, { role: 'ai', content: `Great! Taking you there right now...` }]);
        setTimeout(() => {
          navigate(route);
          setIsOpen(false);
          // reset for next time
          setTimeout(() => {
            setMessages([{ role: 'ai', content: '👋 Hi! I am your InsureAI Advisor. How can I help you today?' }]);
            setShowOptions(true);
          }, 1000);
        }, 1500);
      } else if (option === 'Claim Help') {
        setMessages(prev => [...prev, { role: 'ai', content: 'To help you with a claim, please log in to your Customer Portal.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Our advisors are currently busy, but please leave your number and we will call you back in 5 minutes!' }]);
      }
    }, 1000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setShowOptions(false);
    
    setTimeout(() => {
      if (input.match(/\d{10}/)) {
        setMessages(prev => [...prev, { role: 'ai', content: 'Thank you! A human agent will call you on this number shortly.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Our AI advisors are currently assisting other customers. Please leave your 10-digit contact number and a human agent will call you back shortly!' }]);
      }
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden md:hidden' : 'flex'} items-center gap-3 pr-6 md:right-8 md:bottom-24`}
        // Adjusted position so it doesn't overlap WhatsApp completely
      >
        <Bot className="w-8 h-8" />
        <span className="font-bold hidden md:block">Ask AI Advisor</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-24 md:right-8 w-[350px] bg-surface border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold">InsureAI Advisor</h3>
                <p className="text-xs text-white/80">Online • Replies instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-[400px] flex flex-col bg-background">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-surface border border-border text-text rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {showOptions && (
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-xs font-bold text-text-secondary uppercase mb-1">What are you looking for?</p>
                  <button onClick={() => handleOption('Health Insurance', '/health-insurance')} className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary text-left">
                    <span className="flex items-center gap-2"><HeartPulse className="w-4 h-4 text-red-500" /> Health Insurance</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button onClick={() => handleOption('Term Insurance', '/term-insurance')} className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary text-left">
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-500" /> Term Insurance</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button onClick={() => handleOption('Calculate Premium', '/calculate')} className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary text-left">
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> Calculate Premium</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button onClick={() => handleOption('Claim Help')} className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary text-left">
                    <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-orange-500" /> Claim Help</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                  <a href="https://insureflow-erp.vercel.app/portal" className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary text-left">
                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-green-500" /> Existing Customer</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </a>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-border bg-surface flex gap-2">
              <input 
                id="ai-chat-input"
                name="ai-chat-input"
                aria-label="Type a message"
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary text-text" 
              />
              <button type="submit" disabled={!input.trim()} className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
