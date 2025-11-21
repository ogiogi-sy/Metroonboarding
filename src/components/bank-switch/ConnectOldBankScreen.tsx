import { Shield, CheckCircle2 } from 'lucide-react';

interface ConnectOldBankScreenProps {
  onContinue: () => void;
  onManual: () => void;
  onBack: () => void;
}

export function ConnectOldBankScreen({ onContinue, onManual, onBack }: ConnectOldBankScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Connect your existing bank
        </h1>
        <p className="text-muted-foreground">
          We'll use Open Banking to securely access your account information
        </p>
      </div>

      {/* Explainer Card */}
      <div className="bg-white border border-border rounded-2xl p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="mb-2 text-base" style={{ color: '#001A72' }}>
              What is Open Banking?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We'll connect to your existing business account using approved Open Banking APIs so we can:
            </p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#16A34A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <span className="text-sm text-muted-foreground">
              Identify the right account to switch
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#16A34A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <span className="text-sm text-muted-foreground">
              Pre-fill your sort code and account number
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#16A34A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <span className="text-sm text-muted-foreground">
              Show you the Direct Debits and Standing Orders we'll move
            </span>
          </li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="mb-2 text-sm" style={{ color: '#001A72' }}>
            What we will and won't do:
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xs text-[#16A34A]">✓</span>
              <p className="text-xs text-muted-foreground">
                We <strong>will</strong> read account details, balances, and recent transactions
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent">✗</span>
              <p className="text-xs text-muted-foreground">
                We <strong>won't</strong> take payments or move money without your permission
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Link */}
      <div className="text-center mb-8">
        <button className="text-sm text-primary hover:underline">
          How Open Banking works →
        </button>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onContinue}
          className="w-full bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
        >
          Choose your old bank
        </button>
        <button
          onClick={onManual}
          className="w-full border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors"
        >
          Enter details manually instead
        </button>
      </div>
    </div>
  );
}
