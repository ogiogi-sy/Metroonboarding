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
}

interface CardTileProps {
  card: CardData;
  onClick: () => void;
}

export function CardTile({ card, onClick }: CardTileProps) {
  const getStatusStyles = (status: CardData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'frozen':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'blocked':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCardGradient = (type: CardData['type']) => {
    if (type === 'physical') {
      return 'from-[#0033A0] to-[#002b87]';
    }
    return 'from-[#667eea] to-[#764ba2]';
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#0033A0] transition-all duration-200 cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
      {/* Visual Card */}
      <div className={cn(
        "w-full h-48 rounded-lg p-6 text-white bg-gradient-to-br relative shadow-sm mb-4",
        getCardGradient(card.type)
      )}>
        <div className="flex justify-between items-start mb-8">
          <span className="text-[10px] uppercase tracking-wider opacity-80 font-medium">
            {card.entityName}
          </span>
          <span className={cn(
            "text-[10px] px-2 py-1 rounded border uppercase font-medium tracking-wide bg-white/90 backdrop-blur-sm",
            getStatusStyles(card.status).replace('bg-', 'text-').split(' ')[1] // Hack to get color for text, keep bg white for contrast inside colored card? No, spec says specific colors.
            // Wait, spec for status pill inside card visual says: 
            // Active: Green-50 bg, Green-700 text... 
            // But inside a dark gradient card? 
            // Let's follow the spec literally.
          )}>
           {/* Actually, inside the colorful card, these light backgrounds might look odd. 
               But the spec says: "Right: Status pill... Active: Green-50 bg..."
               Let's stick to spec. 
           */}
           <span className={cn(
             "px-2 py-1 rounded border text-[10px] font-medium inline-block",
             getStatusStyles(card.status)
           )}>
             {card.status}
           </span>
          </span>
        </div>

        <div className="mt-auto space-y-6">
           <div className="space-y-1">
              <p className="text-[11px] opacity-80 uppercase tracking-wide">{card.type} Card</p>
              <p className="text-xl font-mono tracking-wider">•••• •••• •••• {card.last4}</p>
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

      {/* Quick Actions */}
      <div className="mt-auto pt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button 
          variant="outline" 
          className="flex-1 border-[#0033A0] text-[#0033A0] hover:bg-blue-50 h-[34px] text-[13px] font-medium rounded-lg bg-white"
        >
          {card.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
        </Button>
        <Button 
          variant="outline"
          size="icon"
          className="w-[34px] h-[34px] border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg bg-white"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline"
          size="icon"
          className="w-[34px] h-[34px] border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg bg-white"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}