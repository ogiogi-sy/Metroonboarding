import React from 'react';
import { TrendingUp, ArrowRight, ShoppingBag, Fuel, Utensils, Wallet, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

// Reuse existing typography and layout patterns from CardDetailScreen

export function RewardsTab({ userRole = 'admin' }: { userRole?: 'admin' | 'employee' }) {
  return (
    <div className="max-w-3xl space-y-8">
      
      {/* 1. Cashback Summary (KPI Tiles) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryTile 
            label="Earned this month" 
            value="£12.50" 
            subtext="On this card"
            icon={Wallet}
            trend="+£2.50 vs last month"
        />
        {userRole === 'admin' && (
          <SummaryTile 
              label="Total this month" 
              value="£45.20" 
              subtext="All business cards"
              icon={TrendingUp}
          />
        )}
        <SummaryTile 
            label="Lifetime savings" 
            value={userRole === 'admin' ? "£342.50" : "£89.30"} 
            subtext={userRole === 'admin' ? "Since Jan 2024" : "Your total"}
            textColor="text-[#0033A0]"
        />
      </div>

      {/* 2. Savings by Merchant */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Savings by merchant</h2>
            <Button variant="ghost" className="text-sm text-[#0033A0] h-auto p-0 hover:bg-transparent font-medium">
                View all
            </Button>
        </div>
        <div className="divide-y divide-gray-100">
            <MerchantRow 
                name="Shell" 
                amount="£12.40" 
                category="Fuel" 
                logo="https://images.unsplash.com/photo-1634061683412-76900d284da3?w=100&h=100&fit=crop&q=80"
                period="this month"
            />
            <MerchantRow 
                name="Pret A Manger" 
                amount="£8.50" 
                category="Restaurants" 
                logo="https://images.unsplash.com/photo-1554495677-270449a78860?w=100&h=100&fit=crop&q=80"
                period="this month"
            />
            <MerchantRow 
                name="Uber Business" 
                amount="£5.20" 
                category="Transport" 
                logo="https://images.unsplash.com/photo-1632338579860-540236c4f357?w=100&h=100&fit=crop&q=80"
                period="this month"
            />
        </div>
      </div>

      {/* 3. Cashback from Recent Spending */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent cashback activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
            <TransactionRow 
                title="Cashback from Shell"
                subtitle="Fuel · Linked to card ending 3821"
                amount="+£3.20"
                date="Today"
            />
            <TransactionRow 
                title="Cashback from Pret"
                subtitle="Restaurants · Linked to card ending 3821"
                amount="+£0.45"
                date="Yesterday"
            />
            <TransactionRow 
                title="Cashback from Amazon"
                subtitle="Retail · Linked to card ending 3821"
                amount="+£1.20"
                date="12 Aug"
            />
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-center">
            <Button variant="ghost" className="text-[#0033A0] font-medium hover:bg-transparent hover:text-[#002b87]">
                View all cashback
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>

      {/* 4. Merchant Offers */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-semibold text-gray-900">Available Offers</h2>
            <Button variant="link" className="text-[#0033A0] p-0 h-auto">See all partners</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OfferTile 
                merchant="Starbucks"
                offer="5% back"
                category="Food & Drink"
                bgImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80"
            />
            <OfferTile 
                merchant="Trainline"
                offer="3% back"
                category="Travel"
                bgImage="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80"
            />
            <OfferTile 
                merchant="Staples"
                offer="Up to 10% back"
                category="Office"
                bgImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80"
            />
        </div>
      </div>

    </div>
  );
}

// Sub-components to keep the main file clean and reuse styles

function SummaryTile({ label, value, subtext, icon: Icon, trend, textColor }: any) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            </div>
            <div>
                <div className={cn("text-2xl font-semibold tracking-tight", textColor || "text-gray-900")}>
                    {value}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    {trend && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            {trend}
                        </span>
                    )}
                    <span className="text-xs text-gray-400">{subtext}</span>
                </div>
            </div>
        </div>
    )
}

function MerchantRow({ name, amount, category, logo, period }: any) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100">
                    {logo ? (
                        <img src={logo} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5 font-normal bg-gray-100 text-gray-600 border-gray-200">
                            {category}
                        </Badge>
                        <span className="text-xs text-gray-400">{period}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-green-600">{amount}</p>
                <p className="text-xs text-gray-400">earned</p>
            </div>
        </div>
    )
}

function TransactionRow({ title, subtitle, amount, date }: any) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-green-600">{amount}</p>
                <p className="text-xs text-gray-400">{date}</p>
            </div>
        </div>
    )
}

function OfferTile({ merchant, offer, category, bgImage }: any) {
    return (
        <div className="group relative h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-[#0033A0] transition-all">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
             <img src={bgImage} alt={merchant} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             
             <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-white/80 mb-0.5">{category}</p>
                        <p className="font-semibold text-sm">{merchant}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        {offer}
                    </div>
                </div>
             </div>
        </div>
    )
}