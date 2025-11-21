import { ReactNode } from 'react';
import { ApplicationProgress } from './ApplicationProgress';
import { HelpWidget } from './HelpWidget';
import { LucideIcon } from 'lucide-react';

interface SplitLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  percentComplete: number;
  minutesRemaining: number;
  leftHeading: string;
  leftDescription: string;
  leftIcon: LucideIcon;
  onBack?: () => void;
}

export function SplitLayout({
  children,
  currentStep,
  totalSteps,
  stepLabel,
  percentComplete,
  minutesRemaining,
  leftHeading,
  leftDescription,
  leftIcon,
  onBack,
}: SplitLayoutProps) {
  const Icon = leftIcon;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar - Full Width at Top */}
      <ApplicationProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        percentComplete={percentComplete}
        minutesRemaining={minutesRemaining}
        stepLabel={stepLabel}
      />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar - Desktop Only (1/3 width) */}
        <aside className="hidden lg:flex lg:w-[400px] bg-[#F8FAFC] flex-col">
          <div className="bg-[#F5F6F8] p-8 flex-1 flex flex-col justify-between">
            {/* Back button - Always at top */}
            <button
              onClick={onBack ? onBack : () => window.history.back()}
              className="flex items-center gap-2 text-accent hover:text-accent/80 -ml-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Back</span>
            </button>

            {/* Centered Content Group */}
            <div className="flex flex-col justify-center flex-1 py-12">
              {/* Icon */}
              <div className="mb-8">
                <Icon className="w-12 h-12 text-[#E4002B]" strokeWidth={1.5} />
              </div>

              {/* Heading and Description */}
              <div>
                <h2 className="mb-4 text-[24px]">{leftHeading}</h2>
                <p className="text-muted-foreground">
                  {leftDescription}
                </p>
              </div>
            </div>

            {/* Footer - Always at bottom */}
            <div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Metro Bank
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area - 2/3 width on desktop, full width on mobile */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Help Widget */}
      <HelpWidget currentStep={currentStep} stepLabel={stepLabel} />
    </div>
  );
}