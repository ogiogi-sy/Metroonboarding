import { useState, useEffect } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  ArrowLeft, 
  Calendar, 
  Filter, 
  Download, 
  MapPin, 
  CreditCard,
  FileText,
  AlertCircle,
  Tag,
  X,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { DisputeModal } from '../support/DisputeModal';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

// Mock Data
const MOCK_ACCOUNT = {
  id: '1',
  name: 'Business Current Account',
  type: 'Current',
  accountNumber: '12345678',
  sortCode: '04-00-75',
  balance: 25420.50,
  currency: '£',
  status: 'Active',
  entity: 'Acme Ltd',
};

interface Transaction {
  id: string;
  merchantName: string;
  merchantLogo?: string;
  category: 'Subscriptions' | 'Travel' | 'Invoices' | 'Fees' | 'Marketing' | 'Office' | 'Utilities' | 'Salary';
  date: string;
  time: string;
  amount: number;
  balanceAfter: number;
  paymentType: 'Card' | 'Faster Payments' | 'DD' | 'Standing Order';
  reference?: string;
  cardLast4?: string;
  location?: string;
  tags?: ('subscription' | 'international' | 'atm' | 'recurring')[];
  isMoneyIn: boolean;
  bnplEligible?: boolean;
  bnplActive?: boolean;
  bnplPlan?: {
    months: number;
    monthlyAmount: number;
    nextPaymentDate: string;
  };
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    merchantName: 'Slack Technologies',
    category: 'Subscriptions',
    date: '2024-11-23',
    time: '09:00',
    amount: -149.00,
    balanceAfter: 25420.50,
    paymentType: 'Card',
    reference: 'SLACK-MONTHLY-PRO',
    cardLast4: '4532',
    location: 'San Francisco, USA',
    tags: ['subscription', 'international', 'recurring'],
    isMoneyIn: false,
    bnplEligible: true,
  },
  {
    id: 't2',
    merchantName: 'Google Ads',
    category: 'Marketing',
    date: '2024-11-22',
    time: '14:30',
    amount: -850.00,
    balanceAfter: 25569.50,
    paymentType: 'Card',
    reference: 'GOOGLE-ADS-NOV',
    cardLast4: '4532',
    location: 'Dublin, Ireland',
    tags: ['recurring'],
    isMoneyIn: false,
    bnplEligible: true,
  },
  {
    id: 't3',
    merchantName: 'Client Invoice Payment',
    category: 'Invoices',
    date: '2024-11-22',
    time: '11:15',
    amount: 5400.00,
    balanceAfter: 26419.50,
    paymentType: 'Faster Payments',
    reference: 'INV-2024-1156',
    location: 'London, UK',
    tags: [],
    isMoneyIn: true,
  },
  {
    id: 't4',
    merchantName: 'TfL Oyster',
    category: 'Travel',
    date: '2024-11-21',
    time: '08:45',
    amount: -24.50,
    balanceAfter: 21019.50,
    paymentType: 'Card',
    reference: 'TFL-AUTO-TOPUP',
    cardLast4: '4532',
    location: 'London, UK',
    tags: ['recurring'],
    isMoneyIn: false,
  },
  {
    id: 't5',
    merchantName: 'WeWork',
    category: 'Office',
    date: '2024-11-20',
    time: '09:00',
    amount: -1200.00,
    balanceAfter: 21044.00,
    paymentType: 'DD',
    reference: 'WEWORK-MONTHLY-RENT',
    location: 'London, UK',
    tags: ['recurring'],
    isMoneyIn: false,
  },
  {
    id: 't6',
    merchantName: 'AWS',
    category: 'Subscriptions',
    date: '2024-11-19',
    time: '02:00',
    amount: -432.50,
    balanceAfter: 22244.00,
    paymentType: 'Card',
    reference: 'AWS-EC2-USAGE',
    cardLast4: '4532',
    location: 'Virginia, USA',
    tags: ['subscription', 'international', 'recurring'],
    isMoneyIn: false,
  },
  {
    id: 't7',
    merchantName: 'Stripe Payment',
    category: 'Invoices',
    date: '2024-11-18',
    time: '16:22',
    amount: 2350.00,
    balanceAfter: 22676.50,
    paymentType: 'Faster Payments',
    reference: 'STRIPE-PAYOUT-NOV18',
    location: 'London, UK',
    tags: [],
    isMoneyIn: true,
  },
  {
    id: 't8',
    merchantName: 'British Gas',
    category: 'Utilities',
    date: '2024-11-17',
    time: '09:00',
    amount: -156.00,
    balanceAfter: 20326.50,
    paymentType: 'DD',
    reference: 'BRITISH-GAS-NOV',
    location: 'London, UK',
    tags: ['recurring'],
    isMoneyIn: false,
  },
  {
    id: 't9',
    merchantName: 'Employee Salary',
    category: 'Salary',
    date: '2024-11-15',
    time: '09:00',
    amount: -3500.00,
    balanceAfter: 20482.50,
    paymentType: 'Faster Payments',
    reference: 'SALARY-NOV-2024',
    location: 'London, UK',
    tags: ['recurring'],
    isMoneyIn: false,
  },
  {
    id: 't10',
    merchantName: 'LinkedIn Premium',
    category: 'Subscriptions',
    date: '2024-11-14',
    time: '10:30',
    amount: -39.99,
    balanceAfter: 23982.50,
    paymentType: 'Card',
    reference: 'LINKEDIN-BUSINESS',
    cardLast4: '4532',
    location: 'California, USA',
    tags: ['subscription', 'international', 'recurring'],
    isMoneyIn: false,
  },
  {
    id: 't11',
    merchantName: 'Client Project Payment',
    category: 'Invoices',
    date: '2024-11-13',
    time: '14:05',
    amount: 8900.00,
    balanceAfter: 24022.49,
    paymentType: 'Faster Payments',
    reference: 'INV-2024-1142',
    location: 'Manchester, UK',
    tags: [],
    isMoneyIn: true,
  },
  {
    id: 't12',
    merchantName: 'Figma',
    category: 'Subscriptions',
    date: '2024-11-12',
    time: '09:00',
    amount: -45.00,
    balanceAfter: 15122.49,
    paymentType: 'Card',
    reference: 'FIGMA-PROFESSIONAL',
    cardLast4: '4532',
    location: 'San Francisco, USA',
    tags: ['subscription', 'international', 'recurring'],
    isMoneyIn: false,
  },
  {
    id: 't13',
    merchantName: 'Bank Transfer Fee',
    category: 'Fees',
    date: '2024-11-11',
    time: '15:30',
    amount: -12.50,
    balanceAfter: 15167.49,
    paymentType: 'Faster Payments',
    reference: 'INTL-TRANSFER-FEE',
    location: 'London, UK',
    tags: [],
    isMoneyIn: false,
  },
  {
    id: 't14',
    merchantName: 'Uber Business',
    category: 'Travel',
    date: '2024-11-10',
    time: '18:45',
    amount: -45.60,
    balanceAfter: 15179.99,
    paymentType: 'Card',
    reference: 'UBER-RIDES',
    cardLast4: '4532',
    location: 'London, UK',
    tags: [],
    isMoneyIn: false,
  },
  {
    id: 't15',
    merchantName: 'Adobe Creative Cloud',
    category: 'Subscriptions',
    date: '2024-11-09',
    time: '09:00',
    amount: -79.99,
    balanceAfter: 15225.59,
    paymentType: 'Card',
    reference: 'ADOBE-CC-TEAM',
    cardLast4: '4532',
    location: 'California, USA',
    tags: ['subscription', 'international', 'recurring'],
    isMoneyIn: false,
  },
];

