import { CheckCircle2, Eye, Edit3 } from 'lucide-react';
import { OldAccountData, OBData } from './BankSwitchFlow';

interface PreviewOBDataScreenProps {
  oldAccount: OldAccountData;
  obData?: OBData;
  onContinue: () => void;
  onEdit: () => void;
  onBack: () => void;
}

export function PreviewOBDataScreen({
  oldAccount,
  obData,
  onContinue,
  onEdit,
  onBack,
}: PreviewOBDataScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#16A34A]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
          </div>
          <h1 style={{ color: '#001A72' }}>We've found your account details</h1>
        </div>
        <p className="text-muted-foreground">
          Review the information we'll use to set up your switch
        </p>
      </div>

      {/* Old Account Card */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base" style={{ color: '#001A72' }}>
            Account to switch from
          </h3>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bank</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {oldAccount.bankName || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Type</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {oldAccount.accountType || 'Business Current Account'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {oldAccount.sortCode || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {oldAccount.accountNumber || '—'}
              </p>
            </div>
          </div>

          {oldAccount.businessName && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business Name</p>
              <p className="text-sm" style={{ color: '#001A72' }}>
                {oldAccount.businessName}
              </p>
            </div>
          )}

          {oldAccount.balance && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
              <p className="text-base" style={{ color: '#001A72' }}>
                {oldAccount.balance}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Regular Payments Card */}
      {obData && (
        <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-base" style={{ color: '#001A72' }}>
              Regular payments we've detected
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                {obData.directDebits}
              </p>
              <p className="text-xs text-muted-foreground">Direct Debits</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                {obData.standingOrders}
              </p>
              <p className="text-xs text-muted-foreground">Standing Orders</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl mb-1" style={{ color: '#001A72' }}>
                {obData.regularIncomingPayers}
              </p>
              <p className="text-xs text-muted-foreground">Regular Payers</p>
            </div>
          </div>

          <button className="text-sm text-accent hover:underline flex items-center gap-1">
            View detailed list
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-muted-foreground">
          We'll use this information to set up your switch and ensure regular payments keep running smoothly.
        </p>
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
          onClick={onContinue}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
        >
          Continue to switch setup
        </button>
      </div>
    </div>
  );
}
