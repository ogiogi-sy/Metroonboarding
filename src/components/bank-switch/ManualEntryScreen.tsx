import { useState } from 'react';
import { OldAccountData } from './BankSwitchFlow';

interface ManualEntryScreenProps {
  initialData: OldAccountData;
  onContinue: (data: OldAccountData) => void;
  onBack: () => void;
}

export function ManualEntryScreen({ initialData, onContinue, onBack }: ManualEntryScreenProps) {
  const [formData, setFormData] = useState<OldAccountData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(formData);
  };

  const isValid =
    formData.sortCode &&
    formData.accountNumber &&
    formData.accountName &&
    formData.businessName;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="mb-3" style={{ color: '#001A72' }}>
          Enter your old account details
        </h1>
        <p className="text-muted-foreground">
          Provide the details of the account you're switching from
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-border rounded-2xl p-6 mb-8">
          <div className="space-y-6">
            {/* Sort Code */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Sort Code
              </label>
              <input
                type="text"
                placeholder="00-00-00"
                value={formData.sortCode || ''}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 6) value = value.slice(0, 6);
                  if (value.length > 4) {
                    value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4);
                  } else if (value.length > 2) {
                    value = value.slice(0, 2) + '-' + value.slice(2);
                  }
                  setFormData({ ...formData, sortCode: value });
                }}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Account Number
              </label>
              <input
                type="text"
                placeholder="12345678"
                value={formData.accountNumber || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                  setFormData({ ...formData, accountNumber: value });
                }}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Account Name
              </label>
              <input
                type="text"
                placeholder="e.g. Business Current Account"
                value={formData.accountName || ''}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Business Name (as shown on the account)
              </label>
              <input
                type="text"
                placeholder="Your business name"
                value={formData.businessName || ''}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Bank Name (Optional) */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Bank Name <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Barclays"
                value={formData.bankName || ''}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Make sure these details match exactly with your current bank account to avoid any issues
            during the switch.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 border border-border rounded-full hover:bg-muted/50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
