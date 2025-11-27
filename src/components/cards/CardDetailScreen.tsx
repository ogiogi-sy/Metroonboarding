import React, { useState, useMemo } from 'react';
import { 
    ArrowLeft, CheckCircle2, Eye, Lock, RefreshCw, CreditCard, Shield, 
    AlertTriangle, Bell, Gift, Settings, Wallet, Copy, Timer, 
    FileText, ScrollText, ArrowRight, Zap, Smartphone, Globe, 
    Ban, Banknote, Wifi, CalendarDays, Download, AlertCircle,
    X, ChevronDown, Filter
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RewardsTab } from './RewardsTab';
import { cn } from '../ui/utils';
import { CardData } from './CardTile';
import { UserCog, LockKeyhole } from 'lucide-react';
import { FilterableTable } from '../banking/FilterableTable';
import { Transaction } from '../banking/types';

interface CardDetailScreenProps {
  cardId: string;
  onBack: () => void;
  userRole?: 'admin' | 'employee';
  isOwnCard?: boolean;
}

// Mock full card data (simulating fetch)
const CARD_DETAILS: CardData = {
  id: '1',
  entityName: 'Metro Bank UK Ltd',
  status: 'active', 
  type: 'physical',
  last4: '3821',
  cardholderName: 'Sarah Johnson',
  expiryDate: '09/26',
  brand: 'visa',
  monthlySpend: 1250.50
};

// Mock Transactions Data
const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', accountId: '1', merchantName: 'Uber Business', category: 'Transport', amount: -24.50, currency: '£', date: '2024-05-15', time: '14:30', type: 'card', status: 'completed', user: 'Sarah Johnson' },
    { id: 't2', accountId: '1', merchantName: 'Pret A Manger', category: 'Food & Drink', amount: -8.90, currency: '£', date: '2024-05-15', time: '09:15', type: 'card', status: 'completed', user: 'Sarah Johnson' },
    { id: 't3', accountId: '1', merchantName: 'WeWork', category: 'Rent', amount: -450.00, currency: '£', date: '2024-05-14', time: '10:00', type: 'card', status: 'completed', user: 'Sarah Johnson' },
    { id: 't4', accountId: '1', merchantName: 'Apple Store', category: 'Electronics', amount: -1299.00, currency: '£', date: '2024-05-12', time: '16:45', type: 'card', status: 'completed', user: 'Sarah Johnson' },
    { id: 't5', accountId: '1', merchantName: 'TFL Travel Charge', category: 'Transport', amount: -4.50, currency: '£', date: '2024-05-10', time: '18:30', type: 'card', status: 'completed', user: 'Sarah Johnson' },
    { id: 't6', accountId: '1', merchantName: 'Slack Technologies', category: 'Software', amount: -12.50, currency: '£', date: '2024-05-01', time: '09:00', type: 'card', status: 'completed', user: 'Sarah Johnson' },
];

