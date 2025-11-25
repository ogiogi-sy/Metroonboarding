import { NavigationSidebar } from '../NavigationSidebar';
import { MobileNav } from '../MobileNav';
import { BarChart3 } from 'lucide-react';

interface InsightsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function InsightsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: InsightsScreenProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NavigationSidebar 
        activeSection="dashboard"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="mb-8 flex items-start gap-4">
            <MobileNav 
              activeSection="dashboard" 
              onNavigate={onNavigate}
              businessData={businessData}
              selectedAccounts={selectedAccounts}
              onAccountSelectionChange={onAccountSelectionChange}
            />
            <div>
              <h1 className="mb-2">Insights</h1>
              <p className="text-muted-foreground">
                Business insights and analytics
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2">Insights Coming Soon</h2>
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
