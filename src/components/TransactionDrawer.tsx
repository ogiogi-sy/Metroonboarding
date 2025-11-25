import { X, FileText, AlertCircle, CreditCard, Calendar, Tag, Download, Upload, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';

interface Transaction {
  id: string;
  merchant: string;
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
}

interface TransactionDrawerProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDrawer({ transaction, isOpen, onClose }: TransactionDrawerProps) {
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  if (!transaction) return null;

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
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-muted text-muted-foreground';
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
    toast.info('Instalment splitting feature coming soon');
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
        className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base" style={{ color: '#001A72' }}>Transaction Details</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Merchant Header with Icon */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-2xl shrink-0">
                {getCategoryIcon(transaction.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg mb-0.5" style={{ color: '#001A72' }}>{transaction.merchant}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{transaction.category}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <Badge className={`${getStatusColor(transaction.status)} border-0 text-xs`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Amount - Large and Clear */}
            <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 border border-border/50">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl tracking-tight"
                  style={{ color: transaction.type === 'credit' ? '#10B981' : '#001A72' }}
                >
                  {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Transaction Information */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Transaction Information</p>
              
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                  <p className="text-sm" style={{ color: '#001A72' }}>
                    {formatDateTime(transaction.date, transaction.time)}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm" style={{ color: '#001A72' }}>{transaction.paymentMethod}</p>
                    {transaction.cardUsed && (
                      <>
                        <p className="text-xs text-muted-foreground">•••• {transaction.cardUsed}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                  <p className="text-sm font-mono" style={{ color: '#001A72' }}>{transaction.id}</p>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {transaction.tags && transaction.tags.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {transaction.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
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
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Actions</p>

              <button
                onClick={handleAddNote}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: '#001A72' }}>Add Note</p>
                    <p className="text-xs text-muted-foreground">Add a personal note to this transaction</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </button>

              <button
                onClick={handleAttachReceipt}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: '#001A72' }}>Attach Receipt</p>
                    <p className="text-xs text-muted-foreground">Upload a PDF or image</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </button>

              <button
                onClick={handleSplitInstalments}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: '#001A72' }}>Split into Instalments</p>
                    <p className="text-xs text-muted-foreground">Available for BNPL-eligible transactions</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </button>

              <button
                onClick={() => toast.success("Connecting to support...")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: '#001A72' }}>Chat with Support</p>
                    <p className="text-xs text-muted-foreground">Get help with this transaction</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </button>

              <button
                onClick={handleReportProblem}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-red-200 hover:bg-red-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                    <AlertCircle className="h-5 w-5 text-muted-foreground group-hover:text-red-600 transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: '#001A72' }}>Report a Problem</p>
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
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
                <select className="w-full mt-2 px-4 py-3 rounded-lg border border-border bg-white text-sm">
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
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-border bg-white text-sm resize-none"
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
    </>
  );
}