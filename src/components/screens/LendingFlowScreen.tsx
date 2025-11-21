import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { CheckCircle2, Upload, Loader2, TrendingUp, Phone, Calendar } from 'lucide-react';

interface LendingFlowScreenProps {
  onComplete: () => void;
  onBack: () => void;
  businessData: any;
}

type LendingStep = 'intent' | 'amount' | 'term' | 'borrowing' | 'nob' | 'documents' | 'processing' | 'outcome';
type Outcome = 'approved' | 'conditional' | 'declined' | null;

export function LendingFlowScreen({ onComplete, onBack, businessData }: LendingFlowScreenProps) {
  const [step, setStep] = useState<LendingStep>('intent');
  const [outcome, setOutcome] = useState<Outcome>(null);
  
  // Form state
  const [loanIntent, setLoanIntent] = useState('');
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(24);
  const [hasExistingBorrowing, setHasExistingBorrowing] = useState<boolean | null>(null);
  const [existingAmount, setExistingAmount] = useState('');
  const [revenueStability, setRevenueStability] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleNext = () => {
    if (step === 'intent') setStep('amount');
    else if (step === 'amount') setStep('term');
    else if (step === 'term') setStep('borrowing');
    else if (step === 'borrowing' && hasExistingBorrowing) setStep('nob');
    else if (step === 'borrowing' && !hasExistingBorrowing) setStep('documents');
    else if (step === 'nob') setStep('documents');
    else if (step === 'documents') {
      setStep('processing');
      // Simulate processing
      setTimeout(() => {
        setStep('outcome');
        // Determine outcome based on business data
        if (businessData.turnoverBand === '5m+' || businessData.turnoverBand === '1m-5m') {
          setOutcome('approved');
        } else if (businessData.turnoverBand === '250k-1m') {
          setOutcome('conditional');
        } else {
          setOutcome('declined');
        }
      }, 2500);
    }
  };

  const stepNumber = 
    step === 'intent' ? 1 :
    step === 'amount' ? 2 :
    step === 'term' ? 3 :
    step === 'borrowing' ? 4 :
    step === 'nob' ? 5 :
    step === 'documents' ? 6 : 7;

  const totalSteps = hasExistingBorrowing ? 7 : 6;

  // Intent Step
  if (step === 'intent') {
    const intents = [
      'Expand operations',
      'Purchase equipment',
      'Hire staff',
      'Marketing & growth',
      'Working capital',
      'Refinance existing debt',
    ];

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">What will you use the funds for?</h2>
            <p className="text-muted-foreground">This helps us understand your business needs</p>
          </div>

          <div className="space-y-3 mb-8">
            {intents.map((intent) => (
              <button
                key={intent}
                onClick={() => setLoanIntent(intent)}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                  loanIntent === intent
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{intent}</span>
                  {loanIntent === intent && (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button onClick={handleNext} disabled={!loanIntent} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Amount Step
  if (step === 'amount') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">How much would you like to borrow?</h2>
            <p className="text-muted-foreground">Choose an amount between £5,000 and £250,000</p>
          </div>

          <div className="bg-white border border-border rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-xs text-muted-foreground mb-2">Loan amount</p>
              <p className="text-5xl mb-4">£{loanAmount.toLocaleString()}</p>
              <Slider
                value={[loanAmount]}
                onValueChange={([value]) => setLoanAmount(value)}
                min={5000}
                max={250000}
                step={5000}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>£5,000</span>
                <span>£250,000</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Est. monthly repayment</p>
                <p className="text-xl">£{Math.round((loanAmount * 1.05) / 24).toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Est. APR</p>
                <p className="text-xl">5.9%</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1">
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Term Step
  if (step === 'term') {
    const terms = [6, 12, 24, 36, 60];

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">Choose your repayment term</h2>
            <p className="text-muted-foreground">How long would you like to repay the loan?</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {terms.map((term) => {
              const monthlyPayment = Math.round((loanAmount * 1.05) / term);
              
              return (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    loanTerm === term
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="mb-3">
                    <p className="text-3xl mb-1">{term}</p>
                    <p className="text-xs text-muted-foreground">months</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Monthly payment</p>
                    <p className="text-sm">£{monthlyPayment.toLocaleString()}</p>
                  </div>
                  {loanTerm === term && (
                    <CheckCircle2 className="w-5 h-5 text-accent mx-auto mt-3" />
                  )}
                </button>
              );
            })}
          </div>

          <Button onClick={handleNext} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Existing Borrowing Step
  if (step === 'borrowing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">Do you have existing business borrowing?</h2>
            <p className="text-muted-foreground">Include loans, overdrafts, or credit facilities</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setHasExistingBorrowing(true)}
              className={`p-6 border-2 rounded-xl transition-all ${
                hasExistingBorrowing === true
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <p className="text-xl mb-2">Yes</p>
              {hasExistingBorrowing === true && (
                <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
              )}
            </button>
            <button
              onClick={() => setHasExistingBorrowing(false)}
              className={`p-6 border-2 rounded-xl transition-all ${
                hasExistingBorrowing === false
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <p className="text-xl mb-2">No</p>
              {hasExistingBorrowing === false && (
                <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
              )}
            </button>
          </div>

          {hasExistingBorrowing === true && (
            <div className="bg-white border border-border rounded-xl p-6 mb-8">
              <Label htmlFor="existingAmount" className="mb-2">Total amount outstanding</Label>
              <Input
                id="existingAmount"
                type="number"
                placeholder="£0"
                value={existingAmount}
                onChange={(e) => setExistingAmount(e.target.value)}
              />
            </div>
          )}

          <Button onClick={handleNext} disabled={hasExistingBorrowing === null} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // NoB Questions Step
  if (step === 'nob') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">Tell us a bit more</h2>
            <p className="text-muted-foreground">This helps us assess your application</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <Label className="mb-3">How stable is your revenue?</Label>
              <div className="grid sm:grid-cols-3 gap-3">
                {['Growing', 'Stable', 'Variable'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setRevenueStability(option)}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      revenueStability === option
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleNext} disabled={!revenueStability} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Documents Step
  if (step === 'documents') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNumber} of {totalSteps}</p>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
            </div>
            <h2 className="mb-3">Upload supporting documents</h2>
            <p className="text-muted-foreground">Help us process your application faster</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="mb-2">Drop files here or click to upload</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Bank statements, tax returns, or financial projections
              </p>
              <Button variant="outline" size="sm">
                Choose files
              </Button>
            </div>

            {uploadedDocs.length > 0 && (
              <div className="bg-white border border-border rounded-xl p-4">
                {uploadedDocs.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleNext} className="w-full">
            {uploadedDocs.length > 0 ? 'Continue' : 'Skip for now'}
          </Button>
        </div>
      </div>
    );
  }

  // Processing Step
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto mb-6" />
          <h2 className="mb-3">Reviewing your application</h2>
          <p className="text-muted-foreground">
            This will only take a moment...
          </p>
        </div>
      </div>
    );
  }

  // Outcome Step
  if (step === 'outcome' && outcome === 'approved') {
    const monthlyPayment = Math.round((loanAmount * 1.059) / loanTerm);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#DCFCE7] rounded-full mb-6 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
            </div>
            <h1 className="mb-4">You're approved! 🎉</h1>
            <p className="text-muted-foreground">
              Congratulations, we can offer you the following loan
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-8 mb-6">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Loan amount</p>
                <p className="text-3xl">£{loanAmount.toLocaleString()}</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Monthly repayment</p>
                <p className="text-3xl">£{monthlyPayment.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Term</p>
                <p className="text-xl">{loanTerm} months</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">APR</p>
                <p className="text-xl">5.9%</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onComplete} className="flex-1">
              Return to overview
            </Button>
            <Button variant="outline" className="flex-1">
              View contract
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'outcome' && outcome === 'conditional') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
              <Phone className="w-10 h-10 text-accent" />
            </div>
            <h1 className="mb-4">We need a specialist to review</h1>
            <p className="text-muted-foreground">
              Your application looks good, but we'd like one of our lending specialists to discuss your requirements in more detail.
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-8 mb-6">
            <h4 className="mb-4">What happens next?</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">A specialist will review your application within 24 hours</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">They'll call you to discuss your needs and answer questions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">You'll receive a decision within 2-3 business days</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Book a call
            </Button>
            <Button variant="outline" onClick={onComplete} className="w-full">
              Continue later
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'outcome' && outcome === 'declined') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
              <TrendingUp className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="mb-4">We can't approve this right now</h1>
            <p className="text-muted-foreground">
              Based on the information provided, we're unable to offer you a loan at this time. But there are other options.
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-8 mb-6">
            <h4 className="mb-4">Other ways we can help</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Speak with a Relationship Manager about alternative options</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Review our business tools and growth resources</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">Reapply in 6 months as your business grows</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Speak with an RM
            </Button>
            <Button variant="outline" onClick={onComplete} className="w-full">
              Return to overview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
