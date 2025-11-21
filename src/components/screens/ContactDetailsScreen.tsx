import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Mail, Phone, Shield } from 'lucide-react';

interface ContactDetailsScreenProps {
  onNext: (data: { email: string; phone: string }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

export function ContactDetailsScreen({ onNext, currentStep, totalSteps, initialData }: ContactDetailsScreenProps) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ email, phone });
  };

  const canSubmit = email && phone;

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Contact details"
      percentComplete={8}
      minutesRemaining={9}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">How can we reach you?</h2>
          <p className="text-muted-foreground">
            We'll use this to save your progress and keep you updated
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
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+44 7700 900000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="pl-10"
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
                  We'll use this to save your progress, verify your identity when needed, and send you secure links to continue your application. Your data is encrypted and secure.
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

          {/* Action Button */}
          <Button 
            type="submit"
            disabled={!canSubmit}
            className="w-full"
          >
            Continue
          </Button>
        </form>
      </div>
    </ScreenContainer>
  );
}