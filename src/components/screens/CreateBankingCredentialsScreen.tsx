import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Lock, Eye, EyeOff, CheckCircle2, X, Shield } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface CreateBankingCredentialsScreenProps {
  onNext: (data: { password: string; passcode: string }) => void;
  currentStep: number;
  totalSteps: number;
  initialEmail?: string;
}

export function CreateBankingCredentialsScreen({
  onNext,
  currentStep,
  totalSteps,
  initialEmail,
}: CreateBankingCredentialsScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
  ];

  const passcodeRequirements = [
    { label: 'Exactly 8 digits', met: passcode.length === 8 && /^\d+$/.test(passcode) },
    { label: 'No repeating digits (e.g. 11111111)', met: passcode.length === 8 && !/^(\d)\1+$/.test(passcode) },
    { label: 'No sequential digits (e.g. 12345678)', met: passcode.length === 8 && !/01234567|12345678|23456789|87654321|76543210/.test(passcode) },
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const passcodesMatch = passcode === confirmPasscode && confirmPasscode.length > 0;
  const allPasswordRequirementsMet = passwordRequirements.every(req => req.met);
  const allPasscodeRequirementsMet = passcodeRequirements.every(req => req.met);
  const canSubmit = passwordsMatch && passcodesMatch && allPasswordRequirementsMet && allPasscodeRequirementsMet;

  const handlePasscodeChange = (value: string, setter: (value: string) => void) => {
    // Only allow digits and max 8 characters
    if (value === '' || (/^\d+$/.test(value) && value.length <= 8)) {
      setter(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onNext({ password, passcode });
    }
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Banking credentials"
      percentComplete={67}
      minutesRemaining={3}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Create your banking credentials</h2>
          <p className="text-muted-foreground">
            Set up your password and passcode for Business Online Banking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Login Email (Display Only) */}
          {initialEmail && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">You'll log in with</p>
              <p className="font-mono">{initialEmail}</p>
            </div>
          )}

          {/* Password Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm text-primary">1</span>
              </div>
              <h3>Create your password</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {password && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs">Password must have:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={req.met ? 'text-[#16A34A]' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              {confirmPassword && (
                <p className={`text-xs flex items-center gap-2 ${passwordsMatch ? 'text-[#16A34A]' : 'text-destructive'}`}>
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Passwords don't match
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Passcode Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm text-primary">2</span>
              </div>
              <h3>Create your 8-digit passcode</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passcode">Passcode</Label>
              <Input
                id="passcode"
                type="text"
                inputMode="numeric"
                placeholder="Enter 8 digits"
                value={passcode}
                onChange={(e) => handlePasscodeChange(e.target.value, setPasscode)}
                required
                maxLength={8}
                className="text-2xl tracking-widest text-center font-mono"
              />
              <p className="text-xs text-muted-foreground">
                You'll use this to authorize transactions and access secure features
              </p>

              {passcode && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs">Passcode must:</p>
                  {passcodeRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={req.met ? 'text-[#16A34A]' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPasscode">Confirm passcode</Label>
              <Input
                id="confirmPasscode"
                type="text"
                inputMode="numeric"
                placeholder="Re-enter your passcode"
                value={confirmPasscode}
                onChange={(e) => handlePasscodeChange(e.target.value, setConfirmPasscode)}
                required
                maxLength={8}
                className="text-2xl tracking-widest text-center font-mono"
              />
              {confirmPasscode && (
                <p className={`text-xs flex items-center gap-2 ${passcodesMatch ? 'text-[#16A34A]' : 'text-destructive'}`}>
                  {passcodesMatch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Passcodes match
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Passcodes don't match
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-[#F5F6F8] rounded-lg p-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="mb-2">Keep your credentials safe</h4>
                <p className="text-xs text-muted-foreground">
                  Never share your password or passcode with anyone. Metro Bank will never ask for these via email or phone. Your credentials are encrypted and stored securely.
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
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}