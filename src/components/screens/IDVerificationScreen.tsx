import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { SplitLayout } from '../SplitLayout';
import { Camera, Upload, CheckCircle2, AlertCircle, BadgeCheck, Smartphone } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface IDVerificationScreenProps {
  onNext: (data: { idVerified: boolean }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

type VerificationStep = 'intro' | 'device-choice' | 'processing' | 'success';

export function IDVerificationScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: IDVerificationScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState<VerificationStep>('intro');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (verificationStep === 'processing') {
      // Simulate ID verification process
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setVerificationStep('success');
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [verificationStep]);

  const handleStartVerification = () => {
    setVerificationStep('device-choice');
  };

  const handleDeviceChoice = (device: 'phone' | 'computer') => {
    if (device === 'phone') {
      // In a real app, this would send an SMS/email link
      alert('In a real implementation, we would send a secure link to your phone to complete verification.');
    } else {
      // Start verification on computer
      setVerificationStep('processing');
    }
  };

  const handleComplete = () => {
    onNext({ idVerified: true });
  };

  if (verificationStep === 'intro') {
    return (
      <SplitLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabel="Identity verification"
        percentComplete={85}
        minutesRemaining={2}
        onBack={onBack}
        leftHeading="Secure ID verification"
        leftDescription="We use advanced biometric technology to verify your identity quickly and securely, meeting FCA requirements."
        leftIcon={BadgeCheck}
      >
        <div className="mb-8">
          <h2 className="mb-3">Verify your identity</h2>
          <p className="text-muted-foreground">
            To keep your account secure and comply with UK regulations, we need to verify your identity using a government-issued ID.
          </p>
        </div>

        {/* What You'll Need */}
        <div className="bg-white border border-border rounded-xl p-6 mb-8">
          <h4 className="mb-4">What you'll need</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h5 className="mb-1">Valid photo ID</h5>
                <p className="text-xs text-muted-foreground">
                  Passport, driving licence, or national ID card
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h5 className="mb-1">Device with camera</h5>
                <p className="text-xs text-muted-foreground">
                  Phone or computer with webcam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="mb-4">Quick 3-step process</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-accent">1</span>
              </div>
              <div>
                <p className="text-sm mb-1">Take a photo of your ID</p>
                <p className="text-xs text-muted-foreground">We'll guide you through capturing clear images</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-accent">2</span>
              </div>
              <div>
                <p className="text-sm mb-1">Take a selfie</p>
                <p className="text-xs text-muted-foreground">To confirm it's really you</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-accent">3</span>
              </div>
              <div>
                <p className="text-sm mb-1">We verify instantly</p>
                <p className="text-xs text-muted-foreground">Usually takes less than 30 seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm mb-1">Your data is secure</p>
              <p className="text-sm text-muted-foreground">
                We use bank-grade encryption and never store your biometric data. Your ID images are securely deleted after verification.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleStartVerification} className="w-full h-12">
          Start verification
        </Button>

        <SaveExitModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
        />
      </SplitLayout>
    );
  }

  if (verificationStep === 'device-choice') {
    return (
      <SplitLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabel="Identity verification"
        percentComplete={85}
        minutesRemaining={2}
        onBack={onBack}
        leftHeading="Secure ID verification"
        leftDescription="We use advanced biometric technology to verify your identity quickly and securely, meeting FCA requirements."
        leftIcon={BadgeCheck}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="mb-3">Choose your device</h2>
            <p className="text-muted-foreground">
              How would you like to verify your identity?
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleDeviceChoice('phone')}
              className="bg-white border-2 border-border hover:border-accent rounded-xl p-8 text-center transition-all group"
            >
              <Smartphone className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="mb-2">Use your phone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                We'll send a secure link to your phone
              </p>
              <div className="inline-block px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs">
                Recommended
              </div>
            </button>

            <button
              onClick={() => handleDeviceChoice('computer')}
              className="bg-white border-2 border-border hover:border-accent rounded-xl p-8 text-center transition-all group"
            >
              <Camera className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="mb-2">Use this computer</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Continue with your webcam
              </p>
              <span className="text-xs text-muted-foreground">Requires webcam</span>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setVerificationStep('intro')}
              className="text-sm text-accent hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </SplitLayout>
    );
  }

  if (verificationStep === 'processing') {
    const messages = [
      { min: 0, max: 20, text: 'Capturing your ID...' },
      { min: 20, max: 40, text: 'Analyzing document...' },
      { min: 40, max: 60, text: 'Verifying authenticity...' },
      { min: 60, max: 80, text: 'Matching facial features...' },
      { min: 80, max: 100, text: 'Completing verification...' },
    ];

    const currentMessage = messages.find(m => progress >= m.min && progress < m.max)?.text || 'Processing...';

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          {/* Animated Circle */}
          <div className="relative w-32 h-32 mb-8">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="text-accent transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">{Math.round(progress)}%</span>
            </div>
          </div>

          <h2 className="mb-3">Verifying your identity</h2>
          <p className="text-muted-foreground mb-8">
            {currentMessage}
          </p>

          <div className="bg-[#F5F6F8] rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Please don't close this window. This usually takes less than 30 seconds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStep === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#DCFCE7] rounded-full mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
          </div>
          <h1 className="mb-3">Identity verified!</h1>
          <p className="text-muted-foreground mb-8">
            Your identity has been successfully verified. You're almost done with your application.
          </p>

          <div className="bg-white border border-border rounded-xl p-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                <span className="text-sm text-left">Photo ID verified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                <span className="text-sm text-left">Facial match confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                <span className="text-sm text-left">Identity authenticated</span>
              </div>
            </div>
          </div>

          <Button onClick={handleComplete} className="w-full h-12">
            Continue to final review
          </Button>
        </div>
      </div>
    );
  }

  return null;
}