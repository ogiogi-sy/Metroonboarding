import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Mail, CheckCircle2 } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface AccountCreationScreenProps {
  onNext: (email: string) => void;
  currentStep: number;
  onSaveExit?: () => void;
}

export function AccountCreationScreen({ onNext, currentStep, onSaveExit }: AccountCreationScreenProps) {
  const [email, setEmail] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNext(email);
    }
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      stepLabel="Create your account"
      percentComplete={15}
      minutesRemaining={7}
      onSaveExit={() => setShowSaveModal(true)}
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FDECEE] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="mb-3">Create your account</h2>
          <p className="text-muted-foreground">
            Enter your email to get started. We'll send you a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              We'll use this to keep you updated on your application
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSaveModal(true)}
              className="flex-1 h-11"
            >
              Save & Exit
            </Button>
            <Button
              type="submit"
              disabled={!email}
              className="flex-1 h-11"
            >
              Continue
            </Button>
          </div>
        </form>

        <div className="mt-8 p-6 bg-[#F5F6F8] rounded-xl">
          <h4 className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            Your data is safe
          </h4>
          <p className="text-sm text-muted-foreground">
            We use bank-level encryption to protect your information.
            Your data is never shared without your consent.
          </p>
        </div>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}