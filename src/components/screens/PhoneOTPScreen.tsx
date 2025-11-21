import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SplitLayout } from '../SplitLayout';
import { Phone, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface PhoneOTPScreenProps {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  phone: string;
}

export function PhoneOTPScreen({ 
  onNext,
  onBack,
  currentStep, 
  totalSteps,
  phone 
}: PhoneOTPScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = () => {
    setResendCooldown(30);
    // Simulate sending OTP
    console.log('Resending OTP to:', phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      onNext();
    }, 1500);
  };

  const canSubmit = otp.every(digit => digit !== '');

  // Mask phone number for display
  const maskedPhone = phone.replace(/(\+\d{2})\s?(\d{4})\s?(\d+)/, '$1 **** $3');

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Verify phone"
      percentComplete={68}
      minutesRemaining={3}
      onBack={onBack}
      leftHeading="Phone verification"
      leftDescription="This security check helps us prevent fraud and ensures we can contact you about important account matters."
      leftIcon={ShieldCheck}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Check your phone</h2>
          <p className="text-muted-foreground">
            We've sent a 6-digit code via SMS to {maskedPhone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-3">
            <label className="block text-sm text-center text-muted-foreground">
              Enter verification code
            </label>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {resendCooldown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in {resendCooldown}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-accent hover:underline inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resend code
              </button>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-[#F5F6F8] rounded-lg p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  SMS messages can take a few moments to arrive. The code is valid for 10 minutes.
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
              disabled={!canSubmit || isVerifying}
              className="flex-1"
            >
              {isVerifying ? 'Verifying...' : 'Verify phone'}
            </Button>
          </div>
        </form>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </SplitLayout>
  );
}