import { useState } from 'react';
import { Search, Send, Paperclip, Bot, User, X, MoreVertical, Phone, Smile, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockConversations, Conversation } from '../../data/support';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

interface ChatViewProps {
  onNavigate: (section: string) => void;
}

export function ChatView({ onNavigate }: ChatViewProps) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [filter, setFilter] = useState<'all' | 'ai' | 'colleague' | 'closed'>('all');
  const [messageInput, setMessageInput] = useState(''); // Renamed to avoid conflict
  const [isEscalated, setIsEscalated] = useState(false);

  // Mock messages data store
  const [messagesStore, setMessagesStore] = useState<Record<string, any[]>>({
    'CONV-104': [
      {
        id: '1',
        type: 'user',
        text: 'How do I update my business address?',
        time: '10:30',
      },
      {
        id: '2',
        type: 'ai',
        text: 'I can help you update your business address. You\'ll need to submit a Service Request with proof of your new address. Would you like me to start that process for you?',
        time: '10:30',
        suggestions: ['Yes, start request', 'Tell me more', 'Speak to a colleague'],
      },
      {
        id: '3',
        type: 'user',
        text: 'Yes, start request',
        time: '10:31',
      },
      {
        id: '4',
        type: 'ai',
        text: 'Great! I\'ve created Service Request #SR-3028 for you. You\'ll need to upload proof of address (utility bill or council tax statement dated within the last 3 months). You can do this in the Service Requests section.',
        time: '10:31',
        linkedTo: 'Service Request #SR-3028',
      }
    ]
  });

  const currentMessages = messagesStore[selectedConversation.id] || [];

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    if (filter === 'ai') return conv.type === 'AI';
    if (filter === 'colleague') return conv.type === 'Colleague';
    if (filter === 'closed') return conv.status === 'Closed';
    return true;
  });

  const handleNewChat = () => {
    const newId = `CONV-${Math.floor(Math.random() * 1000)}`;
    const newChat: Conversation = {
      id: newId,
      type: 'AI',
      preview: 'New conversation',
      date: new Date().toISOString(),
      status: 'Active',
      unread: false,
    };
    
    setConversations([newChat, ...conversations]);
    setMessagesStore(prev => ({ ...prev, [newId]: [] }));
    setSelectedConversation(newChat);
    setFilter('all');
    setIsEscalated(false);
    toast.success('New chat started');
  };

  const handleSendMessage = (text: string = messageInput) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesStore(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));
    
    setMessageInput('');
    toast.success('Message sent');

    // Simulate AI response for empty chats
    if (currentMessages.length === 0) {
      setTimeout(() => {
        const aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            text: "I can help with that. Could you provide a bit more detail?",
            time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessagesStore(prev => ({
            ...prev,
            [selectedConversation.id]: [...(prev[selectedConversation.id] || []), aiResponse]
        }));
      }, 1000);
    }
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

  const suggestedQuestions = [
    "How do I order a new card?",
    "What are the current interest rates?",
    "I need to dispute a transaction",
    "Update my business details"
  ];

  return (
    <div className="h-[calc(100vh-89px)] bg-[#F9FAFB] flex flex-col">
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col min-h-0">
        
        {/* Main Container */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-sm">
          
          {/* Left Panel: Conversation List */}
          <div className="border-r border-gray-200 flex flex-col h-full bg-white">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0] transition-all placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  size="icon" 
                  onClick={handleNewChat}
                  className="shrink-0 bg-[#0033A0] hover:bg-[#002b87] text-white w-10 h-10 rounded-lg shadow-sm"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 mt-4 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'ai', label: 'Assistant' },
                  { id: 'colleague', label: 'Agents' },
                  { id: 'closed', label: 'Archived' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                      filter === item.id 
                        ? "bg-[#0033A0] text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "w-full p-4 text-left transition-all border-l-4 hover:bg-gray-50 group",
                    selectedConversation.id === conv.id
                      ? "bg-blue-50/40 border-[#0033A0]"
                      : "border-transparent"
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          conv.type === 'AI' 
                            ? "bg-blue-100 text-[#0033A0]" 
                            : "bg-indigo-100 text-indigo-700"
                        )}>
                          {conv.type === 'AI' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm font-medium truncate",
                          selectedConversation.id === conv.id ? "text-[#0033A0]" : "text-gray-900"
                        )}>
                          {conv.type === 'AI' ? 'Metro Assistant' : conv.assignedTo || 'Support Agent'}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {formatTime(conv.date)}
                      </span>
                    </div>

                    <div className="pl-11">
                      <p className={cn(
                        "text-xs line-clamp-1",
                        conv.unread ? "text-gray-900 font-medium" : "text-gray-500"
                      )}>
                        {conv.preview}
                      </p>
                      
                      {conv.linkedTo && (
                        <div className="mt-1.5">
                          <span className="inline-flex items-center text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {conv.linkedTo}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Active Chat */}
          <div className="lg:col-span-2 flex flex-col h-full bg-white relative">
            {/* Chat Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                  isEscalated ? "bg-indigo-100" : "bg-blue-50"
                )}>
                  {isEscalated ? (
                    <User className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Bot className="h-5 w-5 text-[#0033A0]" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {isEscalated ? 'Sarah Mitchell' : 'Metro Assistant'}
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      isEscalated ? "bg-green-500" : "bg-blue-500 animate-pulse"
                    )} />
                    <p className="text-xs text-gray-500">
                      {isEscalated ? 'Support Agent • Online' : 'AI Assistant • Always available'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isEscalated && (
                   <Button variant="outline" size="sm" className="hidden sm:flex gap-2 h-9">
                      <Phone className="w-4 h-4" />
                      <span>Call Agent</span>
                   </Button>
                )}
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-900">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9FAFB]">
               {currentMessages.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0033A0] shadow-sm">
                      <Bot className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">How can we help you today?</h3>
                      <p className="text-sm text-gray-500">
                        Ask about your accounts, transactions, or managing your business details.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      {suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(question)}
                          className="px-4 py-3 text-left text-sm bg-white border border-gray-200 rounded-xl hover:border-[#0033A0] hover:shadow-md hover:text-[#0033A0] transition-all duration-200 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform inline-block">
                            {question}
                          </span>
                        </button>
                      ))}
                    </div>
                 </div>
               ) : (
                 <>
                   {/* Date Divider */}
                   <div className="flex items-center justify-center">
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">Today</span>
                   </div>

                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-full",
                        msg.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[85%] sm:max-w-[70%] flex flex-col",
                        msg.type === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "rounded-2xl px-5 py-3.5 text-sm shadow-sm relative group",
                          msg.type === 'user'
                            ? "bg-[#0033A0] text-white rounded-br-none"
                            : "bg-white text-gray-700 border border-gray-200 rounded-bl-none"
                        )}>
                          <p className="leading-relaxed">{msg.text}</p>
                          
                          {msg.linkedTo && (
                            <div className={cn(
                              "mt-3 pt-3 border-t text-xs flex items-center gap-2",
                              msg.type === 'user' ? "border-white/20 text-blue-50" : "border-gray-100 text-gray-500"
                            )}>
                              <Paperclip className="w-3 h-3" />
                              {msg.linkedTo}
                            </div>
                          )}
                        </div>
                        
                        <span className="text-[10px] text-gray-400 mt-1.5 px-1">
                          {msg.time}
                        </span>

                        {/* AI Suggestions */}
                        {msg.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            {msg.suggestions.map((suggestion: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (suggestion === 'Speak to a colleague') {
                                    handleEscalate();
                                  } else {
                                    toast.info(`Selected: ${suggestion}`);
                                  }
                                }}
                                className="px-4 py-2 rounded-full border border-[#0033A0] text-[#0033A0] bg-white text-xs font-medium hover:bg-blue-50 transition-colors shadow-sm"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                 </>
               )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-end gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-[#0033A0] focus-within:ring-1 focus-within:ring-[#0033A0]/20 transition-all">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-lg shrink-0">
                   <Paperclip className="w-5 h-5" />
                </Button>
                
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 resize-none py-2.5 max-h-32"
                  rows={1}
                  style={{ minHeight: '40px' }}
                />

                <div className="flex items-center gap-1 pb-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-lg">
                        <Smile className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!messageInput.trim()}
                      className={cn(
                          "h-9 w-9 p-0 rounded-lg transition-all",
                          messageInput.trim() 
                            ? "bg-[#0033A0] hover:bg-[#002b87] text-white shadow-md" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div className="text-center mt-2">
                 <p className="text-[10px] text-gray-400">
                    Metro Bank UK Support • <a href="#" className="hover:underline">Privacy Policy</a>
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}