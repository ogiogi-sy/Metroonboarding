import { NavigationSidebar } from '../NavigationSidebar';
import { MobileNav } from '../MobileNav';
import { Documents } from '../Documents';

interface DocumentsScreenProps {
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function DocumentsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: DocumentsScreenProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <NavigationSidebar 
        activeSection="documents"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Mobile Nav */}
              <div className="flex items-center gap-4">
                <MobileNav 
                  activeSection="documents" 
                  onNavigate={onNavigate}
                  businessData={businessData}
                  selectedAccounts={selectedAccounts}
                  onAccountSelectionChange={onAccountSelectionChange}
                />
              </div>

              {/* Right: User Actions */}
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors relative">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                </button>
                <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <span className="text-sm">
                    {businessData.companyName ? businessData.companyName.charAt(0) : 'B'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Documents Component */}
        <Documents />
      </main>
    </div>
  );
}