interface AccountTransactionsScreenProps {
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  accountId?: string;
  transactionId?: string;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function AccountTransactionsScreen({ 
  onNavigate, 
  businessData,
  accountId = '1',
  transactionId,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: AccountTransactionsScreenProps) {
  // UI states
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedForExport, setSelectedForExport] = useState<string[]>([]);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  
  // BNPL States
  const [showBNPLModal, setShowBNPLModal] = useState(false);
  const [bnplPlanMonths, setBnplPlanMonths] = useState<'3' | '6'>('3');

  // Statement Generator States
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [statementPeriod, setStatementPeriod] = useState<'monthly' | 'quarterly' | 'custom'>('monthly');
  const [statementMonth, setStatementMonth] = useState('november-2024');
  const [statementQuarter, setStatementQuarter] = useState('q4-2024');
  const [statementStartDate, setStatementStartDate] = useState('');
  const [statementEndDate, setStatementEndDate] = useState('');
  const [isGeneratingStatement, setIsGeneratingStatement] = useState(false);

  // Auto-select transaction if transactionId is provided
  useEffect(() => {
    if (transactionId) {
      const transaction = transactions.find(tx => tx.id === transactionId);
      if (transaction) {
        setSelectedTransaction(transaction);
      }
    }
  }, [transactionId, transactions]);

  const handleReportProblem = () => {
    setShowDisputeModal(true);
  };

  const handleOpenBNPL = () => {
    setShowBNPLModal(true);
  };

  const handleConfirmBNPL = () => {
    if (!selectedTransaction) return;

    const months = parseInt(bnplPlanMonths);
    const monthlyAmount = Math.abs(selectedTransaction.amount) / months;

    const updatedTransaction: Transaction = {
      ...selectedTransaction,
      bnplEligible: false,
      bnplActive: true,
      bnplPlan: {
        months,
        monthlyAmount,
        nextPaymentDate: '15 Aug 2025' // Mock date
      }
    };

    // Update list
    setTransactions(prev => prev.map(tx => tx.id === selectedTransaction.id ? updatedTransaction : tx));
    
    // Update selected
    setSelectedTransaction(updatedTransaction);
    
    setShowBNPLModal(false);
    toast.success('Your instalment plan has been set up');
  };

  const handleSubmitDispute = (data: any) => {
    setShowDisputeModal(false);
    toast.success('Dispute ticket raised', {
      description: 'Ticket #DSP-1234 has been created',
      action: {
        label: 'View',
        onClick: () => onNavigate('support', { section: 'fraud' })
      }
    });
  };

  const toggleTransactionForExport = (id: string) => {
    setSelectedForExport(prev =>
      prev.includes(id)
        ? prev.filter(txId => txId !== id)
        : [...prev, id]
    );
  };

  const exportSelected = () => {
    if (selectedForExport.length === 0) {
      toast.error('Please select transactions to export');
      return;
    }
    toast.success(`Exporting ${selectedForExport.length} transaction(s)`);
  };

  const handleGenerateStatement = () => {
    setIsGeneratingStatement(true);
    
    // Simulate statement generation
    setTimeout(() => {
      setIsGeneratingStatement(false);
      setShowStatementModal(false);
      
      let periodText = '';
      if (statementPeriod === 'monthly') {
        periodText = statementMonth.replace('-', ' ');
      } else if (statementPeriod === 'quarterly') {
        periodText = statementQuarter.replace('-', ' ');
      } else {
        periodText = `${statementStartDate} to ${statementEndDate}`;
      }
      
      toast.success('Statement generated', {
        description: `Your statement for ${periodText} is ready to download`
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <NavigationSidebar 
        activeSection="transactions"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      <main className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="transactions"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />

        {/* Page Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        onClick={() => onNavigate('accounts')}
                        className="cursor-pointer"
                      >
                        Accounts
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{MOCK_ACCOUNT.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                
                <div>
                  <h1 className="text-2xl font-semibold" style={{ color: '#001A72' }}>All Transactions</h1>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_ACCOUNT.sortCode} • {MOCK_ACCOUNT.accountNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {MOCK_ACCOUNT.status}
                </Badge>
                <Button 
                  variant="outline"
                  className="gap-2 border-[#0033A0] text-[#0033A0] hover:bg-blue-50"
                  onClick={() => setShowStatementModal(true)}
                >
                  <FileText className="h-4 w-4" />
                  Generate Statement
                </Button>
              </div>
            </div>
          </div>

        <div className="flex h-[calc(100vh-180px)]">
          {/* Center Content - Transaction List */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Table Header Actions */}
            <div className="bg-white border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg hidden" style={{ color: '#001A72' }}>
                    Transactions
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_TRANSACTIONS.length} transaction(s) found
                  </p>
                </div>
                {selectedForExport.length > 0 && (
                  <Button
                    onClick={exportSelected}
                    className="bg-accent hover:bg-accent/90 text-white rounded-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export {selectedForExport.length} selected
                  </Button>
                )}
              </div>
            </div>

            {/* Transaction Table */}
            <div className="flex-1 overflow-y-auto bg-white">
              <table className="w-full">
                <thead className="sticky top-0 bg-muted/30 border-b border-border z-10">
                  <tr>
                    <th className="w-12 px-6 py-3">
                      <Checkbox
                        checked={selectedForExport.length === transactions.length && transactions.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedForExport(transactions.map(tx => tx.id));
                          } else {
                            setSelectedForExport([]);
                          }
                        }}
                        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: '#001A72' }}>Merchant</th>
                    <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: '#001A72' }}>Category</th>
                    <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: '#001A72' }}>Date</th>
                    <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: '#001A72' }}>Amount</th>
                    <th className="text-right px-6 py-3 text-sm font-medium" style={{ color: '#001A72' }}>Balance After</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTransaction(tx)}
                      className={`border-b border-border cursor-pointer transition-colors hover:bg-accent/5 ${
                        selectedTransaction?.id === tx.id ? 'bg-accent/10' : ''
                      }`}
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedForExport.includes(tx.id)}
                          onCheckedChange={() => toggleTransactionForExport(tx.id)}
                          className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            {tx.merchantName.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span>{tx.merchantName}</span>
                            {tx.bnplEligible && !tx.bnplActive && (
                                <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded w-fit mt-0.5">
                                    Eligible for instalments
                                </span>
                            )}
                            {tx.bnplActive && (
                                <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded w-fit mt-0.5 flex items-center gap-1">
                                    <CreditCard className="w-2.5 h-2.5" />
                                    In instalments
                                </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className="font-normal">
                          {tx.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className={`px-4 py-4 text-right ${tx.isMoneyIn ? 'text-green-600' : ''}`}>
                        {tx.isMoneyIn ? '+' : '-'}£{Math.abs(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-muted-foreground">
                        £{tx.balanceAfter.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {transactions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Filter className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg mb-2" style={{ color: '#001A72' }}>No transactions found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Transaction Detail */}
          {selectedTransaction && (
            <aside className="w-96 bg-white border-l border-border overflow-y-auto z-10">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-lg">
                      {selectedTransaction.merchantName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg" style={{ color: '#001A72' }}>
                        {selectedTransaction.merchantName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="font-normal">
                            {selectedTransaction.category}
                          </Badge>
                          {selectedTransaction.bnplActive && (
                            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50 font-medium">
                                In instalments
                            </Badge>
                          )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTransaction(null)}
                    className="hover:bg-muted/50"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Amount */}
                <div className="mb-6 p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Amount</p>
                  <p className={`text-3xl ${selectedTransaction.isMoneyIn ? 'text-green-600' : ''}`} style={{ color: selectedTransaction.isMoneyIn ? undefined : '#001A72' }}>
                    {selectedTransaction.isMoneyIn ? '+' : '-'}£{Math.abs(selectedTransaction.amount).toFixed(2)}
                  </p>
                </div>

                {/* BNPL Active Summary */}
                {selectedTransaction.bnplActive && selectedTransaction.bnplPlan && (
                    <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-indigo-900 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                            <h3>Active Instalment Plan</h3>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-indigo-800">
                                {selectedTransaction.bnplPlan.months} monthly payments of £{selectedTransaction.bnplPlan.monthlyAmount.toFixed(2)}
                            </p>
                            <p className="text-xs text-indigo-600">
                                Next payment: {selectedTransaction.bnplPlan.nextPaymentDate}
                            </p>
                        </div>
                    </div>
                )}

                {/* Map Snippet (Static) */}
                {selectedTransaction.location && (
                  <div className="mb-6">
                    <div className="aspect-video bg-muted/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20"></div>
                      <div className="relative z-10 text-center">
                        <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
                        <p className="text-sm" style={{ color: '#001A72' }}>{selectedTransaction.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>
                      {new Date(selectedTransaction.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })} at {selectedTransaction.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm" style={{ color: '#001A72' }}>{selectedTransaction.paymentType}</p>
                    </div>
                  </div>

                  {selectedTransaction.reference && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Reference</p>
                      <p className="text-sm" style={{ color: '#001A72' }}>{selectedTransaction.reference}</p>
                    </div>
                  )}

                  {selectedTransaction.cardLast4 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Card Used</p>
                      <p className="text-sm" style={{ color: '#001A72' }}>•••• {selectedTransaction.cardLast4}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Balance After</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>£{selectedTransaction.balanceAfter.toFixed(2)}</p>
                  </div>
                </div>

                {/* Tags */}
                {selectedTransaction.tags && selectedTransaction.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTransaction.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-full"
                    onClick={() => toast.info('Add note functionality coming soon')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Add note
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-full"
                    onClick={() => toast.success('Exporting statement...')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export statement containing this transaction
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleReportProblem}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report a problem
                  </Button>

                  {selectedTransaction.amount < 0 && Math.abs(selectedTransaction.amount) > 100 && !selectedTransaction.bnplActive && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start rounded-full text-purple-700 hover:text-purple-800 hover:bg-purple-50 border-purple-200"
                      onClick={handleOpenBNPL}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Pay in instalments
                    </Button>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* BNPL Modal */}
      <Dialog open={showBNPLModal} onOpenChange={setShowBNPLModal}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Split this payment into instalments</DialogTitle>
                <DialogDescription>
                    Spread the cost of this purchase over several months.
                </DialogDescription>
            </DialogHeader>

            {selectedTransaction && (
                <div className="py-4 space-y-6">
                    {/* Transaction Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Merchant</span>
                            <span className="font-medium text-[#001A72]">{selectedTransaction.merchantName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-medium text-[#001A72]">£{Math.abs(selectedTransaction.amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Card ending</span>
                            <span className="font-medium text-[#001A72]">{selectedTransaction.cardLast4 || '4532'}</span>
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
                                    <span className="text-xs text-gray-500">3 × £{(Math.abs(selectedTransaction.amount) / 3).toFixed(2)} per month</span>
                                </Label>
                            </div>
                            <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${bnplPlanMonths === '6' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                                <RadioGroupItem value="6" id="plan-6" />
                                <Label htmlFor="plan-6" className="flex-1 cursor-pointer">
                                    <span className="font-medium block">6 monthly payments</span>
                                    <span className="text-xs text-gray-500">6 × £{(Math.abs(selectedTransaction.amount) / 6).toFixed(2)} per month</span>
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

      {/* Raise Dispute Modal */}
      <DisputeModal
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        initialTransaction={selectedTransaction}
        availableTransactions={MOCK_TRANSACTIONS}
        onSubmit={handleSubmitDispute}
      />

      {/* Statement Generator Modal */}
      <Dialog open={showStatementModal} onOpenChange={setShowStatementModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Statement</DialogTitle>
            <DialogDescription>
              Select a period to generate your account statement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Period Type Selection */}
            <div className="space-y-3">
              <Label>Statement Period</Label>
              <RadioGroup value={statementPeriod} onValueChange={(val: any) => setStatementPeriod(val)}>
                <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${statementPeriod === 'monthly' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                  <RadioGroupItem value="monthly" id="period-monthly" />
                  <Label htmlFor="period-monthly" className="flex-1 cursor-pointer">
                    <span className="font-medium block">Monthly</span>
                    <span className="text-xs text-gray-500">Get statement for a specific month</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${statementPeriod === 'quarterly' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                  <RadioGroupItem value="quarterly" id="period-quarterly" />
                  <Label htmlFor="period-quarterly" className="flex-1 cursor-pointer">
                    <span className="font-medium block">Quarterly</span>
                    <span className="text-xs text-gray-500">Get statement for a quarter</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 border p-3 rounded-lg cursor-pointer transition-all ${statementPeriod === 'custom' ? 'border-[#0033A0] bg-blue-50/30' : 'border-gray-200'}`}>
                  <RadioGroupItem value="custom" id="period-custom" />
                  <Label htmlFor="period-custom" className="flex-1 cursor-pointer">
                    <span className="font-medium block">Custom Range</span>
                    <span className="text-xs text-gray-500">Choose your own date range</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Monthly Selection */}
            {statementPeriod === 'monthly' && (
              <div className="space-y-2">
                <Label>Select Month</Label>
                <Select value={statementMonth} onValueChange={setStatementMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="november-2024">November 2024</SelectItem>
                    <SelectItem value="october-2024">October 2024</SelectItem>
                    <SelectItem value="september-2024">September 2024</SelectItem>
                    <SelectItem value="august-2024">August 2024</SelectItem>
                    <SelectItem value="july-2024">July 2024</SelectItem>
                    <SelectItem value="june-2024">June 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quarterly Selection */}
            {statementPeriod === 'quarterly' && (
              <div className="space-y-2">
                <Label>Select Quarter</Label>
                <Select value={statementQuarter} onValueChange={setStatementQuarter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q4-2024">Q4 2024 (Oct - Dec)</SelectItem>
                    <SelectItem value="q3-2024">Q3 2024 (Jul - Sep)</SelectItem>
                    <SelectItem value="q2-2024">Q2 2024 (Apr - Jun)</SelectItem>
                    <SelectItem value="q1-2024">Q1 2024 (Jan - Mar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Custom Range Selection */}
            {statementPeriod === 'custom' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    type="date" 
                    value={statementStartDate}
                    onChange={(e) => setStatementStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    type="date" 
                    value={statementEndDate}
                    onChange={(e) => setStatementEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Statement Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
              <p className="text-blue-900">
                <strong>Statement includes:</strong> All transactions, opening & closing balance, and account summary
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowStatementModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateStatement}
              disabled={isGeneratingStatement || (statementPeriod === 'custom' && (!statementStartDate || !statementEndDate))}
              className="bg-[#0033A0] hover:bg-[#002b87] text-white"
            >
              {isGeneratingStatement ? (
                <>
                  <Download className="h-4 w-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate & Download
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}