import { Button } from '../ui/button';
import { CheckCircle2, Clock, Shield, User, ArrowRight } from 'lucide-react';

interface LendingOverviewScreenProps {
  onStart: () => void;
  onLearnMore: () => void;
}

export function LendingOverviewScreen({ onStart, onLearnMore }: LendingOverviewScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mb-4">Let's check if you're eligible for business lending</h1>
        <p className="text-muted-foreground">
          Get an initial assessment in just a few minutes
        </p>
      </div>

      {/* Key Benefits */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Quick assessment</h4>
              <p className="text-xs text-muted-foreground">
                Takes 3-5 minutes to get your initial eligibility result
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">No impact on credit score</h4>
              <p className="text-xs text-muted-foreground">
                This is a soft check that won't affect your credit rating
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Expert support when needed</h4>
              <p className="text-xs text-muted-foreground">
                A relationship manager will assist with complex applications
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-sm mb-1">Minimal documentation</h4>
              <p className="text-xs text-muted-foreground">
                Documents requested only when required for your application
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We'll Cover */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
        <h4 className="mb-4">What we'll cover in this assessment</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Your funding needs and loan purpose</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Loan amount and repayment term</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Current business financial position</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Existing borrowing (if any)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Financial stability outlook</span>
          </li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button onClick={onStart} className="w-full h-12 group">
          <span>Start assessment</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button variant="outline" onClick={onLearnMore} className="w-full h-12">
          Learn about our loan products
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Your progress is automatically saved. You can return anytime to complete your application.
      </p>
    </div>
  );
}