import { CheckCircle2, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import { SwitchData } from './BankSwitchFlow';

interface SwitchCompleteScreenProps {
  switchData: SwitchData;
  businessData: any;
  onBackToHome: () => void;
}

export function SwitchCompleteScreen({
  switchData,
  businessData,
  onBackToHome,
}: SwitchCompleteScreenProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Celebration */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
        </div>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Your switch is complete!
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Welcome to Metro Bank. Your business account is now fully operational with all your payments
          successfully transferred.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-8 mb-6">
        <h3 className="mb-6 text-base text-center" style={{ color: '#001A72' }}>
          What we moved for you
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {switchData.obData ? (
            <>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                  {switchData.obData.directDebits}
                </p>
                <p className="text-xs text-muted-foreground">Direct Debits</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                  {switchData.obData.standingOrders}
                </p>
                <p className="text-xs text-muted-foreground">Standing Orders</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                </div>
                <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                  {switchData.obData.regularIncomingPayers}
                </p>
                <p className="text-xs text-muted-foreground">Regular Payers</p>
              </div>
            </>
          ) : (
            <div className="col-span-3 text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                All your payments have been successfully transferred
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <strong style={{ color: '#001A72' }}>Payment redirection active:</strong> Any payments sent
            to your old account will be automatically forwarded to Metro for the next 3 years.
          </p>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <h3 className="mb-4 text-base" style={{ color: '#001A72' }}>
          Your Metro Bank Account
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
            <p className="text-base" style={{ color: '#001A72' }}>
              {businessData.sortCode || '04-00-75'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Account Number</p>
            <p className="text-base" style={{ color: '#001A72' }}>
              {businessData.accountNumber || '12345678'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-1">Business Name</p>
            <p className="text-base" style={{ color: '#001A72' }}>
              {businessData.companyName || 'Your Business'}
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <h3 className="mb-4 text-base" style={{ color: '#001A72' }}>
          Make the most of your Metro account
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm mb-0.5" style={{ color: '#001A72' }}>
                  Explore cashflow tools
                </p>
                <p className="text-xs text-muted-foreground">
                  Get insights into your business finances
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm mb-0.5" style={{ color: '#001A72' }}>
                  Set up international payments
                </p>
                <p className="text-xs text-muted-foreground">
                  Send and receive money globally
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#16A34A]/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div className="text-left">
                <p className="text-sm mb-0.5" style={{ color: '#001A72' }}>
                  Explore lending options
                </p>
                <p className="text-xs text-muted-foreground">
                  Fuel your business growth
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onBackToHome}
        className="w-full bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
      >
        Go to your dashboard
      </button>
    </div>
  );
}
