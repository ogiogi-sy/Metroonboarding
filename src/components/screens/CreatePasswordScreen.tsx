import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Lock, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface CreatePasswordScreenProps {
  onNext: (data: { password: string }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  initialEmail?: string;
}

export function CreatePasswordScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
  initialEmail,
}: CreatePasswordScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /[0-9]/.test(password) },
    { label: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allRequirementsMet && passwordsMatch) {
      onNext({ password });
    }
  };

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Create password"
      percentComplete={70}
      minutesRemaining={3}
      onBack={onBack}
      leftHeading="Secure your account"
      leftDescription="Your password protects your business banking. We require a strong password to keep your account safe."
      leftIcon={Lock}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Create your password</h2>
          <p className="text-muted-foreground">
            You'll use this password along with {initialEmail || 'your email'} to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Field */}
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="mb-6">
              <Label htmlFor="password" className="mb-2">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Password must include:</p>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={req.met ? 'text-[#16A34A]' : 'text-muted-foreground'}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="bg-white border border-border rounded-xl p-6">
            <Label htmlFor="confirmPassword" className="mb-2">Confirm password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="text-sm text-primary mt-2 flex items-center gap-1">
                <X className="w-4 h-4" />
                Passwords don't match
              </p>
            )}
            {passwordsMatch && (
              <p className="text-sm text-[#16A34A] mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Passwords match
              </p>
            )}
          </div>

          {/* Security Note */}
          <div className="bg-[#F5F6F8] rounded-xl p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Keep your password secure and don't share it with anyone. We'll never ask for your password via email or phone.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!allRequirementsMet || !passwordsMatch}
          >
            Continue
          </Button>
        </form>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        userEmail={initialEmail}
      />
    </SplitLayout>
  );
}