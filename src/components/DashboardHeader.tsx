import { MobileNav } from './MobileNav';
import { NotificationsPopover } from './NotificationsPopover';
import { UserRole } from './cards/CardPermissionsContext';
import { ProfileDropdown } from './ProfileDropdown';

interface DashboardHeaderProps {
  activeSection: string;
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
  userRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export function DashboardHeader({
  activeSection,
  onNavigate,
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange,
  userRole = 'admin',
  onRoleChange
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Nav */}
          <div className="flex items-center gap-4">
            <MobileNav 
              activeSection={activeSection}
              onNavigate={onNavigate}
              businessData={businessData}
              selectedAccounts={selectedAccounts}
              onAccountSelectionChange={onAccountSelectionChange}
            />
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <NotificationsPopover onNavigate={onNavigate} userRole={userRole} />
            <ProfileDropdown 
              businessData={businessData}
              userRole={userRole}
              onRoleChange={onRoleChange || (() => {})}
            />
          </div>
        </div>
      </div>
    </header>
  );
}