import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

interface LoanAmountTermScreenProps {
  onContinue: (amount: number, termMonths: number) => void;
  onBack: () => void;
}

const MIN_LOAN = 5000;
const MAX_LOAN = 500000;
const MIN_TERM_MONTHS = 6;
const MAX_TERM_MONTHS = 60;

export function LoanAmountTermScreen({ onContinue, onBack }: LoanAmountTermScreenProps) {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [termMonths, setTermMonths] = useState(24);
  const [termUnit, setTermUnit] = useState<'months' | 'years'>('months');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
      setLoanAmount(Math.min(Math.max(numValue, MIN_LOAN), MAX_LOAN));
    }
  };

  const handleSliderChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const getTermInMonths = () => {
    return termUnit === 'years' ? termMonths * 12 : termMonths;
  };

  const handleContinue = () => {
    onContinue(loanAmount, getTermInMonths());
  };

  // Estimated monthly repayment (simplified calculation)
  const estimatedAPR = 0.08; // 8% example APR
  const monthlyRate = estimatedAPR / 12;
  const totalMonths = getTermInMonths();
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">How much do you want to borrow?</h2>
        <p className="text-sm text-muted-foreground">
          Tell us your ideal loan amount and repayment term
        </p>
      </div>

      {/* Loan Amount Section */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <Label htmlFor="loanAmount" className="mb-4 block">Loan amount</Label>
        
        {/* Amount Input */}
        <div className="mb-6">
          <Input
            id="loanAmount"
            type="text"
            value={formatCurrency(loanAmount)}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="text-2xl h-14 text-center"
          />
        </div>

        {/* Slider */}
        <div className="mb-4">
          <Slider
            value={[loanAmount]}
            onValueChange={handleSliderChange}
            min={MIN_LOAN}
            max={MAX_LOAN}
            step={1000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(MIN_LOAN)}</span>
            <span>{formatCurrency(MAX_LOAN)}</span>
          </div>
        </div>

        <div className="bg-[#F5F6F8] rounded-lg p-4 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#0033A0] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            We can lend between {formatCurrency(MIN_LOAN)} and {formatCurrency(MAX_LOAN)}. Your final approved amount may vary based on your assessment.
          </p>
        </div>
      </div>

      {/* Loan Term Section */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <Label className="mb-4 block">Loan term</Label>
        
        {/* Term Unit Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTermUnit('months')}
            className={`flex-1 px-4 py-2 rounded-full transition-colors ${
              termUnit === 'months'
                ? 'bg-accent text-white'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Months
          </button>
          <button
            onClick={() => setTermUnit('years')}
            className={`flex-1 px-4 py-2 rounded-full transition-colors ${
              termUnit === 'years'
                ? 'bg-accent text-white'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Years
          </button>
        </div>

        {/* Term Input */}
        <div className="mb-4">
          <Input
            type="number"
            value={termMonths}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              if (termUnit === 'months') {
                setTermMonths(Math.min(Math.max(value, MIN_TERM_MONTHS), MAX_TERM_MONTHS));
              } else {
                setTermMonths(Math.min(Math.max(value, 1), 5));
              }
            }}
            min={termUnit === 'months' ? MIN_TERM_MONTHS : 1}
            max={termUnit === 'months' ? MAX_TERM_MONTHS : 5}
            className="text-center h-12"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">
            {termUnit === 'months' 
              ? `${MIN_TERM_MONTHS} to ${MAX_TERM_MONTHS} months`
              : '1 to 5 years'
            }
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            Total term: <span className="font-medium text-foreground">{getTermInMonths()} months</span>
          </p>
        </div>
      </div>

      {/* Estimated Repayment */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm">Estimated monthly repayment</h4>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-3xl mb-1">{formatCurrency(monthlyPayment)}</p>
        <p className="text-xs text-muted-foreground">
          Based on an indicative APR of {(estimatedAPR * 100).toFixed(1)}%. Your actual rate will be confirmed after assessment.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 h-12 group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}