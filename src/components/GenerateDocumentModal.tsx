import { X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

type GenerationType = 'balance' | 'statement' | 'tax' | null;

interface GenerateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: GenerationType;
}

export function GenerateDocumentModal({ isOpen, onClose, type }: GenerateDocumentModalProps) {
  const [step, setStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [format, setFormat] = useState('pdf');
  const [includeBranding, setIncludeBranding] = useState(true);
  const [taxYear, setTaxYear] = useState('2024-25');

  if (!isOpen || !type) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedAccount('');
    setSelectedPurpose('');
    setDateFrom('');
    setDateTo('');
    setFormat('pdf');
    setIncludeBranding(true);
    setTaxYear('2024-25');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleGenerate = () => {
    toast.success('Document generated successfully');
    handleClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'balance':
        return 'Generate Balance Confirmation Letter';
      case 'statement':
        return 'Generate Custom Statement';
      case 'tax':
        return 'Generate Tax-Year Summary';
      default:
        return 'Generate Document';
    }
  };

  const renderBalanceFlow = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
              Select Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
            >
              <option value="">Choose an account...</option>
              <option value="12345678">Business Current Account • 12345678</option>
              <option value="87654321">Business Savings Account • 87654321</option>
              <option value="45678901">Tech Ventures Current • 45678901</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
              Purpose
            </label>
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
            >
              <option value="">Choose a purpose...</option>
              <option value="auditor">For Auditor</option>
              <option value="accountant">For Accountant</option>
              <option value="visa">Visa Application</option>
              <option value="mortgage">Mortgage Application</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90"
              onClick={() => setStep(2)}
              disabled={!selectedAccount || !selectedPurpose}
            >
              Continue
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <p className="text-xs text-muted-foreground">Account</p>
          <p className="text-sm" style={{ color: '#001A72' }}>
            {selectedAccount === '12345678' && 'Business Current Account • 12345678'}
            {selectedAccount === '87654321' && 'Business Savings Account • 87654321'}
            {selectedAccount === '45678901' && 'Tech Ventures Current • 45678901'}
          </p>
          <p className="text-xs text-muted-foreground mt-3">Purpose</p>
          <p className="text-sm" style={{ color: '#001A72' }}>
            {selectedPurpose === 'auditor' && 'For Auditor'}
            {selectedPurpose === 'accountant' && 'For Accountant'}
            {selectedPurpose === 'visa' && 'Visa Application'}
            {selectedPurpose === 'mortgage' && 'Mortgage Application'}
            {selectedPurpose === 'other' && 'Other'}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Your balance confirmation letter will be generated and added to your documents.
        </p>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleGenerate}>
            Generate Letter
          </Button>
        </div>
      </div>
    );
  };

  const renderStatementFlow = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
              Select Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
            >
              <option value="">Choose an account...</option>
              <option value="12345678">Business Current Account • 12345678</option>
              <option value="87654321">Business Savings Account • 87654321</option>
              <option value="45678901">Tech Ventures Current • 45678901</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
              Output Format
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm transition-all ${
                  format === 'pdf'
                    ? 'border-accent bg-accent/5 text-accent'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm transition-all ${
                  format === 'csv'
                    ? 'border-accent bg-accent/5 text-accent'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                CSV
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <input
              type="checkbox"
              id="branding"
              checked={includeBranding}
              onChange={(e) => setIncludeBranding(e.target.checked)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="branding" className="text-sm cursor-pointer flex-1">
              Include Metro Bank branding
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90"
              onClick={() => setStep(2)}
              disabled={!selectedAccount || !dateFrom || !dateTo}
            >
              Continue
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <p className="text-xs text-muted-foreground">Account</p>
          <p className="text-sm" style={{ color: '#001A72' }}>
            {selectedAccount === '12345678' && 'Business Current Account • 12345678'}
            {selectedAccount === '87654321' && 'Business Savings Account • 87654321'}
            {selectedAccount === '45678901' && 'Tech Ventures Current • 45678901'}
          </p>
          <p className="text-xs text-muted-foreground mt-3">Date Range</p>
          <p className="text-sm" style={{ color: '#001A72' }}>
            {new Date(dateFrom).toLocaleDateString('en-GB')} - {new Date(dateTo).toLocaleDateString('en-GB')}
          </p>
          <p className="text-xs text-muted-foreground mt-3">Format</p>
          <p className="text-sm" style={{ color: '#001A72' }}>{format.toUpperCase()}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          Your custom statement will be generated and added to your documents.
        </p>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleGenerate}>
            Generate Statement
          </Button>
        </div>
      </div>
    );
  };

  const renderTaxFlow = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
            Select Tax Year
          </label>
          <select
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
          >
            <option value="2024-25">2024/25</option>
            <option value="2023-24">2023/24</option>
            <option value="2022-23">2022/23</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
            Select Account
          </label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm"
          >
            <option value="">All accounts</option>
            <option value="12345678">Business Current Account • 12345678</option>
            <option value="87654321">Business Savings Account • 87654321</option>
            <option value="45678901">Tech Ventures Current • 45678901</option>
          </select>
        </div>

        <p className="text-sm text-muted-foreground">
          This will generate a comprehensive tax summary including interest earned and all relevant transactions for the selected tax year.
        </p>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleGenerate}>
            Generate Summary
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg mb-1" style={{ color: '#001A72' }}>{getTitle()}</h3>
            <p className="text-sm text-muted-foreground">
              {type === 'balance' && 'Create an official balance confirmation letter'}
              {type === 'statement' && 'Generate a custom date-range statement'}
              {type === 'tax' && 'Generate a tax year summary document'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-6">
          {type === 'balance' && renderBalanceFlow()}
          {type === 'statement' && renderStatementFlow()}
          {type === 'tax' && renderTaxFlow()}
        </div>
      </div>
    </div>
  );
}
