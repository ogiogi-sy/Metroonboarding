import { useState } from 'react';
import { Check, Package, Users, TrendingUp, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';

interface PropositionsScreenProps {
  onNavigate: (screen: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

interface Proposition {
  id: string;
  name: string;
  description: string;
  monthlyCost: number;
  icon: any;
  color: string;
  bgColor: string;
  features: string[];
}

export function PropositionsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: PropositionsScreenProps) {
  const [selectedPropositions, setSelectedPropositions] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const propositions: Proposition[] = [
    {
      id: 'toolkit',
      name: 'Toolkit+',
      description: 'You know your business best. You choose only the services that matter - from merchant servicing and payroll to marketing, analytics, and beyond.',
      monthlyCost: 49,
      icon: Package,
      color: '#0033A0',
      bgColor: '#EEF2FF',
      features: [
        'Merchant servicing solutions',
        'Integrated payroll management',
        'Marketing tools and insights',
        'Advanced analytics dashboard',
        'Business intelligence reports',
        'API integrations'
      ]
    },
    {
      id: 'rm',
      name: 'RM+',
      description: 'Access a dedicated Relationship Manager who understands your business, plus our Growth Hub with events, designed to help you scale.',
      monthlyCost: 199,
      icon: Users,
      color: '#E4002B',
      bgColor: '#FEF2F2',
      features: [
        'Dedicated Relationship Manager',
        'Priority phone and email support',
        'Quarterly business reviews',
        'Access to Growth Hub events',
        'Networking opportunities',
        'Strategic business guidance'
      ]
    },
    {
      id: 'liquidity',
      name: 'Liquidity+',
      description: 'An intelligent and adaptive credit line with real-time cashflow insights, built to keep your business funded, focused, and growing.',
      monthlyCost: 29,
      icon: TrendingUp,
      color: '#16A34A',
      bgColor: '#F0FDF4',
      features: [
        'Adaptive credit line up to £50,000',
        'Real-time cashflow monitoring',
        'Predictive cash forecasting',
        'Automated liquidity alerts',
        'Flexible repayment terms',
        'Invoice financing integration'
      ]
    }
  ];

  const toggleProposition = (id: string) => {
    setSelectedPropositions(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return propositions
      .filter(p => selectedPropositions.includes(p.id))
      .reduce((sum, p) => sum + p.monthlyCost, 0);
  };

  const handleEnroll = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      onNavigate('home');
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center border border-border">
          <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h2 className="mb-2" style={{ color: '#001A72' }}>Enrollment Successful!</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your selected propositions have been activated. Redirecting to dashboard...
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {propositions
              .filter(p => selectedPropositions.includes(p.id))
              .map(p => (
                <span
                  key={p.id}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ backgroundColor: p.bgColor, color: p.color }}
                >
                  {p.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Left Sidebar Navigation */}
      <NavigationSidebar 
        activeSection="propositions"
        onNavigate={onNavigate} 
        businessData={businessData} 
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="propositions"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />

        {/* Page Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-2xl" style={{ color: '#001A72' }}>Propositions</h1>
                <p className="text-sm text-muted-foreground">Choose services that power your business</p>
              </div>
            </div>
          </div>

        {/* Propositions Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-4">
          {/* Introduction Banner */}
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="mb-2" style={{ color: '#001A72' }}>Enhance Your Banking Experience</h2>
                <p className="text-sm text-muted-foreground">
                  Select one or more propositions to unlock additional services and support. You can add or remove these at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Propositions Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {propositions.map((prop) => {
              const Icon = prop.icon;
              const isSelected = selectedPropositions.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                    isSelected ? 'border-accent shadow-lg' : 'border-border hover:border-accent/50'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: prop.bgColor }}
                      >
                        <Icon className="w-6 h-6" style={{ color: prop.color }} />
                      </div>
                      <div>
                        <h3 className="mb-1" style={{ color: '#001A72' }}>{prop.name}</h3>
                        <p className="text-2xl" style={{ color: '#001A72' }}>
                          £{prop.monthlyCost}
                          <span className="text-sm text-muted-foreground">/month</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {prop.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Key Features
                    </p>
                    {prop.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: prop.color }} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => toggleProposition(prop.id)}
                    className={`w-full h-12 rounded-[999px] transition-all text-sm ${
                      isSelected
                        ? 'bg-accent text-white hover:bg-accent/90'
                        : 'border-2 border-accent text-accent hover:bg-accent/5'
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        Selected
                      </span>
                    ) : (
                      'Select Proposition'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary and Enrollment */}
          {selectedPropositions.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-border sticky bottom-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedPropositions.length} proposition{selectedPropositions.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-2xl" style={{ color: '#001A72' }}>
                    £{calculateTotal()}
                    <span className="text-sm text-muted-foreground">/month total</span>
                  </p>
                </div>
                <Button
                  onClick={handleEnroll}
                  className="h-12 px-8 rounded-[999px] bg-accent text-white hover:bg-accent/90"
                >
                  Enroll in Selected Propositions
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}