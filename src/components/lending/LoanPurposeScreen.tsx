import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, TrendingUp, Package, Building2, DollarSign, RefreshCw, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface LoanPurposeScreenProps {
  onContinue: (purpose: string, otherDetails?: string, isFacilityMatch?: boolean) => void;
  onBack: () => void;
}

const LOAN_PURPOSES = [
  {
    id: 'working-capital',
    label: 'Working capital',
    description: 'Day-to-day business operations and cashflow',
    icon: DollarSign,
  },
  {
    id: 'equipment',
    label: 'Equipment purchase',
    description: 'Machinery, vehicles, or technology',
    icon: Package,
  },
  {
    id: 'expansion',
    label: 'Business expansion',
    description: 'New locations, markets, or product lines',
    icon: Building2,
  },
  {
    id: 'investment',
    label: 'Investment',
    description: 'Strategic business investments',
    icon: TrendingUp,
  },
  {
    id: 'bridging',
    label: 'Bridging cashflow',
    description: 'Short-term funding gap',
    icon: RefreshCw,
  },
  {
    id: 'refinancing',
    label: 'Refinancing / Match existing facility',
    description: 'Replace or match current loan',
    icon: RefreshCw,
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Tell us what you need',
    icon: HelpCircle,
  },
];

export function LoanPurposeScreen({ onContinue, onBack }: LoanPurposeScreenProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [otherDetails, setOtherDetails] = useState('');

  const handleContinue = () => {
    if (!selectedPurpose) return;
    
    const isFacilityMatch = selectedPurpose === 'refinancing';
    onContinue(
      selectedPurpose,
      selectedPurpose === 'other' ? otherDetails : undefined,
      isFacilityMatch
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Tell us what you need funding for</h2>
        <p className="text-sm text-muted-foreground">
          This helps us understand your needs and recommend the right loan product
        </p>
      </div>

      {/* Purpose Options */}
      <div className="space-y-3 mb-8">
        {LOAN_PURPOSES.map((purpose) => {
          const Icon = purpose.icon;
          return (
            <button
              key={purpose.id}
              onClick={() => setSelectedPurpose(purpose.id)}
              className={`w-full bg-white border-2 rounded-xl p-4 text-left transition-all hover:border-accent/50 ${
                selectedPurpose === purpose.id
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedPurpose === purpose.id
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-sm mb-1">{purpose.label}</h4>
                  <p className="text-xs text-muted-foreground">
                    {purpose.description}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedPurpose === purpose.id
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {selectedPurpose === purpose.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Other Purpose Details */}
      {selectedPurpose === 'other' && (
        <div className="mb-8">
          <Label htmlFor="otherDetails">Please describe your loan purpose</Label>
          <Textarea
            id="otherDetails"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
            placeholder="Tell us more about what you need funding for..."
            className="mt-2"
            rows={4}
          />
        </div>
      )}

      {/* Facility Matching Info */}
      {selectedPurpose === 'refinancing' && (
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="text-sm mb-2">Facility matching process</h4>
          <p className="text-xs text-muted-foreground">
            We'll ask for details about your existing loan and try to match or improve on your current pricing and terms.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedPurpose || (selectedPurpose === 'other' && !otherDetails.trim())}
          className="flex-1 h-12 group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}