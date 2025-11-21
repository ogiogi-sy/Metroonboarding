import { Button } from '../ui/button';
import { TrendingUp, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';

interface LendingOverviewScreenProps {
  onStart: () => void;
  onBack: () => void;
}

export function LendingOverviewScreen({ onStart, onBack }: LendingOverviewScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-accent hover:underline mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to overview</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <h1 className="mb-4">Check your funding eligibility</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant decisions on business loans, overdrafts, and credit facilities. Fast, simple, and tailored to your business needs.
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent">1</span>
            </div>
            <h4 className="mb-2">Tell us what you need</h4>
            <p className="text-sm text-muted-foreground">
              Share basic information about your funding requirements
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent">2</span>
            </div>
            <h4 className="mb-2">Quick review</h4>
            <p className="text-sm text-muted-foreground">
              We'll review your application in real-time
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent">3</span>
            </div>
            <h4 className="mb-2">Instant decision</h4>
            <p className="text-sm text-muted-foreground">
              Get an instant offer or connect with a specialist
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white border border-border rounded-xl p-8 mb-8">
          <h3 className="mb-6">What we offer</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">Business Loans</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>£5,000 to £250,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Flexible terms 6-60 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Fixed or variable rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>No early repayment fees</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3">Overdrafts & Credit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Up to £100,000 overdraft</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Flexible access to funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Pay only for what you use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>Renewable annually</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="mb-2">Before you start</h4>
          <p className="text-sm text-muted-foreground mb-3">
            This is a soft credit check and won't affect your credit score. If you're approved, we'll perform a full check before finalizing the offer.
          </p>
          <p className="text-xs text-muted-foreground">
            Checking eligibility takes about 3-5 minutes
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onStart} className="flex-1 h-12 group">
            <span>Start eligibility check</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={onBack} className="flex-1">
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
}