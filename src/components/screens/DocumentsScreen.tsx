import { NavigationSidebar } from '../NavigationSidebar';
import { Documents } from '../Documents';
import { DashboardHeader } from '../DashboardHeader';

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
        <DashboardHeader 
          activeSection="documents"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />

        {/* Documents Component */}
        <Documents />
      </main>
    </div>
  );
}
