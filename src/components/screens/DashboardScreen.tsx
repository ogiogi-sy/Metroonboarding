import { Button } from '../ui/button';
import { ArrowRight, ArrowUpRight, ArrowDownLeft, Copy, Download, Share2, TrendingUp, Package, Shield, CreditCard, ChevronRight, AlertCircle, Sparkles, DollarSign, Plus, Send } from 'lucide-react';
import { HelpWidget } from '../HelpWidget';
import { toast } from 'sonner';

interface DashboardScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  completedCategories?: {
    plan: boolean;
    funding: boolean;
    payments: boolean;
    compliance: boolean;
  };
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

const CATEGORY_NUDGES = [
  {
    id: 'plan' as const,
    title: 'Choose Your Banking Plan',
    description: 'Unlock features tailored to your business needs',
    icon: Package,
    color: 'bg-[#0046AD]/10',
    iconColor: 'text-[#0046AD]',
    ctaText: 'Select Plan',
  },
  {
    id: 'funding' as const,
    title: 'Explore Growth & Funding',
    description: 'Access lending and liquidity solutions',
    icon: TrendingUp,
    color: 'bg-[#DE1927]/10',
    iconColor: 'text-[#DE1927]',
    ctaText: 'Explore Options',
  },
  {
    id: 'payments' as const,
    title: 'Set Up Payment Tools',
    description: 'International payments and business cards',
    icon: Send,
    color: 'bg-[#7C3AED]/10',
    iconColor: 'text-[#7C3AED]',
    ctaText: 'Set Up Payments',
  },
  {
    id: 'compliance' as const,
    title: 'Configure Controls & Compliance',
    description: 'Manage permissions and compliance tools',
    icon: Shield,
    color: 'bg-[#16A34A]/10',
    iconColor: 'text-[#16A34A]',
    ctaText: 'Configure',
  },
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    type: 'credit',
    description: 'Metro Bank - Account Opening Bonus',
    amount: 100.00,
    date: 'Today',
    status: 'completed',
  },
  {
    id: 2,
    type: 'debit',
    description: 'Initial Deposit',
    amount: -100.00,
    date: 'Today',
    status: 'completed',
  },
];

export function DashboardScreen({
  onNavigate,
  businessData,
  completedCategories = {
    plan: false,
    funding: false,
    payments: false,
    compliance: false,
  },
}: DashboardScreenProps) {
  const sortCode = businessData.sortCode || '04-00-75';
  const accountNumber = businessData.accountNumber || '12345678';
  const companyName = businessData.companyName || 'Your Business';
  const balance = 0.00; // Starting balance

  const handleCopyDetails = () => {
     const details = `Account Name: ${companyName}\nAccount Number: ${accountNumber}\nSort Code: ${sortCode}`;
     navigator.clipboard.writeText(details).then(() => {
       toast.success("Account details copied");
     }).catch(() => {
       // Fallback
       try {
         const textArea = document.createElement("textarea");
         textArea.value = details;
         textArea.style.position = "fixed";
         textArea.style.left = "-9999px";
         document.body.appendChild(textArea);
         textArea.focus();
         textArea.select();
         document.execCommand('copy');
         document.body.removeChild(textArea);
         toast.success("Account details copied");
       } catch (err) {
         toast.error("Failed to copy details");
       }
     });
  };

  const incompleteCategories = CATEGORY_NUDGES.filter(
    (category) => !completedCategories[category.id]
  );

  const allComplete = incompleteCategories.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">{companyName}</h1>
              <p className="text-sm text-muted-foreground">
                Business Current Account
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate('home')}
              size="sm"
            >
              Enhance Account
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Incomplete Setup Banner */}
        {!allComplete && (
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Complete Your Banking Setup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You have {incompleteCategories.length} {incompleteCategories.length === 1 ? 'area' : 'areas'} to configure. 
                  Complete your setup to unlock the full power of Metro Banking.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onNavigate('home')}
                    size="sm"
                  >
                    Continue Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Balance Card */}
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                <h2 className="text-4xl mb-4">
                  £{balance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Sort Code: {sortCode}</span>
                  <span>•</span>
                  <span>Account: {accountNumber}</span>
                </div>
              </div>

              {/* Quick Actions - UPDATED */}
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all"
                  onClick={handleCopyDetails}
                >
                  <Copy className="w-5 h-5" />
                  <span className="text-xs text-center">Copy details</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all"
                  onClick={() => toast.success("Statement downloading...")}
                >
                  <Download className="w-5 h-5" />
                  <span className="text-xs text-center">Download statement</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all"
                  onClick={() => toast.success("Payment instructions shared")}
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs text-center">Share instructions</span>
                </Button>
              </div>
            </div>

            {/* Lending CTA Card */}
            <div
              onClick={() => onNavigate('lending')}
              className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 rounded-xl p-6 cursor-pointer hover:border-accent hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 group-hover:text-accent transition-colors">
                    Apply for a business loan
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get funding to grow your business. Quick assessment in 3-5 minutes with no impact on your credit score.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span>£5K - £500K available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span>From 6-60 months</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Recent Transactions</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('account-transactions')}
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {RECENT_TRANSACTIONS.length > 0 ? (
                  RECENT_TRANSACTIONS.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit'
                              ? 'bg-[#16A34A]/10'
                              : 'bg-muted'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="w-5 h-5 text-[#16A34A]" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm ${
                            transaction.type === 'credit'
                              ? 'text-[#16A34A]'
                              : 'text-foreground'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : ''}
                          £{Math.abs(transaction.amount).toLocaleString('en-GB', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No transactions yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Nudges */}
          <div className="space-y-4">
            {!allComplete && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm">Complete Your Setup</h3>
                  <span className="text-xs text-muted-foreground">
                    {CATEGORY_NUDGES.length - incompleteCategories.length}/{CATEGORY_NUDGES.length} done
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{
                        width: `${((CATEGORY_NUDGES.length - incompleteCategories.length) / CATEGORY_NUDGES.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Nudge Cards */}
            {allComplete ? (
              <div className="bg-[#DCFCE7] border border-[#16A34A]/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2 text-[#16A34A]">All Set!</h4>
                <p className="text-sm text-muted-foreground">
                  You've completed your banking setup. Your account is fully configured.
                </p>
              </div>
            ) : (
              incompleteCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onNavigate(category.id)}
                  className="w-full bg-white border border-border rounded-xl p-4 text-left hover:border-accent hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm group-hover:text-accent transition-colors">
                          {category.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-accent transition-colors" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <div className="text-xs text-accent">
                        {category.ctaText} →
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}

            {/* Support Card */}
            <div className="bg-[#F5F6F8] rounded-xl p-6 mt-6">
              <h4 className="mb-2 text-sm">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Our business banking team is here to support you.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help Widget */}
      <HelpWidget stepLabel="Dashboard" />
    </div>
  );
}