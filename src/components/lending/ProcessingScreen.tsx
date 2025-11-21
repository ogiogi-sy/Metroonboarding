import { useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const steps = [
    { label: 'Analyzing account statements', completed: true },
    { label: 'Reviewing financial documents', completed: true },
    { label: 'Running credit assessment', completed: false },
    { label: 'Calculating affordability', completed: false },
    { label: 'Checking AML indicators', completed: false },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 relative">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
        </div>
        <h1 className="mb-4">We're reviewing your information</h1>
        <p className="text-muted-foreground">
          This usually takes just a few moments
        </p>
      </div>

      {/* Processing Steps */}
      <div className="bg-white border border-border rounded-xl p-8 mb-8">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  step.completed
                    ? 'bg-[#DCFCE7]'
                    : 'bg-muted animate-pulse'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                ) : (
                  <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#F5F6F8] rounded-xl p-6">
        <h4 className="mb-3">What we're checking</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Your business revenue and cashflow patterns</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Existing debt and repayment capacity</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Business stability and growth trajectory</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Regulatory compliance and risk factors</span>
          </li>
        </ul>
      </div>
    </div>
  );
}