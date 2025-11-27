import React from 'react';
import { CardTile, CardData } from './CardTile';

interface CardGridProps {
  onCardClick: (cardId: string) => void;
  onFreezeToggle?: (card: CardData) => void;
  cards?: CardData[];
}

// Mock Data moved to parent or kept as default if no props provided
const DEFAULT_CARDS: CardData[] = [
  {
    id: '1',
    entityName: 'Metro Bank UK Ltd',
    status: 'active',
    type: 'physical',
    last4: '3821',
    cardholderName: 'Sarah Johnson',
    expiryDate: '09/26',
    brand: 'visa'
  },
  // ... other cards
];

export function CardGrid({ onCardClick, cards, onFreezeToggle }: CardGridProps) {
  const displayCards = cards || DEFAULT_CARDS;
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayCards.map((card) => (
          <CardTile 
            key={card.id} 
            card={card} 
            onClick={() => onCardClick(card.id)} 
            onFreezeToggle={onFreezeToggle}
          />
        ))}
      </div>
    </div>
  );
}
