import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface CardsHeaderProps {
  onCreateCard: () => void;
  userRole?: 'admin' | 'employee';
}

export function CardsHeader({ onCreateCard, userRole = 'admin' }: CardsHeaderProps) {
  return (
    <div className="pt-8 pb-2 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Cards</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your business debit and credit cards
          </p>
        </div>
        {userRole === 'admin' && (
          <Button 
            variant="secondary"
            size="sm"
            onClick={onCreateCard}
          >
            <Plus className="w-4 h-4" />
            <span>Add cardholder</span>
          </Button>
        )}
      </div>
    </div>
  );
}