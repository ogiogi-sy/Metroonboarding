import { useState } from 'react';
import { TeamDirectorsScreen } from './TeamDirectorsScreen';
import { TeamAddSelectorScreen } from './TeamAddSelectorScreen';
import { AddDirectorScreen } from './AddDirectorScreen';
import { AddTeamMemberScreen } from './AddTeamMemberScreen';
import { DirectorDetailScreen } from './DirectorDetailScreen';
import { TeamMemberDetailScreen } from './TeamMemberDetailScreen';
import { MandatesEditorScreen } from './MandatesEditorScreen';
import { SignaturesRepositoryScreen } from './SignaturesRepositoryScreen';
import { NavigationSidebar } from '../NavigationSidebar';

interface TeamDirectorsFlowScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
}

type TeamDirectorsSubScreen = 
  | 'team-directors' 
  | 'team-add-selector' 
  | 'add-director' 
  | 'add-team-member' 
  | 'director-detail' 
  | 'team-member-detail' 
  | 'mandates-editor' 
  | 'signatures-repository';

export function TeamDirectorsFlowScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange
}: TeamDirectorsFlowScreenProps) {
  const [subScreen, setSubScreen] = useState<TeamDirectorsSubScreen>('team-directors');

  const handleSubNavigation = (screen: string) => {
    // Check if navigating back to admin or other main sections
    if (screen === 'admin' || screen === 'home' || screen === 'dashboard' || screen === 'propositions') {
      onNavigate(screen);
    } else {
      // Internal navigation within Team & Directors
      setSubScreen(screen as TeamDirectorsSubScreen);
    }
  };

  const renderContent = () => {
    switch (subScreen) {
      case 'team-directors':
        return <TeamDirectorsScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'team-add-selector':
        return <TeamAddSelectorScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'add-director':
        return <AddDirectorScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'add-team-member':
        return <AddTeamMemberScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'director-detail':
        return <DirectorDetailScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'team-member-detail':
        return <TeamMemberDetailScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'mandates-editor':
        return <MandatesEditorScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      case 'signatures-repository':
        return <SignaturesRepositoryScreen onNavigate={handleSubNavigation} businessData={businessData} />;
      default:
        return <TeamDirectorsScreen onNavigate={handleSubNavigation} businessData={businessData} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Left Sidebar Navigation */}
      <NavigationSidebar 
        activeSection="admin"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
