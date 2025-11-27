import { X, FileText, AlertCircle, CreditCard, Calendar, Tag, Download, Upload, ChevronRight, MessageSquare, MapPin, User, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Transaction {
  id: string;
  merchant?: string;
  merchantName?: string;
  amount: number;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  cardUsed?: string;
  tags?: string[];
  description?: string;
  type: 'debit' | 'credit';
  time?: string;
  user?: string;
  location?: string;
  bnplEligible?: boolean;
  bnplActive?: boolean;
  bnplPlan?: {
    months: number;
    monthlyAmount: number;
    nextPaymentDate: string;
  };
}

interface TransactionDrawerProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTransaction?: (updatedTransaction: Transaction) => void;
}

export function TransactionDrawer({ transaction, isOpen, onClose, onUpdateTransaction }: TransactionDrawerProps) {
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showBNPLModal, setShowBNPLModal] = useState(false);
  const [bnplPlanMonths, setBnplPlanMonths] = useState<'3' | '6'>('3');
  // Local state to track BNPL status if not persisted globally in this prototype
  const [localBnplActive, setLocalBnplActive] = useState(false);
  const [localBnplPlan, setLocalBnplPlan] = useState<any>(null);

  if (!transaction) return null;

  // Check if transaction is eligible (Mock logic: eligible if it's Slack or Google Ads OR if amount is > 100 and debit)
  // In a real app, this would be a property on the transaction object
  const isEligible = transaction.bnplEligible || (transaction.merchantName?.includes('Slack') || transaction.merchantName?.includes('Google') || (transaction.amount < -100 && transaction.type !== 'credit'));
  const isBnplActive = transaction.bnplActive || localBnplActive;
  const activePlan = transaction.bnplPlan || localBnplPlan;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(Math.abs(amount));
  };

  const formatDateTime = (date: string, time?: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return time ? `${formattedDate} at ${time}` : formattedDate;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shopping':
        return '🛍️';
      case 'groceries':
        return '🛒';
      case 'transport':
        return '🚗';
      case 'entertainment':
        return '🎬';
      case 'utilities':
        return '⚡';
      case 'dining':
        return '🍽️';
      default:
        return '💼';
    }
  };

  const handleAddNote = () => {
    toast.success('Note feature coming soon');
  };

  const handleAttachReceipt = () => {
    toast.info('Receipt upload feature coming soon');
  };

  const handleSplitInstalments = () => {
    setShowBNPLModal(true);
  };

  const handleConfirmBNPL = () => {
    const months = parseInt(bnplPlanMonths);
    const monthlyAmount = Math.abs(transaction.amount) / months;
    
    const plan = {
        months,
        monthlyAmount,
        nextPaymentDate: '15 Aug 2025' // Mock date
    };

    setLocalBnplActive(true);
    setLocalBnplPlan(plan);

    if (onUpdateTransaction) {
        onUpdateTransaction({
            ...transaction,
            bnplActive: true,
            bnplPlan: plan
        });
    }

    setShowBNPLModal(false);
    toast.success('Your instalment plan has been set up');
  };

  const handleReportProblem = () => {
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = () => {
    setShowDisputeModal(false);
    toast.success('Dispute submitted successfully');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white border-l border-border z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white z-10">
            <h2 className="text-base font-medium text-[#001A72]">Transaction Details</h2>
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
            >
                <X className="h-4 w-4 text-muted-foreground" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div className="space-y-6">
                
                {/* 1. Main Transaction Card */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                    {/* Card Header */}
                    <div className="p-6 pb-4 border-b border-border/50 bg-gray-50/50">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h3 className="font-semibold text-[#001A72] text-lg leading-tight">{transaction.merchantName || transaction.merchant || 'Unknown Merchant'}</h3>
                                {isBnplActive && (
                                    <Badge className="mt-2 bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50 font-medium flex w-fit items-center gap-1">
                                        <CreditCard className="w-3 h-3" />
                                        In instalments
                                    </Badge>
                                )}
                            </div>
                            <Badge variant="outline" className={`${getStatusColor(transaction.status)} font-normal shrink-0`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                        </div>
                    </div>

                    {/* Card Body: Amount */}
                    <div className="p-6 py-8 flex flex-col items-center justify-center border-b border-border/50 bg-white">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Amount</p>
                        <span
                            className="text-4xl font-semibold tracking-tight"
                            style={{ color: transaction.type === 'credit' ? '#10B981' : '#001A72' }}
                        >
                            {transaction.type === 'credit' ? '+' : ''}{formatAmount(transaction.amount)}
                        </span>
                    </div>
                    
                    {/* BNPL Active Summary */}
                    {isBnplActive && activePlan && (
                        <div className="mx-6 mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-3">
                            <div className="flex items-center gap-2 text-indigo-900 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                                <h3>Active Instalment Plan</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-indigo-800">
                                    {activePlan.months} monthly payments of £{activePlan.monthlyAmount.toFixed(2)}
                                </p>
                                <p className="text-xs text-indigo-600">
                                    Next payment: {activePlan.nextPaymentDate}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Card Details Grid */}
                    <div className="p-4 bg-white">
                        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                             {/* Row 1: Date & Time */}
                            <div className="flex items-center justify-between text-sm border-b border-dashed border-border/60 pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Date & Time</span>
                                </div>
                                <span className="font-medium text-[#001A72]">{formatDateTime(transaction.date, transaction.time)}</span>
                            </div>

                             {/* Row 2: Category */}
                             <div className="flex items-center justify-between text-sm border-b border-dashed border-border/60 pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Tag className="h-4 w-4" />
                                    <span>Category</span>
                                </div>
                                <span className="font-medium text-[#001A72]">{transaction.category}</span>
                            </div>

                             {/* Row 3: Payment Method */}
                             <div className="flex items-center justify-between text-sm border-b border-dashed border-border/60 pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Payment Method</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium text-[#001A72]">{transaction.paymentMethod}</span>
                                    {transaction.cardUsed && <span className="text-muted-foreground text-xs">• {transaction.cardUsed}</span>}
                                </div>
                            </div>

                             {/* Row 3: User (Who) */}
                             <div className="flex items-center justify-between text-sm border-b border-dashed border-border/60 pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>Made by</span>
                                </div>
                                <span className="font-medium text-[#001A72]">{transaction.user || 'Unknown User'}</span>
                            </div>

                             {/* Row 4: Location */}
                             <div className="flex items-center justify-between text-sm border-b border-dashed border-border/60 pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>Location</span>
                                </div>
                                <span className="font-medium text-[#001A72]">{transaction.location || 'Online / Unknown'}</span>
                            </div>

                            {/* Row 5: Transaction ID */}
                            <div className="flex items-center justify-between text-sm pt-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span>Transaction ID</span>
                                </div>
                                <span className="font-mono text-xs text-[#001A72] bg-white border border-border px-2 py-0.5 rounded">{transaction.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags Section */}
                {transaction.tags && transaction.tags.length > 0 && (
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 px-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                    {transaction.tags.map((tag, index) => (
                        <Badge
                        key={index}
                        className="bg-white text-foreground border border-border hover:border-[#0033A0] transition-colors"
                        >
                        {tag}
                        </Badge>
                    ))}
                    </div>
                </div>
                )}

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Action Buttons */}
                <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 px-1">Actions</p>

                <button
                    onClick={handleAddNote}
                    className="w-full flex items-center justify-between p-4 rounded-full border border-border bg-white hover:border-[#0033A0]/50 transition-all group"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-[#001A72]">Add Note</p>
                        <p className="text-xs text-muted-foreground">Add a personal note to this transaction</p>
                    </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                </button>

                <button
                    onClick={handleAttachReceipt}
                    className="w-full flex items-center justify-between p-4 rounded-full border border-border bg-white hover:border-[#0033A0]/50 transition-all group"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Upload className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-[#001A72]">Attach Receipt</p>
                        <p className="text-xs text-muted-foreground">Upload a PDF or image</p>
                    </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                </button>

                {!isBnplActive && isEligible && (
                    <button
                        onClick={handleSplitInstalments}
                        className="w-full flex items-center justify-between p-4 rounded-full border border-border bg-white hover:border-[#0033A0]/50 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                            <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-[#001A72]">Pay in Instalments</p>
                            <p className="text-xs text-muted-foreground">Eligible for BNPL</p>
                        </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                    </button>
                )}

                <button
                    onClick={() => toast.success("Connecting to support...")}
                    className="w-full flex items-center justify-between p-4 rounded-full border border-border bg-white hover:border-[#0033A0]/50 transition-all group"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-[#001A72]">Chat with Support</p>
                        <p className="text-xs text-muted-foreground">Get help with this transaction</p>
                    </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#0033A0] transition-colors" />
                </button>

                <button
                    onClick={handleReportProblem}
                    className="w-full flex items-center justify-between p-4 rounded-full border border-border bg-white hover:border-red-200 transition-all group"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                        <AlertCircle className="h-5 w-5 text-muted-foreground group-hover:text-red-600 transition-colors" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-[#001A72] group-hover:text-red-700">Report a Problem</p>
                        <p className="text-xs text-muted-foreground">Dispute this transaction</p>
                    </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-red-600 transition-colors" />
                </button>
                </div>
            </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg mb-1" style={{ color: '#001A72' }}>Report a Problem</h3>
                <p className="text-sm text-muted-foreground">We'll investigate this transaction</p>
              </div>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Reason for dispute</label>
                <select className="w-full mt-2 px-4 py-3 rounded-[8px] border border-border bg-white text-sm">
                  <option>I don't recognize this transaction</option>
                  <option>Incorrect amount charged</option>
                  <option>Duplicate charge</option>
                  <option>Service/product not received</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Additional details (optional)</label>
                <textarea
                  className="w-full mt-2 px-4 py-3 rounded-[8px] border border-border bg-white text-sm resize-none"
                  rows={4}
                  placeholder="Provide any additional information..."
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDisputeModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-accent hover:bg-accent/90"
                  onClick={handleSubmitDispute}
                >
                  Submit Dispute
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BNPL Modal */}
      <Dialog open={showBNPLModal} onOpenChange={setShowBNPLModal}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Split this payment into instalments</DialogTitle>
                <DialogDescription>
                    Spread the cost of this purchase over several months.
                </DialogDescription>
            </DialogHeader>

            {transaction && (
                <div className="py-4 space-y-6">
                    {/* Transaction Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Merchant</span>
                            <span className="font-medium text-[#001A72]">{transaction.merchantName || transaction.merchant}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-medium text-[#001A72]">£{Math.abs(transaction.amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Card ending</span>
                            <span className="font-medium text-[#001A72]">{transaction.cardUsed || '4532'}</span>
                        </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="space-y-3">
                        <Label>Choose a plan</Label>
                        <RadioGroup value={bnplPlanMonths} onValueChange={(val: any) => setBnplPlanMonths(val)}>
                            <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${bnplPlanMonths === '3' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                                <RadioGroupItem value="3" id="plan-3" />
                                <Label htmlFor="plan-3" className="flex-1 cursor-pointer">
                                    <span className="font-medium block">3 monthly payments</span>
                                    <span className="text-xs text-gray-500">3 × £{(Math.abs(transaction.amount) / 3).toFixed(2)} per month</span>
                                </Label>
                            </div>
                            <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${bnplPlanMonths === '6' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                                <RadioGroupItem value="6" id="plan-6" />
                                <Label htmlFor="plan-6" className="flex-1 cursor-pointer">
                                    <span className="font-medium block">6 monthly payments</span>
                                    <span className="text-xs text-gray-500">6 × £{(Math.abs(transaction.amount) / 6).toFixed(2)} per month</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            )}

            <DialogFooter>
                <Button variant="secondary" onClick={() => setShowBNPLModal(false)}>Cancel</Button>
                <Button onClick={handleConfirmBNPL} className="bg-[#0033A0] hover:bg-[#002b87] text-white">
                    Confirm instalment plan
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}