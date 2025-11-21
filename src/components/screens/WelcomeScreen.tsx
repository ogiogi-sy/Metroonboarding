import { Button } from '../ui/button';
import { Clock, CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';
import { HelpWidget } from '../HelpWidget';

interface WelcomeScreenProps {
  onStart: () => void;
  phase: 1 | 2;
}

export function WelcomeScreen({ onStart, phase }: WelcomeScreenProps) {
  if (phase === 2) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <CreditCard className="w-10 h-10 text-primary" />
          </div>
          <h1 className="mb-4">Let's open your Business Current Account</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <Clock className="w-5 h-5" />
            <p>This takes about 10 minutes</p>
          </div>
        </div>



        {/* What You'll Get */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-[#F5F6F8] rounded-xl p-6">
            <h4 className="mb-4">Once your account is open</h4>
            <p className="text-sm text-muted-foreground mb-4">
              You can explore lending, liquidity facilities, international tools, and business add-ons to grow your business.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Instant access to your sort code and account number</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Start receiving payments immediately</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Digital banking access ready to use</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Need */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="mb-6 text-center">What you'll need</h3>
          <div className="bg-white border border-border rounded-xl p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Your Companies House number (we'll autofill your business details)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Director and company officer information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Photo ID for identity verification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic business information (turnover, employees)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStart}
            className="w-full h-12 group"
          >
            <span>Open a Business Account</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Your progress is automatically saved. You can return anytime to complete your application.
          </p>
        </div>
      </div>
      
      {/* Help Widget */}
      <HelpWidget currentStep={1} stepLabel="Welcome" />
    </div>
  );
}