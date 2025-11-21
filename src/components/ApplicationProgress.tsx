import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Clock } from 'lucide-react';

interface ProgressStep {
  id: number;
  title: string;
  description: string;
}

interface ApplicationProgressProps {
  currentStep: number;
  totalSteps: number;
  percentComplete: number;
  minutesRemaining: number;
  stepLabel: string;
}

const PROGRESS_STEPS: ProgressStep[] = [
  {
    id: 1,
    title: 'Business information',
    description: 'Company lookup and confirmation',
  },
  {
    id: 2,
    title: 'Persons',
    description: 'Directors and key account parties',
  },
  {
    id: 3,
    title: 'Credentials',
    description: 'Contact details, password and passcode',
  },
  {
    id: 4,
    title: 'Business details',
    description: 'Turnover, employees, and operations',
  },
  {
    id: 5,
    title: 'ID verification',
    description: 'Identity verification process',
  },
  {
    id: 6,
    title: 'Review & submit',
    description: 'Final review and submission',
  },
];

// Map actual steps to progress sections
// 1. Business information - Steps 1-2 (Find your business, Is this your business)
// 2. Persons - Step 3 (Who's involved with this account)
// 3. Credentials - Steps 4-9 (Email Entry/OTP, Email OTP, Phone Entry, Phone OTP, Password, Passcode)
// 4. Business details - Step 10 (Tell us about your business)
// 5. ID verification - Step 11 (Verify identity)
// 6. Review & submit - Steps 12-13 (Review your application, Success)
const getProgressStepFromCurrentStep = (step: number): number => {
  if (step >= 1 && step <= 2) return 1; // Business information
  if (step === 3) return 2; // Persons
  if (step >= 4 && step <= 9) return 3; // Credentials (Email, Phone, Password, Passcode)
  if (step === 10) return 4; // Business details
  if (step === 11) return 5; // ID Verification
  if (step >= 12) return 6; // Review & Submit (includes success)
  return 0;
};

export function ApplicationProgress({
  currentStep,
  totalSteps,
  percentComplete,
  minutesRemaining,
  stepLabel,
}: ApplicationProgressProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentProgressStep = getProgressStepFromCurrentStep(currentStep);

  const getStepStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
    if (stepId < currentProgressStep) return 'completed';
    if (stepId === currentProgressStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white">
      {/* Collapsed View */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors group border-b border-border"
      >
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between gap-6">
            {/* Left Side - Label and Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-foreground">{stepLabel}</span>
                <span className="text-sm text-muted-foreground">{percentComplete}% complete</span>
              </div>
              
              {/* Segmented Progress Bar */}
              <div className="flex gap-2">
                {PROGRESS_STEPS.map((step) => {
                  const status = getStepStatus(step.id);
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'current';
                  
                  return (
                    <div
                      key={step.id}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        isCompleted || isCurrent
                          ? 'bg-primary'
                          : 'bg-gray-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Side - Time and Expand Button */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
                <span>{minutesRemaining} min</span>
              </div>
              
              <div className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded View - Vertical Timeline */}
      {isExpanded && (
        <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-2 animate-in slide-in-from-top-2 duration-300 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl pt-4">
              {PROGRESS_STEPS.map((step, index) => {
                const status = getStepStatus(step.id);
                const isCompleted = status === 'completed';
                const isCurrent = status === 'current';
                const isLast = index === PROGRESS_STEPS.length - 1;

                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center pt-1">
                      {/* Dot */}
                      <div className="relative z-10">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 h-6 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200" />
                        )}
                      </div>

                      {/* Connecting Line */}
                      {!isLast && (
                        <div
                          className={`w-0.5 flex-1 my-1 transition-all duration-500 ${
                            isCompleted
                              ? 'bg-primary'
                              : 'bg-gray-200'
                          }`}
                          style={{ minHeight: '60px' }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${!isLast ? 'pb-8' : 'pb-2'}`}>
                      <div className="pt-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div className="flex-1">
                            <h4 className={`text-base mb-1 ${
                              isCurrent ? 'text-foreground' : 'text-foreground/70'
                            }`}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                          
                          {/* Status Badge */}
                          {isCurrent && (
                            <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                              In progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}