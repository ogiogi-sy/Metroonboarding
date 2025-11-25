import React, { useState } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { MobileNav } from '../MobileNav';
import { CardsHeader } from '../cards/CardsHeader';
import { FraudAlertBanner } from '../cards/FraudAlertBanner';
import { FiltersBar } from '../cards/FiltersBar';
import { CardGrid } from '../cards/CardGrid';
import { CardDetailScreen } from '../cards/CardDetailScreen';
import { Button } from '../ui/button';
import { CardData } from '../cards/CardTile';

// Mock Data
const MOCK_CARDS: CardData[] = [
  {
    id: '1',
    accountId: '1',
    entityName: 'Metro Bank UK Ltd',
    status: 'active',
    type: 'physical',
    last4: '3821',
    cardholderName: 'Sarah Johnson',
    expiryDate: '09/26',
    brand: 'visa'
  },
  {
    id: '2',
    accountId: '1',
    entityName: 'Metro Bank UK Ltd',
    status: 'frozen',
    type: 'physical',
    last4: '4592',
    cardholderName: 'James Smith',
    expiryDate: '12/25',
    brand: 'mastercard'
  },
  {
    id: '3',
    accountId: '3',
    entityName: 'Marketing Budget',
    status: 'active',
    type: 'virtual',
    last4: '8821',
    cardholderName: 'Marketing Team',
    expiryDate: '03/25',
    brand: 'visa'
  },
  {
    id: '4',
    accountId: '3',
    entityName: 'Travel Expenses',
    status: 'active',
    type: 'virtual',
    last4: '1029',
    cardholderName: 'Sales Dept',
    expiryDate: '11/24',
    brand: 'visa'
  },
  {
    id: '5',
    accountId: '4',
    entityName: 'Metro Bank EU',
    status: 'blocked',
    type: 'physical',
    last4: '9932',
    cardholderName: 'Alex Chen',
    expiryDate: '01/24',
    brand: 'mastercard'
  }
];

interface CardsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

type ViewState = 'list' | 'detail';

export function CardsScreen({ 
  onNavigate, 
  businessData, 
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange 
}: CardsScreenProps) {
  const [view, setView] = useState<ViewState>('list');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showFraudAlert, setShowFraudAlert] = useState(true);

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedCardId(null);
  };

  const handleCreateCard = () => {
    // TODO: Implement create card modal
    console.log('Create card clicked');
  };

  const handleAccountSelectionChange = (accountIds: string[]) => {
    if (onAccountSelectionChange) {
      onAccountSelectionChange(accountIds);
    }
  };

  const filteredCards = MOCK_CARDS.filter(card => 
    !card.accountId || selectedAccounts.includes(card.accountId)
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <NavigationSidebar 
        activeSection="cards"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={handleAccountSelectionChange}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <MobileNav 
          activeSection="cards" 
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={handleAccountSelectionChange}
        />

        {view === 'list' ? (
          <div className="flex flex-col">
            {showFraudAlert && (
              <FraudAlertBanner onReview={() => console.log('Review fraud alert')} />
            )}
            
            <CardsHeader onCreateCard={handleCreateCard} />
            
            <FiltersBar />
            
            <main className="flex-1">
              <CardGrid onCardClick={handleCardClick} cards={filteredCards} />
            </main>
          </div>
        ) : (
          <CardDetailScreen 
            cardId={selectedCardId!} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
}