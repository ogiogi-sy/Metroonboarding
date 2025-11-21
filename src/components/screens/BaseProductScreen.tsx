import { Button } from '../ui/button';
import { ScreenContainer } from '../ScreenContainer';
import { CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

interface BaseProductScreenProps {
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
}

export function BaseProductScreen({ onContinue, currentStep, totalSteps }: BaseProductScreenProps) {
  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Your account"
      percentComplete={42}
      minutesRemaining={6}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-accent" />
          </div>
          <h2 className="mb-4">You're setting up a Business Current Account</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            This is your base product and foundation for all your business banking needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <h4 className="mb-2">Sort code & account number</h4>
            <p className="text-sm text-muted-foreground">
              Get your UK business account details immediately upon approval
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <h4 className="mb-2">Digital banking access</h4>
            <p className="text-sm text-muted-foreground">
              Online and mobile banking ready to use from day one
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <h4 className="mb-2">UK payments</h4>
            <p className="text-sm text-muted-foreground">
              Send and receive Faster Payments, BACS, and CHAPS
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <h4 className="mb-2">Business debit card</h4>
            <p className="text-sm text-muted-foreground">
              Use your card for purchases and cash withdrawals
            </p>
          </div>
        </div>

        {/* What's Next Banner */}
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-6 mb-8">
          <h4 className="mb-2">What's coming next</h4>
          <p className="text-sm text-muted-foreground">
            Once your account is open, you can add lending, liquidity facilities, international tools, and business add-ons to grow your business faster.
          </p>
        </div>

        {/* CTA */}
        <Button 
          onClick={onContinue}
          className="w-full h-12 group"
        >
          <span>Continue setup</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </ScreenContainer>
  );
}
