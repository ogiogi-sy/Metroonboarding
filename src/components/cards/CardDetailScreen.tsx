import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, Lock, RefreshCw, CreditCard, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { cn } from '../ui/utils';
import { CardData } from './CardTile';

interface CardDetailScreenProps {
  cardId: string;
  onBack: () => void;
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
  brand: 'visa'
};

export function CardDetailScreen({ cardId, onBack }: CardDetailScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-0">
        <div className="max-w-7xl mx-auto px-8">
          <Button 
            variant="ghost" 
            className="text-[#0033A0] hover:text-[#002b87] hover:bg-transparent p-0 h-auto mb-4 text-sm flex items-center gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cards
          </Button>
          
          <div className="mb-6">
            <h1 className="text-[28px] font-normal text-gray-900">Card Details</h1>
            <p className="text-[15px] text-gray-600">
              {CARD_DETAILS.type === 'physical' ? 'Physical' : 'Virtual'} Card ending in {CARD_DETAILS.last4}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-0 bg-transparent gap-8 border-b-0 w-full justify-start rounded-none">
              {['Overview', 'Controls', 'Activity', 'Services', 'Management'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className={cn(
                    "rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-600 data-[state=active]:border-[#0033A0] data-[state=active]:text-[#0033A0] data-[state=active]:bg-transparent bg-transparent shadow-none transition-all duration-200 hover:text-gray-900"
                  )}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <Tabs value={activeTab} className="w-full space-y-8">
            <TabsContent value="overview" className="mt-0 focus-visible:ring-0">
                <OverviewTab card={CARD_DETAILS} />
            </TabsContent>
            <TabsContent value="controls" className="mt-0 focus-visible:ring-0">
                <ControlsTab />
            </TabsContent>
            <TabsContent value="activity" className="mt-0 focus-visible:ring-0">
                <div className="p-8 text-center text-gray-500">Activity Content Coming Soon</div>
            </TabsContent>
            <TabsContent value="services" className="mt-0 focus-visible:ring-0">
                <div className="p-8 text-center text-gray-500">Services Content Coming Soon</div>
            </TabsContent>
            <TabsContent value="management" className="mt-0 focus-visible:ring-0">
                <div className="p-8 text-center text-gray-500">Management Content Coming Soon</div>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function OverviewTab({ card }: { card: CardData }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                {/* Card Visual Block */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className={cn(
                        "w-full max-w-[400px] h-[256px] rounded-lg p-6 text-white bg-gradient-to-br relative shadow-sm mb-6",
                        card.type === 'physical' ? 'from-[#0033A0] to-[#002b87]' : 'from-[#667eea] to-[#764ba2]'
                    )}>
                         <div className="flex justify-between items-start mb-8">
                            <span className="text-[10px] uppercase tracking-wider opacity-80 font-medium">
                                {card.entityName}
                            </span>
                            <span className={cn(
                                "px-2 py-1 rounded border text-[10px] font-medium inline-block bg-green-50 text-green-700 border-green-200"
                            )}>
                                {card.status}
                            </span>
                        </div>
                        <div className="mt-auto space-y-8 pt-12">
                            <div className="space-y-2">
                                <p className="text-[11px] opacity-80 uppercase tracking-wide">{card.type} Card</p>
                                <p className="text-2xl font-mono tracking-wider">•••• •••• •••• {card.last4}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] opacity-80 uppercase tracking-wider mb-0.5">Cardholder</p>
                                    <p className="text-[13px] font-medium">{card.cardholderName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] opacity-80 uppercase tracking-wider mb-0.5">Expires</p>
                                    <p className="text-[11px] font-medium">{card.expiryDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {[
                            { icon: Lock, label: 'Freeze' },
                            { icon: Eye, label: 'View PIN' },
                            { icon: CreditCard, label: 'View PAN' },
                            { icon: RefreshCw, label: 'Replace' },
                            { icon: Shield, label: 'Report' }
                        ].map((action) => (
                            <button 
                                key={action.label}
                                className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <action.icon className="w-4 h-4 text-gray-700" />
                                <span className="text-[13px] text-gray-900">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Block - Placeholder for now */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-medium text-gray-900">Recent Activity</h3>
                        <Button variant="link" className="text-[#0033A0] text-[13px] h-auto p-0">
                            View all Activity
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { merch: 'Uber *Trip', amt: '-£14.50', date: 'Today', cat: 'Transport' },
                            { merch: 'Sainsbury\'s', amt: '-£45.20', date: 'Yesterday', cat: 'Groceries' },
                            { merch: 'Refund: Amazon', amt: '+£120.00', date: 'Mon, 22 Nov', cat: 'Shopping', credit: true }
                        ].map((tx, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                        {tx.merch.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{tx.merch}</p>
                                        <p className="text-xs text-gray-500">{tx.cat}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn("text-sm font-medium", tx.credit ? "text-green-600" : "text-gray-900")}>{tx.amt}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Card Summary</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Daily spend limit', value: '£10,000.00' },
                            { label: 'Per-transaction limit', value: '£2,500.00' },
                            { label: 'Contactless limit', value: '£100.00' },
                            { label: 'Cash withdrawal', value: 'Disabled' },
                            { label: 'Virtual card', value: 'Available' }
                        ].map((item) => (
                            <div key={item.label}>
                                <p className="text-[13px] text-gray-600 mb-1">{item.label}</p>
                                <p className="text-[15px] text-gray-900 font-medium">{item.value}</p>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-[13px] text-gray-600 mb-1">Cardholder name</p>
                            <p className="text-[15px] text-gray-900 font-medium">{card.cardholderName}</p>
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-600 mb-1">Card product</p>
                            <p className="text-[15px] text-gray-900 font-medium">Business Debit World Elite</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ControlsTab() {
  const [dailyLimit, setDailyLimit] = useState([5000]);
  const [txnLimit, setTxnLimit] = useState([1000]);
  const [cashLimit, setCashLimit] = useState([20]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
        {/* Card Status Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-6">Card Status</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm font-medium text-gray-900">Freeze Card</p>
                    <p className="text-xs text-gray-600">Temporarily disable this card</p>
                </div>
                <Switch />
            </div>

            <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 justify-center">
                Report Lost or Stolen
            </Button>
        </div>

        {/* Usage Controls Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-6">Usage Controls</h3>
            <div className="space-y-4">
                {[
                    { label: 'Online transactions', checked: true },
                    { label: 'International transactions', checked: false },
                    { label: 'ATM withdrawals', checked: true },
                    { label: 'Contactless payments', checked: true },
                    { label: 'Chip & PIN availability', checked: true }
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <Label className="text-sm font-normal text-gray-900">{item.label}</Label>
                        <Switch defaultChecked={item.checked} />
                    </div>
                ))}
            </div>
        </div>

        {/* Spending Limits Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-8">Spending Limits</h3>
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label className="text-sm text-gray-700">Daily spend limit</Label>
                        <span className="text-sm font-medium text-gray-900">£{dailyLimit[0].toLocaleString()}</span>
                    </div>
                    <Slider 
                        value={dailyLimit} 
                        onValueChange={setDailyLimit} 
                        max={10000} 
                        step={100} 
                        className="py-2"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label className="text-sm text-gray-700">Per-transaction limit</Label>
                        <span className="text-sm font-medium text-gray-900">£{txnLimit[0].toLocaleString()}</span>
                    </div>
                    <Slider 
                        value={txnLimit} 
                        onValueChange={setTxnLimit} 
                        max={5000} 
                        step={50}
                        className="py-2"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label className="text-sm text-gray-700">Cash limit (% of total)</Label>
                        <span className="text-sm font-medium text-gray-900">{cashLimit[0]}%</span>
                    </div>
                    <Slider 
                        value={cashLimit} 
                        onValueChange={setCashLimit} 
                        max={100} 
                        step={5}
                        className="py-2"
                    />
                </div>
            </div>
        </div>

         {/* Category Blocks Section */}
         <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-6">Category Blocks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: 'Gambling', blocked: true },
                    { label: 'Cash-like transactions', blocked: true },
                    { label: 'Travel', blocked: false },
                    { label: 'Entertainment', blocked: false },
                    { label: 'Subscriptions', blocked: false },
                    { label: 'High-risk merchants', blocked: true }
                ].map((cat) => (
                    <div 
                        key={cat.label}
                        className={cn(
                            "p-4 border-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between",
                            cat.blocked 
                                ? "border-red-100 bg-red-50/50" 
                                : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                    >
                        <span className={cn(
                            "text-sm font-medium",
                            cat.blocked ? "text-red-700" : "text-gray-900"
                        )}>
                            {cat.label}
                        </span>
                        {cat.blocked && <Shield className="w-4 h-4 text-red-600" />}
                    </div>
                ))}
            </div>
         </div>
    </div>
  );
}