import { Button } from '../ui/button';
import { CheckCircle2, TrendingUp, Users, Globe, Sparkles, ArrowRight } from 'lucide-react';

interface RecommendedPlanScreenProps {
  onSelectPlan: () => void;
  onComparePlans: () => void;
  businessData: any;
}

export function RecommendedPlanScreen({ onSelectPlan, onComparePlans, businessData }: RecommendedPlanScreenProps) {
  // Determine recommended plan based on business data
  const getRecommendedPlan = () => {
    if (businessData.turnoverBand === '5m+') {
      return {
        name: 'Strategy',
        price: 'Custom pricing',
        description: 'Dedicated relationship manager and bespoke banking solutions',
        color: 'primary',
      };
    } else if (businessData.turnoverBand === '1m-5m') {
      return {
        name: 'Grow',
        price: '£25/month',
        description: 'Advanced features for scaling businesses',
        color: 'accent',
      };
    } else if (businessData.turnoverBand === '250k-1m') {
      return {
        name: 'Build',
        price: '£12/month',
        description: 'Essential tools for growing businesses',
        color: 'accent',
      };
    } else {
      return {
        name: 'Start',
        price: '£5/month',
        description: 'Perfect for new and small businesses',
        color: 'accent',
      };
    }
  };

  const plan = getRecommendedPlan();

  const reasons = [];
  if (businessData.turnoverBand) {
    reasons.push({
      icon: TrendingUp,
      label: 'Based on your turnover',
      value: businessData.turnoverBand === '0-250k' ? '£0 – £250K' :
             businessData.turnoverBand === '250k-1m' ? '£250K – £1M' :
             businessData.turnoverBand === '1m-5m' ? '£1M – £5M' : '£5M+',
    });
  }
  if (businessData.employeeCount) {
    reasons.push({
      icon: Users,
      label: 'Number of employees',
      value: businessData.employeeCount === '0-2' ? '0 – 2' :
             businessData.employeeCount === '3-10' ? '3 – 10' :
             businessData.employeeCount === '10-50' ? '10 – 50' : '50+',
    });
  }
  if (businessData.hasInternational) {
    reasons.push({
      icon: Globe,
      label: 'International payments',
      value: 'Required',
    });
  }

  const planFeatures = getPlanFeatures(plan.name);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Recommended for you</span>
          </div>
          <h1 className="mb-4">Your recommended plan: {plan.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your business profile, we've selected the best plan to support your needs.
          </p>
        </div>

        {/* Plan Card */}
        <div className="bg-white border-2 border-accent rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="mb-2">{plan.name}</h2>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl">{plan.price}</span>
                {plan.price !== 'Custom pricing' && (
                  <span className="text-sm text-muted-foreground">+ VAT</span>
                )}
              </div>
            </div>
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6 pt-6 border-t border-border">
            {planFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Plan */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="mb-4">Why we recommend this plan</h4>
          <div className="space-y-3">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{reason.label}</p>
                    <p className="text-sm">{reason.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onSelectPlan} className="w-full h-12 group">
            <span>Select {plan.name} plan</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={onComparePlans} className="w-full">
            Compare all plans
          </Button>
        </div>
      </div>
    </div>
  );
}

function getPlanFeatures(planName: string): string[] {
  const features: Record<string, string[]> = {
    Start: [
      'Unlimited transactions',
      'Business debit card',
      'Online & mobile banking',
      'Faster Payments & BACS',
      'Email support',
    ],
    Build: [
      'Everything in Start',
      'Cash deposits (up to £1,000/month)',
      'Accounting software integrations',
      'Priority email support',
      '1 additional user',
    ],
    Grow: [
      'Everything in Build',
      'Unlimited cash deposits',
      'CHAPS payments',
      'Multi-currency account',
      'Phone support',
      'Up to 5 users',
      'Dedicated account manager',
    ],
    Strategy: [
      'Everything in Grow',
      'Dedicated Relationship Manager',
      'Bespoke credit solutions',
      'FX dealing desk access',
      'Unlimited users',
      'Custom integrations',
      '24/7 priority support',
    ],
  };

  return features[planName] || features.Start;
}