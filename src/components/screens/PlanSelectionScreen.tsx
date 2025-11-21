import { useState } from 'react';
import { Button } from '../ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PlanSelectionScreenProps {
  onNext: (plan: string) => void;
}

const plans = [
  {
    id: 'start',
    name: 'Start',
    price: '£5',
    period: '/month',
    description: 'Perfect for new businesses getting started',
    features: [
      'Business current account',
      'Debit card',
      '100 free transactions/month',
      'Online & mobile banking',
      'Basic support',
    ],
    popular: false,
  },
  {
    id: 'build',
    name: 'Build',
    price: '£15',
    period: '/month',
    description: 'For growing businesses needing more',
    features: [
      'Everything in Start',
      'Unlimited transactions',
      'Multi-user access (up to 3)',
      'Accounting integrations',
      'Priority support',
      'Cash deposits',
    ],
    popular: true,
  },
  {
    id: 'grow',
    name: 'Grow',
    price: '£35',
    period: '/month',
    description: 'Advanced features for scaling businesses',
    features: [
      'Everything in Build',
      'Unlimited users',
      'International payments',
      'Advanced analytics',
      'Dedicated account manager',
      'API access',
    ],
    popular: false,
  },
  {
    id: 'strategy',
    name: 'Strategy',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for established enterprises',
    features: [
      'Everything in Grow',
      'Custom lending solutions',
      'Treasury services',
      'Bespoke integrations',
      'White-glove support',
      'Strategic business advisory',
    ],
    popular: false,
  },
];

export function PlanSelectionScreen({ onNext }: PlanSelectionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('build');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Choose your plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your business needs. You can upgrade or downgrade anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-accent shadow-lg scale-105'
                  : 'border-border hover:border-accent/50'
              } ${plan.popular ? 'ring-2 ring-primary ring-offset-4' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs">
                  Most popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedPlan === plan.id && (
                <div className="absolute inset-0 border-2 border-accent rounded-xl pointer-events-none">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-md mx-auto text-center">
          <Button
            onClick={() => onNext(selectedPlan)}
            className="w-full group"
          >
            <span>Continue with {plans.find(p => p.id === selectedPlan)?.name}</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            You can change your plan anytime. First month is free on all plans.
          </p>
        </div>
      </div>
    </div>
  );
}
