import { Button } from '../ui/button';
import { CheckCircle2, Edit, ArrowRight } from 'lucide-react';

interface PlanConfirmationScreenProps {
  selectedPlan: string;
  selectedAddons: string[];
  onContinue: () => void;
  onModify: () => void;
}

const addonNames: Record<string, { name: string; price: string }> = {
  accounting: { name: 'Accounting Integration', price: '£5/month' },
  expenses: { name: 'Expense Management', price: '£8/month' },
  payroll: { name: 'Payroll Services', price: '£15/month' },
  analytics: { name: 'Business Analytics', price: '£10/month' },
  international: { name: 'International Toolkit', price: '£12/month' },
  compliance: { name: 'Compliance Suite', price: '£20/month' },
};

const planPrices: Record<string, string> = {
  Start: '£5/month',
  Build: '£12/month',
  Grow: '£25/month',
  Strategy: 'Custom pricing',
};

export function PlanConfirmationScreen({ selectedPlan, selectedAddons, onContinue, onModify }: PlanConfirmationScreenProps) {
  const calculateTotal = () => {
    let baseCost = 0;
    if (selectedPlan === 'Start') baseCost = 5;
    if (selectedPlan === 'Build') baseCost = 12;
    if (selectedPlan === 'Grow') baseCost = 25;

    const addonCost = selectedAddons.reduce((total, addonId) => {
      const price = addonNames[addonId]?.price || '';
      const numPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return total + (isNaN(numPrice) ? 0 : numPrice);
    }, 0);

    return baseCost + addonCost;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DCFCE7] rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h1 className="mb-4">Your banking plan is ready</h1>
          <p className="text-muted-foreground">
            Review your selection below
          </p>
        </div>

        {/* Plan Summary Card */}
        <div className="bg-white border border-border rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Selected plan</p>
              <h2 className="mb-2">{selectedPlan}</h2>
              <p className="text-muted-foreground">{planPrices[selectedPlan]}</p>
            </div>
            <button
              onClick={onModify}
              className="flex items-center gap-2 text-accent hover:underline text-sm"
            >
              <Edit className="w-4 h-4" />
              <span>Change</span>
            </button>
          </div>

          {/* Add-ons */}
          {selectedAddons.length > 0 && (
            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground mb-4">Add-ons ({selectedAddons.length})</p>
              <div className="space-y-3">
                {selectedAddons.map((addonId) => {
                  const addon = addonNames[addonId];
                  if (!addon) return null;
                  
                  return (
                    <div key={addonId} className="flex items-center justify-between">
                      <span className="text-sm">{addon.name}</span>
                      <span className="text-sm text-muted-foreground">{addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total */}
          {selectedPlan !== 'Strategy' && (
            <div className="border-t border-border pt-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1">Total monthly cost</p>
                  <p className="text-xs text-muted-foreground">Excluding VAT</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl">£{calculateTotal().toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* What's Next */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="mb-3">What happens next</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Your plan will be activated immediately</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Add-ons will be set up within 24 hours</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>You'll receive confirmation and setup instructions by email</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onContinue} className="w-full h-12 group">
            <span>Continue to explore more options</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={onModify} className="w-full">
            Modify plan or add-ons
          </Button>
        </div>
      </div>
    </div>
  );
}