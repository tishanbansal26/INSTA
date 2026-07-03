import { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  CreditCard,
  User,
  HeartPulse,
  Info
} from 'lucide-react';

const SUGGESTIONS = [
  { icon: ShieldCheck, text: "Explain my policy coverages." },
  { icon: FileText, text: "Why was my claim rejected?" },
  { icon: HeartPulse, text: "Recommend a health plan for my parents." },
  { icon: CreditCard, text: "Show my payment history." },
  { icon: Info, text: "What documents are missing for my claim?" }
];

export const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: "Hello Tishan! I'm your InsureAI Assistant. I can help you understand your policies, track claims, and manage your portfolio. How can I help you today?"
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'ai', 
        content: "I am a frontend UI mock. In the production app, I will securely analyze your policy data and provide a detailed answer. For now, you can explore the other customer portal modules!"
      }]);
    }, 1000);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" /> InsureAI Assistant
          </h1>
          <p className="text-text-secondary mt-1">Your personal, intelligent insurance advisor.</p>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-xl flex flex-col overflow-hidden">
        
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-background">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20' 
                  : 'bg-surface border border-border text-text rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-white/70 text-right' : 'text-text-secondary'}`}>
                  Just now
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-text" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border bg-surface shrink-0">
          
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map((sug, idx) => (
              <button 
                key={idx}
                onClick={() => handleSuggestion(sug.text)}
                className="px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <sug.icon className="w-3 h-3" /> {sug.text}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your policy, claims, or anything else..." 
                className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-text-secondary hover:text-primary transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 font-bold"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
          <p className="text-[10px] text-center text-text-secondary mt-3">InsureAI can make mistakes. Please verify important policy terms in your documents.</p>
        </div>

      </div>
    </div>
  );
};
