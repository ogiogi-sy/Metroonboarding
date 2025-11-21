import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface FinancialQuestionsScreenProps {
  onContinue: (data: FinancialData) => void;
  onBack: () => void;
}

export interface FinancialData {
  annualTurnover: number;
  revenueStability: 'stable' | 'fluctuating' | 'seasonal';
  expectedRevenue12Months: number;
  hasMajorCustomers: boolean;
  majorCustomerDetails?: string;
}

export function FinancialQuestionsScreen({ onContinue, onBack }: FinancialQuestionsScreenProps) {
  const [annualTurnover, setAnnualTurnover] = useState('');
  const [revenueStability, setRevenueStability] = useState<'stable' | 'fluctuating' | 'seasonal' | null>(null);
  const [expectedRevenue12Months, setExpectedRevenue12Months] = useState('');
  const [hasMajorCustomers, setHasMajorCustomers] = useState<boolean | null>(null);
  const [majorCustomerDetails, setMajorCustomerDetails] = useState('');

  const handleContinue = () => {
    if (!annualTurnover || !revenueStability || !expectedRevenue12Months || hasMajorCustomers === null) {
      return;
    }

    if (hasMajorCustomers && !majorCustomerDetails.trim()) {
      return;
    }

    onContinue({
      annualTurnover: parseFloat(annualTurnover),
      revenueStability,
      expectedRevenue12Months: parseFloat(expectedRevenue12Months),
      hasMajorCustomers,
      majorCustomerDetails: hasMajorCustomers ? majorCustomerDetails : undefined,
    });
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Financial performance</h2>
        <p className="text-sm text-muted-foreground">
          Help us understand your business's revenue and cashflow patterns
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Annual Turnover */}
        <div className="bg-white border border-border rounded-xl p-6">
          <Label htmlFor="annualTurnover" className="mb-2 block">
            Annual turnover (last 12 months)
          </Label>
          <p className="text-xs text-muted-foreground mb-4">
            Your total business revenue over the past year
          </p>
          <Input
            id="annualTurnover"
            type="text"
            value={annualTurnover ? formatCurrency(annualTurnover) : ''}
            onChange={(e) => setAnnualTurnover(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="£0"
            className="text-lg"
          />
        </div>

        {/* Revenue Stability */}
        <div className="bg-white border border-border rounded-xl p-6">
          <Label className="mb-4 block">Monthly revenue pattern</Label>
          <p className="text-xs text-muted-foreground mb-4">
            How would you describe your revenue stability?
          </p>
          
          <div className="space-y-2">
            <button
              onClick={() => setRevenueStability('stable')}
              className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                revenueStability === 'stable'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  revenueStability === 'stable'
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {revenueStability === 'stable' && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm mb-0.5">Stable</h4>
                  <p className="text-xs text-muted-foreground">
                    Consistent revenue month-to-month
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setRevenueStability('fluctuating')}
              className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                revenueStability === 'fluctuating'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  revenueStability === 'fluctuating'
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {revenueStability === 'fluctuating' && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm mb-0.5">Fluctuating</h4>
                  <p className="text-xs text-muted-foreground">
                    Revenue varies but no clear pattern
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setRevenueStability('seasonal')}
              className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                revenueStability === 'seasonal'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  revenueStability === 'seasonal'
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {revenueStability === 'seasonal' && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm mb-0.5">Seasonal</h4>
                  <p className="text-xs text-muted-foreground">
                    Revenue peaks at certain times of year
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Expected Revenue Next 12 Months */}
        <div className="bg-white border border-border rounded-xl p-6">
          <Label htmlFor="expectedRevenue" className="mb-2 block flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Expected revenue (next 12 months)
          </Label>
          <p className="text-xs text-muted-foreground mb-4">
            Your projected total revenue for the coming year
          </p>
          <Input
            id="expectedRevenue"
            type="text"
            value={expectedRevenue12Months ? formatCurrency(expectedRevenue12Months) : ''}
            onChange={(e) => setExpectedRevenue12Months(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="£0"
            className="text-lg"
          />
        </div>

        {/* Major Customers */}
        <div className="bg-white border border-border rounded-xl p-6">
          <Label className="mb-2 block flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Customer concentration
          </Label>
          <p className="text-xs text-muted-foreground mb-4">
            Do you have any customers that represent more than 20% of your revenue?
          </p>

          <div className="space-y-2 mb-4">
            <button
              onClick={() => setHasMajorCustomers(false)}
              className={`w-full border-2 rounded-xl p-3 text-left transition-all ${
                hasMajorCustomers === false
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">No, revenue is well distributed</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  hasMajorCustomers === false
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {hasMajorCustomers === false && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>

            <button
              onClick={() => setHasMajorCustomers(true)}
              className={`w-full border-2 rounded-xl p-3 text-left transition-all ${
                hasMajorCustomers === true
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">Yes, I have major customers</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  hasMajorCustomers === true
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {hasMajorCustomers === true && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          </div>

          {hasMajorCustomers && (
            <div className="pt-4 border-t border-border">
              <Label htmlFor="majorCustomerDetails" className="mb-2 block text-xs">
                Tell us about your major customers
              </Label>
              <Textarea
                id="majorCustomerDetails"
                value={majorCustomerDetails}
                onChange={(e) => setMajorCustomerDetails(e.target.value)}
                placeholder="E.g., '2 main clients: one public sector contract (30% of revenue) and one corporate client (25% of revenue)'"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={
            !annualTurnover ||
            !revenueStability ||
            !expectedRevenue12Months ||
            hasMajorCustomers === null ||
            (hasMajorCustomers && !majorCustomerDetails.trim())
          }
          className="flex-1 h-12 group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
