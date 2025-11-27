import React from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export interface CardData {
  id: string;
  accountId?: string;
  entityName: string;
  status: 'active' | 'frozen' | 'blocked' | 'pending';
  type: 'physical' | 'virtual';
  last4: string;
  cardholderName: string;
  expiryDate: string;
  brand: 'visa' | 'mastercard';
  monthlySpend: number;
}

interface CardTileProps {
  card: CardData;
  onClick: () => void;
  onFreezeToggle?: (card: CardData) => void;
}

export function CardTile({ card, onClick, onFreezeToggle }: CardTileProps) {
  const getStatusBadgeStyles = (status: CardData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-[#10b981] text-white';
      case 'frozen':
        return 'bg-[#3b82f6] text-white';
      case 'blocked':
        return 'bg-red-600 text-white';
      case 'pending':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCardGradient = (type: CardData['type']) => {
    // Use a consistent deep blue gradient that matches the reference
    if (type === 'physical') {
      return 'from-[#1a47a3] to-[#103280]';
    }
    // Slightly lighter/different for virtual to distinguish
    return 'from-[#2563eb] to-[#1e40af]';
  };

  return (
    <div 
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer h-full hover:border-[#0033A0]"
      onClick={onClick}
    >
      {/* Top Section: Visual Card Representation */}
      <div className={cn(
        "relative h-48 p-6 flex flex-col justify-between bg-gradient-to-br",
        getCardGradient(card.type)
      )}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest font-normal text-white/90 mb-0.5">
              {card.entityName}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-normal text-white/70">
              {card.type} Card
            </span>
          </div>
          
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider",
            getStatusBadgeStyles(card.status)
          )}>
            {card.status}
          </span>
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-2">
             <div className="flex gap-1">
               {[1,2,3,4].map(i => (
                 <div key={`g1-${i}`} className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
               ))}
             </div>
             <div className="flex gap-1 mx-2">
               {[1,2,3,4].map(i => (
                 <div key={`g2-${i}`} className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
               ))}
             </div>
             <div className="flex gap-1">
               {[1,2,3,4].map(i => (
                 <div key={`g3-${i}`} className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
               ))}
             </div>
             <span className="text-2xl font-mono font-normal text-white ml-3 tracking-wider">{card.last4}</span>
           </div>

           <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1 font-medium text-white/70">Cardholder</p>
                <p className="text-sm font-normal tracking-wide text-white">{card.cardholderName}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest mb-1 font-medium text-white/70">Expires</p>
                <p className="text-sm font-normal tracking-wide text-white">{card.expiryDate}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Details & Actions */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="mb-6">
          <p className="text-[11px] text-[#475569] uppercase tracking-widest font-medium mb-1.5">Monthly Spend</p>
          <p className="text-[28px] font-normal text-[#000D45] tracking-tight leading-none">
            {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(card.monthlySpend)}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Button 
            variant="secondary"
            size="sm"
            className={cn(
              "w-full",
              card.status === 'frozen' && "bg-[#E9F2FF] border-[#0033A0]"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (onFreezeToggle) onFreezeToggle(card);
            }}
          >
            {card.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
          </Button>
          <Button 
            className="w-full h-10 bg-[#0033A0] hover:bg-[#002b87] text-white text-sm font-normal rounded-full shadow-none transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}