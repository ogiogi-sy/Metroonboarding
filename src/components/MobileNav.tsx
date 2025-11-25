import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { NavigationItems } from './NavigationItems';
import { AccountSelector } from './AccountSelector';
import { useState } from 'react';

interface MobileNavProps {
  activeSection?: 'home' | 'accounts' | 'transactions' | 'payments' | 'cards' | 'documents' | 'lending' | 'dashboard' | 'propositions' | 'support' | 'admin' | 'navigation-menu';
  onNavigate: (section: string) => void;
  businessData: any;
  onSectionChange?: (section: string) => void;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

export function MobileNav({ 
  activeSection = 'home', 
  onNavigate, 
  businessData, 
  onSectionChange,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange = () => {}
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col bg-white">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Mobile navigation menu for accessing different sections of the application.
        </SheetDescription>
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
        <div className="flex-1 overflow-y-auto p-4">
          <NavigationItems 
            activeSection={activeSection} 
            onNavigate={(section) => {
              onNavigate(section);
              setOpen(false);
            }} 
            onSectionChange={onSectionChange}
            mobile={true}
            onItemClick={() => setOpen(false)}
          />
        </div>

        {/* Account Selector at Bottom */}
        <div className="p-4 border-t border-border mt-auto">
          <AccountSelector 
            selectedAccounts={selectedAccounts}
            onSelectionChange={onAccountSelectionChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}