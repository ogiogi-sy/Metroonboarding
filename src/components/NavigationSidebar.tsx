import { CreditCard, TrendingUp, BarChart3 } from 'lucide-react';

interface NavigationSidebarProps {
  activeSection?: 'home' | 'accounts' | 'payments' | 'cards' | 'lending' | 'dashboard' | 'propositions' | 'support' | 'admin';
  onNavigate: (section: string) => void;
  businessData: any;
  onSectionChange?: (section: string) => void;
}

export function NavigationSidebar({ activeSection = 'home', onNavigate, businessData, onSectionChange }: NavigationSidebarProps) {
  const handleNavigation = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    onNavigate(section);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-border fixed h-screen">
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
      <nav className="flex-1 p-4 space-y-1">
        <button 
          onClick={() => handleNavigation('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'home' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-sm">Home</span>
        </button>
        
        <button 
          onClick={() => handleNavigation('accounts')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'accounts' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-sm">Accounts</span>
        </button>

        <button 
          onClick={() => handleNavigation('payments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'payments' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="text-sm">Payments</span>
        </button>

        <button 
          onClick={() => handleNavigation('cards')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'cards' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-sm">Cards</span>
        </button>

        <button 
          onClick={() => handleNavigation('lending')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'lending' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">Lending</span>
        </button>

        <button 
          onClick={() => handleNavigation('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'dashboard' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm">Insights</span>
        </button>

        <button 
          onClick={() => handleNavigation('propositions')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'propositions' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-sm">Propositions</span>
        </button>

        <button 
          onClick={() => handleNavigation('support')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'support' 
              ? 'bg-accent/10 text-accent' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-sm">Support</span>
        </button>

        <button 
          onClick={() => handleNavigation('admin')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'admin' 
              ? 'bg-muted-foreground/10 text-muted-foreground' 
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">Admin Center</span>
        </button>
      </nav>

      {/* Account Info at Bottom */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/30">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">
              {businessData?.companyName ? businessData.companyName.charAt(0) : 'B'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate" style={{ color: '#001A72' }}>
              {businessData?.companyName || 'Your Business'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {businessData?.accountNumber || '12345678'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}