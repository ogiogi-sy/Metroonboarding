import { useState } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';
import { Support, SupportSection } from '../Support';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface SupportScreenProps {
  onNavigate: (section: string) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
  initialSection?: string;
}

export function SupportScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange,
  initialSection
}: SupportScreenProps) {
  const [activeSection, setActiveSection] = useState<SupportSection>((initialSection as SupportSection) || 'home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section as SupportSection);
  };

  const getHeaderContent = () => {
    switch (activeSection) {
      case 'chat':
        return {
          title: 'Chat Support',
          subtitle: 'Get instant help from AI or speak to a colleague',
          showBack: true
        };
      case 'requests':
        return {
          title: 'Service Requests',
          subtitle: 'Track and manage your support tickets',
          showBack: true
        };
      case 'complaints':
        return {
          title: 'Complaints',
          subtitle: 'Submit and track complaints',
          showBack: true
        };
      case 'fraud':
        return {
          title: 'Fraud & Security',
          subtitle: 'Monitor suspicious activities and manage fraud alerts',
          showBack: true
        };
      case 'appointments':
        return {
          title: 'Appointments',
          subtitle: 'Book and manage your appointments with our specialists',
          showBack: true
        };
      default:
        return {
          title: 'Support Center',
          subtitle: 'Get help when you need it — track requests, resolve issues, and connect with specialists',
          showBack: false
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <NavigationSidebar 
        activeSection="support"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      <main className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="support"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
        />

        {/* Page Header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="flex items-center gap-4">
              {headerContent.showBack && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveSection('home')}
                  className="hover:bg-muted/50 -ml-2 hidden md:flex"
                >
                  <ArrowLeft className="h-5 w-5 text-[#001A72]" />
                </Button>
              )}

              <div>
                <h1 className="text-2xl font-semibold" style={{ color: '#001A72' }}>{headerContent.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {headerContent.subtitle}
                </p>
              </div>
            </div>
          </div>

        {/* Support Component */}
        <Support activeSection={activeSection} onNavigate={handleSectionChange} />
      </main>
    </div>
  );
}