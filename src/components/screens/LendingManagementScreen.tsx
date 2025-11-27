import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Calculator, 
  Users, 
  Upload, 
  Save, 
  Bell, 
  PenTool,
  Calendar,
  Percent,
  RefreshCw,
  Heart,
  XCircle,
  Download,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { LendingApplicationData } from '../lending/LendingFlow';

const LENDING_STORAGE_KEY = 'metro_lending_application_draft';

interface LendingManagementScreenProps {
  onNavigate: (screen: string) => void;
  businessData: any;
  onResume?: () => void;
}

export function LendingManagementScreen({ onNavigate, businessData, onResume }: LendingManagementScreenProps) {
  const [activeTab, setActiveTab] = useState<'origination' | 'servicing'>('origination');
  const [savedApplication, setSavedApplication] = useState<LendingApplicationData | null>(null);

  // Load saved application from localStorage
  useEffect(() => {
    const loadSavedApplication = () => {
      try {
        const saved = localStorage.getItem(LENDING_STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setSavedApplication(data);
        }
      } catch (error) {
        console.error('Failed to load saved application:', error);
      }
    };
    
    loadSavedApplication();
    
    // Listen for storage changes (in case user saves from another tab/session)
    window.addEventListener('storage', loadSavedApplication);
    return () => window.removeEventListener('storage', loadSavedApplication);
  }, []);

  // Helper function to get product type label
  const getProductTypeLabel = (data: LendingApplicationData): string => {
    if (data.purpose.toLowerCase().includes('equipment')) return 'Business Loan';
    if (data.purpose.toLowerCase().includes('property')) return 'Commercial Mortgage';
    if (data.purpose.toLowerCase().includes('invoice')) return 'Invoice Finance';
    return 'Business Loan';
  };

  // Helper function to format last saved time
  const formatLastSaved = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  // Mock data for existing loans
  const existingLoans = [
    {
      id: '1',
      type: 'Business Loan',
      amount: 50000,
      balance: 42000,
      rate: 5.9,
      term: 60,
      monthlyPayment: 956,
      nextPaymentDate: '2024-01-15',
      status: 'active'
    }
  ];

  const originationProducts = [
    {
      id: 'loan',
      icon: TrendingUp,
      title: 'Business Loan',
      description: 'Fixed-rate funding from £5,000 to £500,000',
      features: ['Fixed rates from 5.9%', 'Terms up to 10 years', 'No early repayment fees'],
      color: '#0033A0'
    },
    {
      id: 'overdraft',
      icon: RefreshCw,
      title: 'Business Overdraft',
      description: 'Flexible credit line for cash flow management',
      features: ['Up to £100,000', 'Pay interest only on what you use', 'Instant access'],
      color: '#E4002B'
    },
    {
      id: 'card',
      icon: CreditCard,
      title: 'Business Credit Card',
      description: 'Corporate cards with flexible limits',
      features: ['Up to 56 days interest-free', 'Cashback on purchases', 'Multiple cardholders'],
      color: '#16A34A'
    }
  ];

  const originationTools = [
    {
      id: 'calculator',
      icon: Calculator,
      title: 'Eligibility Calculator',
      description: 'Check what you could borrow',
      action: 'Calculate'
    },
    {
      id: 'affordability',
      icon: Percent,
      title: 'Affordability Tool',
      description: 'See your monthly repayments',
      action: 'Check Now'
    },
    {
      id: 'multi-party',
      icon: Users,
      title: 'Multi-Party Application',
      description: 'Add directors and guarantors',
      action: 'Start'
    },
    {
      id: 'upload',
      icon: Upload,
      title: 'Document Upload',
      description: 'Upload supporting documents',
      action: 'Upload'
    }
  ];

  const servicingOptions = [
    {
      id: 'overview',
      icon: FileText,
      title: 'Loan Overview',
      description: 'View all your lending products',
      badge: `${existingLoans.length} active`
    },
    {
      id: 'schedule',
      icon: Calendar,
      title: 'Repayment Schedule',
      description: 'See your payment timeline',
      badge: null
    },
    {
      id: 'early-repay',
      icon: CheckCircle2,
      title: 'Early Repayment',
      description: 'Pay off your loan early',
      badge: 'No fees'
    },
    {
      id: 'overpayment',
      icon: TrendingUp,
      title: 'Make Overpayment',
      description: 'Reduce term or monthly payment',
      badge: null
    },
    {
      id: 'refinance',
      icon: RefreshCw,
      title: 'Refinance Tools',
      description: 'Get a better rate on your loan',
      badge: 'Save money'
    },
    {
      id: 'hardship',
      icon: Heart,
      title: 'Hardship Support',
      description: 'Payment holiday options',
      badge: null
    },
    {
      id: 'redemption',
      icon: XCircle,
      title: 'Redemption & Closure',
      description: 'Close your lending account',
      badge: null
    },
    {
      id: 'documents',
      icon: Download,
      title: 'Loan Documents',
      description: 'Download agreements and statements',
      badge: null
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 bg-white rounded-full p-1 border border-border w-fit">
        <button
          onClick={() => setActiveTab('origination')}
          className={`px-6 py-2 rounded-full text-sm transition-all ${
            activeTab === 'origination'
              ? 'bg-[#0033A0] text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Origination
        </button>
        <button
          onClick={() => setActiveTab('servicing')}
          className={`px-6 py-2 rounded-full text-sm transition-all ${
            activeTab === 'servicing'
              ? 'bg-[#0033A0] text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Servicing
        </button>
      </div>

      {/* Origination Tab */}
      {activeTab === 'origination' && (
        <div className="space-y-8">
          {/* Saved Applications */}
          {savedApplication && (
            <div className="bg-gradient-to-br from-[#0033A0]/5 to-[#0033A0]/10 border border-[#0033A0]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Save className="w-5 h-5 text-[#0033A0]" />
                <h2 style={{ color: '#001A72' }}>Saved Applications</h2>
              </div>
              
              <div className="space-y-3">
                <div key={savedApplication.id} className="bg-white rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm" style={{ color: '#001A72' }}>{getProductTypeLabel(savedApplication)}</h4>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Draft
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        £{savedApplication.loanAmount.toLocaleString()} • Last saved {formatLastSaved(savedApplication.lastSaved)}
                      </p>
                    </div>
                    <button 
                      onClick={onResume}
                      className="px-6 py-2 bg-[#0033A0] text-white rounded-full text-sm hover:bg-[#0033A0]/90 transition-colors"
                    >
                      Resume
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#0033A0] h-2 rounded-full transition-all"
                      style={{ width: `${savedApplication.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{savedApplication.progress}% complete</p>
                </div>
              </div>
            </div>
          )}

          {/* Apply for Products */}
          <div>
            <h2 className="mb-4" style={{ color: '#001A72' }}>Apply for Lending Products</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {originationProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.id}
                    className="bg-white rounded-2xl p-6 text-left transition-all group border border-border hover:border-[#0033A0]"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: product.color }} />
                    </div>
                    
                    <h3 className="mb-2" style={{ color: '#001A72' }}>{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center gap-2 text-[#0033A0] text-sm group-hover:gap-3 transition-all">
                      <span>Apply now</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools & Calculators */}
          <div>
            <h2 className="mb-4" style={{ color: '#001A72' }}>Tools & Calculators</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {originationTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    className="bg-white rounded-2xl p-5 text-left transition-all group border border-border hover:border-[#0033A0]"
                  >
                    <div className="w-10 h-10 bg-[#0033A0]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#0033A0]" />
                    </div>
                    
                    <h4 className="text-sm mb-1" style={{ color: '#001A72' }}>{tool.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {tool.description}
                    </p>
                    
                    <span className="text-xs text-[#0033A0]">{tool.action} →</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Application Features */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h3 className="mb-4" style={{ color: '#001A72' }}>Application Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0033A0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Save className="w-5 h-5 text-[#0033A0]" />
                </div>
                <div>
                  <h4 className="text-sm mb-1" style={{ color: '#001A72' }}>Save & Resume</h4>
                  <p className="text-xs text-muted-foreground">
                    Save your progress and return anytime
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0033A0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-[#0033A0]" />
                </div>
                <div>
                  <h4 className="text-sm mb-1" style={{ color: '#001A72' }}>Notifications</h4>
                  <p className="text-xs text-muted-foreground">
                    Get updates on your application status
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0033A0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PenTool className="w-5 h-5 text-[#0033A0]" />
                </div>
                <div>
                  <h4 className="text-sm mb-1" style={{ color: '#001A72' }}>E-Signature</h4>
                  <p className="text-xs text-muted-foreground">
                    Sign documents digitally and securely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servicing Tab */}
      {activeTab === 'servicing' && (
        <div className="space-y-8">
          {/* Active Loans Overview */}
          {existingLoans.length > 0 ? (
            <>
              <div>
                <h2 className="mb-4" style={{ color: '#001A72' }}>Your Loans</h2>
                <div className="space-y-4">
                  {existingLoans.map((loan) => (
                    <div key={loan.id} className="bg-white rounded-2xl p-6 border border-border">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ color: '#001A72' }}>{loan.type}</h3>
                            <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs rounded-full">
                              Active
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Account ending in •••• {loan.id}
                          </p>
                        </div>
                        <button className="text-[#0033A0] text-sm hover:underline">
                          View Details
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Original Amount</p>
                          <p className="text-lg" style={{ color: '#001A72' }}>
                            £{loan.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Balance</p>
                          <p className="text-lg" style={{ color: '#001A72' }}>
                            £{loan.balance.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                          <p className="text-lg" style={{ color: '#001A72' }}>
                            {loan.rate}% APR
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
                          <p className="text-lg" style={{ color: '#001A72' }}>
                            £{loan.monthlyPayment}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-[#0033A0] h-2 rounded-full transition-all"
                            style={{ width: `${((loan.amount - loan.balance) / loan.amount) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{((loan.amount - loan.balance) / loan.amount * 100).toFixed(0)}% repaid</span>
                        <span>Next payment: {loan.nextPaymentDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Servicing Options */}
              <div>
                <h2 className="mb-4" style={{ color: '#001A72' }}>Loan Management</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {servicingOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        className="bg-white rounded-2xl p-5 text-left transition-all group border border-border hover:border-[#0033A0]"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-[#0033A0]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-[#0033A0]" />
                          </div>
                          {option.badge && (
                            <span className="px-2 py-0.5 bg-[#0033A0]/10 text-[#0033A0] text-xs rounded-full">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-sm mb-1" style={{ color: '#001A72' }}>{option.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#0033A0]/5 to-[#0033A0]/10 border border-[#0033A0]/20 rounded-2xl p-6">
                <h3 className="mb-4" style={{ color: '#001A72' }}>Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 bg-[#0033A0] text-white rounded-full text-sm hover:bg-[#0033A0]/90 transition-colors">
                    Make a Payment
                  </button>
                  <button className="px-6 py-3 bg-white text-[#0033A0] border-2 border-[#0033A0] rounded-full text-sm hover:bg-[#0033A0]/5 transition-colors">
                    View Statement
                  </button>
                  <button className="px-6 py-3 bg-white text-[#0033A0] border-2 border-[#0033A0] rounded-full text-sm hover:bg-[#0033A0]/5 transition-colors">
                    Download Documents
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Active Loans */
            <div className="bg-white rounded-2xl p-12 text-center border border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2" style={{ color: '#001A72' }}>No Active Loans</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                You don't have any active lending products. Switch to Origination to apply for loans, overdrafts, or credit cards.
              </p>
              <button
                onClick={() => setActiveTab('origination')}
                className="px-6 py-3 bg-[#0033A0] text-white rounded-full text-sm hover:bg-[#0033A0]/90 transition-colors"
              >
                Apply for Lending
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}