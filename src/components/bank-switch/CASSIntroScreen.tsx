import { ArrowRight, Shield, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface CASSIntroScreenProps {
  onStart: () => void;
  onBack: () => void;
}

export function CASSIntroScreen({ onStart, onBack }: CASSIntroScreenProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back to Admin Center
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Switch your business account to Metro Bank
        </h1>
        <p className="text-muted-foreground">
          Moving your banking is simple and secure with the Current Account Switch Service
        </p>
      </div>

      {/* Hero Illustration */}
      {/* ... remove this code ... */}

      {/* Benefit Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-accent" />
          </div>
          <h3 className="mb-2 text-base" style={{ color: '#001A72' }}>
            We move your active payments
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All your Direct Debits and Standing Orders are automatically transferred to your new Metro account.
          </p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ArrowLeftRight className="w-6 h-6 text-primary" />
          </div>
          <h3 className="mb-2 text-base" style={{ color: '#001A72' }}>
            Incoming payments redirected
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Payments sent to your old account are automatically forwarded to Metro for 3 years.
          </p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#16A34A]" />
          </div>
          <h3 className="mb-2 text-base" style={{ color: '#001A72' }}>
            Protected by the guarantee
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Current Account Switch Guarantee covers any issues during the switching process.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-sm" style={{ color: '#001A72' }}>
              Speed up your switch with Open Banking
            </h4>
            <p className="text-sm text-muted-foreground">
              Connect your old bank securely to pre-fill your details and view the payments we'll move for you.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStart}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <span>Start your switch</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="flex-1 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-center">
          Learn more about how switching works
        </button>
      </div>
    </div>
  );
}