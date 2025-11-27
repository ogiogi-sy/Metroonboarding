import { useState, useEffect } from 'react';
import { X, CreditCard, Search, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const DISPUTE_REASONS = [
  { id: 'fraud', label: 'I did not make this transaction', description: 'Someone else used my card without my permission' },
  { id: 'goods', label: 'Goods or services not received', description: 'I paid but didn\'t get what I ordered' },
  { id: 'duplicate', label: 'Duplicate transaction', description: 'I was charged more than once for the same purchase' },
  { id: 'amount', label: 'Incorrect amount', description: 'I was charged the wrong amount' },
  { id: 'refund', label: 'Refund not received', description: 'I was promised a refund but haven\'t received it' },
  { id: 'cancelled', label: 'Subscription cancelled', description: 'I was charged after cancelling a subscription' },
];

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTransaction?: any;
  availableTransactions?: any[];
  onSubmit: (data: { transaction: any; reason: string; additionalDetails: string }) => void;
}

export function DisputeModal({
  isOpen,
  onClose,
  initialTransaction,
  availableTransactions = [],
  onSubmit,
}: DisputeModalProps) {
  const [step, setStep] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialTransaction) {
        setSelectedTransaction(initialTransaction);
        setStep(2); // Skip search if transaction provided
      } else {
        setSelectedTransaction(null);
        setStep(1);
      }
      setSelectedReason(null);
      setAdditionalDetails('');
      setTransactionSearch('');
    }
  }, [isOpen, initialTransaction]);

  if (!isOpen) return null;

  // Filter transactions for step 1
  const filteredTransactions = availableTransactions.filter(txn => {
    const merchant = txn.merchant || txn.merchantName || '';
    const amount = txn.amount?.toString() || '';
    return merchant.toLowerCase().includes(transactionSearch.toLowerCase()) ||
           amount.includes(transactionSearch);
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(Math.abs(amount));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getMerchantName = (txn: any) => txn.merchant || txn.merchantName || 'Unknown Merchant';
  const getLast4 = (txn: any) => txn.cardLast4 || txn.cardUsed || '....';

  const handleSubmit = () => {
    if (!selectedTransaction || !selectedReason) return;
    onSubmit({
      transaction: selectedTransaction,
      reason: selectedReason,
      additionalDetails
    });
    onClose();
  };

  // Calculate current step number for display (1-3 or 1-2 depending on flow)
  const totalSteps = 3; // Always showing "Step X of 3" for consistency with original design

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className={`bg-white rounded-2xl border border-border shadow-xl w-full pointer-events-auto overflow-hidden flex flex-col max-h-[90vh] ${step === 1 ? 'max-w-2xl' : 'max-w-md'}`}>
          {/* Modal Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-gray-50/50 shrink-0">
            <div>
              <h2 className="text-xl font-semibold" style={{ color: '#001A72' }}>Raise a Dispute</h2>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? 'Select a transaction to dispute' : `Step ${step} of 3`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {/* Step 1: Search Transaction */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by merchant or amount..."
                    value={transactionSearch}
                    onChange={(e) => setTransactionSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div className="space-y-2 mt-4 max-h-[400px] overflow-y-auto">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        onClick={() => {
                          setSelectedTransaction(txn);
                          setStep(2);
                        }}
                        className="p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-white transition-colors">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-[#001A72]">{getMerchantName(txn)}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(txn.date)} • •••• {getLast4(txn)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#001A72]">{formatAmount(txn.amount)}</p>
                          <p className="text-xs text-muted-foreground">{txn.status || 'Completed'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions found matching "{transactionSearch}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Select Reason */}
            {step === 2 && selectedTransaction && (
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Selected Transaction</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#001A72]">{getMerchantName(selectedTransaction)}</span>
                    <span className="font-bold text-[#001A72]">{formatAmount(selectedTransaction.amount)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Reason for Dispute
                  </label>
                  {DISPUTE_REASONS.map((reason) => (
                    <button
                      key={reason.id}
                      onClick={() => setSelectedReason(reason.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedReason === reason.id 
                        ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                        : 'border-border hover:border-accent hover:bg-accent/5'
                      }`}
                    >
                      <p className={`font-medium text-sm ${selectedReason === reason.id ? 'text-accent' : 'text-[#001A72]'}`}>
                        {reason.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{reason.description}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => initialTransaction ? onClose() : setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    disabled={!selectedReason}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {step === 3 && selectedTransaction && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                      Additional Details
                    </label>
                    <textarea
                      placeholder="Please provide any additional details that might help us resolve this dispute..."
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs opacity-90">
                      <li>We will investigate your claim immediately.</li>
                      <li>You may receive a temporary credit while we investigate.</li>
                      <li>The merchant has 30 days to respond.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={handleSubmit}
                  >
                    Submit Dispute
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}