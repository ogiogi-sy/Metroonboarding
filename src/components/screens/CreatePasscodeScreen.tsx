import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { SplitLayout } from '../SplitLayout';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface CreatePasscodeScreenProps {
  onNext: (data: { passcode: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export function CreatePasscodeScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: CreatePasscodeScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [passcode, setPasscode] = useState(['', '', '', '', '', '', '', '']);
  const [confirmPasscode, setConfirmPasscode] = useState(['', '', '', '', '', '', '', '']);
  const [isConfirming, setIsConfirming] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const passcodeString = passcode.join('');
  const confirmPasscodeString = confirmPasscode.join('');
  const isPasscodeComplete = passcodeString.length === 8 && /^\d{8}$/.test(passcodeString);
  const isConfirmComplete = confirmPasscodeString.length === 8 && /^\d{8}$/.test(confirmPasscodeString);
  const passcodesMatch = passcodeString === confirmPasscodeString && isConfirmComplete;

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handlePasscodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newPasscode = isConfirming ? [...confirmPasscode] : [...passcode];
    newPasscode[index] = value.slice(-1); // Only take last character
    
    if (isConfirming) {
      setConfirmPasscode(newPasscode);
    } else {
      setPasscode(newPasscode);
    }

    // Auto-focus next input
    if (value && index < 7) {
      const nextIndex = isConfirming ? index + 8 : index;
      inputRefs.current[nextIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const currentPasscode = isConfirming ? [...confirmPasscode] : [...passcode];
      
      if (!currentPasscode[index] && index > 0) {
        // If current input is empty, delete previous and focus it
        const prevIndex = isConfirming ? index + 8 - 1 : index - 1;
        inputRefs.current[prevIndex]?.focus();
        currentPasscode[index - 1] = '';
        
        if (isConfirming) {
          setConfirmPasscode(currentPasscode);
        } else {
          setPasscode(currentPasscode);
        }
      } else {
        // Clear current input
        currentPasscode[index] = '';
        if (isConfirming) {
          setConfirmPasscode(currentPasscode);
        } else {
          setPasscode(currentPasscode);
        }
      }
    }
  };

  const handleContinueToConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      inputRefs.current[8]?.focus();
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodesMatch) {
      onNext({ passcode: passcodeString });
    }
  };

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Create passcode"
      percentComplete={77}
      minutesRemaining={2}
      onBack={onBack}
      leftHeading="Your passcode"
      leftDescription="This 8-digit passcode adds an extra layer of security for phone banking and account verification."
      leftIcon={KeyRound}
    >
      <div className="mb-8 text-center">
        <h2 className="mb-3">Create your 8-digit passcode</h2>
        <p className="text-muted-foreground">
          You'll use this passcode for phone banking and additional security verification
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Create Passcode */}
        <div className="bg-white border border-border rounded-xl p-6">
          <div className="mb-6">
            <h4 className="text-center mb-4">
              {isConfirming ? 'Confirm your passcode' : 'Enter your passcode'}
            </h4>
            <div className="flex justify-center gap-2 mb-4">
              {(isConfirming ? confirmPasscode : passcode).map((digit, index) => {
                const actualIndex = isConfirming ? index + 8 : index;
                return (
                  <input
                    key={actualIndex}
                    ref={(el) => (inputRefs.current[actualIndex] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePasscodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center border-2 border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
                    disabled={!isConfirming && isPasscodeComplete && passcode[index] !== ''}
                  />
                );
              })}
            </div>

            {!isConfirming && isPasscodeComplete && (
              <div className="text-center">
                <p className="text-sm text-[#16A34A] flex items-center justify-center gap-1 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Passcode created
                </p>
                <Button 
                  type="button" 
                  onClick={handleContinueToConfirm}
                  className="w-full"
                >
                  Continue to confirm
                </Button>
              </div>
            )}

            {isConfirming && !isConfirmComplete && (
              <p className="text-sm text-center text-muted-foreground">
                Re-enter your passcode to confirm
              </p>
            )}

            {isConfirming && isConfirmComplete && !passcodesMatch && (
              <p className="text-sm text-center text-primary">
                Passcodes don't match. Please try again.
              </p>
            )}

            {passcodesMatch && (
              <div className="text-center">
                <p className="text-sm text-[#16A34A] flex items-center justify-center gap-1 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Passcodes match!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-[#F5F6F8] rounded-xl p-6">
          <h4 className="mb-2">Passcode tips</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Avoid obvious numbers like 12345678 or your date of birth</li>
            <li>• Don't use the same passcode as other accounts</li>
            <li>• Keep your passcode private and secure</li>
          </ul>
        </div>

        {isConfirming && (
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!passcodesMatch}
          >
            Continue
          </Button>
        )}

        {isConfirming && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsConfirming(false);
                setConfirmPasscode(['', '', '', '', '', '', '', '']);
                setTimeout(() => inputRefs.current[0]?.focus(), 100);
              }}
              className="text-sm text-accent hover:underline"
            >
              Change passcode
            </button>
          </div>
        )}
      </form>
    </SplitLayout>
  );
}