// Mock Subscriptions Data
const MOCK_SUBSCRIPTIONS = [
    { id: 's1', name: 'Slack', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&q=80', amount: '£12.50', frequency: 'Monthly', nextDate: '1 Jun 2024', status: 'Active' },
    { id: 's2', name: 'Adobe Creative Cloud', logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=64&h=64&fit=crop&q=80', amount: '£54.99', frequency: 'Monthly', nextDate: '5 Jun 2024', status: 'Active' },
    { id: 's3', name: 'AWS Web Services', logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=64&h=64&fit=crop&q=80', amount: '£230.00', frequency: 'Monthly', nextDate: '10 Jun 2024', status: 'Active' },
];

export function CardDetailScreen({ cardId, onBack, userRole = 'admin', isOwnCard = true }: CardDetailScreenProps) {
  const [activeTab, setActiveTab] = useState('security');
  const [cardStatus, setCardStatus] = useState<string>(CARD_DETAILS.status);
  const [walletProvider, setWalletProvider] = useState<string | null>(null);

  const isCreditCard = CARD_DETAILS.type === 'physical' || CARD_DETAILS.type === 'credit'; 

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="pt-6 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Button 
            variant="ghost" 
            className="text-[#0033A0] hover:text-[#002b87] hover:bg-transparent p-0 h-auto mb-6 text-sm flex items-center gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cards
          </Button>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{CARD_DETAILS.cardholderName}</h1>
                    {!isOwnCard && userRole === 'admin' && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1">
                            <UserCog className="w-3 h-3" />
                            <span>Employee Card</span>
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        <span className="capitalize">{CARD_DETAILS.type} Card</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="font-mono">•••• {CARD_DETAILS.last4}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-3">
                        {walletProvider && (
                             <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200 flex items-center gap-1 mr-2">
                                <Wallet className="w-3 h-3 text-gray-500" />
                                <span>Added to {walletProvider}</span>
                            </Badge>
                        )}
                        <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Status</span>
                        <Badge 
                        variant="outline" 
                        className={cn(
                            "px-3 py-1 capitalize text-sm font-medium border-0",
                            cardStatus === 'active' ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" :
                            cardStatus === 'frozen' ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10" :
                            (cardStatus === 'pending' || cardStatus === 'Replacement pending' || cardStatus === 'Card reorder in progress') ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20" :
                            "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        )}
                        >
                        {cardStatus}
                        </Badge>
                    </div>
                    {cardStatus === 'Replacement pending' && (
                        <span className="text-[11px] text-gray-500 mt-1.5 font-medium">Your replacement card is being prepared.</span>
                    )}
                    {cardStatus === 'Card reorder in progress' && (
                        <span className="text-[11px] text-gray-500 mt-1.5 font-medium">A copy of your card is on its way.</span>
                    )}
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
            <TabsList className="h-auto p-1 bg-gray-100/50 gap-2 w-full justify-start overflow-x-auto no-scrollbar border border-gray-200 rounded-xl">
              {[
                { id: 'security', label: 'Lifecycle & Security', icon: Shield },
                ...(userRole === 'admin' ? [{ id: 'controls', label: 'Controls & Limits', icon: Settings }] : []),
                { id: 'alerts', label: 'Alerts', icon: Bell },
                { id: 'transactions', label: 'Transactions', icon: FileText },
                { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
                { id: 'rewards', label: 'Rewards', icon: Gift }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 transition-all gap-2 border border-transparent",
                    "data-[state=active]:bg-white data-[state=active]:text-[#0033A0] data-[state=active]:border-gray-200",
                    "hover:text-gray-900 hover:bg-gray-200/50"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <Tabs value={activeTab} className="w-full space-y-8">
            <TabsContent value="security" className="mt-0 focus-visible:ring-0">
                <SecurityTab 
                  card={{...CARD_DETAILS, status: cardStatus as any}} 
                  isOwnCard={isOwnCard} 
                  userRole={userRole} 
                  onActivate={() => setCardStatus('active')}
                  onFreeze={() => setCardStatus('frozen')}
                  onUnfreeze={() => setCardStatus('active')}
                  onUpdateStatus={(status) => setCardStatus(status)}
                  onAddToWallet={setWalletProvider}
                />
            </TabsContent>
            {userRole === 'admin' && (
              <TabsContent value="controls" className="mt-0 focus-visible:ring-0">
                  <ControlsTab />
              </TabsContent>
            )}
            <TabsContent value="alerts" className="mt-0 focus-visible:ring-0">
                <AlertsTab />
            </TabsContent>
            <TabsContent value="transactions" className="mt-0 focus-visible:ring-0">
                <TransactionsTab />
            </TabsContent>
            <TabsContent value="subscriptions" className="mt-0 focus-visible:ring-0">
                <SubscriptionsTab userRole={userRole} />
            </TabsContent>
            <TabsContent value="rewards" className="mt-0 focus-visible:ring-0">
                <RewardsTab userRole={userRole} />
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// --- New Tabs Implementation ---

function ControlsTab() {
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [intlEnabled, setIntlEnabled] = useState(true);
  const [atmEnabled, setAtmEnabled] = useState(true);
  const [chipEnabled, setChipEnabled] = useState(true);
  const [magStripeEnabled, setMagStripeEnabled] = useState(false);
  
  const [gamblingBlocked, setGamblingBlocked] = useState(true);
  const [travelBlocked, setTravelBlocked] = useState(false);
  const [cashBlocked, setCashBlocked] = useState(false);
  const [entertainmentBlocked, setEntertainmentBlocked] = useState(false);

  const [contactlessLimit, setContactlessLimit] = useState([100]);
  const [dailySpendLimit, setDailySpendLimit] = useState('5000');
  const [cashWithdrawalLimit, setCashWithdrawalLimit] = useState('50');

  return (
    <div className="max-w-3xl space-y-8">
      {/* Spend & Cash Limits */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Spend & Cash Limits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="daily-limit">Daily spend limit</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <Input 
                id="daily-limit" 
                type="number" 
                value={dailySpendLimit} 
                onChange={(e) => setDailySpendLimit(e.target.value)} 
                className="pl-7"
              />
            </div>
            <p className="text-xs text-gray-500">Maximum total spend per day</p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="cash-limit">Cash withdrawal limit (%)</Label>
            <div className="relative">
              <Input 
                id="cash-limit" 
                type="number" 
                value={cashWithdrawalLimit} 
                onChange={(e) => setCashWithdrawalLimit(e.target.value)} 
                className="pr-7"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            <p className="text-xs text-gray-500">Percentage of total credit limit</p>
          </div>
        </div>
      </div>

      {/* Spending Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Spending Controls</h2>
        <div className="space-y-6">
          {[
            { label: 'Online payments', checked: onlineEnabled, set: setOnlineEnabled, icon: Globe },
            { label: 'International payments', checked: intlEnabled, set: setIntlEnabled, icon: Globe },
            { label: 'ATM withdrawals', checked: atmEnabled, set: setAtmEnabled, icon: Banknote },
            { label: 'Chip & PIN', checked: chipEnabled, set: setChipEnabled, icon: CreditCard },
            { label: 'Magnetic stripe', checked: magStripeEnabled, set: setMagStripeEnabled, icon: CreditCard },
          ].map((control, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <control.icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{control.label}</span>
              </div>
              <Switch checked={control.checked} onCheckedChange={control.set} />
            </div>
          ))}
        </div>
      </div>

      {/* Contactless Limit */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-gray-100 rounded-lg">
                <Wifi className="w-4 h-4 text-gray-600 rotate-90" />
             </div>
             <div>
                <h2 className="text-lg font-semibold text-gray-900">Contactless Limit</h2>
                <p className="text-sm text-gray-500">Maximum amount per contactless transaction</p>
             </div>
          </div>
          <div className="text-xl font-bold text-[#0033A0]">£{contactlessLimit[0]}</div>
        </div>
        <Slider 
          value={contactlessLimit} 
          onValueChange={setContactlessLimit} 
          max={100} 
          step={10} 
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>£0</span>
          <span>£100</span>
        </div>
      </div>

      {/* MCC Blocks */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Merchant Category Blocks</h2>
        <div className="space-y-6">
          {[
            { label: 'Gambling', checked: gamblingBlocked, set: setGamblingBlocked, icon: Zap },
            { label: 'Travel', checked: travelBlocked, set: setTravelBlocked, icon: Globe },
            { label: 'Cash Withdrawals', checked: cashBlocked, set: setCashBlocked, icon: Banknote },
            { label: 'Entertainment', checked: entertainmentBlocked, set: setEntertainmentBlocked, icon: Gift },
          ].map((block, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <block.icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{block.label}</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className={cn("text-xs font-medium", block.checked ? "text-red-600" : "text-green-600")}>
                    {block.checked ? "Blocked" : "Allowed"}
                 </span>
                 <Switch checked={block.checked} onCheckedChange={block.set} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionsTab() {
  const [showStatementGenerator, setShowStatementGenerator] = useState(false);
  const [statementPeriod, setStatementPeriod] = useState('current');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStatement = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowStatementGenerator(false);
      toast.success('Card statement generated successfully', {
        description: 'Your statement has been downloaded'
      });
    }, 2000);
  };

  const columns = [
    {
      header: 'Merchant',
      accessorKey: 'merchantName' as keyof Transaction,
      cell: (tx: Transaction) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base shrink-0 text-[#001A72] font-medium">
              {tx.merchantName.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-[#001A72]">{tx.merchantName}</div>
              {tx.reference && <div className="text-xs text-muted-foreground">{tx.reference}</div>}
            </div>
          </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category' as keyof Transaction,
      className: 'hidden sm:table-cell',
      cell: (tx: Transaction) => (
        <Badge variant="outline" className="font-normal text-xs text-gray-600 border-gray-200">
          {tx.category}
        </Badge>
      )
    },
    {
      header: 'Date',
      accessorKey: 'date' as keyof Transaction,
      className: 'hidden sm:table-cell',
    },
    {
      header: 'Amount',
      accessorKey: 'amount' as keyof Transaction,
      className: 'text-right',
      cell: (tx: Transaction) => (
        <span className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
          {tx.amount > 0 ? '+' : ''}{tx.currency}{Math.abs(tx.amount).toFixed(2)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
        {/* Statement Summary Card - Merged Statement Functionality */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#001A72] mb-1">Card Statements</h3>
              <p className="text-sm text-gray-600">Generate statements for this card's activity</p>
            </div>
            <Button 
              onClick={() => setShowStatementGenerator(true)}
              className="bg-[#0033A0] hover:bg-[#002b87] text-white gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Statement
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/60 backdrop-blur border border-blue-100 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Current Month</p>
              <p className="text-xl font-semibold text-[#001A72]">£1,250.50</p>
              <p className="text-xs text-gray-500 mt-1">22 transactions</p>
            </div>
            <div className="bg-white/60 backdrop-blur border border-blue-100 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Last Month</p>
              <p className="text-xl font-semibold text-[#001A72]">£2,104.80</p>
              <p className="text-xs text-gray-500 mt-1">31 transactions</p>
            </div>
            <div className="bg-white/60 backdrop-blur border border-blue-100 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">YTD Total</p>
              <p className="text-xl font-semibold text-[#001A72]">£12,450.30</p>
              <p className="text-xs text-gray-500 mt-1">154 transactions</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Button variant="outline" className="text-[#0033A0]">
                View all transactions
            </Button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <FilterableTable 
                data={MOCK_TRANSACTIONS}
                columns={columns}
                hideSearch={true}
            />
        </div>

        {/* Statement Generator Modal */}
        <Dialog open={showStatementGenerator} onOpenChange={setShowStatementGenerator}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-[#001A72]">Generate Card Statement</DialogTitle>
              <DialogDescription>
                Create a statement for Sarah Johnson's card activity
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-[#001A72]">Statement Period</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="period"
                      value="current"
                      checked={statementPeriod === 'current'}
                      onChange={(e) => setStatementPeriod(e.target.value)}
                      className="w-4 h-4 text-[#0033A0]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Current Month</p>
                      <p className="text-xs text-gray-500">1 May - Today</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#001A72]">£1,250.50</p>
                      <p className="text-xs text-gray-500">22 transactions</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="period"
                      value="last-month"
                      checked={statementPeriod === 'last-month'}
                      onChange={(e) => setStatementPeriod(e.target.value)}
                      className="w-4 h-4 text-[#0033A0]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Last Month</p>
                      <p className="text-xs text-gray-500">1 Apr - 30 Apr 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#001A72]">£2,104.80</p>
                      <p className="text-xs text-gray-500">31 transactions</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="period"
                      value="custom"
                      checked={statementPeriod === 'custom'}
                      onChange={(e) => setStatementPeriod(e.target.value)}
                      className="w-4 h-4 text-[#0033A0]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Custom Date Range</p>
                      <p className="text-xs text-gray-500">Select specific dates</p>
                    </div>
                  </label>

                  {statementPeriod === 'custom' && (
                    <div className="ml-7 p-4 bg-gray-50 rounded-lg space-y-3">
                      <div>
                        <Label className="text-xs mb-1.5">From Date</Label>
                        <Input type="date" className="text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs mb-1.5">To Date</Label>
                        <Input type="date" className="text-sm" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#001A72] mb-1">Statement includes</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• All transactions for this specific card</li>
                      <li>• Merchant details and categories</li>
                      <li>• Daily and period totals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowStatementGenerator(false)}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateStatement}
                disabled={isGenerating}
                className="bg-[#0033A0] hover:bg-[#002b87] text-white min-w-[140px]"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}

function SubscriptionsTab({ userRole = 'admin' }: { userRole?: 'admin' | 'employee' }) {
    const [subscriptions, setSubscriptions] = useState(MOCK_SUBSCRIPTIONS);

    const handleCancel = (id: string) => {
        setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, status: 'Cancellation Requested' } : s));
        toast.success("Subscription cancellation requested.");
    };

    const handleStop = (id: string) => {
         setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, status: 'Blocked' } : s));
         toast.success("Future payments blocked.");
    };

    return (
        <div className="max-w-3xl">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                     <h2 className="text-lg font-semibold text-gray-900">Active Subscriptions</h2>
                     <p className="text-sm text-gray-500 mt-1">Recurring payments linked to this card.</p>
                </div>
                <div className="divide-y divide-gray-100">
                    {subscriptions.map((sub) => (
                        <div key={sub.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={sub.logo} alt={sub.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{sub.name}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                        <span>{sub.amount} / {sub.frequency}</span>
                                        <span>•</span>
                                        <span>Next: {sub.nextDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {sub.status !== 'Active' ? (
                                    <Badge variant="secondary" className={cn(
                                        "capitalize",
                                        sub.status === 'Blocked' ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                                    )}>
                                        {sub.status}
                                    </Badge>
                                ) : (
                                    <>
                                        {userRole === 'admin' ? (
                                            <>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                                            Stop Payments
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Stop future payments?</DialogTitle>
                                                            <DialogDescription>
                                                                We will block future transactions from {sub.name}. You should also cancel directly with the merchant.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button onClick={() => handleStop(sub.id)} className="bg-red-600 hover:bg-red-700 text-white">Block Payments</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm">Cancel</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Cancel subscription?</DialogTitle>
                                                            <DialogDescription>
                                                                We can contact {sub.name} to request cancellation on your behalf.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button onClick={() => handleCancel(sub.id)}>Confirm Cancellation</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                                Active
                                            </Badge>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AlertsTab() {
    const [remind3Days, setRemind3Days] = useState(true);
    const [remindDueDate, setRemindDueDate] = useState(true);
    const [remindMissed, setRemindMissed] = useState(true);
    
    // Promotion Reminders State
    const [remindPromoEnd, setRemindPromoEnd] = useState(true);
    const [remindPromo7Days, setRemindPromo7Days] = useState(true);
    const [remindPromo1Day, setRemindPromo1Day] = useState(true);

    return (
        <div className="max-w-3xl space-y-6">
            {/* Payment Reminders */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment reminders</h2>
                
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="r-3days" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me 3 days before payment is due</Label>
                        <Switch id="r-3days" checked={remind3Days} onCheckedChange={setRemind3Days} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <Label htmlFor="r-duedate" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me on the payment due date</Label>
                        <Switch id="r-duedate" checked={remindDueDate} onCheckedChange={setRemindDueDate} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <Label htmlFor="r-missed" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me if I miss a payment</Label>
                        <Switch id="r-missed" checked={remindMissed} onCheckedChange={setRemindMissed} />
                    </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Reminders are sent as in-app notifications for this credit card.
                    </p>
                </div>
            </div>

            {/* Promotion Period Reminders */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Promotion period reminders</h2>
                <p className="text-sm text-gray-500 mb-6">Get reminders when your promotional periods are nearing their end.</p>

                <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="r-promo-end" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me before a promotion ends</Label>
                        <Switch id="r-promo-end" checked={remindPromoEnd} onCheckedChange={setRemindPromoEnd} />
                    </div>
                    
                    {/* Nested options, visually indented if main toggle is on */}
                    <div className={cn("space-y-6 transition-all duration-300", remindPromoEnd ? "opacity-100" : "opacity-50 pointer-events-none")}>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="r-promo-7days" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me 7 days before</Label>
                            <Switch id="r-promo-7days" checked={remindPromo7Days} onCheckedChange={setRemindPromo7Days} disabled={!remindPromoEnd} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <Label htmlFor="r-promo-1day" className="text-sm font-medium text-gray-900 cursor-pointer">Remind me 1 day before</Label>
                            <Switch id="r-promo-1day" checked={remindPromo1Day} onCheckedChange={setRemindPromo1Day} disabled={!remindPromoEnd} />
                        </div>
                    </div>
                </div>

                {/* Active Promotions List */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Active Promotions</h3>
                    <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 bg-gray-50/30">
                        {/* Row 1 */}
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900 text-sm">Balance transfer offer</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" />
                                    Ends 15 Sep 2025
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">Active</Badge>
                        </div>
                        {/* Row 2 */}
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900 text-sm">Instalment plan</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" />
                                    Ends 20 Aug 2025
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">Ending soon</Badge>
                        </div>
                         {/* Row 3 */}
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900 text-sm">Purchase promotion</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" />
                                    Ends 10 Oct 2025
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">Active</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecurityTab({ 
    card, 
    isOwnCard = true, 
    userRole = 'admin', 
    onActivate,
    onFreeze,
    onUnfreeze,
    onUpdateStatus,
    onAddToWallet
}: { 
    card: CardData, 
    isOwnCard?: boolean, 
    userRole?: 'admin' | 'employee', 
    onActivate: () => void,
    onFreeze: () => void,
    onUnfreeze: () => void,
    onUpdateStatus: (status: string) => void,
    onAddToWallet: (provider: string) => void
}) {
    const [isViewPinOpen, setIsViewPinOpen] = useState(false);
    const [isChangePinOpen, setIsChangePinOpen] = useState(false);
    const [pinStep, setPinStep] = useState<'auth' | 'reveal'>('auth');
    const [revealedPin, setRevealedPin] = useState('');
    const [mockPasscode, setMockPasscode] = useState('');
    const [cvv, setCvv] = useState('');

    // Freeze/Unfreeze State
    const [isFreezeOpen, setIsFreezeOpen] = useState(false);
    const [freezeStep, setFreezeStep] = useState<'confirm' | 'success'>('confirm');
    const isFrozen = card.status === 'frozen';
    const isPending = card.status === 'pending';

    // Change PIN State
    const [changePinStep, setChangePinStep] = useState<'input' | 'success'>('input');
    const [newPin, setNewPin] = useState('');

    // Activation State
    const [isActivateOpen, setIsActivateOpen] = useState(false);
    const [activationStep, setActivationStep] = useState<'input' | 'success'>('input');

    // Replace Card State
    const [isReplaceOpen, setIsReplaceOpen] = useState(false);
    const [replaceStep, setReplaceStep] = useState<'confirm' | 'success'>('confirm');

    // New States for Extended Lifecycle Actions
    const [isVirtualCardOpen, setIsVirtualCardOpen] = useState(false);
    const [isReorderOpen, setIsReorderOpen] = useState(false);
    const [isDisposableOpen, setIsDisposableOpen] = useState(false);
    
    // Balance Transfer & Money Transfer State
    const [isBalanceTransferOpen, setIsBalanceTransferOpen] = useState(false);
    const [isMoveLimitOpen, setIsMoveLimitOpen] = useState(false);
    const [isTransferCreditOpen, setIsTransferCreditOpen] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [transferSuccess, setTransferSuccess] = useState(false);

    // New PAN & Wallet States
    const [isViewPanOpen, setIsViewPanOpen] = useState(false);
    const [panStep, setPanStep] = useState<'auth' | 'reveal'>('auth');
    const [isAddToWalletOpen, setIsAddToWalletOpen] = useState(false);

    // Handlers for money transfers
    const resetTransferState = () => {
        setTransferAmount('');
        setTransferSuccess(false);
    };

    const handleBalanceTransfer = () => {
        setTransferSuccess(true);
        setTimeout(() => {
            setIsBalanceTransferOpen(false);
            toast.success("Your balance transfer request was submitted.");
            resetTransferState();
        }, 1500);
    };

    const handleMoveLimit = () => {
        setTransferSuccess(true);
        setTimeout(() => {
            setIsMoveLimitOpen(false);
            toast.success("Funds moved to your account.");
            resetTransferState();
        }, 1500);
    };

    const handleTransferCredit = () => {
        setTransferSuccess(true);
        setTimeout(() => {
            setIsTransferCreditOpen(false);
            toast.success("Balance transferred to your account.");
            resetTransferState();
        }, 1500);
    };

    // Reset states when modals close
    React.useEffect(() => {
        if (!isReplaceOpen) setReplaceStep('confirm');
        if (!isBalanceTransferOpen && !isMoveLimitOpen && !isTransferCreditOpen) {
            resetTransferState();
        }
    }, [isReplaceOpen, isBalanceTransferOpen, isMoveLimitOpen, isTransferCreditOpen]);

    // Auto-hide PAN
    React.useEffect(() => {
        if (pinStep === 'reveal') {
            const hideTimer = setTimeout(() => {
                setPinStep('auth'); 
            }, 10000);

            return () => clearTimeout(hideTimer);
        }
    }, [pinStep]);

    const handleActivate = () => {
        setActivationStep('success');
        setTimeout(() => {
            setIsActivateOpen(false);
            onActivate();
        }, 2000);
    };

    const handleChangePin = () => {
        setChangePinStep('success');
        setTimeout(() => {
            setIsChangePinOpen(false);
        }, 2000);
    };

    const handleFreezeToggle = () => {
        if (isFrozen) {
            onUnfreeze();
            toast.success("Card unfrozen.");
        } else {
            onFreeze();
            toast.success("Card frozen.");
        }
    };

    // Reset state when modal closes
    React.useEffect(() => {
        if (!isViewPinOpen) {
            setPinStep('auth');
            setRevealedPin('');
            setMockPasscode('');
        }
        if (!isViewPanOpen) {
            setPanStep('auth');
            setMockPasscode('');
            setCvv('');
        }
    }, [isViewPinOpen, isViewPanOpen]);

    // Handle PIN reveal animation
    React.useEffect(() => {
        if (pinStep === 'reveal') {
            const fullPin = '8492'; // Mock PIN
            let currentIndex = 0;
            
            const interval = setInterval(() => {
                if (currentIndex <= 4) {
                    setRevealedPin(fullPin.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 300);

            const hideTimer = setTimeout(() => {
                setPinStep('auth'); 
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(hideTimer);
            };
        }
    }, [pinStep]);

    const handleAuthConfirm = () => {
        setPinStep('reveal');
    };

    const handlePanAuthConfirm = () => {
        setPanStep('reveal');
    };

    const handleAddToWallet = (provider: string) => {
        setIsAddToWalletOpen(false);
        onAddToWallet(provider);
        toast.success(`Added to ${provider}`);
    };

    return (
        <div className="max-w-3xl space-y-6">
             {/* Helper Banner for Admins viewing Employee cards */}
             {!isOwnCard && userRole === 'admin' && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                    <UserCog className="w-5 h-5 text-[#0033A0] mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-[#0033A0] mb-1">Managing Employee Card</h3>
                        <p className="text-xs text-blue-700">
                            You can freeze this card or update spending limits, but sensitive details like PIN and PAN are hidden for security.
                        </p>
                    </div>
                </div>
             )}

             {/* Main Freeze Toggle */}
             <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", isFrozen ? "bg-blue-100" : "bg-gray-100")}>
                        <Ban className={cn("w-5 h-5", isFrozen ? "text-blue-600" : "text-gray-600")} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Freeze this card</h3>
                        <p className="text-sm text-gray-500">Temporarily block all transactions</p>
                    </div>
                </div>
                <Switch checked={isFrozen} onCheckedChange={handleFreezeToggle} className="data-[state=checked]:bg-blue-600" />
             </div>

            {/* Security Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* View PIN */}
                     <Dialog open={isViewPinOpen} onOpenChange={setIsViewPinOpen}>
                         <DialogTrigger asChild>
                             <div className={cn(
                                 "p-4 border rounded-lg transition-all group relative",
                                 isOwnCard && !isPending
                                     ? "border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30 cursor-pointer" 
                                     : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                             )}>
                                 <div className="flex items-start gap-3">
                                     <div className={cn(
                                         "p-2 rounded-md transition-colors",
                                         isOwnCard ? "bg-gray-100 group-hover:bg-white" : "bg-gray-100"
                                     )}>
                                         {isOwnCard ? (
                                             <Eye className="w-5 h-5 text-gray-700 group-hover:text-[#0033A0]" />
                                         ) : (
                                             <LockKeyhole className="w-5 h-5 text-gray-400" />
                                         )}
                                     </div>
                                     <div>
                                         <h3 className="text-sm font-medium text-gray-900 mb-1">View PIN</h3>
                                         <p className="text-xs text-gray-500">View your 4-digit PIN securely</p>
                                     </div>
                                 </div>
                             </div>
                         </DialogTrigger>
                         {isOwnCard && (
                             <DialogContent className="sm:max-w-md">
                                 <DialogHeader>
                                     <DialogTitle>{pinStep === 'auth' ? 'Confirm your identity' : 'Your PIN'}</DialogTitle>
                                     <DialogDescription>
                                         {pinStep === 'auth' 
                                            ? 'Please enter your passcode to view your PIN.' 
                                            : 'For your security, the PIN will auto-hide shortly.'
                                         }
                                     </DialogDescription>
                                 </DialogHeader>
                                 
                                 {pinStep === 'auth' ? (
                                     <div className="space-y-4 py-4">
                                         <div className="space-y-2">
                                             <Label htmlFor="passcode">Passcode</Label>
                                             <Input 
                                                id="passcode" 
                                                type="password" 
                                                placeholder="Enter passcode"
                                                value={mockPasscode}
                                                onChange={(e) => setMockPasscode(e.target.value)}
                                             />
                                         </div>
                                         <DialogFooter>
                                             <Button onClick={handleAuthConfirm} className="w-full sm:w-auto">
                                                 Confirm
                                             </Button>
                                         </DialogFooter>
                                     </div>
                                 ) : (
                                     <div className="py-8 flex flex-col items-center justify-center space-y-6">
                                         <div className="flex gap-4">
                                             {[0, 1, 2, 3].map((index) => (
                                                 <div 
                                                     key={index} 
                                                     className="w-12 h-14 border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-mono font-bold text-[#0033A0]"
                                                 >
                                                     {revealedPin[index] || '•'}
                                                 </div>
                                             ))}
                                         </div>
                                         <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => setPinStep('auth')}
                                            className="text-gray-500 hover:text-gray-900"
                                         >
                                            Hide PIN
                                         </Button>
                                     </div>
                                 )}
                             </DialogContent>
                         )}
                     </Dialog>

                     {/* Change PIN */}
                     <Dialog open={isChangePinOpen} onOpenChange={setIsChangePinOpen}>
                         <DialogTrigger asChild>
                             <div className={cn(
                                 "p-4 border rounded-lg transition-all group relative",
                                 isOwnCard && !isPending
                                     ? "border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30 cursor-pointer" 
                                     : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                             )}>
                                 <div className="flex items-start gap-3">
                                     <div className={cn(
                                         "p-2 rounded-md transition-colors",
                                         isOwnCard ? "bg-gray-100 group-hover:bg-white" : "bg-gray-100"
                                     )}>
                                         {isOwnCard ? (
                                             <Settings className="w-5 h-5 text-gray-700 group-hover:text-[#0033A0]" />
                                         ) : (
                                             <LockKeyhole className="w-5 h-5 text-gray-400" />
                                         )}
                                     </div>
                                     <div>
                                         <h3 className="text-sm font-medium text-gray-900 mb-1">Change PIN</h3>
                                         <p className="text-xs text-gray-500">Set a new PIN for your card</p>
                                     </div>
                                 </div>
                             </div>
                         </DialogTrigger>
                         {isOwnCard && (
                             <DialogContent className="sm:max-w-md">
                                 <DialogHeader>
                                     <DialogTitle>{changePinStep === 'input' ? 'Change PIN' : 'PIN Updated'}</DialogTitle>
                                     <DialogDescription>
                                         {changePinStep === 'input' 
                                            ? 'For security reasons, please enter a new 4-digit PIN.' 
                                            : 'Your PIN has been updated.'
                                         }
                                     </DialogDescription>
                                 </DialogHeader>
                                 
                                 {changePinStep === 'input' ? (
                                     <div className="space-y-6 py-4">
                                         <div className="space-y-2">
                                             <Label htmlFor="new-pin">New PIN</Label>
                                             <Input 
                                                id="new-pin" 
                                                type="password" 
                                                placeholder="••••"
                                                maxLength={4}
                                                value={newPin}
                                                onChange={(e) => setNewPin(e.target.value)}
                                                className="text-center tracking-widest text-lg h-12"
                                             />
                                             <div className="space-y-1 pt-2">
                                                <p className="text-[13px] text-muted-foreground">
                                                    • Your PIN will not be shown after saving.
                                                </p>
                                                <p className="text-[13px] text-muted-foreground">
                                                    • For security, never share your PIN with anyone.
                                                </p>
                                             </div>
                                         </div>
                                         <DialogFooter className="sm:justify-between gap-2">
                                             <Button variant="secondary" onClick={() => setIsChangePinOpen(false)}>
                                                 Cancel
                                             </Button>
                                             <Button 
                                                disabled={newPin.length !== 4} 
                                                onClick={handleChangePin}
                                                className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                             >
                                                 Save new PIN
                                             </Button>
                                         </DialogFooter>
                                     </div>
                                 ) : (
                                     <div className="py-8 flex flex-col items-center justify-center text-center">
                                         <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                             <CheckCircle2 className="w-6 h-6 text-green-600" />
                                         </div>
                                         <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                         <p className="text-gray-500 mt-1">Your PIN has been updated.</p>
                                     </div>
                                 )}
                             </DialogContent>
                         )}
                     </Dialog>
                    
                     {/* View PAN (New) */}
                     <Dialog open={isViewPanOpen} onOpenChange={setIsViewPanOpen}>
                         <DialogTrigger asChild>
                             <div className={cn(
                                 "p-4 border rounded-lg transition-all group relative",
                                 isOwnCard && !isPending
                                     ? "border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30 cursor-pointer" 
                                     : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                             )}>
                                 <div className="flex items-start gap-3">
                                     <div className={cn(
                                         "p-2 rounded-md transition-colors",
                                         isOwnCard ? "bg-gray-100 group-hover:bg-white" : "bg-gray-100"
                                     )}>
                                         <CreditCard className="w-5 h-5 text-gray-700 group-hover:text-[#0033A0]" />
                                     </div>
                                     <div>
                                         <h3 className="text-sm font-medium text-gray-900 mb-1">View card number</h3>
                                         <p className="text-xs text-gray-500">View full PAN and CVV</p>
                                     </div>
                                 </div>
                             </div>
                         </DialogTrigger>
                         <DialogContent className="sm:max-w-md">
                             <DialogHeader>
                                 <DialogTitle>{panStep === 'auth' ? 'Confirm your identity' : 'Card Details'}</DialogTitle>
                                 <DialogDescription>
                                     {panStep === 'auth' 
                                        ? 'Please enter your CVV and Passcode to reveal details.' 
                                        : 'Your details will be hidden automatically in 30 seconds.'
                                     }
                                 </DialogDescription>
                             </DialogHeader>
                             
                             {panStep === 'auth' ? (
                                 <div className="space-y-4 py-4">
                                     <div className="space-y-2">
                                         <Label htmlFor="cvv">CVV (from back of card)</Label>
                                         <Input 
                                            id="cvv" 
                                            type="password" 
                                            maxLength={3}
                                            placeholder="123"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                         />
                                     </div>
                                     <div className="space-y-2">
                                         <Label htmlFor="pan-passcode">Passcode</Label>
                                         <Input 
                                            id="pan-passcode" 
                                            type="password" 
                                            placeholder="Enter passcode"
                                            value={mockPasscode}
                                            onChange={(e) => setMockPasscode(e.target.value)}
                                         />
                                     </div>
                                     <DialogFooter>
                                         <Button onClick={handlePanAuthConfirm} className="w-full sm:w-auto">
                                             Reveal Details
                                         </Button>
                                     </DialogFooter>
                                 </div>
                             ) : (
                                 <div className="py-8 space-y-6">
                                     <div className="bg-gradient-to-r from-[#0033A0] to-[#001A72] p-6 rounded-xl text-white relative overflow-hidden">
                                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                         <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-8">
                                                <CreditCard className="w-8 h-8 text-white/80" />
                                                <span className="font-mono text-lg">DEBIT</span>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="font-mono text-2xl tracking-wider">4592 1123 8932 3821</div>
                                                <div className="flex justify-between text-sm font-mono opacity-90">
                                                    <div>
                                                        <div className="text-[10px] opacity-70">EXPIRY</div>
                                                        <div>09/26</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] opacity-70">CVV</div>
                                                        <div>882</div>
                                                    </div>
                                                </div>
                                                <div className="pt-2 font-medium tracking-wide uppercase opacity-90">SARAH JOHNSON</div>
                                            </div>
                                         </div>
                                     </div>
                                     <div className="flex justify-center">
                                         <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => setPanStep('auth')}
                                            className="text-gray-500 hover:text-gray-900"
                                         >
                                            Hide Details
                                         </Button>
                                     </div>
                                 </div>
                             )}
                         </DialogContent>
                     </Dialog>

                     {/* Add to Wallet (New) */}
                     <Dialog open={isAddToWalletOpen} onOpenChange={setIsAddToWalletOpen}>
                         <DialogTrigger asChild>
                             <div className={cn(
                                 "p-4 border rounded-lg transition-all group relative",
                                 isOwnCard && !isPending
                                     ? "border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30 cursor-pointer" 
                                     : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                             )}>
                                 <div className="flex items-start gap-3">
                                     <div className={cn(
                                         "p-2 rounded-md transition-colors",
                                         isOwnCard ? "bg-gray-100 group-hover:bg-white" : "bg-gray-100"
                                     )}>
                                         <Smartphone className="w-5 h-5 text-gray-700 group-hover:text-[#0033A0]" />
                                     </div>
                                     <div>
                                         <h3 className="text-sm font-medium text-gray-900 mb-1">Add to Wallet</h3>
                                         <p className="text-xs text-gray-500">Apple Pay / Google Pay</p>
                                     </div>
                                 </div>
                             </div>
                         </DialogTrigger>
                         <DialogContent className="sm:max-w-md">
                             <DialogHeader>
                                 <DialogTitle>Add to Digital Wallet</DialogTitle>
                                 <DialogDescription>
                                     Choose a wallet provider to add your card to.
                                 </DialogDescription>
                             </DialogHeader>
                             <div className="py-4 space-y-3">
                                 <Button variant="outline" className="w-full justify-start gap-3 h-14" onClick={() => handleAddToWallet('Apple Pay')}>
                                     <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                         <Smartphone className="w-4 h-4" />
                                     </div>
                                     <div className="text-left">
                                         <div className="font-semibold text-gray-900">Apple Pay</div>
                                         <div className="text-xs text-gray-500">Add to Apple Wallet</div>
                                     </div>
                                 </Button>
                                 <Button variant="outline" className="w-full justify-start gap-3 h-14" onClick={() => handleAddToWallet('Google Pay')}>
                                     <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900">
                                         <Globe className="w-4 h-4" />
                                     </div>
                                     <div className="text-left">
                                         <div className="font-semibold text-gray-900">Google Pay</div>
                                         <div className="text-xs text-gray-500">Add to Google Wallet</div>
                                     </div>
                                 </Button>
                             </div>
                         </DialogContent>
                     </Dialog>
                </div>
            </div>

            {/* Balance Transfer & Money Transfer */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Balance transfer & money transfer</h2>
                <div className="space-y-3">
                    <Dialog open={isBalanceTransferOpen} onOpenChange={setIsBalanceTransferOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30">
                                 <span className="font-medium text-gray-700">Transfer balance from another credit card</span>
                                 <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{!transferSuccess ? 'Transfer balance to your Metro Credit Card' : 'Transfer Submitted'}</DialogTitle>
                                <DialogDescription>
                                    {!transferSuccess ? 'Move balance from another card provider to save on interest.' : 'Your request is being processed.'}
                                </DialogDescription>
                            </DialogHeader>
                            {!transferSuccess ? (
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>From</Label>
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select external credit card" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="barclays">Barclays Credit Card (•••• 4242)</SelectItem>
                                            <SelectItem value="amex">Amex Platinum (•••• 9001)</SelectItem>
                                            <SelectItem value="other">Add new card...</SelectItem>
                                          </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Amount</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                            <Input 
                                                type="number" 
                                                placeholder="0.00" 
                                                className="pl-7" 
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">A 2.9% balance transfer fee may apply.</p>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="secondary" onClick={() => setIsBalanceTransferOpen(false)}>Cancel</Button>
                                        <Button onClick={handleBalanceTransfer} className="bg-[#0033A0] hover:bg-[#002b87] text-white">Transfer balance</Button>
                                    </DialogFooter>
                                </div>
                            ) : (
                                <div className="py-8 flex flex-col items-center justify-center text-center">
                                     <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                         <CheckCircle2 className="w-6 h-6 text-green-600" />
                                     </div>
                                     <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                     <p className="text-gray-500 mt-1">Your balance transfer request was submitted.</p>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isMoveLimitOpen} onOpenChange={setIsMoveLimitOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30">
                                 <span className="font-medium text-gray-700">Move part of card limit to current account</span>
                                 <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{!transferSuccess ? 'Move credit limit to your account' : 'Funds Moved'}</DialogTitle>
                                <DialogDescription>
                                    {!transferSuccess ? 'Transfer cash from your credit limit to your current account.' : 'Funds have been transferred.'}
                                </DialogDescription>
                            </DialogHeader>
                            {!transferSuccess ? (
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Destination account</Label>
                                        <Select defaultValue="main">
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select account" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="main">Business Current Account (20-30-40)</SelectItem>
                                            <SelectItem value="savings">Business Savings (20-30-42)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Amount</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                            <Input 
                                                type="number" 
                                                placeholder="0.00" 
                                                className="pl-7"
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Only part of your available credit limit can be transferred.</p>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="secondary" onClick={() => setIsMoveLimitOpen(false)}>Cancel</Button>
                                        <Button onClick={handleMoveLimit} className="bg-[#0033A0] hover:bg-[#002b87] text-white">Transfer funds</Button>
                                    </DialogFooter>
                                </div>
                            ) : (
                                <div className="py-8 flex flex-col items-center justify-center text-center">
                                     <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                         <CheckCircle2 className="w-6 h-6 text-green-600" />
                                     </div>
                                     <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                     <p className="text-gray-500 mt-1">Funds moved to your account.</p>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isTransferCreditOpen} onOpenChange={setIsTransferCreditOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-between h-auto py-4 px-4 border-gray-200 hover:border-[#0033A0] hover:bg-blue-50/30">
                                 <span className="font-medium text-gray-700">Transfer credit balance to current account</span>
                                 <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{!transferSuccess ? 'Transfer credit balance to your account' : 'Balance Transferred'}</DialogTitle>
                                <DialogDescription>
                                    {!transferSuccess ? 'Move your positive credit balance back to your main account.' : 'Your balance has been updated.'}
                                </DialogDescription>
                            </DialogHeader>
                            {!transferSuccess ? (
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Destination account</Label>
                                        <Select defaultValue="main">
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select account" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="main">Business Current Account (20-30-40)</SelectItem>
                                            <SelectItem value="savings">Business Savings (20-30-42)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Amount</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                            <Input 
                                                type="number" 
                                                placeholder="0.00" 
                                                className="pl-7"
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">This transfers positive balance back to your Metro Bank current account.</p>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="secondary" onClick={() => setIsTransferCreditOpen(false)}>Cancel</Button>
                                        <Button onClick={handleTransferCredit} className="bg-[#0033A0] hover:bg-[#002b87] text-white">Transfer balance</Button>
                                    </DialogFooter>
                                </div>
                            ) : (
                                <div className="py-8 flex flex-col items-center justify-center text-center">
                                     <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                         <CheckCircle2 className="w-6 h-6 text-green-600" />
                                     </div>
                                     <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                     <p className="text-gray-500 mt-1">Balance transferred to your account.</p>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Lifecycle Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Lifecycle Management</h2>
                <div className="space-y-4">
                     {card.status === 'active' || card.status === 'frozen' ? (
                         <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Activate Card</h3>
                                    <p className="text-xs text-gray-500">Your card is active and ready to use</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[#0033A0] font-medium hover:text-[#002b87]">
                                Activated
                            </Button>
                         </div>
                     ) : (
                         <>
                             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-[#0033A0]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Activate Card</h3>
                                        <p className="text-xs text-gray-500">Card must be activated before use</p>
                                    </div>
                                </div>
                                <Button onClick={() => setIsActivateOpen(true)} className="bg-[#0033A0] hover:bg-[#002b87] text-white rounded-full px-6">
                                    Activate card
                                </Button>
                             </div>

                             <Dialog open={isActivateOpen} onOpenChange={setIsActivateOpen}>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>{activationStep === 'input' ? 'Activate your card' : 'Card Activated'}</DialogTitle>
                                        <DialogDescription>
                                            {activationStep === 'input' 
                                                ? 'Enter the last 4 digits to activate your card' 
                                                : 'Your card is now active.'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    {activationStep === 'input' ? (
                                        <div className="space-y-6 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="last4">Last 4 digits</Label>
                                                <Input 
                                                    id="last4" 
                                                    placeholder="XXXX" 
                                                    maxLength={4}
                                                    className="text-center tracking-widest text-lg"
                                                />
                                            </div>
                                            <DialogFooter className="sm:justify-between gap-2">
                                                <Button variant="secondary" onClick={() => setIsActivateOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleActivate} className="bg-[#0033A0] hover:bg-[#002b87] text-white rounded-full">
                                                    Activate card
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    ) : (
                                        <div className="py-8 flex flex-col items-center justify-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                            <p className="text-gray-500 mt-1">You can now use your card.</p>
                                        </div>
                                    )}
                                </DialogContent>
                             </Dialog>
                         </>
                     )}

                     {/* Create Virtual Card */}
                     <Dialog open={isVirtualCardOpen} onOpenChange={setIsVirtualCardOpen}>
                         <DialogTrigger asChild>
                             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Create virtual card</h3>
                                        <p className="text-xs text-gray-500">Instantly generate a card for online use</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Create
                                </Button>
                             </div>
                         </DialogTrigger>
                         <DialogContent className="sm:max-w-md">
                             <DialogHeader>
                                 <DialogTitle>Create virtual card</DialogTitle>
                                 <DialogDescription>
                                     A new virtual card will be generated instantly and ready for online use.
                                 </DialogDescription>
                             </DialogHeader>
                             <DialogFooter className="sm:justify-between gap-2">
                                 <Button variant="secondary" onClick={() => setIsVirtualCardOpen(false)}>
                                     Cancel
                                 </Button>
                                 <Button 
                                    onClick={() => {
                                        setIsVirtualCardOpen(false);
                                        toast.success("Your virtual card has been created.");
                                    }}
                                    className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                 >
                                     Create virtual card
                                 </Button>
                             </DialogFooter>
                         </DialogContent>
                     </Dialog>

                     {/* Create Disposable Virtual Card */}
                     <Dialog open={isDisposableOpen} onOpenChange={setIsDisposableOpen}>
                         <DialogTrigger asChild>
                             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Create disposable virtual card</h3>
                                        <p className="text-xs text-gray-500">Single-use card for secure one-off purchases</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Create
                                </Button>
                             </div>
                         </DialogTrigger>
                         <DialogContent className="sm:max-w-md">
                             <DialogHeader>
                                 <DialogTitle>Disposable virtual card</DialogTitle>
                                 <DialogDescription>
                                     This temporary card can be used for one-off online purchases. A new number will be created.
                                 </DialogDescription>
                             </DialogHeader>
                             <DialogFooter className="sm:justify-between gap-2">
                                 <Button variant="secondary" onClick={() => setIsDisposableOpen(false)}>
                                     Cancel
                                 </Button>
                                 <Button 
                                    onClick={() => {
                                        setIsDisposableOpen(false);
                                        toast.success("Disposable virtual card created.");
                                    }}
                                    className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                 >
                                     Create disposable card
                                 </Button>
                             </DialogFooter>
                         </DialogContent>
                     </Dialog>

                     {/* Re-order Card */}
                     <Dialog open={isReorderOpen} onOpenChange={setIsReorderOpen}>
                         <DialogTrigger asChild>
                             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <Copy className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Re-order card</h3>
                                        <p className="text-xs text-gray-500">Order an additional copy of this card</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Re-order
                                </Button>
                             </div>
                         </DialogTrigger>
                         <DialogContent className="sm:max-w-md">
                             <DialogHeader>
                                 <DialogTitle>Re-order this card</DialogTitle>
                                 <DialogDescription>
                                     A new copy of this physical card will be sent to your business address.
                                 </DialogDescription>
                             </DialogHeader>
                             <DialogFooter className="sm:justify-between gap-2">
                                 <Button variant="secondary" onClick={() => setIsReorderOpen(false)}>
                                     Cancel
                                 </Button>
                                 <Button 
                                    onClick={() => {
                                        setIsReorderOpen(false);
                                        toast.success("Your new card has been ordered.");
                                        onUpdateStatus('Card reorder in progress');
                                    }}
                                    className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                 >
                                     Re-order card
                                 </Button>
                             </DialogFooter>
                         </DialogContent>
                     </Dialog>

                     {/* Replace Card */}
                     <Dialog open={isReplaceOpen} onOpenChange={setIsReplaceOpen}>
                        <DialogTrigger asChild>
                             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <RefreshCw className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Replace Card</h3>
                                        <p className="text-xs text-gray-500">Request a replacement for damaged or expiring card</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Replace
                                </Button>
                             </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{replaceStep === 'confirm' ? 'Replace card' : 'Replacement Requested'}</DialogTitle>
                                <DialogDescription>
                                    {replaceStep === 'confirm' 
                                        ? 'Your current card will be cancelled and a new card will be issued.' 
                                        : 'Your replacement request has been received.'}
                                </DialogDescription>
                            </DialogHeader>
                            {replaceStep === 'confirm' ? (
                                <DialogFooter className="sm:justify-between gap-2">
                                    <Button variant="secondary" onClick={() => setIsReplaceOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            setReplaceStep('success');
                                            setTimeout(() => {
                                                setIsReplaceOpen(false);
                                                toast.success("Your replacement card is on its way.");
                                                onUpdateStatus('Replacement pending');
                                            }, 1500);
                                        }} 
                                        className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                                    >
                                        Confirm Replacement
                                    </Button>
                                </DialogFooter>
                            ) : (
                                <div className="py-8 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Success!</h3>
                                    <p className="text-gray-500 mt-1">Your replacement card is on its way.</p>
                                </div>
                            )}
                        </DialogContent>
                     </Dialog>
                </div>
            </div>
        </div>
    );
}
