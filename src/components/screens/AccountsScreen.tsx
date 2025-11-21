import { NavigationSidebar } from '../NavigationSidebar';

interface AccountsScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
}

export function AccountsScreen({ onNavigate, businessData }: AccountsScreenProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NavigationSidebar 
        activeSection="accounts"
        onNavigate={onNavigate}
        businessData={businessData}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="mb-2">Accounts</h1>
            <p className="text-muted-foreground">
              Manage your business accounts
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="mb-2">Accounts Coming Soon</h2>
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
