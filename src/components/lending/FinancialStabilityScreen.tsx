import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface FinancialStabilityScreenProps {
  onContinue: (hasConcerns: boolean, explanation?: string) => void;
  onBack: () => void;
}

export function FinancialStabilityScreen({ onContinue, onBack }: FinancialStabilityScreenProps) {
  const [hasConcerns, setHasConcerns] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState('');

  const handleContinue = () => {
    if (hasConcerns === null) return;
    onContinue(hasConcerns, hasConcerns ? explanation : undefined);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Financial outlook</h2>
        <p className="text-sm text-muted-foreground">
          Help us understand your business's financial stability going forward
        </p>
      </div>

      {/* Main Question */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="mb-6">
          <h4 className="mb-2">
            Do you foresee any financial changes that could affect your ability to repay the loan?
          </h4>
          <p className="text-xs text-muted-foreground">
            For example: major customer losses, market changes, planned investments, seasonal impacts, or business restructuring
          </p>
        </div>

        {/* Yes/No Options */}
        <div className="space-y-3">
          <button
            onClick={() => setHasConcerns(false)}
            className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
              hasConcerns === false
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm mb-1">No concerns</h4>
                <p className="text-xs text-muted-foreground">
                  My business finances are stable and predictable
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                hasConcerns === false
                  ? 'border-accent bg-accent'
                  : 'border-border'
              }`}>
                {hasConcerns === false && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => setHasConcerns(true)}
            className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
              hasConcerns === true
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm mb-1">Yes, there may be changes</h4>
                <p className="text-xs text-muted-foreground">
                  I'll explain the potential financial changes
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                hasConcerns === true
                  ? 'border-accent bg-accent'
                  : 'border-border'
              }`}>
                {hasConcerns === true && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Explanation Field */}
      {hasConcerns && (
        <div className="bg-white border border-border rounded-xl p-6 mb-6">
          <Label htmlFor="explanation" className="mb-2 block">
            Please explain the potential changes
          </Label>
          <p className="text-xs text-muted-foreground mb-4">
            Be as specific as possible. This helps us make an informed decision and may allow us to structure a loan that works for your situation.
          </p>
          <Textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Describe any anticipated financial changes, their timing, and potential impact on your business..."
            rows={6}
            className="mb-4"
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm mb-1 text-amber-900">Why we ask</h4>
              <p className="text-xs text-amber-800">
                This is a forward-looking stress test. Being transparent about potential challenges helps us recommend the right loan structure and terms for your situation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      {hasConcerns === false && (
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-6">
          <h4 className="text-sm mb-2">Good to know</h4>
          <p className="text-xs text-muted-foreground">
            Stable financials improve your chances of approval. We'll still verify this with your documents and bank statements.
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
          disabled={hasConcerns === null || (hasConcerns && !explanation.trim())}
          className="flex-1 h-12 group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}