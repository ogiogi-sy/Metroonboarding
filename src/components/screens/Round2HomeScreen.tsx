import { Button } from '../ui/button';
import { CreditCard, TrendingUp, Globe, Shield, ChevronRight, Sparkles, LayoutDashboard, CheckCircle2, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { HelpWidget } from '../HelpWidget';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LendingManagementScreen } from './LendingManagementScreen';
import { LendingFlow, LendingApplicationData } from '../lending/LendingFlow';
import { AdminCenterScreen } from './AdminCenterScreen';
import { NavigationSidebar } from '../NavigationSidebar';

import { MobileNav } from '../MobileNav';

const LENDING_STORAGE_KEY = 'metro_lending_application_draft';

interface Round2HomeScreenProps {
  onNavigate: (cluster: 'plan' | 'funding' | 'payments' | 'compliance' | 'dashboard' | 'propositions' | 'lending' | 'admin') => void;
  businessData: any;
  activeSection?: 'home' | 'lending' | 'funding' | 'admin';
  onCompleteFunding?: () => void;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function Round2HomeScreen({ 
  onNavigate, 
  businessData, 
  activeSection = 'home', 
  onCompleteFunding,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange 
}: Round2HomeScreenProps) {
  const [activeView, setActiveView] = useState<'home' | 'lending' | 'funding' | 'admin'>(activeSection);
  const [resumeData, setResumeData] = useState<LendingApplicationData | null>(null);

  // Update activeView when activeSection prop changes
  useEffect(() => {
    setActiveView(activeSection);
  }, [activeSection]);

  // Load saved application data when entering funding view
  useEffect(() => {
    if (activeView === 'funding') {
      try {
        const saved = localStorage.getItem(LENDING_STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setResumeData(data);
        }
      } catch (error) {
        console.error('Failed to load saved application:', error);
      }
    }
  }, [activeView]);

  const handleResumeFunding = () => {
    try {
      const saved = localStorage.getItem(LENDING_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setResumeData(data);
        setActiveView('funding');
        onNavigate('funding');
      }
    } catch (error) {
      console.error('Failed to load saved application:', error);
    }
  };

  // Show success toast on mount
  useEffect(() => {
    if (activeView === 'home') {
      toast.success('Your business account is ready!', {
        description: 'You can start banking immediately, or take a few minutes to customize your experience',
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5" />,
      });
    }
  }, [activeView]);

  // Personalization logic based on Phase 1 data
  const getRecommendations = () => {
    const recs: any = {
      plan: null,
      funding: null,
      payments: null,
      compliance: null,
    };

    // Banking Plan recommendations
    if (businessData.turnoverBand === '5m+') {
      recs.plan = 'Strategy tier recommended';
    } else if (businessData.turnoverBand === '1m-5m') {
      recs.plan = 'Grow plan recommended';
    } else if (businessData.turnoverBand === '250k-1m') {
      recs.plan = 'Build plan recommended';
    } else {
      recs.plan = 'Start plan recommended';
    }

    // Funding recommendations
    if (businessData.turnoverBand && businessData.turnoverBand !== '0-250k') {
      recs.funding = 'Pre-qualified for lending';
    }

    // International recommendations
    if (businessData.hasInternational) {
      recs.payments = 'FX tools recommended';
    }

    return recs;
  };

  const recommendations = getRecommendations();

  const clusters = [
    {
      id: 'plan' as const,
      icon: CreditCard,
      title: 'Choose Your Banking Plan',
      description: 'Unlock features and pricing tailored to your business needs',
      badge: recommendations.plan,
      gradient: 'from-accent/10 to-accent/5',
      priority: 'high',
      time: '2 min',
    },
    {
      id: 'funding' as const,
      icon: TrendingUp,
      title: 'Explore Growth & Funding',
      description: 'Access lending, overdrafts, and liquidity solutions',
      badge: recommendations.funding,
      gradient: 'from-primary/10 to-primary/5',
      priority: 'medium',
      time: '5 min',
    },
    {
      id: 'payments' as const,
      icon: Globe,
      title: 'Setup Payments & International',
      description: 'Configure CASS, FX payments, and multi-currency accounts',
      badge: recommendations.payments,
      gradient: 'from-[#16A34A]/10 to-[#16A34A]/5',
      priority: 'medium',
      time: '3 min',
    },
    {
      id: 'compliance' as const,
      icon: Shield,
      title: 'Complete Compliance & Controls',
      description: 'Finish verification tasks and set up account mandates',
      badge: null,
      gradient: 'from-muted to-muted/50',
      priority: 'low',
      time: '4 min',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Left Sidebar Navigation */}
      <NavigationSidebar
        activeSection={activeView}
        onNavigate={(section: string) => {
          if (section === 'home') {
            setActiveView('home');
            onNavigate('home');
          } else if (section === 'lending') {
            setActiveView('lending');
            onNavigate('lending');
          } else if (section === 'admin') {
            setActiveView('admin');
            onNavigate('admin');
          } else if (section === 'dashboard') {
            onNavigate('dashboard');
          } else if (section === 'propositions') {
            onNavigate('propositions');
          } else {
            // Handle other sections
            onNavigate(section as any);
          }
        }}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Page Title */}
              <div className="flex items-center gap-4">
                <MobileNav
                  activeSection={activeView}
                  onNavigate={(section: string) => {
                    if (section === 'home') {
                      setActiveView('home');
                      onNavigate('home');
                    } else if (section === 'lending') {
                      setActiveView('lending');
                      onNavigate('lending');
                    } else if (section === 'admin') {
                      setActiveView('admin');
                      onNavigate('admin');
                    } else if (section === 'dashboard') {
                      onNavigate('dashboard');
                    } else if (section === 'propositions') {
                      onNavigate('propositions');
                    } else {
                      // Handle other sections
                      onNavigate(section as any);
                    }
                  }}
                  businessData={businessData}
                  selectedAccounts={selectedAccounts}
                  onAccountSelectionChange={onAccountSelectionChange}
                />
                <div>
                  <h1 className="text-2xl" style={{ color: '#001A72' }}>Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome back to Metro Bank</p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors relative">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                </button>
                <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <span className="text-sm">
                    {businessData.companyName ? businessData.companyName.charAt(0) : 'B'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {activeView === 'lending' ? (
            <LendingManagementScreen 
              onNavigate={(screen: string) => {
                if (screen === 'home') {
                  setActiveView('home');
                }
              }}
              businessData={businessData}
              onResume={handleResumeFunding}
            />
          ) : activeView === 'funding' ? (
            <LendingFlow
              onNavigate={(screen: string) => {
                if (screen === 'home') {
                  setActiveView('home');
                }
              }}
              businessData={businessData}
              onComplete={onCompleteFunding}
              resumeData={resumeData}
            />
          ) : activeView === 'admin' ? (
            <AdminCenterScreen
              onNavigate={(screen: string) => {
                if (screen === 'home') {
                  setActiveView('home');
                }
              }}
              businessData={businessData}
            />
          ) : (
            <>
              {/* Complete Your Setup Banner */}
              <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="mb-1" style={{ color: '#001A72' }}>Complete Your Setup</h2>
                      <p className="text-sm text-muted-foreground">
                        You have 4 areas to configure to unlock the full power of Metro Banking.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">0/4 complete</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Banking Plan */}
                  <button
                    onClick={() => onNavigate('plan')}
                    className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-all group border border-transparent hover:border-accent"
                  >
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>Choose Your Banking Plan</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Select features tailored to your business needs
                    </p>
                  </button>

                  {/* Card 2: Growth & Funding */}
                  <button
                    onClick={() => onNavigate('funding')}
                    className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-all group border border-transparent hover:border-primary"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>Explore Growth & Funding</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Access business loans and liquidity solutions
                    </p>
                  </button>

                  {/* Card 3: Switch from another Bank */}
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      onNavigate('admin');
                    }}
                    className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-all group border border-transparent hover:border-[#16A34A]"
                  >
                    <div className="w-10 h-10 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ArrowLeftRight className="w-5 h-5 text-[#16A34A]" />
                    </div>
                    <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>Switch from another Bank</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Transfer your account smoothly with CASS
                    </p>
                  </button>

                  {/* Card 4: Controls */}
                  <button
                    onClick={() => onNavigate('propositions')}
                    className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-all group border border-transparent hover:border-muted-foreground"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>Liquidity +</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Cashflow insights and the credit in one place
                    </p>
                  </button>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {/* Total Balance */}
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Total Balance</p>
                  <h3 className="mb-1" style={{ fontSize: '2rem', color: '#001A72' }}>£0.00</h3>
                  <p className="text-xs text-muted-foreground">Across all accounts</p>
                </div>

                {/* Credit Available */}
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Credit Available</p>
                  <h3 className="mb-1" style={{ fontSize: '2rem', color: '#001A72' }}>£5,000</h3>
                  <p className="text-xs text-muted-foreground">X cards</p>
                </div>

                {/* Upcoming Payments */}
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Upcoming Payments</p>
                  <h3 className="mb-1" style={{ fontSize: '2rem', color: '#001A72' }}>0</h3>
                  <p className="text-xs text-muted-foreground">Next due: MM/DD</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-border">
                <h3 className="mb-4" style={{ color: '#001A72' }}>Quick Actions</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button className="flex items-center justify-center gap-2 h-12 rounded-[999px] border-2 border-accent text-accent hover:bg-accent/5 transition-all">
                    <span className="text-lg">+</span>
                    <span className="text-sm">Add Money</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 h-12 rounded-[999px] border-2 border-accent text-accent hover:bg-accent/5 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="text-sm">Send Money</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 h-12 rounded-[999px] border-2 border-accent text-accent hover:bg-accent/5 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">Statement</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 h-12 rounded-[999px] border-2 border-accent text-accent hover:bg-accent/5 transition-all">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Cards</span>
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="mb-4" style={{ color: '#001A72' }}>Recent Transactions</h3>
                
                <div className="space-y-3">
                  {/* Transaction 1 */}
                  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: '#001A72' }}>Metro Bank - Account Opening Bonus</p>
                        <p className="text-xs text-muted-foreground">Today 09:00</p>
                      </div>
                    </div>
                    <span className="text-sm text-[#16A34A]">+£100.00</span>
                  </div>

                  {/* Transaction 2 */}
                  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FEE2E2] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#E4002B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: '#001A72' }}>Initial Deposit</p>
                        <p className="text-xs text-muted-foreground">Today 08:45</p>
                      </div>
                    </div>
                    <span className="text-sm text-[#E4002B]">-£100.00</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Help Widget */}
      <HelpWidget stepLabel="Enhance Your Account" />
    </div>
  );
}