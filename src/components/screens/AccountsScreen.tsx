import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NavigationSidebar } from '../NavigationSidebar';
import { MobileNav } from '../MobileNav';
import { TransactionDrawer } from '../TransactionDrawer';
import { DetailedTransactionsView } from '../banking/DetailedTransactionsView';
import { 
  Search, 
  TrendingUp, 
  Download, 
  ArrowRightLeft, 
  FileText, 
  AlertTriangle, 
  Copy, 
  Eye, 
  Info, 
  CreditCard,
  Wallet,
  Globe,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Upload,
  Share,
  ChevronRight,
  Filter,
  MapPin,
  Tag,
  X,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { FilterableTable } from '../banking/FilterableTable';
import { Account, Transaction } from '../banking/types';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// Extended Account Interface
interface ExtendedAccount extends Account {
  availableBalance: number;
  pendingBalance?: number;
  interestRate?: number;
  overdraftLimit?: number;
  iban?: string;
  bic?: string;
  alert?: string;
}

// Mock Data
const MOCK_ACCOUNTS: ExtendedAccount[] = [
  {
    id: '1',
    name: 'Business Current Account',
    type: 'Current',
    accountNumber: '12345678',
    sortCode: '04-00-75',
    balance: 25420.50,
    availableBalance: 25000.00,
    currency: '£',
    status: 'Active',
    entity: 'Acme Ltd',
    overdraftLimit: 5000,
    iban: 'GB29METR04007512345678',
    bic: 'METRGB22'
  },
  {
    id: '2',
    name: 'Tax Saver',
    type: 'Tax',
    accountNumber: '87654321',
    sortCode: '04-00-75',
    balance: 8500.00,
    availableBalance: 8500.00,
    currency: '£',
    status: 'Active',
    entity: 'Acme Ltd',
    interestRate: 1.5
  },
  {
    id: '3',
    name: 'Marketing Budget',
    type: 'Current',
    accountNumber: '22334455',
    sortCode: '04-00-75',
    balance: 1250.00,
    availableBalance: 1000.00,
    currency: '£',
    status: 'Active',
    entity: 'Acme Holdings',
    pendingBalance: 250.00
  },
  {
    id: '4',
    name: 'Reserve Account',
    type: 'Savings',
    accountNumber: '99887766',
    sortCode: '04-00-75',
    balance: 50000.00,
    availableBalance: 50000.00,
    currency: '£',
    status: 'Active',
    entity: 'Acme Holdings',
    interestRate: 3.25
  },
  {
    id: '5',
    name: 'Euro Operating',
    type: 'Current',
    accountNumber: '55667788',
    sortCode: '00-00-00',
    balance: 12500.00,
    availableBalance: 12500.00,
    currency: '€',
    status: 'Active',
    entity: 'Acme Ltd',
    iban: 'DE89370400440532013000',
    bic: 'METRDE33'
  },
  {
    id: '6',
    name: 'USD Collections',
    type: 'Current',
    accountNumber: '11223344',
    sortCode: '00-00-00',
    balance: 3200.00,
    availableBalance: 3200.00,
    currency: '$',
    status: 'Restricted',
    entity: 'Acme Holdings',
    alert: 'Verification pending'
  }
];

// Generate more mock transactions for detailed view
const generateMockTransactions = (count: number): Transaction[] => {
  const categories = ['Electronics', 'Office Rent', 'Tax', 'Marketing', 'Travel', 'Utilities', 'Software', 'Services', 'Consulting'];
  const merchants = ['Apple Store', 'WeWork', 'HMRC', 'Google Ads', 'TFL', 'British Gas', 'AWS', 'Salesforce', 'McKinsey'];
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed'];
  const types = ['card', 'faster_payment', 'standing_order', 'direct_debit'];

  return Array.from({ length: count }).map((_, i) => {
    const isCredit = Math.random() > 0.8;
    const amount = isCredit ? Math.random() * 5000 : -(Math.random() * 2000);
    
    return {
      id: `t${i + 1}`,
      accountId: String(Math.floor(Math.random() * 4) + 1),
      merchantName: merchants[Math.floor(Math.random() * merchants.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Number(amount.toFixed(2)),
      currency: '£',
      date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      type: types[Math.floor(Math.random() * types.length)] as any,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reference: `REF-${Math.random().toString(36).substring(7).toUpperCase()}`
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const MOCK_TRANSACTIONS: Transaction[] = generateMockTransactions(50);

interface Task {
  id: string;
  title: string;
  type: 'warning' | 'info' | 'action';
  icon: React.ElementType;
  actionText?: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: 'pay-1',
    title: '3 scheduled payments',
    type: 'info',
    icon: CreditCard,
    actionText: 'Review'
  },
  {
    id: 'ver-1',
    title: 'Account verification pending',
    type: 'warning',
    icon: Clock,
    actionText: 'View'
  },
  {
    id: 'doc-1',
    title: 'Proof of address required',
    type: 'action',
    icon: Upload,
    actionText: 'Upload'
  },
  {
    id: 'man-1',
    title: 'Update mandate holder',
    type: 'info',
    icon: FileText,
    actionText: 'Review'
  }
];

interface AccountsScreenProps {
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function AccountsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: AccountsScreenProps) {
  // View Mode State
  const [viewMode, setViewMode] = useState<'overview' | 'transactions'>('overview');
  
  // Overview States
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter Accounts based on global selection
  const filteredAccounts = MOCK_ACCOUNTS.filter(acc => selectedAccounts.includes(acc.id));

  // Calculate Totals
  const totalBalanceGBP = filteredAccounts
    .filter(acc => acc.currency === '£')
    .reduce((sum, acc) => sum + acc.balance, 0);
  
  const totalBalanceEUR = filteredAccounts
    .filter(acc => acc.currency === '€')
    .reduce((sum, acc) => sum + acc.balance, 0);
    
  const totalBalanceUSD = filteredAccounts
    .filter(acc => acc.currency === '$')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalAvailableGBP = filteredAccounts
    .filter(acc => acc.currency === '£')
    .reduce((sum, acc) => sum + acc.availableBalance, 0);

  // Navigation Handlers
  const switchToTransactions = (accountId?: string) => {
    setViewMode('transactions');
  };

  const switchToOverview = () => {
    setViewMode('overview');
  };

  // Copy Account Details
  const handleCopyDetails = (account: ExtendedAccount) => {
    const details = [
      `Account Name: ${account.name}`,
      `Account Number: ${account.accountNumber}`,
      `Sort Code: ${account.sortCode}`,
      account.iban ? `IBAN: ${account.iban}` : '',
      account.bic ? `BIC: ${account.bic}` : ''
    ].filter(Boolean).join('\n');
    
    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Account details copied", {
          description: "IBAN, Account Number, and Sort Code copied to clipboard"
        });
      } catch (err) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          textArea.style.top = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) {
            toast.success("Account details copied");
          } else {
            throw new Error("Copy failed");
          }
        } catch (fallbackErr) {
          toast.error("Action blocked");
        }
      }
    };
    copyToClipboard(details);
  };

  // --- Overview Logic ---
  
  const handleTransactionClick = (transaction: Transaction) => {
    const formattedTransaction = {
      ...transaction,
      paymentMethod: transaction.type === 'card' ? 'Debit Card' : transaction.type === 'faster_payment' ? 'Faster Payment' : 'Bank Transfer',
      cardUsed: transaction.type === 'card' ? '4242' : undefined,
      tags: [],
      type: transaction.amount >= 0 ? 'credit' as const : 'debit' as const,
    };
    
    if (transaction.category === 'Travel') formattedTransaction.tags.push('Travel');
    if (transaction.type === 'card') formattedTransaction.tags.push('Card Payment');
    if (transaction.merchantName.includes('TFL')) formattedTransaction.tags.push('Transport');
    
    setSelectedTransaction(formattedTransaction);
    setIsDrawerOpen(true);
  };

  // Limit overview transactions to 5
  const filteredOverviewTransactions = MOCK_TRANSACTIONS.slice(0, 5);

  const overviewColumns = [
    {
      header: 'Merchant',
      accessorKey: (item: Transaction) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
            {item.type === 'card' ? '💳' : item.type === 'faster_payment' ? '⚡️' : '🏦'}
          </div>
          <span className="font-medium text-[#001A72]">{item.merchantName}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: (item: Transaction) => (
        <Badge variant="outline" className="font-normal">
          {item.category}
        </Badge>
      ),
    },
    {
      header: 'Account',
      accessorKey: (item: Transaction) => {
        const account = MOCK_ACCOUNTS.find(a => a.id === item.accountId);
        return (selectedAccounts.length !== 1) ? (
          <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
            {account?.name}
          </Badge>
        ) : null;
      },
      className: "hidden md:table-cell"
    },
    {
      header: 'Date',
      accessorKey: 'date',
      className: "hidden sm:table-cell"
    },
    {
      header: 'Amount',
      accessorKey: (item: Transaction) => (
        <span className={item.amount > 0 ? 'text-green-600 font-medium' : 'text-foreground'}>
          {item.amount > 0 ? '+' : ''}{item.currency}{Math.abs(item.amount).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#F5F6F8]">
        <NavigationSidebar 
          activeSection="accounts"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />
        
        <main className="flex-1 lg:ml-64 flex flex-col">
          {/* Top Header */}
          <header className="bg-white border-b border-border sticky top-0 z-30">
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
                  <div>
                    {viewMode === 'overview' ? (
                      <>
                        <h1 className="text-2xl" style={{ color: '#001A72' }}>Accounts</h1>
                        <p className="text-sm text-muted-foreground">Unified Overview</p>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={switchToOverview}
                          className="hover:bg-muted/50 -ml-2"
                        >
                          <ArrowLeft className="h-5 w-5 text-[#001A72]" />
                        </Button>
                        <div>
                          <h1 className="text-2xl" style={{ color: '#001A72' }}>Transactions</h1>
                          <p className="text-sm text-muted-foreground">Detailed overview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                    <span className="text-sm">
                      {businessData.companyName ? businessData.companyName.charAt(0) : 'B'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {viewMode === 'overview' ? (
            /* --- OVERVIEW CONTENT --- */
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1 w-full">
              
              {/* 1. High-Level Summary */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden grid lg:grid-cols-3">
                {/* Left Column: Balances + Quick Actions */}
                <div className="lg:col-span-2 flex flex-col">
                  <div className="p-8 flex-1">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Available Liquidity</p>
                      <h2 className="text-4xl text-[#001A72] tracking-tight">
                        £{totalAvailableGBP.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2">
                        Across {filteredAccounts.filter(a => a.currency === '£').length} GBP accounts
                      </p>
                    </div>

                    {/* Currency Breakdown */}
                    <div className="flex flex-wrap gap-6 pt-6 mt-6 border-t border-dashed border-border">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0033A0]">
                            <span className="text-lg font-medium">£</span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">GBP Total</p>
                            <p className="text-lg font-medium text-foreground">£{totalBalanceGBP.toLocaleString()}</p>
                          </div>
                       </div>
                       
                       {(totalBalanceEUR > 0 || filteredAccounts.some(a => a.currency === '€')) && (
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0033A0]">
                              <span className="text-lg font-medium">€</span>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium uppercase">EUR Total</p>
                              <p className="text-lg font-medium text-foreground">€{totalBalanceEUR.toLocaleString()}</p>
                            </div>
                         </div>
                       )}

                       {(totalBalanceUSD > 0 || filteredAccounts.some(a => a.currency === '$')) && (
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0033A0]">
                              <span className="text-lg font-medium">$</span>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium uppercase">USD Total</p>
                              <p className="text-lg font-medium text-foreground">${totalBalanceUSD.toLocaleString()}</p>
                            </div>
                         </div>
                       )}
                    </div>
                  </div>

                  {/* Bottom Bar - Quick Actions */}
                  <div className="bg-gray-50 border-t border-border px-8 py-3 flex flex-wrap items-center gap-2 mt-auto">
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-[#0033A0] hover:bg-white border border-transparent hover:border-border shadow-none hover:shadow-sm transition-all">
                      <ArrowRightLeft className="mr-2 h-3.5 w-3.5" />
                      Transfer Funds
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-[#0033A0] hover:bg-white border border-transparent hover:border-border shadow-none hover:shadow-sm transition-all">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Statement
                    </Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-[#0033A0] hover:bg-white border border-transparent hover:border-border shadow-none hover:shadow-sm transition-all">
                      <TrendingUp className="mr-2 h-3.5 w-3.5" />
                      Cashflow Insights
                    </Button>
                  </div>
                </div>

                {/* Alerts / Tasks Panel */}
                <div className="lg:border-l border-border bg-gray-50/50 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-600" />
                      Attention Required
                    </h3>
                    <Badge variant="secondary" className="bg-white text-xs font-normal border-border">
                      {MOCK_TASKS.length}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-y-auto pr-2 space-y-3 pb-10">
                      {MOCK_TASKS.map(task => (
                        <div key={task.id} className="bg-white border border-border rounded-lg p-3 shadow-sm flex items-start gap-3">
                          <div className={`mt-0.5 ${task.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`}>
                            <task.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                            {task.actionText && (
                              <button className="text-xs font-medium text-[#0033A0] hover:underline mt-1">
                                {task.actionText}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 2. Accounts List */}
              <div className="space-y-4">
                <Carousel opts={{ align: "start" }} className="w-full group/carousel">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-[#001A72]">Your Accounts</h2>
                    <div className="flex items-center gap-2">
                      <CarouselPrevious className="static translate-y-0 h-8 w-8 border-border hover:bg-gray-50 hover:text-[#0033A0]" />
                      <CarouselNext className="static translate-y-0 h-8 w-8 border-border hover:bg-gray-50 hover:text-[#0033A0]" />
                    </div>
                  </div>
                  <CarouselContent className="-ml-6 py-1">
                    {filteredAccounts.map((account) => (
                      <CarouselItem key={account.id} className="pl-6 md:basis-1/2 xl:basis-1/3">
                        <div className="h-full bg-white rounded-2xl border border-border hover:border-[#0033A0]/50 transition-colors flex flex-col shadow-sm overflow-hidden group relative">
                      {/* Card Header */}
                      <div className="p-6 pb-4 border-b border-border/50 bg-gray-50/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-[#0033A0]">
                              {account.currency === '£' ? <Wallet className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                            </div>
                            <div>
                              <h3 className="font-medium text-[#001A72] max-w-[180px] truncate" title={account.name}>{account.name}</h3>
                              <p className="text-xs text-muted-foreground">{account.type} • {account.currency}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Status Badge */}
                        <div className="absolute top-4 right-4">
                          {account.status === 'Active' ? (
                             <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-normal">Active</Badge>
                          ) : (
                             <Tooltip>
                               <TooltipTrigger>
                                 <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-normal cursor-help">
                                   {account.status}
                                 </Badge>
                               </TooltipTrigger>
                               <TooltipContent>
                                 <p>Please review account alerts</p>
                               </TooltipContent>
                             </Tooltip>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 pt-4 flex-1">
                        <div className="space-y-1 mb-6">
                          <p className="text-sm text-muted-foreground">Current Balance</p>
                          <h4 className="text-2xl text-[#001A72] font-medium">
                            {account.currency}{account.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                          </h4>
                          {account.availableBalance !== account.balance && (
                             <p className="text-xs text-muted-foreground flex items-center gap-1">
                               Available: {account.currency}{account.availableBalance.toLocaleString()}
                               {account.pendingBalance && (
                                 <span className="text-amber-600">• {account.currency}{account.pendingBalance} pending</span>
                               )}
                             </p>
                          )}
                        </div>

                        {/* Details Compact */}
                        <div className="bg-gray-50 rounded-lg p-3 text-xs space-y-2">
                           <div className="flex justify-between text-muted-foreground">
                             <span>Account No.</span>
                             <span className="font-mono text-foreground">•••• {account.accountNumber.slice(-4)}</span>
                           </div>
                           {account.interestRate && (
                             <div className="flex justify-between text-muted-foreground">
                               <span>Interest Rate</span>
                               <span className="font-medium text-green-700">{account.interestRate}% AER</span>
                             </div>
                           )}
                           {account.overdraftLimit && (
                             <div className="flex justify-between text-muted-foreground">
                               <span>Overdraft Limit</span>
                               <span className="font-medium text-foreground">£{account.overdraftLimit.toLocaleString()}</span>
                             </div>
                           )}
                        </div>
                      </div>

                      {/* Actions Footer */}
                      <div className="p-3 px-6 border-t border-border flex items-center justify-between gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#0033A0] hover:text-[#002b87] h-8 px-2 text-xs font-medium"
                          onClick={() => switchToTransactions(account.id)}
                        >
                          View activity
                        </Button>
                        <div className="flex items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-[#0033A0]"
                                onClick={() => handleCopyDetails(account)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy account details</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-[#0033A0]"
                                onClick={() => toast.success("Statement downloading...")}
                              >
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download statement</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-[#0033A0]"
                                onClick={() => toast.success("Payment instructions shared")}
                              >
                                <Share className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share payment instructions</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Transactions Section */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl text-[#001A72]">
                    Recent Transactions
                    <span className="text-sm text-muted-foreground ml-2 font-normal">
                      ({filteredOverviewTransactions.length} shown)
                    </span>
                  </h2>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={transactionSearchTerm}
                        onChange={(e) => setTransactionSearchTerm(e.target.value)}
                        className="pl-9 bg-white"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => switchToTransactions()}
                      className="shrink-0 text-muted-foreground hover:text-[#0033A0]"
                    >
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <FilterableTable 
                  data={filteredOverviewTransactions}
                  columns={overviewColumns}
                  onRowClick={(tx) => handleTransactionClick(tx)}
                  hideSearch={true}
                />
              </div>
            </div>
          ) : (
            /* --- DETAILED TRANSACTIONS VIEW --- */
            <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 lg:p-8 h-[calc(100vh-88px)]">
              <DetailedTransactionsView 
                transactions={MOCK_TRANSACTIONS} 
                accounts={MOCK_ACCOUNTS}
                onTransactionClick={handleTransactionClick}
              />
            </div>
          )}
        </main>

        {/* Transaction Drawer (Available in both modes) */}
        <TransactionDrawer
          transaction={selectedTransaction}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}