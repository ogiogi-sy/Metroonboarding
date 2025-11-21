import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ExistingBorrowingScreenProps {
  onContinue: (loans: ExistingLoan[]) => void;
  onBack: () => void;
  isFacilityMatch?: boolean;
}

export interface ExistingLoan {
  lenderName: string;
  amountOutstanding: number;
  monthlyRepayment: number;
  purpose: string;
  expiryDate: string;
}

export function ExistingBorrowingScreen({ onContinue, onBack, isFacilityMatch }: ExistingBorrowingScreenProps) {
  const [hasExistingLoans, setHasExistingLoans] = useState<boolean | null>(
    isFacilityMatch ? true : null
  );
  const [loans, setLoans] = useState<ExistingLoan[]>(
    isFacilityMatch
      ? [{
          lenderName: '',
          amountOutstanding: 0,
          monthlyRepayment: 0,
          purpose: '',
          expiryDate: '',
        }]
      : []
  );

  const addLoan = () => {
    setLoans([
      ...loans,
      {
        lenderName: '',
        amountOutstanding: 0,
        monthlyRepayment: 0,
        purpose: '',
        expiryDate: '',
      },
    ]);
  };

  const removeLoan = (index: number) => {
    setLoans(loans.filter((_, i) => i !== index));
  };

  const updateLoan = (index: number, field: keyof ExistingLoan, value: string | number) => {
    const updated = [...loans];
    updated[index] = { ...updated[index], [field]: value };
    setLoans(updated);
  };

  const handleContinue = () => {
    if (hasExistingLoans) {
      // Validate all loans have required data
      const allValid = loans.every(
        (loan) =>
          loan.lenderName.trim() &&
          loan.amountOutstanding > 0 &&
          loan.monthlyRepayment > 0
      );
      if (!allValid) return;
    }
    onContinue(hasExistingLoans ? loans : []);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Do you have any existing business loans?</h2>
        <p className="text-sm text-muted-foreground">
          This helps us assess your total borrowing and affordability
        </p>
      </div>

      {/* Yes/No Selection */}
      {hasExistingLoans === null && (
        <div className="space-y-3 mb-8">
          <button
            onClick={() => {
              setHasExistingLoans(false);
              setLoans([]);
            }}
            className="w-full bg-white border-2 border-border hover:border-accent/50 rounded-xl p-6 text-left transition-all"
          >
            <h4 className="mb-1">No existing loans</h4>
            <p className="text-sm text-muted-foreground">
              This will be my first business loan
            </p>
          </button>

          <button
            onClick={() => {
              setHasExistingLoans(true);
              addLoan();
            }}
            className="w-full bg-white border-2 border-border hover:border-accent/50 rounded-xl p-6 text-left transition-all"
          >
            <h4 className="mb-1">Yes, I have existing loans</h4>
            <p className="text-sm text-muted-foreground">
              I'll provide details about my current borrowing
            </p>
          </button>
        </div>
      )}

      {/* Existing Loans Form */}
      {hasExistingLoans && (
        <div className="space-y-6 mb-8">
          {isFacilityMatch && (
            <div className="bg-[#F5F6F8] rounded-xl p-6 mb-4">
              <h4 className="text-sm mb-2">Facility matching</h4>
              <p className="text-xs text-muted-foreground">
                Please provide details about the loan you'd like us to match or refinance.
              </p>
            </div>
          )}

          {loans.map((loan, index) => (
            <div key={index} className="bg-white border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm">Loan {index + 1}</h4>
                {loans.length > 1 && (
                  <button
                    onClick={() => removeLoan(index)}
                    className="text-destructive hover:text-destructive/80 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`lender-${index}`}>Lender name</Label>
                  <Input
                    id={`lender-${index}`}
                    value={loan.lenderName}
                    onChange={(e) => updateLoan(index, 'lenderName', e.target.value)}
                    placeholder="e.g., HSBC, Barclays, etc."
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`amount-${index}`}>Amount outstanding</Label>
                    <Input
                      id={`amount-${index}`}
                      type="number"
                      value={loan.amountOutstanding || ''}
                      onChange={(e) =>
                        updateLoan(index, 'amountOutstanding', parseFloat(e.target.value) || 0)
                      }
                      placeholder="£0"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`monthly-${index}`}>Monthly repayment</Label>
                    <Input
                      id={`monthly-${index}`}
                      type="number"
                      value={loan.monthlyRepayment || ''}
                      onChange={(e) =>
                        updateLoan(index, 'monthlyRepayment', parseFloat(e.target.value) || 0)
                      }
                      placeholder="£0"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`purpose-${index}`}>Loan purpose</Label>
                  <Input
                    id={`purpose-${index}`}
                    value={loan.purpose}
                    onChange={(e) => updateLoan(index, 'purpose', e.target.value)}
                    placeholder="e.g., Equipment purchase"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`expiry-${index}`}>Loan expiry date (optional)</Label>
                  <Input
                    id={`expiry-${index}`}
                    type="date"
                    value={loan.expiryDate}
                    onChange={(e) => updateLoan(index, 'expiryDate', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addLoan}
            className="w-full h-12"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add another loan
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => {
            if (hasExistingLoans && loans.length > 0) {
              setHasExistingLoans(null);
              setLoans([]);
            } else {
              onBack();
            }
          }}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={
            hasExistingLoans === null ||
            (hasExistingLoans &&
              (!loans.length ||
                loans.some(
                  (loan) =>
                    !loan.lenderName.trim() ||
                    !loan.amountOutstanding ||
                    !loan.monthlyRepayment
                )))
          }
          className="flex-1 h-12 group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}