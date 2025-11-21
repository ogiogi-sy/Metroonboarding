interface ProgressStepperProps {
  totalSteps: number;
  currentStep: number;
  label: string;
  percentComplete: number;
}

export function ProgressStepper({ totalSteps, currentStep, label, percentComplete }: ProgressStepperProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-border rounded-full mb-4">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      
      {/* Step Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="text-sm text-foreground">{label}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {percentComplete}% complete
        </div>
      </div>
    </div>
  );
}
