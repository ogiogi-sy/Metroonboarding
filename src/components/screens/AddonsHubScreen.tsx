import { Button } from '../ui/button';
import { 
  CreditCard, 
  Globe, 
  TrendingUp, 
  FileText, 
  Users, 
  Shuffle,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface AddonsHubScreenProps {
  selectedPlan?: string;
  onComplete: () => void;
}

const addons = [
  {
    id: 'lending',
    icon: TrendingUp,
    title: 'Lending & Facilities',
    description: 'Access business loans, overdrafts, and credit facilities matched to your needs',
    features: ['Business loans up to £500k', 'Flexible overdrafts', 'Asset finance', 'Invoice finance'],
    recommended: true,
    badge: 'Recommended',
  },
  {
    id: 'liquidity',
    icon: Zap,
    title: 'Liquidity Solutions',
    description: 'Optimize cash flow with smart treasury and liquidity management tools',
    features: ['Cash flow forecasting', 'Sweep accounts', 'Deposits', 'Reserve management'],
    recommended: false,
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Tools',
    description: 'Send and receive payments worldwide with competitive FX rates',
    features: ['Multi-currency accounts', 'SWIFT & SEPA', 'Forward contracts', 'FX rates from 0.4%'],
    recommended: true,
    badge: 'Popular',
  },
  {
    id: 'toolkit',
    icon: FileText,
    title: 'Toolkit+ Add-ons',
    description: 'Invoicing, accounting integrations, POS systems, and expense management',
    features: ['Invoice management', 'Xero/QuickBooks sync', 'POS integration', 'Expense tracking'],
    recommended: false,
  },
  {
    id: 'compliance',
    icon: CheckCircle2,
    title: 'Enhanced Compliance',
    description: 'Additional verification for higher transaction limits and specialized services',
    features: ['Increased limits', 'Enhanced due diligence', 'AML compliance', 'Regulatory reporting'],
    recommended: false,
  },
  {
    id: 'mandates',
    icon: Users,
    title: 'Mandates & Permissions',
    description: 'Set up signing authorities, user roles, and approval workflows',
    features: ['Multi-level approvals', 'Role-based access', 'Signing authorities', 'Audit trails'],
    recommended: false,
  },
  {
    id: 'cass',
    icon: Shuffle,
    title: 'CASS Switch',
    description: 'Switch your existing business account to Metro Bank seamlessly',
    features: ['7-day switching', 'Auto-redirect payments', 'Zero downtime', 'Full support'],
    recommended: false,
  },
];

export function AddonsHubScreen({ selectedPlan, onComplete }: AddonsHubScreenProps) {
  const handleAddonClick = (addonId: string) => {
    // In a real app, this would navigate to the specific addon flow
    console.log(`Opening addon: ${addonId}`);
    alert(`The ${addons.find(a => a.id === addonId)?.title} setup flow would open here. This is a modular flow that can be completed independently.`);
  };

  const handleSkip = () => {
    onComplete();
    alert('You can always add these features later from your dashboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Deepen your banking relationship</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Choose the features that will help your business grow. Each module can be set up independently, whenever you're ready.
          </p>
          {selectedPlan && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Active plan: <strong className="capitalize">{selectedPlan}</strong></span>
            </div>
          )}
        </div>

        {/* Addons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {addons.map((addon) => {
            const Icon = addon.icon;
            return (
              <div
                key={addon.id}
                className="relative bg-white border border-border rounded-xl p-6 hover:border-accent transition-all group"
              >
                {addon.badge && (
                  <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs ${
                    addon.recommended 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-white'
                  }`}>
                    {addon.badge}
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{addon.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {addon.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {addon.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddonClick(addon.id)}
                  variant={addon.recommended ? 'default' : 'outline'}
                  className="w-full"
                >
                  <span>Set up now</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <h4 className="mb-2">Take your time</h4>
          <p className="text-sm text-muted-foreground">
            You don't need to set everything up now. All these features are available in your dashboard whenever you're ready to activate them. Your business account is already fully functional!
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <Button
            onClick={handleSkip}
            variant="outline"
            className="flex-1"
          >
            I'll do this later
          </Button>
          <Button
            onClick={() => window.location.href = '#dashboard'}
            className="flex-1"
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}