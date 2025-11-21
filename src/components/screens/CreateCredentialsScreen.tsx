import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Lock, Mail, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface CreateCredentialsScreenProps {
  onNext: (data: { email: string; password: string }) => void;
  currentStep: number;
  totalSteps: number;
}

export function CreateCredentialsScreen({ onNext, currentStep, totalSteps }: CreateCredentialsScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const canSubmit = email && allRequirementsMet && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onNext({ email, password });
    }
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Create your login"
      percentComplete={14}
      minutesRemaining={9}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Create your login credentials</h2>
          <p className="text-muted-foreground">
            You'll use these to access your business account and banking tools
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
            <p className="text-xs text-muted-foreground">
              We'll send important account updates to this email
            </p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Create password</Label>
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

            {/* Password Requirements */}
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

          {/* Confirm Password */}
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

          {/* Security Notice */}
          <div className="bg-[#F5F6F8] rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Security tip:</strong> Never share your password with anyone. Metro Bank will never ask for your password via email or phone.
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
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}