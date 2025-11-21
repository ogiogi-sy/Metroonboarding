import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Building2, 
  CheckCircle2, 
  Users, 
  Mail, 
  Phone, 
  Lock, 
  Hash, 
  FileText, 
  IdCard, 
  ClipboardCheck, 
  PartyPopper,
  Home,
  CreditCard,
  Banknote,
  LayoutDashboard,
  Play,
  Map,
  Search,
  Smartphone,
  Shield,
  FileCheck
} from 'lucide-react';

interface NavigationMenuScreenProps {
  onNavigate: (step: number, phase: 1 | 2, phase2Flow?: string, phase2Step?: number) => void;
}

export function NavigationMenuScreen({ onNavigate }: NavigationMenuScreenProps) {
  const phase1Screens = [
    { step: 1, name: 'Business Lookup', icon: Search, description: 'Search Companies House or enter manually', stepNum: 1 },
    { step: 2, name: 'Business Confirmation', icon: Building2, description: 'Confirm business details', stepNum: 2 },
    { step: 3, name: 'People & Roles', icon: Users, description: 'Add directors and PSCs', stepNum: 3 },
    { step: 4, name: 'Email Entry/OTP', icon: Mail, description: 'Email verification', stepNum: 4 },
    { step: 5, name: 'Email OTP', icon: Mail, description: 'Verify email code', stepNum: 5 },
    { step: 6, name: 'Phone Entry', icon: Phone, description: 'Enter phone number', stepNum: 6 },
    { step: 7, name: 'Phone OTP', icon: Smartphone, description: 'Verify phone code', stepNum: 7 },
    { step: 8, name: 'Create Password', icon: Lock, description: 'Set account password', stepNum: 8 },
    { step: 9, name: 'Create Passcode', icon: Hash, description: 'Set 6-digit PIN', stepNum: 9 },
    { step: 10, name: 'Business Profiling', icon: FileText, description: 'Turnover, employees, etc.', stepNum: 10 },
    { step: 11, name: 'ID Verification', icon: IdCard, description: 'Verify identity', stepNum: 11 },
    { step: 12, name: 'Review & Submit', icon: FileCheck, description: 'Review application', stepNum: 12 },
    { step: 13, name: 'Celebration', icon: PartyPopper, description: 'Account created!', stepNum: 13 },
  ];

  const phase2Screens = [
    { flow: 'home', step: 1, name: 'Phase 2 Home', icon: Home, description: 'Choose banking services' },
    { flow: 'plan', step: 1, name: 'Recommended Plan', icon: CreditCard, description: 'AI-recommended plan' },
    { flow: 'plan', step: 2, name: 'Plan Comparison', icon: CreditCard, description: 'Compare all plans' },
    { flow: 'plan', step: 3, name: 'Toolkit Addons', icon: CreditCard, description: 'Select addons' },
    { flow: 'plan', step: 4, name: 'Plan Confirmation', icon: CreditCard, description: 'Confirm selection' },
    { flow: 'funding', step: 1, name: 'Lending Journey', icon: Banknote, description: 'Complete lending flow' },
    { flow: 'dashboard', step: 1, name: 'Business Dashboard', icon: LayoutDashboard, description: 'Main banking dashboard' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Header Section */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="hidden sm:block">
              <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center shrink-0">
                <Map className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Title */}
            <div className="flex-1">
              <h1 className="mb-2">Navigate to any screen:</h1>
              <p className="text-muted-foreground mb-6">
                Developer tool to jump directly to any step in the onboarding flow.
              </p>
              
              <Button
                size="lg"
                onClick={() => onNavigate(1, 1)}
                className="gap-2"
              >
                <Play className="w-5 h-5" />
                Start Normal Flow from Beginning
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Phase 1 Screens */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="mb-2">Phase 1: Open Business Current Account</h2>
            <p className="text-sm text-muted-foreground">Fast account opening - approximately 10 minutes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {phase1Screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <Card
                  key={screen.step}
                  className="hover:shadow-md hover:border-accent/50 transition-all cursor-pointer group bg-white"
                  onClick={() => onNavigate(screen.step, 1)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#E8EEF5] group-hover:bg-accent/10 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Step {screen.stepNum}/13
                    </div>
                    <CardTitle className="text-base leading-tight">
                      {screen.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {screen.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Phase 2 Screens */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="mb-2">Phase 2: Deepen Banking Relationship</h2>
            <p className="text-sm text-muted-foreground">Optional services and features</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {phase2Screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <Card
                  key={`${screen.flow}-${screen.step}`}
                  className="hover:shadow-md hover:border-accent/50 transition-all cursor-pointer group bg-white"
                  onClick={() => onNavigate(1, 2, screen.flow, screen.step)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#FFE8EC] group-hover:bg-accent/10 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1 capitalize">
                      Phase 2 • {screen.flow}
                    </div>
                    <CardTitle className="text-base leading-tight">
                      {screen.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {screen.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-foreground">Keyboard Shortcut:</strong> Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd/Ctrl + Shift + R</kbd> to restart from any screen
          </p>
        </div>
      </main>
    </div>
  );
}
