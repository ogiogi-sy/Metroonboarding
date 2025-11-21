import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface SelectOldBankScreenProps {
  onSelectBank: (bankName: string) => void;
  onBack: () => void;
}

const BANKS = [
  { name: 'Barclays', logo: '🏦' },
  { name: 'HSBC', logo: '🏦' },
  { name: 'Lloyds Bank', logo: '🏦' },
  { name: 'NatWest', logo: '🏦' },
  { name: 'Royal Bank of Scotland', logo: '🏦' },
  { name: 'Santander', logo: '🏦' },
  { name: 'TSB', logo: '🏦' },
  { name: 'Nationwide', logo: '🏦' },
  { name: 'Halifax', logo: '🏦' },
  { name: 'First Direct', logo: '🏦' },
  { name: 'Monzo', logo: '🏦' },
  { name: 'Starling Bank', logo: '🏦' },
  { name: 'Revolut', logo: '🏦' },
  { name: 'Tide', logo: '🏦' },
];

export function SelectOldBankScreen({ onSelectBank, onBack }: SelectOldBankScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Choose the bank you're switching from
        </h1>
        <p className="text-muted-foreground">
          Select your current business bank to continue
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for your bank..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Bank List */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden mb-8">
        {filteredBanks.length > 0 ? (
          filteredBanks.map((bank, index) => (
            <button
              key={bank.name}
              onClick={() => setSelectedBank(bank.name)}
              className={`w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors ${
                index !== filteredBanks.length - 1 ? 'border-b border-border' : ''
              } ${selectedBank === bank.name ? 'bg-accent/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  {bank.logo}
                </div>
                <span className="text-sm" style={{ color: '#001A72' }}>
                  {bank.name}
                </span>
              </div>
              {selectedBank === bank.name && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No banks found matching "{searchQuery}"
          </div>
        )}
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
          onClick={() => selectedBank && onSelectBank(selectedBank)}
          disabled={!selectedBank}
          className="flex-1 bg-accent text-white px-8 py-4 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Connect to {selectedBank || 'bank'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
