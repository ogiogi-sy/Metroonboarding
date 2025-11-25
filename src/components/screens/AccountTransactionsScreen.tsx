import { useState, useEffect } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { MobileNav } from '../MobileNav';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
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
  X
} from 'lucide-react';
import { toast } from 'sonner';
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
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedForExport, setSelectedForExport] = useState<string[]>([]);
  // Auto-select transaction if transactionId is provided
  useEffect(() => {
    if (transactionId) {
      const transaction = MOCK_TRANSACTIONS.find(tx => tx.id === transactionId);
      if (transaction) {
        setSelectedTransaction(transaction);
      }
    }
  }, [transactionId]);

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
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MobileNav 
                  activeSection="accounts" 
                  onNavigate={onNavigate}
                  businessData={businessData}
                  selectedAccounts={selectedAccounts}
                  onAccountSelectionChange={onAccountSelectionChange}
                />
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
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {MOCK_ACCOUNT.status}
                </Badge>
                <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <span className="text-sm">
                    {businessData.companyName ? businessData.companyName.charAt(0) : 'B'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-116px)]">
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
                        checked={selectedForExport.length === MOCK_TRANSACTIONS.length && MOCK_TRANSACTIONS.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedForExport(MOCK_TRANSACTIONS.map(tx => tx.id));
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
                  {MOCK_TRANSACTIONS.map((tx) => (
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
                          <span>{tx.merchantName}</span>
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

              {MOCK_TRANSACTIONS.length === 0 && (
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
            <aside className="w-96 bg-white border-l border-border overflow-y-auto shadow-xl z-10">
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
                      <Badge variant="outline" className="font-normal mt-1">
                        {selectedTransaction.category}
                      </Badge>
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
                    onClick={() => toast.info('Dispute modal would open here')}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report a problem
                  </Button>

                  {selectedTransaction.amount < 0 && Math.abs(selectedTransaction.amount) > 500 && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start rounded-full"
                      onClick={() => toast.info('BNPL split functionality coming soon')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Split into instalments
                    </Button>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}