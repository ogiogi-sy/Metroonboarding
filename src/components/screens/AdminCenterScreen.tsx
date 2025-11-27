import { ArrowRight, ArrowLeftRight, Users, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { BankSwitchFlow } from '../bank-switch/BankSwitchFlow';
import { TeamDirectorsScreen } from './TeamDirectorsScreen';
import { TeamAddSelectorScreen } from './TeamAddSelectorScreen';
import { AddDirectorScreen } from './AddDirectorScreen';
import { AddTeamMemberScreen } from './AddTeamMemberScreen';
import { DirectorDetailScreen } from './DirectorDetailScreen';
import { TeamMemberDetailScreen } from './TeamMemberDetailScreen';
import { MandatesEditorScreen } from './MandatesEditorScreen';
import { SignaturesRepositoryScreen } from './SignaturesRepositoryScreen';
import { CloseAccountScreen } from './CloseAccountScreen';

interface AdminCenterScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

type AdminSubScreen = 
  | 'main'
  | 'team-directors' 
  | 'team-add-selector' 
  | 'add-director' 
  | 'add-team-member' 
  | 'director-detail' 
  | 'team-member-detail' 
  | 'mandates-editor' 
  | 'signatures-repository'
  | 'bank-switch'
  | 'close-account';

export function AdminCenterScreen({ onNavigate, businessData }: AdminCenterScreenProps) {
  const [subScreen, setSubScreen] = useState<AdminSubScreen>('main');

  if (subScreen === 'close-account') {
    return (
      <CloseAccountScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            onNavigate(screen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'bank-switch') {
    return (
      <BankSwitchFlow
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            onNavigate(screen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'team-directors') {
    return (
      <TeamDirectorsScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'team-add-selector') {
    return (
      <TeamAddSelectorScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'add-director') {
    return (
      <AddDirectorScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'add-team-member') {
    return (
      <AddTeamMemberScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'director-detail') {
    return (
      <DirectorDetailScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'team-member-detail') {
    return (
      <TeamMemberDetailScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'mandates-editor') {
    return (
      <MandatesEditorScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  if (subScreen === 'signatures-repository') {
    return (
      <SignaturesRepositoryScreen
        onNavigate={(screen: string) => {
          if (screen === 'admin') {
            setSubScreen('main');
          } else {
            setSubScreen(screen as AdminSubScreen);
          }
        }}
        businessData={businessData}
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="mb-2" style={{ color: '#001A72' }}>Admin Center</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and administrative tasks
        </p>
      </div>

      {/* Admin Options List */}
      <div className="space-y-3">
        {/* Team & Directors */}
        <button 
          onClick={() => setSubScreen('team-directors')}
          className="w-full bg-white border border-border rounded-xl p-6 text-left hover:border-accent transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-base mb-1" style={{ color: '#001A72' }}>Team, Directors & Mandates</h3>
                <p className="text-sm text-muted-foreground">
                  Manage roles, verification, signatures, and approval rules
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </div>
        </button>

        {/* Switch from another bank */}
        <button 
          onClick={() => setSubScreen('bank-switch')}
          className="w-full bg-white border border-border rounded-xl p-6 text-left hover:border-accent transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowLeftRight className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-base mb-1" style={{ color: '#001A72' }}>Switch from another bank</h3>
                <p className="text-sm text-muted-foreground">
                  Transfer your banking to Metro quickly and securely
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </div>

      {/* Future items placeholder */}
      <div className="mt-6 text-center py-8">
        <p className="text-sm text-muted-foreground">
          More administrative options coming soon
        </p>
      </div>

      {/* Danger Zone / Close Account */}
      <div className="mt-12 pt-8 border-t border-border">
        <button 
          onClick={() => setSubScreen('close-account')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
        >
          <AlertCircle className="w-4 h-4" />
          Close my account or switch to another provider
        </button>
      </div>
    </div>
  );
}