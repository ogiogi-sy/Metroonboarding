import { useState } from 'react';
import { Search, Send, Paperclip, Bot, User, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockConversations } from '../../data/support';
import { toast } from 'sonner@2.0.3';

interface ChatViewProps {
  onNavigate: (section: string) => void;
}

export function ChatView({ onNavigate }: ChatViewProps) {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [filter, setFilter] = useState<'all' | 'ai' | 'colleague' | 'closed'>('all');
  const [message, setMessage] = useState('');
  const [isEscalated, setIsEscalated] = useState(false);

  const filteredConversations = mockConversations.filter(conv => {
    if (filter === 'all') return true;
    if (filter === 'ai') return conv.type === 'AI';
    if (filter === 'colleague') return conv.type === 'Colleague';
    if (filter === 'closed') return conv.status === 'Closed';
    return true;
  });

  const mockMessages = [
    {
      id: '1',
      type: 'user' as const,
      text: 'How do I update my business address?',
      time: '10:30',
    },
    {
      id: '2',
      type: 'ai' as const,
      text: 'I can help you update your business address. You\'ll need to submit a Service Request with proof of your new address. Would you like me to start that process for you?',
      time: '10:30',
      suggestions: ['Yes, start request', 'Tell me more', 'Speak to a colleague'],
    },
    {
      id: '3',
      type: 'user' as const,
      text: 'Yes, start request',
      time: '10:31',
    },
    {
      id: '4',
      type: 'ai' as const,
      text: 'Great! I\'ve created Service Request #SR-3028 for you. You\'ll need to upload proof of address (utility bill or council tax statement dated within the last 3 months). You can do this in the Service Requests section.',
      time: '10:31',
      linkedTo: 'Service Request #SR-3028',
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success('Message sent');
    setMessage('');
  };

  const handleEscalate = () => {
    setIsEscalated(true);
    toast.success('Connected to Support Team');
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Chat Support</h1>
          <p className="text-sm text-muted-foreground">
            Get instant help from AI or speak to a colleague
          </p>
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Conversation List */}
          <div className="bg-white rounded-xl border border-border p-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['all', 'ai', 'colleague', 'closed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                    filter === f
                      ? 'bg-accent text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Conversation List */}
            <div className="space-y-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedConversation.id === conv.id
                      ? 'bg-accent/10 border-2 border-accent/30'
                      : 'hover:bg-muted/30 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      conv.type === 'AI' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {conv.type === 'AI' ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={conv.type === 'AI' ? 'secondary' : 'outline'} className="text-[10px]">
                          {conv.type === 'AI' ? 'AI' : conv.assignedTo || 'Colleague'}
                        </Badge>
                        {conv.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <p className="text-sm line-clamp-2" style={{ color: '#001A72' }}>{conv.preview}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatTime(conv.date)}</p>
                    </div>
                  </div>
                  {conv.linkedTo && (
                    <Badge variant="outline" className="text-[10px]">
                      {conv.linkedTo}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Active Chat */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="border-b border-border p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isEscalated ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {isEscalated ? (
                      <User className="h-5 w-5 text-green-600" />
                    ) : (
                      <Bot className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#001A72' }}>
                      {isEscalated ? 'Sarah Mitchell' : 'AI Support'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isEscalated ? 'Support Team • Case #MBX-20483' : 'Always available'}
                    </p>
                  </div>
                </div>
                {selectedConversation.linkedTo && (
                  <Badge variant="outline">{selectedConversation.linkedTo}</Badge>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-muted'
                    }`}>
                      <p className={`text-sm ${msg.type === 'user' ? 'text-white' : 'text-foreground'}`}>
                        {msg.text}
                      </p>
                      {msg.linkedTo && (
                        <Badge variant="secondary" className="text-[10px] mt-2">
                          {msg.linkedTo}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">{msg.time}</p>
                    
                    {/* Suggestions */}
                    {msg.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (suggestion === 'Speak to a colleague') {
                                handleEscalate();
                              } else {
                                toast.info(`Selected: ${suggestion}`);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-border bg-white text-sm hover:border-accent hover:bg-accent/5 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex items-end gap-2">
                <button className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20"
                    rows={2}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-accent hover:bg-accent/90 text-white h-10 w-10 p-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
