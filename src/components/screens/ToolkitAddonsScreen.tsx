import { useState } from 'react';
import { Button } from '../ui/button';
import { X, Plus, CheckCircle2, ChevronLeft, Building2, CreditCard, FileText, Users, BarChart3, Globe, Shield } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  icon: any;
  recommended?: boolean;
}

interface ToolkitAddonsScreenProps {
  onContinue: (selectedAddons: string[]) => void;
  onBack: () => void;
  businessData?: any;
}

const addons: Addon[] = [
  {
    id: 'accounting',
    name: 'Accounting Integration',
    description: 'Sync with Xero, QuickBooks, and Sage',
    longDescription: 'Automatically sync your transactions, invoices, and receipts with your accounting software. Save hours of manual data entry every month.',
    price: '£5/month',
    icon: FileText,
    recommended: true,
  },
  {
    id: 'expenses',
    name: 'Expense Management',
    description: 'Track and manage team expenses',
    longDescription: 'Issue virtual cards to employees, set spending limits, capture receipts automatically, and streamline expense approvals.',
    price: '£8/month',
    icon: CreditCard,
  },
  {
    id: 'payroll',
    name: 'Payroll Services',
    description: 'Automated payroll processing',
    longDescription: 'Pay your team on time, every time. Handles PAYE, pensions, and auto-enrollment. Integrated with HMRC.',
    price: '£15/month + £2 per employee',
    icon: Users,
    recommended: true,
  },
  {
    id: 'analytics',
    name: 'Business Analytics',
    description: 'Advanced reporting and insights',
    longDescription: 'Get detailed cash flow forecasts, spending analytics, and custom reports. Track KPIs and make data-driven decisions.',
    price: '£10/month',
    icon: BarChart3,
  },
  {
    id: 'international',
    name: 'International Toolkit',
    description: 'Multi-currency and FX tools',
    longDescription: 'Hold and manage multiple currencies, get better FX rates, and send international payments at lower costs.',
    price: '£12/month',
    icon: Globe,
  },
  {
    id: 'compliance',
    name: 'Compliance Suite',
    description: 'AML, sanctions screening, and reporting',
    longDescription: 'Enhanced due diligence tools, automated compliance checks, and regulatory reporting assistance.',
    price: '£20/month',
    icon: Shield,
  },
];

export function ToolkitAddonsScreen({ onContinue, onBack, businessData }: ToolkitAddonsScreenProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [detailAddon, setDetailAddon] = useState<Addon | null>(null);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    return selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        const price = parseFloat(addon.price.replace(/[^0-9.]/g, ''));
        return total + price;
      }
      return total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-accent hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="mb-3">Toolkit+ Add-ons</h1>
          <p className="text-muted-foreground">
            Enhance your banking with powerful integrations and tools
          </p>
        </div>

        {/* Addons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {addons.map((addon) => {
            const Icon = addon.icon;
            const isSelected = selectedAddons.includes(addon.id);
            
            return (
              <div
                key={addon.id}
                className={`bg-white border-2 rounded-xl p-6 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-accent shadow-lg'
                    : 'border-border hover:border-accent/50'
                }`}
                onClick={() => setDetailAddon(addon)}
              >
                {/* Recommended badge */}
                {addon.recommended && (
                  <div className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs mb-3">
                    Recommended
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-accent/20' : 'bg-muted/50'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`} />
                </div>

                {/* Content */}
                <h4 className="mb-2">{addon.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                <p className="text-sm mb-4">{addon.price}</p>

                {/* Add/Remove Button */}
                <Button
                  size="sm"
                  variant={isSelected ? 'default' : 'outline'}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAddon(addon.id);
                  }}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Summary Bar */}
        {selectedAddons.length > 0 && (
          <div className="bg-white border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="mb-1">Selected add-ons ({selectedAddons.length})</h4>
                <p className="text-sm text-muted-foreground">
                  Additional cost: £{calculateTotal().toFixed(2)}/month
                </p>
              </div>
              <Button onClick={() => onContinue(selectedAddons)}>
                Continue
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedAddons.map((addonId) => {
                const addon = addons.find(a => a.id === addonId);
                if (!addon) return null;
                
                return (
                  <div
                    key={addonId}
                    className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    <span>{addon.name}</span>
                    <button
                      onClick={() => toggleAddon(addonId)}
                      className="hover:bg-accent/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Skip option */}
        <div className="text-center">
          <Button variant="ghost" onClick={() => onContinue([])}>
            Skip for now
          </Button>
        </div>
      </div>

      {/* Detail Drawer */}
      {detailAddon && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setDetailAddon(null)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="mb-2">{detailAddon.name}</h2>
                <p className="text-muted-foreground">{detailAddon.description}</p>
              </div>
              <button
                onClick={() => setDetailAddon(null)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm mb-4">{detailAddon.longDescription}</p>
              <div className="inline-block px-4 py-2 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Price: </span>
                <span>{detailAddon.price}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDetailAddon(null)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  toggleAddon(detailAddon.id);
                  setDetailAddon(null);
                }}
                className="flex-1"
              >
                {selectedAddons.includes(detailAddon.id) ? 'Remove' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
