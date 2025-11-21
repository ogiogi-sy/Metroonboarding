import { Button } from '../ui/button';
import { CheckCircle2, ArrowRight, Info, TrendingDown, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Slider } from '../ui/slider';

interface OutcomeApprovedScreenProps {
  minAmount: number;
  maxAmount: number;
  indicativeAPR: number;
  termMonths: number;
  onAccept: (finalAmount: number) => void;
  onDecline: () => void;
}

export function OutcomeApprovedScreen({
  minAmount,
  maxAmount,
  indicativeAPR,
  termMonths,
  onAccept,
  onDecline,
}: OutcomeApprovedScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState(maxAmount);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate monthly repayment
  const monthlyRate = indicativeAPR / 12;
  const monthlyPayment =
    selectedAmount *
    ((monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1));

  const totalRepayable = monthlyPayment * termMonths;
  const totalInterest = totalRepayable - selectedAmount;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#DCFCE7] rounded-full mb-6 animate-pulse">
          <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
        </div>
        <h1 className="mb-4">You're eligible for a loan! 🎉</h1>
        <p className="text-muted-foreground">
          Congratulations! We're pleased to offer you business lending
        </p>
      </div>

      {/* Loan Offer Card */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-8 mb-6">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-2">You can borrow up to</p>
          <h2 className="text-4xl mb-4">{formatCurrency(maxAmount)}</h2>
          {minAmount < maxAmount && (
            <p className="text-xs text-muted-foreground">
              Minimum loan amount: {formatCurrency(minAmount)}
            </p>
          )}
        </div>

        {/* Amount Slider */}
        {minAmount < maxAmount && (
          <div className="mb-6">
            <label className="text-sm mb-3 block">Adjust your loan amount</label>
            <Slider
              value={[selectedAmount]}
              onValueChange={(value) => setSelectedAmount(value[0])}
              min={minAmount}
              max={maxAmount}
              step={1000}
              className="mb-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(minAmount)}</span>
              <span className="text-accent">{formatCurrency(selectedAmount)}</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>
        )}

        {/* Loan Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-accent" />
              <p className="text-xs text-muted-foreground">Indicative APR</p>
            </div>
            <p className="text-2xl">{(indicativeAPR * 100).toFixed(1)}%</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <p className="text-xs text-muted-foreground">Loan term</p>
            </div>
            <p className="text-2xl">{termMonths} months</p>
          </div>
        </div>
      </div>

      {/* Repayment Details */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h4 className="mb-4">Estimated repayment schedule</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">Monthly repayment</span>
            <span className="text-lg">{formatCurrency(monthlyPayment)}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-sm text-muted-foreground">Total amount repayable</span>
            <span className="text-lg">{formatCurrency(totalRepayable)}</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Total interest</span>
            <span className="text-lg">{formatCurrency(totalInterest)}</span>
          </div>
        </div>

        <div className="bg-[#F5F6F8] rounded-lg p-4 mt-4 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#0033A0] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            This is an indicative rate. Your final APR will be confirmed in your loan contract.
          </p>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <h4 className="mb-3">Conditions</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
            <span>Subject to final credit approval and contract signing</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
            <span>Personal guarantee required from all directors</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
            <span>Funds will be disbursed to your Metro Bank business account</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onAccept(selectedAmount)}
          className="w-full h-12 group"
        >
          <span>Accept offer and continue to contract</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button variant="outline" onClick={onDecline} className="w-full h-12">
          Decline this offer
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        This offer is valid for 14 days. You can complete the application at any time within this period.
      </p>
    </div>
  );
}