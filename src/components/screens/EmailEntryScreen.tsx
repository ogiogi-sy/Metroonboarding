import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Mail, Shield } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface EmailEntryScreenProps {
  onNext: (data: { email: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

export function EmailEntryScreen({ 
  onNext,
  onBack,
  currentStep, 
  totalSteps,
  initialData
}: EmailEntryScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [email, setEmail] = useState(initialData?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ email });
  };

  const canSubmit = email && email.includes('@');

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Contact details"
      percentComplete={62}
      minutesRemaining={4}
      onBack={onBack}
      leftHeading="Your secure email"
      leftDescription="We'll use this to send important account notifications and keep your business banking secure."
      leftIcon={Mail}
    >
      <div className="mb-8">
        <h2 className="mb-3">What's your email address?</h2>
        <p className="text-muted-foreground">
          We'll send you a verification code to confirm it's you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        {/* Purpose Notice */}
        <div className="bg-[#F5F6F8] rounded-lg p-6">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-2">How we'll use this</h4>
              <p className="text-xs text-muted-foreground">
                We'll use your email to save your progress, verify your identity, and send you secure links to continue your application. Your data is encrypted and secure.
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Auto-save enabled</strong><br />
            From this point forward, your progress is automatically saved. You can exit and return anytime using the email you provide.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSaveModal(true)}
            className="flex-1"
          >
            Save & Exit
          </Button>
          <Button 
            type="submit"
            disabled={!canSubmit}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </form>
    </SplitLayout>
  );
}