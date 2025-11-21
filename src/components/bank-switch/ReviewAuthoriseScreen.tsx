import { useState } from 'react';
import { ArrowRight, Shield, Eye } from 'lucide-react';
import { SwitchData } from './BankSwitchFlow';

interface ReviewAuthoriseScreenProps {
  switchData: SwitchData;
  businessData: any;
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewAuthoriseScreen({
  switchData,
  businessData,
  onSubmit,
  onBack,
}: ReviewAuthoriseScreenProps) {
  const [confirmDetails, setConfirmDetails] = useState(false);
  const [authoriseSwitch, setAuthoriseSwitch] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const canSubmit = confirmDetails && authoriseSwitch;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Review & authorise your switch
        </h1>
        <p className="text-muted-foreground">
          Check all the details before submitting your switch request
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <h3 className="mb-6 text-base" style={{ color: '#001A72' }}>
          Switch Summary
        </h3>

        {/* From Account */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs text-muted-foreground mb-3">FROM</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bank</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.oldAccount.bankName || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.oldAccount.sortCode}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.oldAccount.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business Name</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.oldAccount.businessName}
              </p>
            </div>
          </div>
        </div>

        {/* To Account */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-xs text-muted-foreground mb-3">TO</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bank</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                Metro Bank
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {businessData.sortCode || '04-00-75'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {businessData.accountNumber || '12345678'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business Name</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {businessData.companyName || 'Your Business'}
              </p>
            </div>
          </div>
        </div>

        {/* Switch Details */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Switch Type</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.switchType === 'full' ? 'Full Switch (CASS)' : 'Partial Switch'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Completion Date</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {switchData.switchDate ? formatDate(switchData.switchDate) : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OB Data (if available) */}
      {switchData.obData && switchData.method === 'openbanking' && (
        <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-base" style={{ color: '#001A72' }}>
              We've identified:
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xl mb-1" style={{ color: '#001A72' }}>
                {switchData.obData.directDebits}
              </p>
              <p className="text-xs text-muted-foreground">Direct Debits</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xl mb-1" style={{ color: '#001A72' }}>
                {switchData.obData.standingOrders}
              </p>
              <p className="text-xs text-muted-foreground">Standing Orders</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xl mb-1" style={{ color: '#001A72' }}>
                {switchData.obData.regularIncomingPayers}
              </p>
              <p className="text-xs text-muted-foreground">Regular Payers</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            These will be moved as part of your switch.
          </p>
          <button className="text-sm text-accent hover:underline">View list</button>
        </div>
      )}

      {/* Authorisation */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <h3 className="mb-4 text-base" style={{ color: '#001A72' }}>
          Authorisation
        </h3>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmDetails}
              onChange={(e) => setConfirmDetails(e.target.checked)}
              className="mt-1 w-5 h-5 border-2 border-border rounded accent-accent cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">
              I confirm that all the details above are correct and match my existing account
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={authoriseSwitch}
              onChange={(e) => setAuthoriseSwitch(e.target.checked)}
              className="mt-1 w-5 h-5 border-2 border-border rounded accent-accent cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">
              I authorise Metro Bank to arrange the switch of my business current account using the
              Current Account Switch Service
            </span>
          </label>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 text-sm" style={{ color: '#001A72' }}>
                Current Account Switch Guarantee
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                This switch is covered by the Current Account Switch Guarantee. If anything goes
                wrong, we'll refund any charges or interest incurred.
              </p>
              <button className="text-sm text-primary hover:underline">
                Read the full guarantee →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-8 py-4 border border-border rounded-full hover:bg-muted/50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Submit switch request</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
