import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Phone, Shield } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface PhoneNumberEntryScreenProps {
  onNext: (data: { phone: string }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

export function PhoneNumberEntryScreen({ 
  onNext, 
  onBack,
  currentStep, 
  totalSteps, 
  initialData 
}: PhoneNumberEntryScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [phone, setPhone] = useState(initialData?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ phone });
  };

  const canSubmit = phone && phone.length >= 10;

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Contact details"
      percentComplete={66}
      minutesRemaining={3}
      onBack={onBack}
      leftHeading="Your mobile number"
      leftDescription="We'll use this to send security notifications and help verify your identity when needed."
      leftIcon={Phone}
    >
      <div className="mb-8">
        <h2 className="mb-3">What's your phone number?</h2>
        <p className="text-muted-foreground">
          We'll send you a verification code via SMS
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              autoFocus
            />
          </div>
          <p className="text-xs text-muted-foreground">
            UK mobile numbers only. Include country code (+44)
          </p>
        </div>

        {/* Purpose Notice */}
        <div className="bg-[#F5F6F8] rounded-lg p-6">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-2">Why we need this</h4>
              <p className="text-xs text-muted-foreground">
                Your phone number is required for account security, fraud prevention, and two-factor authentication. We may also use it to contact you about important account matters.
              </p>
            </div>
          </div>
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