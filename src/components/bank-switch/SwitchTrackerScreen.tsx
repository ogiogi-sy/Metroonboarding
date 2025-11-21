import { CheckCircle2, Clock, MessageCircle, FileText } from 'lucide-react';
import { SwitchData } from './BankSwitchFlow';

interface SwitchTrackerScreenProps {
  switchData: SwitchData;
  onComplete: () => void;
  onBackToHome: () => void;
}

export function SwitchTrackerScreen({
  switchData,
  onComplete,
  onBackToHome,
}: SwitchTrackerScreenProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Current step (simulated - in real app would come from backend)
  const currentStep = 2; // 1-4

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back to dashboard
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Track your switch
        </h1>
        <p className="text-muted-foreground">
          Monitor the progress of your account switch to Metro Bank
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-base" style={{ color: '#001A72' }}>
                In Progress
              </h3>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 4</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Completion date</p>
            <p className="text-sm" style={{ color: '#001A72' }}>
              {switchData.switchDate ? formatDate(switchData.switchDate) : '—'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <h3 className="mb-6 text-base" style={{ color: '#001A72' }}>
          Switch Timeline
        </h3>

        <div className="space-y-6">
          {/* Step 1 - Complete */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm" style={{ color: '#001A72' }}>
                  Switch request submitted
                </h4>
                <span className="text-xs text-[#16A34A]">Complete</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Your switch request has been successfully submitted to Metro Bank.
              </p>
              <p className="text-xs text-muted-foreground">Completed on {formatDate(new Date().toISOString())}</p>
            </div>
          </div>

          {/* Step 2 - In Progress */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm" style={{ color: '#001A72' }}>
                  Contacting your old bank
                </h4>
                <span className="text-xs text-accent">In progress</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                We're working with your old bank to prepare the switch.
              </p>
              <p className="text-xs text-muted-foreground">Expected completion: Within 2 working days</p>
            </div>
          </div>

          {/* Step 3 - Pending */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-muted-foreground rounded-full" />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm text-muted-foreground">
                  Transferring payments
                </h4>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Your Direct Debits and Standing Orders will be moved to Metro Bank.
              </p>
              <p className="text-xs text-muted-foreground">Scheduled for: Day 5-6</p>
            </div>
          </div>

          {/* Step 4 - Pending */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-muted-foreground rounded-full" />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm text-muted-foreground">
                  Switch complete
                </h4>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Your account switch will be complete and your old account closed.
              </p>
              <p className="text-xs text-muted-foreground">
                Scheduled for: {switchData.switchDate ? formatDate(switchData.switchDate) : 'Day 7'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Details */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <h3 className="mb-4 text-base" style={{ color: '#001A72' }}>
          Switch Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Switch Reference</p>
            <p className="text-sm" style={{ color: '#001A72' }}>
              {switchData.switchReference}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Switch Type</p>
            <p className="text-sm" style={{ color: '#001A72' }}>
              {switchData.switchType === 'full' ? 'Full Switch (CASS)' : 'Partial Switch'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">From</p>
            <p className="text-sm" style={{ color: '#001A72' }}>
              {switchData.oldAccount.bankName || 'Previous Bank'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">To</p>
            <p className="text-sm" style={{ color: '#001A72' }}>
              Metro Bank
            </p>
          </div>
        </div>
      </div>

      {/* OB Monitoring (if Open Banking was used) */}
      {switchData.method === 'openbanking' && switchData.obData && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm" style={{ color: '#001A72' }}>
                We're monitoring your old account
              </h4>
              <p className="text-sm text-muted-foreground">
                With your Open Banking consent, we'll keep an eye on your old account to catch any
                straggler payments and notify you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Relationship Manager Panel */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">AM</span>
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-sm" style={{ color: '#001A72' }}>
              Your Relationship Manager is monitoring this switch
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Alex Morgan is here to help ensure your switch goes smoothly.
            </p>
            <button className="flex items-center gap-2 text-sm text-accent hover:underline">
              <MessageCircle className="w-4 h-4" />
              Message Alex
            </button>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onComplete}
          className="w-full bg-muted px-8 py-4 rounded-full hover:bg-muted/70 transition-colors text-center"
        >
          Simulate completion (Demo only)
        </button>
        <button
          onClick={onBackToHome}
          className="w-full border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
