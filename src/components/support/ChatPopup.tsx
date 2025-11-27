import { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; type: 'user' | 'ai'; text: string; time: string }[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Hello! How can I help you today?',
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      text: message,
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: "I'm a virtual assistant. I can help you with general inquiries, but for specific account actions, I might need to connect you with a human agent.",
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-[#0033A0] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#002b87] transition-all relative group"
        >
          <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-sm border border-blue-100">
            <Bot className="h-5 w-5 text-[#0033A0]" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-900">Metro Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-[11px] font-medium text-gray-500">AI Assistant • Always available</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 bg-[#F9FAFB]">
        {messages.length === 0 || (messages.length === 1 && messages[0].text === 'Hello! How can I help you today?') ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0033A0]">
              <Bot className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">Metro Assistant</h3>
              <p className="text-xs text-gray-500 px-8">How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full px-4">
              {["Order a new card", "Check recent transactions", "Update business details"].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const userMsg = {
                      id: Date.now().toString(),
                      type: 'user' as const,
                      text: q,
                      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev.filter(m => m.text !== 'Hello! How can I help you today?'), userMsg]);
                    
                    setTimeout(() => {
                      setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        type: 'ai',
                        text: "I can help you with that. Could you please provide more details?",
                        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                      }]);
                    }, 1000);
                  }}
                  className="px-4 py-2.5 text-left text-xs bg-white border border-gray-200 rounded-lg hover:border-[#0033A0] hover:text-[#0033A0] hover:bg-blue-50/50 transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-2">
               <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">Today</span>
            </div>
            {messages.filter(m => m.text !== 'Hello! How can I help you today?').map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-[#0033A0] text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 px-1">{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-border">
        <div className="flex items-end gap-2">
          <button className="p-2 text-muted-foreground hover:bg-slate-100 rounded-lg transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 bg-slate-50 rounded-lg border border-border focus-within:ring-2 focus-within:ring-[#001A72]/20 transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-transparent text-sm resize-none focus:outline-none h-[40px] max-h-[100px]"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="icon"
            className="bg-[#001A72] hover:bg-[#001A72]/90 text-white h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
