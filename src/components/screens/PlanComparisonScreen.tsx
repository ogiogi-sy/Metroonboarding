import { useState } from 'react';
import { Button } from '../ui/button';
import { CheckCircle2, X, ChevronLeft } from 'lucide-react';

interface PlanComparisonScreenProps {
  onSelectPlan: (plan: string) => void;
  onBack: () => void;
  recommendedPlan?: string;
}

const plans = [
  {
    name: 'Start',
    price: '£5',
    period: '/month',
    description: 'Perfect for new businesses',
    recommended: false,
  },
  {
    name: 'Build',
    price: '£12',
    period: '/month',
    description: 'Essential growth tools',
    recommended: false,
  },
  {
    name: 'Grow',
    price: '£25',
    period: '/month',
    description: 'Advanced features',
    recommended: true,
  },
  {
    name: 'Strategy',
    price: 'Custom',
    period: '',
    description: 'Dedicated RM',
    recommended: false,
  },
];

const features = [
  { category: 'Core Banking', items: [
    { name: 'Business current account', start: true, build: true, grow: true, strategy: true },
    { name: 'Business debit card', start: true, build: true, grow: true, strategy: true },
    { name: 'Online & mobile banking', start: true, build: true, grow: true, strategy: true },
    { name: 'Unlimited transactions', start: true, build: true, grow: true, strategy: true },
  ]},
  { category: 'Payments', items: [
    { name: 'Faster Payments', start: true, build: true, grow: true, strategy: true },
    { name: 'BACS', start: true, build: true, grow: true, strategy: true },
    { name: 'CHAPS', start: false, build: false, grow: true, strategy: true },
    { name: 'International payments', start: false, build: false, grow: true, strategy: true },
  ]},
  { category: 'Cash Handling', items: [
    { name: 'Cash deposits', start: '£500/mo', build: '£1,000/mo', grow: 'Unlimited', strategy: 'Unlimited' },
    { name: 'Cash withdrawals', start: true, build: true, grow: true, strategy: true },
  ]},
  { category: 'Support & Services', items: [
    { name: 'Email support', start: true, build: true, grow: true, strategy: true },
    { name: 'Phone support', start: false, build: false, grow: true, strategy: true },
    { name: 'Dedicated account manager', start: false, build: false, grow: true, strategy: true },
    { name: 'Relationship Manager', start: false, build: false, grow: false, strategy: true },
    { name: '24/7 priority support', start: false, build: false, grow: false, strategy: true },
  ]},
  { category: 'Team & Access', items: [
    { name: 'Additional users', start: '1', build: '3', grow: '10', strategy: 'Unlimited' },
    { name: 'Role-based permissions', start: false, build: true, grow: true, strategy: true },
  ]},
  { category: 'Integrations', items: [
    { name: 'Accounting software', start: false, build: true, grow: true, strategy: true },
    { name: 'API access', start: false, build: false, grow: true, strategy: true },
    { name: 'Custom integrations', start: false, build: false, grow: false, strategy: true },
  ]},
];

export function PlanComparisonScreen({ onSelectPlan, onBack, recommendedPlan }: PlanComparisonScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(recommendedPlan || 'Grow');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-accent hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="mb-3">Compare banking plans</h1>
          <p className="text-muted-foreground">
            Choose the plan that fits your business needs
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          {/* Plan Headers - Sticky */}
          <div className="grid grid-cols-5 border-b border-border sticky top-0 bg-white z-10">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Features</p>
            </div>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-4 border-l border-border ${
                  plan.name === recommendedPlan ? 'bg-accent/5' : ''
                }`}
              >
                {plan.name === recommendedPlan && (
                  <div className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs mb-2">
                    Recommended
                  </div>
                )}
                <h4 className="mb-1">{plan.name}</h4>
                <div className="mb-2">
                  <span className="text-xl">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                <Button
                  size="sm"
                  variant={selectedPlan === plan.name ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan(plan.name)}
                  className="w-full"
                >
                  {selectedPlan === plan.name ? 'Selected' : 'Choose'}
                </Button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <h4>{category.category}</h4>
                </div>
                
                {/* Category Items */}
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="grid grid-cols-5 border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="p-4 text-sm">{item.name}</div>
                    <div className="p-4 border-l border-border flex items-center justify-center">
                      {renderFeatureValue(item.start)}
                    </div>
                    <div className="p-4 border-l border-border flex items-center justify-center">
                      {renderFeatureValue(item.build)}
                    </div>
                    <div className={`p-4 border-l border-border flex items-center justify-center ${
                      recommendedPlan === 'Grow' ? 'bg-accent/5' : ''
                    }`}>
                      {renderFeatureValue(item.grow)}
                    </div>
                    <div className="p-4 border-l border-border flex items-center justify-center">
                      {renderFeatureValue(item.strategy)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => onSelectPlan(selectedPlan)}
            className="h-12 px-8"
            disabled={!selectedPlan}
          >
            Continue with {selectedPlan}
          </Button>
        </div>
      </div>
    </div>
  );
}

function renderFeatureValue(value: any) {
  if (value === true) {
    return <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground" />;
  }
  return <span className="text-sm">{value}</span>;
}
