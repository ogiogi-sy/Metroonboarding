import React, { useState } from 'react';
import { Check, ChevronDown, Building2 } from 'lucide-react';
import { cn } from './ui/utils';

interface BusinessAccount {
  id: string;
  name: string;
  role: 'admin' | 'viewer' | 'editor';
  isRoot?: boolean;
}

interface AccountSelectorProps {
  selectedAccounts: string[];
  onSelectionChange: (accountIds: string[]) => void;
}

// Mock business accounts
const BUSINESS_ACCOUNTS: BusinessAccount[] = [
  { id: '1', name: 'Business Current Account', role: 'admin', isRoot: true },
  { id: '2', name: 'Tax Saver', role: 'admin' },
  { id: '3', name: 'Marketing Budget', role: 'editor' },
  { id: '4', name: 'Reserve Account', role: 'viewer' },
  { id: '5', name: 'Euro Operating', role: 'admin' },
  { id: '6', name: 'USD Collections', role: 'admin' },
];

export function AccountSelector({ selectedAccounts, onSelectionChange }: AccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccount = (accountId: string) => {
    if (selectedAccounts.includes(accountId)) {
      // Don't allow deselecting if it's the last one
      if (selectedAccounts.length > 1) {
        const newSelection = selectedAccounts.filter(id => id !== accountId);
        onSelectionChange(newSelection);
      }
    } else {
      const newSelection = [...selectedAccounts, accountId];
      onSelectionChange(newSelection);
    }
  };

  const selectAll = () => {
    onSelectionChange(BUSINESS_ACCOUNTS.map(acc => acc.id));
  };

  const clearAll = () => {
    // Keep at least one selected (the first one)
    onSelectionChange([BUSINESS_ACCOUNTS[0].id]);
  };

  const getDisplayText = () => {
    if (selectedAccounts.length === 0) return 'Select accounts';
    if (selectedAccounts.length === 1) {
      const account = BUSINESS_ACCOUNTS.find(acc => acc.id === selectedAccounts[0]);
      return account?.name || 'Your Business';
    }
    if (selectedAccounts.length === BUSINESS_ACCOUNTS.length) {
      return 'All Accounts';
    }
    return `${selectedAccounts.length} Accounts`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm truncate font-medium" style={{ color: '#001A72' }}>
            {getDisplayText()}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {selectedAccounts.length === 1 ? 'Single account' : `${selectedAccounts.length} accounts selected`}
          </p>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-500 transition-transform flex-shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden w-[380px]">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-xs font-medium text-gray-900 uppercase tracking-wide">Select Accounts</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectAll();
                  }}
                  className="text-xs text-[#0033A0] hover:underline"
                >
                  Select All
                </button>
                <span className="text-xs text-gray-400">•</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  className="text-xs text-[#0033A0] hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Account List */}
            <div className="max-h-[320px] overflow-y-auto">
              {BUSINESS_ACCOUNTS.map((account) => {
                const isSelected = selectedAccounts.includes(account.id);
                const isLastSelected = selectedAccounts.length === 1 && isSelected;

                return (
                  <div
                    key={account.id}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer",
                      isLastSelected && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLastSelected) {
                        toggleAccount(account.id);
                      }
                    }}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                      isSelected 
                        ? "bg-[#0033A0] border-[#0033A0]" 
                        : "border-gray-300 bg-white"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {account.name}
                        </p>
                        {account.isRoot && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded uppercase font-medium">
                            Root
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 capitalize">{account.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600">
                {selectedAccounts.length} of {BUSINESS_ACCOUNTS.length} accounts selected
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}