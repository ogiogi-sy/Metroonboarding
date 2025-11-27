import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';

interface PaymentsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function PaymentsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: PaymentsScreenProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NavigationSidebar 
        activeSection="payments"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="payments"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />

        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <div>
              <h1 className="mb-2">Payments</h1>
              <p className="text-muted-foreground">
                Send and receive payments
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="mb-2">Payments Coming Soon</h2>
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
