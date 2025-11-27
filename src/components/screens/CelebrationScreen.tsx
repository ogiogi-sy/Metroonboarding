import { CheckCircle2, Copy, TrendingUp, CreditCard, Settings, Grid3x3, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { HelpWidget } from '../HelpWidget';

interface CelebrationScreenProps {
  sortCode: string;
  accountNumber: string;
  companyName: string;
  onContinue: () => void;
}

export function CelebrationScreen({ sortCode, accountNumber, companyName, onContinue }: CelebrationScreenProps) {
  const [copied, setCopied] = useState<'sortCode' | 'accountNumber' | null>(null);

  const copyToClipboard = (text: string, type: 'sortCode' | 'accountNumber') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const setupCards = [
    {
      id: 'banking-plan',
      icon: Grid3x3,
      title: 'Banking Plan',
      description: 'Select features tailored to your business needs',
      badge: 'Recommended',
      badgeColor: 'text-[#0033A0] bg-[#0033A0]/10',
      action: () => onContinue()
    },
    {
      id: 'growth-funding',
      icon: TrendingUp,
      title: 'Liquidity +',
      description: 'Cashflow insights and the credit in one place',
      badge: 'Pre-qualified',
      badgeColor: 'text-[#16A34A] bg-[#16A34A]/10',
      action: () => console.log('Navigate to growth & funding')
    },
    {
      id: 'payment-tools',
      icon: CreditCard,
      title: 'Payment Tools',
      description: 'Setup international payments and cards',
      badge: null,
      badgeColor: '',
      action: () => console.log('Navigate to payment tools')
    },
    {
      id: 'controls',
      icon: Settings,
      title: 'Controls',
      description: 'Manage permissions and compliance',
      badge: null,
      badgeColor: '',
      action: () => console.log('Navigate to controls')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
          {/* Left Content */}
          <div>
            {/* Account Verified Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-full mb-8">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span className="text-sm text-[#16A34A]">Account Verified</span>
            </div>

            {/* Headline */}
            <h1 className="text-[#001A72] text-5xl mb-6">
              You're all set,<br />
              <span className="text-[#0033A0]">{companyName}</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground max-w-lg">
              Your corporate current account is active. You now have full access to our global banking infrastructure.
            </p>
          </div>

          {/* Right - Card with Account Details */}
          <div className="relative">
            {/* Card */}
            <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl overflow-hidden p-10">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between text-white">
                {/* Top */}
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Business</p>
                  <p className="text-xl tracking-wide">Metro Bank</p>
                </div>

                {/* Middle - Card Number */}
                <div>
                  <p className="text-xs text-white/60 mb-2">Card Number</p>
                  <p className="text-2xl tracking-[0.3em]">• • • •   • • • •   • • • •   {accountNumber.slice(-4)}</p>
                </div>

                {/* Bottom */}
                <div className="flex items-end justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate uppercase tracking-wider">{companyName}</p>
                  </div>
                  <div className="flex items-center ml-4 flex-shrink-0">
                    <div className="relative w-12 h-12">
                      <div className="absolute left-0 w-7 h-7 bg-[#EB001B] rounded-full" />
                      <div className="absolute right-0 w-7 h-7 bg-[#F79E1B] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Overlay */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Account Details</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
                  <div className="flex items-center group">
                    <p className="text-xl tracking-wider">{sortCode}</p>
                    <button
                      onClick={() => copyToClipboard(sortCode, 'sortCode')}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-[#0033A0]"
                    >
                      {copied === 'sortCode' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                  <div className="flex items-center group">
                    <p className="text-xl tracking-wider">{accountNumber}</p>
                    <button
                      onClick={() => copyToClipboard(accountNumber, 'accountNumber')}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-[#0033A0]"
                    >
                      {copied === 'accountNumber' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Setup Section */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="mb-2">Complete Setup</h2>
              <p className="text-muted-foreground">4 steps to unlock full potential</p>
            </div>
            <div className="text-sm text-muted-foreground">
              0/4 Completed
            </div>
          </div>

          {/* Setup Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupCards.map((card) => (
              <button
                key={card.id}
                onClick={card.action}
                className="bg-white border border-border rounded-2xl p-6 text-left hover:border-[#0033A0] transition-all group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#0033A0]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0033A0]/20 transition-colors">
                  <card.icon className="w-6 h-6 text-[#0033A0]" />
                </div>

                {/* Content */}
                <h3 className="text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {card.description}
                </p>

                {/* Badge */}
                {card.badge && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs ${card.badgeColor}`}>
                    {card.badge}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ready to Start Banking */}
        <div className="mt-16 bg-[#F0F4FF] rounded-2xl p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-[#001A72] text-xl mb-3">Ready to start banking?</h3>
              <p className="text-muted-foreground max-w-xl">
                You can skip this setup and go straight to your dashboard. You can always return to customize your account later.
              </p>
            </div>

            {/* Right Button */}
            <div className="lg:text-right">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0033A0] rounded-full border-2 border-[#0033A0] hover:bg-[#0033A0] hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Skip to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help Widget */}
      <HelpWidget currentStep={13} stepLabel="Account Opened" />
    </div>
  );
}