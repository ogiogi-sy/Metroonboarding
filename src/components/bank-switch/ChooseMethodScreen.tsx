import { useState } from 'react';
import { Shield, Edit3, CheckCircle2 } from 'lucide-react';

interface ChooseMethodScreenProps {
  onContinue: (method: 'openbanking' | 'manual') => void;
  onBack: () => void;
}

export function ChooseMethodScreen({ onContinue, onBack }: ChooseMethodScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<'openbanking' | 'manual' | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          How would you like to set up your switch?
        </h1>
        <p className="text-muted-foreground">
          Choose how you'd like to provide your old account details
        </p>
      </div>

      {/* Option Cards */}
      <div className="space-y-4 mb-8">
        {/* Open Banking Option */}
        <button
          onClick={() => setSelectedMethod('openbanking')}
          className={`w-full text-left bg-white border-2 rounded-full p-6 transition-all ${
            selectedMethod === 'openbanking'
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base" style={{ color: '#001A72' }}>
                    Connect your existing bank
                  </h3>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  We'll securely fetch your account details and regular payments using Open Banking.
                </p>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg inline-flex">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-700">Secure Open Banking</span>
                </div>
              </div>
            </div>
            {selectedMethod === 'openbanking' && (
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>

        {/* Manual Option */}
        <button
          onClick={() => setSelectedMethod('manual')}
          className={`w-full text-left bg-white border-2 rounded-full p-6 transition-all ${
            selectedMethod === 'manual'
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Edit3 className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-base" style={{ color: '#001A72' }}>
                  Enter account details manually
                </h3>
                <p className="text-sm text-muted-foreground">
                  You'll type in your sort code and account number from your existing bank.
                </p>
              </div>
            </div>
            {selectedMethod === 'manual' && (
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-8 py-4 border border-border rounded-full hover:bg-muted/50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => selectedMethod && onContinue(selectedMethod)}
          disabled={!selectedMethod}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedMethod === 'openbanking'
            ? 'Continue with Open Banking'
            : selectedMethod === 'manual'
            ? 'Continue with manual details'
            : 'Continue'}
        </button>
      </div>
    </div>
  );
}