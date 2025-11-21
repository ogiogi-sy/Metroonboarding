import { ReactNode } from 'react';
import { ApplicationProgress } from './ApplicationProgress';
import { LendingProgress } from './LendingProgress';
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import { HelpWidget } from './HelpWidget';

interface ScreenContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps?: number;
  stepLabel: string;
  percentComplete: number;
  minutesRemaining: number;
  showProgress?: boolean;
  onSaveExit?: () => void;
  onRestart?: () => void;
  flowType?: 'onboarding' | 'lending';
}

export function ScreenContainer({
  children,
  currentStep,
  totalSteps = 10,
  stepLabel,
  percentComplete,
  minutesRemaining,
  showProgress = true,
  onSaveExit,
  onRestart,
  flowType = 'onboarding',
}: ScreenContainerProps) {
  const ProgressComponent = flowType === 'lending' ? LendingProgress : ApplicationProgress;

  return (
    <div className="min-h-screen bg-background">
      {showProgress && (
        <ProgressComponent
          currentStep={currentStep}
          totalSteps={totalSteps}
          estimatedMinutes={minutesRemaining}
          percentComplete={percentComplete}
          stepLabel={stepLabel}
          onRestart={onRestart}
        />
      )}
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        {children}
      </div>
      
      {/* Help Widget - always present */}
      <HelpWidget currentStep={currentStep} stepLabel={stepLabel} onRestart={onRestart} />
    </div>
  );
}