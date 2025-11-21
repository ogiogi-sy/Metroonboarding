import { Button } from '../ui/button';
import { CheckCircle2, Shield, Zap, Lock, ArrowRight, FileText } from 'lucide-react';

interface OpenBankingScreenProps {
  onConnect: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function OpenBankingScreen({ onConnect, onSkip, onBack }: OpenBankingScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="mb-2">Connect your business bank account</h2>
        <p className="text-muted-foreground">
          Highly recommended for faster decisions and higher approval rates
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h4 className="mb-4">Why connect your account?</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Instant verification</h4>
              <p className="text-xs text-muted-foreground">
                We can instantly verify your business performance and cashflow
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Higher approval chances</h4>
              <p className="text-xs text-muted-foreground">
                Real-time data gives us confidence to offer better terms
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Skip document uploads</h4>
              <p className="text-xs text-muted-foreground">
                No need to manually upload bank statements or accounts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-[#0033A0] flex-shrink-0" />
          <div>
            <h4 className="mb-2">Your data is secure</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>No impact on your credit score</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Read-only access for 90 days</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>You stay in control at all times</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Encrypted and never shared outside lending assessment</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>You can revoke access anytime</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-start gap-2">
          <Lock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            We use Open Banking, a secure technology regulated by the FCA. Your login credentials are never shared with us.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <h4 className="mb-4">How it works</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div className="pt-1">
              <p className="text-sm">Select your bank from our secure list</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div className="pt-1">
              <p className="text-sm">Log in using your bank's own login page</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div className="pt-1">
              <p className="text-sm">Authorize read-only access for 90 days</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              4
            </div>
            <div className="pt-1">
              <p className="text-sm">We'll analyze your data and provide a decision</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={onConnect} className="w-full h-12 group">
          <span>Connect my account (recommended)</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button variant="outline" onClick={onSkip} className="w-full h-12">
          Skip for now (manual upload)
        </Button>

        <Button variant="ghost" onClick={onBack} className="w-full">
          Back
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        By connecting your account, you agree to share your business banking data with Metro Bank for lending assessment purposes only.
      </p>
    </div>
  );
}