import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Account {
  id: string;
  nickname: string;
  sortCode: string;
  accountNumber: string;
  balance: string;
  accountType: string;
}

interface SelectAccountScreenProps {
  accounts: Account[];
  onSelectAccount: (account: Account) => void;
  onBack: () => void;
}

export function SelectAccountScreen({ accounts, onSelectAccount, onBack }: SelectAccountScreenProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

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
          Which account do you want to switch?
        </h1>
        <p className="text-muted-foreground">
          We found multiple business accounts. Select the one you'd like to move to Metro Bank.
        </p>
      </div>

      {/* Account List */}
      <div className="space-y-3 mb-8">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => setSelectedAccountId(account.id)}
            className={`w-full text-left bg-white border-2 rounded-full p-6 transition-all ${
              selectedAccountId === account.id
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base" style={{ color: '#001A72' }}>
                    {account.nickname}
                  </h3>
                  <span className="text-base" style={{ color: '#001A72' }}>
                    {account.balance}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sort Code</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>
                      {account.sortCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>
                      {account.accountNumber}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                    {account.accountType}
                  </span>
                </div>
              </div>
              {selectedAccountId === account.id && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-8 py-4 border border-border rounded-full hover:bg-muted/50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => selectedAccount && onSelectAccount(selectedAccount)}
          disabled={!selectedAccount}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
