import { MessageSquare, FileText, Calendar, AlertTriangle, Shield, Plus, ChevronRight, ChevronDown, Clock, Search, HelpCircle, Book, CreditCard, Banknote } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockActivityFeed, mockServiceRequests, mockComplaints, mockAppointments, mockConversations, mockDisputes } from '../../data/support';
import { useState } from 'react';
import { ChatPopup } from './ChatPopup';

interface SupportLandingProps {
  onNavigate: (section: string) => void;
}

export function SupportLanding({ onNavigate }: SupportLandingProps) {
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openRequests = mockServiceRequests.filter(r => r.status !== 'Completed').length;
  const activeConversations = mockConversations.filter(c => c.status === 'Active').length;
  const unresolvedDisputes = mockDisputes.filter(d => d.status !== 'Reimbursed' && d.status !== 'Declined').length;
  const nextAppointment = mockAppointments.find(a => a.status === 'Scheduled' && new Date(a.date) > new Date());

  const quickActions = [
    {
      id: 'chat',
      label: 'New Chat',
      description: 'Start a new chat',
      icon: MessageSquare,
      color: 'bg-accent/10 text-accent',
      route: 'chat',
    },
    {
      id: 'request',
      label: 'Service Requests',
      description: 'Submit new or track open',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      route: 'requests',
    },
    {
      id: 'appointment',
      label: 'Appointments',
      description: 'Manage Appointments',
      icon: Calendar,
      color: 'bg-green-100 text-green-600',
      route: 'appointments',
    },
    {
      id: 'complaint',
      label: 'Issues & Disputes',
      description: 'Report new or track status',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
      route: 'complaints',
    },
    {
      id: 'fraud',
      label: 'Fraud & Security',
      description: 'Report or review alerts',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      route: 'fraud',
    },
  ];

  // Knowledge Center Data
  const helpCategories = [
    { id: 'account', label: 'Account Management', icon: Book },
    { id: 'payments', label: 'Payments & Transfers', icon: Banknote },
    { id: 'cards', label: 'Cards & PINs', icon: CreditCard },
    { id: 'security', label: 'Security & Fraud', icon: Shield },
  ];

  const faqs = [
    {
      id: 'faq-1',
      question: 'How do I reset my card PIN?',
      category: 'cards',
      steps: [
        'Log in to your Metro Bank mobile app',
        'Tap on "Cards" at the bottom of the screen',
        'Select the card you want to manage',
        'Tap "View PIN" or "Change PIN"',
        'Follow the on-screen instructions to securely reset your PIN'
      ]
    },
    {
      id: 'faq-2',
      question: 'How do I cancel a Direct Debit?',
      category: 'payments',
      steps: [
        'Log in to Online Banking',
        'Select "Payments & Transfers"',
        'Click "Manage Direct Debits"',
        'Select the Direct Debit you wish to cancel',
        'Click "Cancel Direct Debit" and confirm'
      ]
    },
    {
      id: 'faq-3',
      question: 'How do I add a new user to my business account?',
      category: 'account',
      steps: [
        'Go to "Service Requests" in the main menu',
        'Select "Add User" from the options',
        'Fill in the new user details (Name, Email, Role)',
        'Upload required ID documents if requested',
        'Submit the request for approval'
      ]
    },
    {
      id: 'faq-4',
      question: 'What should I do if I suspect fraud?',
      category: 'security',
      steps: [
        'Immediately freeze your card via the app',
        'Go to the "Fraud & Security" section',
        'Select the suspicious transaction',
        'Click "Report Fraud"',
        'Call our 24/7 fraud line if you cannot access the app'
      ]
    },
     {
      id: 'faq-5',
      question: 'How do I change my business address?',
      category: 'account',
      steps: [
        'Navigate to "Service Requests"',
        'Choose "Address Change"',
        'Enter your new business address details',
        'Upload proof of new address (e.g., utility bill)',
        'Submit for verification'
      ]
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-[1400px] mx-auto px-8 pt-4 pb-8">
        {/* Quick Actions Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Quick Actions</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (action.id === 'chat') {
                      setIsChatPopupOpen(true);
                    } else {
                      onNavigate(action.route);
                    }
                  }}
                  className="bg-white rounded-xl border border-border p-4 hover:border-accent hover:shadow-md transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm mb-0.5" style={{ color: '#001A72' }}>{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Items - Central Area */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Active Items</h2>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Conversations (Inbox) */}
            <button
              onClick={() => onNavigate('chat')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{mockConversations.length}</p>
                <p className="text-sm text-muted-foreground mb-1">My Conversations</p>
                <p className="text-xs text-muted-foreground">
                  Inbox
                </p>
              </div>
            </button>

            {/* Open Requests */}
            <button
              onClick={() => onNavigate('requests')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{openRequests}</p>
                <p className="text-sm text-muted-foreground mb-1">Open Service Requests</p>
                <p className="text-xs text-muted-foreground">
                  {openRequests} request{openRequests !== 1 ? 's' : ''} in progress
                </p>
              </div>
            </button>

            {/* Unresolved Disputes */}
            <button
              onClick={() => onNavigate('complaints')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{unresolvedDisputes}</p>
                <p className="text-sm text-muted-foreground mb-1">Active Disputes</p>
                <p className="text-xs text-muted-foreground">
                  {unresolvedDisputes > 0 ? `${unresolvedDisputes} under investigation` : 'No active disputes'}
                </p>
              </div>
            </button>
          </div>

          {/* Next Appointment - Full Width */}
          {nextAppointment && (
            <div
              onClick={() => onNavigate('appointments')}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/30 p-6 mt-6 cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-0 text-xs">Upcoming</Badge>
                      <p className="text-xs text-muted-foreground">Next Appointment</p>
                    </div>
                    <p className="text-lg mb-3" style={{ color: '#001A72' }}>{nextAppointment.reason}</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(nextAppointment.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">With {nextAppointment.adviser}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{nextAppointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          )}
        </div>

        {/* Knowledge Center */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Knowledge Center</h2>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Search Header */}
            <div className="p-6 bg-white border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#001A72] shrink-0">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#001A72] mb-1">
                      Knowledge Center
                    </h3>
                    <p className="text-sm text-muted-foreground">Search our help center for quick answers</p>
                  </div>
                </div>
                
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                 <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedCategory === null
                      ? 'bg-[#001A72] text-white border-[#001A72]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All Topics
                </button>
                {helpCategories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? 'bg-[#001A72] text-white border-[#001A72]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="divide-y divide-gray-100">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="group">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className={`w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors ${
                        expandedFaq === faq.id ? 'bg-slate-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          expandedFaq === faq.id ? 'bg-blue-100 text-[#001A72]' : 'bg-slate-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm'
                        }`}>
                          <HelpCircle className="h-4 w-4" />
                        </div>
                        <span className={`font-medium transition-colors ${
                          expandedFaq === faq.id ? 'text-[#001A72]' : 'text-gray-700'
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        expandedFaq === faq.id ? 'rotate-180 text-[#001A72]' : ''
                      }`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-6 pt-0 pl-[4.5rem] bg-slate-50">
                        <div className="space-y-3 relative">
                          {/* Vertical line connecting steps */}
                          <div className="absolute left-[11px] top-2 bottom-4 w-px bg-gray-200" />
                          
                          {faq.steps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4 relative z-10">
                              <div className="w-6 h-6 rounded-full bg-white border border-blue-200 flex items-center justify-center text-[10px] font-bold text-[#001A72] shrink-0 shadow-sm">
                                {index + 1}
                              </div>
                              <p className="text-sm text-gray-600 pt-0.5">{step}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 flex gap-3">
                          <Button variant="outline" size="sm" className="text-xs" onClick={() => onNavigate('chat')}>
                            Still need help? Chat with us
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">No results found</p>
                  <p className="text-sm text-gray-500">Try adjusting your search terms or browse all topics</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ChatPopup isOpen={isChatPopupOpen} onClose={() => setIsChatPopupOpen(false)} />
    </div>
  );
}
