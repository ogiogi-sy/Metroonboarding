import { useState } from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';

interface ChooseSwitchTypeScreenProps {
  onContinue: (switchType: 'full' | 'partial', switchDate: string) => void;
  onBack: () => void;
}

export function ChooseSwitchTypeScreen({ onContinue, onBack }: ChooseSwitchTypeScreenProps) {
  const [switchType, setSwitchType] = useState<'full' | 'partial' | null>(null);
  const [switchDate, setSwitchDate] = useState('');

  // Generate dates: 7 days from now as minimum
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (switchType && switchDate) {
      onContinue(switchType, switchDate);
    }
  };

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
          Choose how and when to switch
        </h1>
        <p className="text-muted-foreground">
          Select your preferred switching method and completion date
        </p>
      </div>

      {/* Switch Type */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm" style={{ color: '#001A72' }}>
          Switch Type
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Full Switch */}
          <button
            onClick={() => setSwitchType('full')}
            className={`text-left bg-white border-2 rounded-full p-6 transition-all ${
              switchType === 'full' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-base" style={{ color: '#001A72' }}>
                    Full Switch (CASS)
                  </h4>
                  <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Move everything automatically using the Current Account Switch Service
                </p>
              </div>
              {switchType === 'full' && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>All Direct Debits transferred</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>Standing Orders moved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>Payments redirected for 3 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>Protected by CASS guarantee</span>
              </li>
            </ul>
          </button>

          {/* Partial Switch */}
          <button
            onClick={() => setSwitchType('partial')}
            className={`text-left bg-white border-2 rounded-full p-6 transition-all ${
              switchType === 'partial' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h4 className="mb-2 text-base" style={{ color: '#001A72' }}>
                  Partial Switch
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Move selected payments manually while keeping both accounts open
                </p>
              </div>
              {switchType === 'partial' && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>Choose which payments to move</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A]">✓</span>
                <span>Keep old account open</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">—</span>
                <span>Manual payment updates required</span>
              </li>
            </ul>
          </button>
        </div>
      </div>

      {/* Switch Date */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm" style={{ color: '#001A72' }}>
          Switch Completion Date
        </h3>
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-3" style={{ color: '#001A72' }}>
                When would you like the switch to complete?
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={switchDate}
                onChange={(e) => setSwitchDate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-xs text-muted-foreground mt-2">
                The switch process takes 7 working days. Choose a date at least 7 days from today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>
          Current Account Switch Guarantee
        </h4>
        <p className="text-sm text-muted-foreground mb-2">
          If anything goes wrong during the switch, we'll refund any interest or charges you incur
          on either account as a result.
        </p>
        <button className="text-sm text-primary hover:underline">
          Read the full guarantee →
        </button>
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-8 py-4 border border-border rounded-full hover:bg-muted/50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!switchType || !switchDate}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review & authorise
        </button>
      </div>
    </div>
  );
}