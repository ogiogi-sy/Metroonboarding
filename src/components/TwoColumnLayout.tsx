import { ReactNode } from 'react';
import { ApplicationProgress } from './ApplicationProgress';
import { HelpWidget } from './HelpWidget';
import { LucideIcon } from 'lucide-react';

interface TwoColumnLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps?: number;
  stepLabel: string;
  percentComplete: number;
  minutesRemaining: number;
  showProgress?: boolean;
  onRestart?: () => void;
  
  // Left sidebar content
  sidebarTitle: string;
  sidebarDescription?: string;
  sidebarIcon?: LucideIcon;
  sidebarBgColor?: string;
}

export function TwoColumnLayout({
  children,
  currentStep,
  totalSteps = 10,
  stepLabel,
  percentComplete,
  minutesRemaining,
  showProgress = true,
  onRestart,
  sidebarTitle,
  sidebarDescription,
  sidebarIcon: SidebarIcon,
  sidebarBgColor = '#E8EEF5',
}: TwoColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showProgress && (
        <ApplicationProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          estimatedMinutes={minutesRemaining}
          onRestart={onRestart}
        />
      )}
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar - Desktop Only */}
        <aside 
          className="hidden lg:flex lg:w-80 xl:w-96 p-8 lg:p-10 xl:p-12 flex-col justify-center"
          style={{ backgroundColor: sidebarBgColor }}
        >
          <div>
            {/* Icon Illustration */}
            {SidebarIcon && (
              <div className="mb-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <SidebarIcon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="mb-4">{sidebarTitle}</h1>
            
            {/* Description */}
            {sidebarDescription && (
              <p className="text-muted-foreground text-lg">
                {sidebarDescription}
              </p>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Mobile Title - Only visible on mobile */}
            <div className="lg:hidden mb-8">
              <h2 className="mb-3">{sidebarTitle}</h2>
              {sidebarDescription && (
                <p className="text-muted-foreground">
                  {sidebarDescription}
                </p>
              )}
            </div>

            {children}
          </div>
        </main>
      </div>
      
      {/* Help Widget - always present */}
      <HelpWidget currentStep={currentStep} stepLabel={stepLabel} onRestart={onRestart} />
    </div>
  );
}
