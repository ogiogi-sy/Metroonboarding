import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Briefcase } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface BusinessProfilingScreenProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

const turnoverOptions = [
  { value: '0-250k', label: '£0 – £250K' },
  { value: '250k-1m', label: '£250K – £1M' },
  { value: '1m-5m', label: '£1M – £5M' },
  { value: '5m+', label: '£5M+' },
];

const employeeOptions = [
  { value: '0-2', label: '0 – 2' },
  { value: '3-10', label: '3 – 10' },
  { value: '10-50', label: '10 – 50' },
  { value: '50+', label: '50+' },
];

export function BusinessProfilingScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps,
  initialData,
}: BusinessProfilingScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [turnoverBand, setTurnoverBand] = useState(initialData?.turnoverBand || '');
  const [employeeCount, setEmployeeCount] = useState(initialData?.employeeCount || '');
  const [handlesCash, setHandlesCash] = useState(initialData?.handlesCash ?? null);
  const [hasInternational, setHasInternational] = useState(initialData?.hasInternational ?? null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      turnoverBand,
      employeeCount,
      handlesCash,
      hasInternational,
    });
  };

  const canSubmit = turnoverBand && employeeCount && handlesCash !== null && hasInternational !== null;

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Business profile"
      percentComplete={50}
      minutesRemaining={5}
      onBack={onBack}
      leftHeading="Understanding your needs"
      leftDescription="These details help us recommend the right banking features and ensure we meet regulatory requirements."
      leftIcon={Briefcase}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Tell us about your business</h2>
          <p className="text-muted-foreground">
            This helps us tailor the right banking services for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Turnover Band */}
          <div className="space-y-3">
            <Label>Annual turnover</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {turnoverOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTurnoverBand(option.value)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    turnoverBand === option.value
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {turnoverBand === option.value && (
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Employee Count */}
          <div className="space-y-3">
            <Label>Number of employees</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {employeeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setEmployeeCount(option.value)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    employeeCount === option.value
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {employeeCount === option.value && (
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cash Usage */}
          <div className="space-y-3">
            <Label>Do you handle cash?</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHandlesCash(true)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  handlesCash === true
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Yes</span>
                  {handlesCash === true && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setHandlesCash(false)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  handlesCash === false
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>No</span>
                  {handlesCash === false && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* International Activity */}
          <div className="space-y-3">
            <Label>Do you send or receive international payments?</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasInternational(true)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  hasInternational === true
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Yes</span>
                  {hasInternational === true && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setHasInternational(false)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  hasInternational === false
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>No</span>
                  {hasInternational === false && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
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
    </SplitLayout>
  );
}