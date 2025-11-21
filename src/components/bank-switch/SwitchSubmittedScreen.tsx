import { CheckCircle2, Calendar, FileText } from 'lucide-react';
import { SwitchData } from './BankSwitchFlow';

interface SwitchSubmittedScreenProps {
  switchData: SwitchData;
  onViewTracker: () => void;
  onBackToHome: () => void;
}

export function SwitchSubmittedScreen({
  switchData,
  onViewTracker,
  onBackToHome,
}: SwitchSubmittedScreenProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
        </div>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Your switch is on its way
        </h1>
        <p className="text-muted-foreground">
          We've received your switch request and the process has begun
        </p>
      </div>

      {/* Reference Card */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base" style={{ color: '#001A72' }}>
            Switch Reference
          </h3>
          <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
            {switchData.switchReference}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Keep this reference number for your records. You can use it to track your switch or contact
          support if needed.
        </p>
      </div>

      {/* Timeline Card */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-base" style={{ color: '#001A72' }}>
              Completion Date
            </h3>
            <p className="text-sm text-muted-foreground">
              {switchData.switchDate ? formatDate(switchData.switchDate) : '—'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Timeline Steps */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>
                Switch request submitted
              </p>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>
                Contacting your old bank
              </p>
              <p className="text-xs text-muted-foreground">Within 2 working days</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>
                Transferring payments
              </p>
              <p className="text-xs text-muted-foreground">Day 5-6</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>
                Switch complete
              </p>
              <p className="text-xs text-muted-foreground">
                {switchData.switchDate ? formatDate(switchData.switchDate) : 'Day 7'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <h3 className="mb-4 text-base" style={{ color: '#001A72' }}>
          What happens next
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
              1
            </span>
            <span>We'll contact your old bank to initiate the switch</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
              2
            </span>
            <span>Your Direct Debits and Standing Orders will be transferred automatically</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
              3
            </span>
            <span>Incoming payments will be redirected to your new Metro account for 3 years</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
              4
            </span>
            <span>We'll notify you when the switch is complete</span>
          </li>
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onViewTracker}
          className="w-full bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
        >
          Track your switch progress
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
