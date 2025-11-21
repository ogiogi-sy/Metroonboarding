import { NavigationSidebar } from '../NavigationSidebar';

interface SupportScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
}

export function SupportScreen({ onNavigate, businessData }: SupportScreenProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NavigationSidebar 
        activeSection="support"
        onNavigate={onNavigate}
        businessData={businessData}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="mb-2">Support</h1>
            <p className="text-muted-foreground">
              Get help and support
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="mb-2">Support Coming Soon</h2>
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
