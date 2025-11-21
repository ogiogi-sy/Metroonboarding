import { NavigationSidebar } from '../NavigationSidebar';
import { CreditCard } from 'lucide-react';

interface CardsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
}

export function CardsScreen({ onNavigate, businessData }: CardsScreenProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NavigationSidebar 
        activeSection="cards"
        onNavigate={onNavigate}
        businessData={businessData}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="mb-2">Cards</h1>
            <p className="text-muted-foreground">
              Manage your business cards
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2">Cards Coming Soon</h2>
              <p className="text-muted-foreground">
                This section is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
