import { NavigationItems } from './NavigationItems';
import { AccountSelector } from './AccountSelector';

interface NavigationSidebarProps {
  activeSection?: 'home' | 'accounts' | 'transactions' | 'payments' | 'cards' | 'documents' | 'lending' | 'dashboard' | 'propositions' | 'support' | 'admin' | 'navigation-menu';
  onNavigate: (section: string) => void;
  businessData: any;
  onSectionChange?: (section: string) => void;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function NavigationSidebar({ 
  activeSection = 'home', 
  onNavigate, 
  businessData, 
  onSectionChange,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange = () => {}
}: NavigationSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-border fixed h-screen z-50">
      {/* Logo */}
      <div className="py-[26px] px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">M</span>
          </div>
          <span className="text-lg" style={{ color: '#001A72' }}>Metro Bank</span>
        </div>
      </div>

      {/* Navigation Items */}
      <NavigationItems 
        activeSection={activeSection} 
        onNavigate={onNavigate} 
        onSectionChange={onSectionChange} 
      />

      {/* Account Selector at Bottom */}
      <div className="p-4 border-t border-border">
        <AccountSelector 
          selectedAccounts={selectedAccounts}
          onSelectionChange={onAccountSelectionChange}
        />
      </div>
    </aside>
  );
}