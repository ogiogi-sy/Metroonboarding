import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface CardsHeaderProps {
  onCreateCard: () => void;
}

export function CardsHeader({ onCreateCard }: CardsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-tight font-normal text-gray-900">Cards</h1>
          <p className="text-[15px] text-gray-600 mt-1">
            Manage all your business debit and credit cards
          </p>
        </div>
        <Button 
          onClick={onCreateCard}
          className="bg-[#0033A0] hover:bg-[#002b87] text-white flex items-center gap-2 px-4 py-3 h-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create Virtual Card</span>
        </Button>
      </div>
    </div>
  );
}
