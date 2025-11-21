import { useState, useEffect } from 'react';
import { NavigationMenuScreen } from './components/screens/NavigationMenuScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { ContactDetailsScreen } from './components/screens/ContactDetailsScreen';
import { EmailEntryScreen } from './components/screens/EmailEntryScreen';
import { EmailOTPScreen } from './components/screens/EmailOTPScreen';
import { PhoneNumberEntryScreen } from './components/screens/PhoneNumberEntryScreen';
import { PhoneOTPScreen } from './components/screens/PhoneOTPScreen';
import { BusinessLookupScreen } from './components/screens/BusinessLookupScreen';
import { BusinessConfirmationScreen } from './components/screens/BusinessConfirmationScreen';
import { BusinessDetailsReviewScreen } from './components/screens/BusinessDetailsReviewScreen';
import { BaseProductScreen } from './components/screens/BaseProductScreen';
import { BusinessProfilingScreen } from './components/screens/BusinessProfilingScreen';
import { PeopleRolesScreen } from './components/screens/PeopleRolesScreen';
import { CreatePasswordScreen } from './components/screens/CreatePasswordScreen';
import { CreatePasscodeScreen } from './components/screens/CreatePasscodeScreen';
import { IDVerificationScreen } from './components/screens/IDVerificationScreen';
import { ReviewSubmitScreen } from './components/screens/ReviewSubmitScreen';
import { CelebrationScreen } from './components/screens/CelebrationScreen';

// Phase 2 imports
import { Round2HomeScreen } from './components/screens/Round2HomeScreen';
import { RecommendedPlanScreen } from './components/screens/RecommendedPlanScreen';
import { PlanComparisonScreen } from './components/screens/PlanComparisonScreen';
import { ToolkitAddonsScreen } from './components/screens/ToolkitAddonsScreen';
import { PlanConfirmationScreen } from './components/screens/PlanConfirmationScreen';
import { LendingOverviewScreen } from './components/screens/LendingOverviewScreen';
import { LendingFlowScreen } from './components/screens/LendingFlowScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { LendingFlow } from './components/lending/LendingFlow';
import { PropositionsScreen } from './components/screens/PropositionsScreen';
import { LendingManagementScreen } from './components/screens/LendingManagementScreen';
import { AccountsScreen } from './components/screens/AccountsScreen';
import { PaymentsScreen } from './components/screens/PaymentsScreen';
import { CardsScreen } from './components/screens/CardsScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';

const STORAGE_KEY = 'metro_onboarding_progress_v4';

interface Person {
  id: string;
  name: string;
  role: 'Director' | 'PSC' | 'KAP' | 'Contributor';
  email?: string;
  kycStatus?: 'pending' | 'completed' | 'not_required';
  isYou?: boolean;
}

interface OnboardingData {
  // Contact
  email?: string;
  phone?: string;
  
  // Business from Companies House
  companiesHouseNumber?: string;
  companyName?: string;
  legalName?: string;
  registeredAddress?: string;
  incorporationDate?: string;
  businessStatus?: string;
  businessType?: string;
  industry?: string;
  postcode?: string;
  tradingAddress?: string;
  
  // Business Profiling
  turnoverBand?: string;
  employeeCount?: string;
  handlesCash?: boolean;
  hasInternational?: boolean;
  
  // People
  people?: Person[];
  
  // Banking Credentials
  password?: string;
  passcode?: string;
  
  // ID Verification
  idVerified?: boolean;
  
  // Phase 2
  selectedPlan?: string;
  selectedAddons?: string[];
  
  // Account
  sortCode?: string;
  accountNumber?: string;
}

type Phase2Flow = 'home' | 'plan' | 'funding' | 'payments' | 'compliance' | 'dashboard' | 'propositions' | 'lending' | 'admin' | 'accounts' | 'cards' | 'support';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<1 | 2>(1);
  const [phase2Flow, setPhase2Flow] = useState<Phase2Flow>('home');
  const [phase2Step, setPhase2Step] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isManualEntry, setIsManualEntry] = useState(false);
  
  // Track Phase 2 category completion
  const [completedCategories, setCompletedCategories] = useState({
    plan: false,
    funding: false,
    payments: false,
    compliance: false,
  });

  // Load saved progress on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.currentStep && parsed.phase) {
          setOnboardingData(parsed.data || {});
          setCurrentStep(parsed.currentStep);
          setPhase(parsed.phase);
          setPhase2Flow(parsed.phase2Flow || 'home');
          setPhase2Step(parsed.phase2Step || 1);
          setCompletedCategories(parsed.completedCategories || {
            plan: false,
            funding: false,
            payments: false,
            compliance: false,
          });
        }
      }
    } catch (error) {
      console.error('Failed to restore progress:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  // Save progress whenever data or step changes
  useEffect(() => {
    if (!isLoading && currentStep >= 1) {
      try {
        const progressData = {
          currentStep,
          phase,
          phase2Flow,
          phase2Step,
          data: onboardingData,
          completedCategories,
          lastSaved: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  }, [currentStep, phase, phase2Flow, phase2Step, onboardingData, completedCategories, isLoading]);

  // Keyboard shortcut: Command/Ctrl + Shift + R to restart
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command (Mac) or Ctrl (Windows/Linux) + Shift + R
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        if (confirm('Are you sure you want to restart the application? All your progress will be lost.')) {
          handleRestart();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const goToPhase2 = () => {
    setPhase(2);
    setPhase2Flow('home');
    setPhase2Step(1);
  };

  const navigatePhase2 = (flow: Phase2Flow) => {
    setPhase2Flow(flow);
    setPhase2Step(1);
  };

  const nextPhase2Step = () => {
    setPhase2Step(prev => prev + 1);
  };

  const backToPhase2Home = () => {
    setPhase2Flow('home');
    setPhase2Step(1);
  };
  
  const handleRestart = () => {
    // Clear all data and restart
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingData({});
    setCurrentStep(1);
    setPhase(1);
    setPhase2Flow('home');
    setPhase2Step(1);
    setIsManualEntry(false);
    setCompletedCategories({
      plan: false,
      funding: false,
      payments: false,
      compliance: false,
    });
  };
  
  const markCategoryComplete = (category: 'plan' | 'funding' | 'payments' | 'compliance') => {
    setCompletedCategories(prev => ({
      ...prev,
      [category]: true,
    }));
  };
  
  const goToDashboard = () => {
    setPhase2Flow('dashboard');
    setPhase2Step(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // PHASE 1: Open Business Current Account Fast (~10 minutes)
  // New order: 
  // 1. Find your business (Companies House)
  // 2. Is this your business (Confirmation)
  // 3. Who's involved with this account (People)
  // 4. Email Entry OR Email OTP (depending on if "This is me" was selected)
  // 5. Email OTP (only if they didn't have email from "This is me")
  // 6. Phone Number Entry
  // 7. Phone OTP
  // 8. Create your password
  // 9. Create your passcode
  // 10. Tell us about your business (Business Profiling)
  // 11. Verify identity (ID Verification)
  // 12. Review your application
  // 13. Success (Celebration)
  const TOTAL_STEPS = 13;

  // Step 0: Navigation Menu (Developer Tool)
  if (currentStep === 0) {
    return (
      <NavigationMenuScreen
        onNavigate={(step, targetPhase, targetPhase2Flow, targetPhase2Step) => {
          setCurrentStep(step);
          setPhase(targetPhase);
          if (targetPhase === 2 && targetPhase2Flow) {
            setPhase2Flow(targetPhase2Flow as Phase2Flow);
            setPhase2Step(targetPhase2Step || 1);
          }
        }}
      />
    );
  }

  if (phase === 1) {
    // Step 1: Find your business (Business Lookup)
    if (currentStep === 1) {
      return (
        <BusinessLookupScreen
          onNext={(data) => {
            updateData(data);
            setIsManualEntry(false);
            nextStep();
          }}
          onManual={() => {
            setIsManualEntry(true);
            nextStep(); // Go to step 2, but in manual mode
          }}
          currentStep={1}
          totalSteps={TOTAL_STEPS}
          onRestart={handleRestart}
        />
      );
    }
    
    // Step 2: Is this your business? (Business Confirmation) OR Manual Entry
    if (currentStep === 2) {
      // If manual entry mode, show the manual form instead
      if (isManualEntry) {
        return (
          <BusinessDetailsReviewScreen
            onNext={(data) => {
              updateData(data);
              setIsManualEntry(false);
              setCurrentStep(3); // Go to People (step 3)
            }}
            onBack={prevStep}
            currentStep={2}
            totalSteps={TOTAL_STEPS}
            initialData={onboardingData}
          />
        );
      }
      
      // Normal flow - confirmation screen
      return (
        <BusinessConfirmationScreen
          businessData={onboardingData}
          onConfirm={() => nextStep()}
          onEdit={() => {
            setIsManualEntry(true);
            // Stay on step 2 but switch to manual entry mode
          }}
          onBack={prevStep}
          onSearchAgain={() => setCurrentStep(1)}
          currentStep={2}
          totalSteps={TOTAL_STEPS}
        />
      );
    }
    
    // Step 3: Who's involved with this account (People & Roles)
    if (currentStep === 3) {
      return (
        <PeopleRolesScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={3}
          totalSteps={TOTAL_STEPS}
          initialData={onboardingData}
        />
      );
    }
    
    // Step 4: Email Entry OR Email OTP (depending on if "This is me" was selected)
    if (currentStep === 4) {
      // Find if user selected "This is me" in PeopleRolesScreen
      const youPerson = onboardingData.people?.find(p => p.isYou);
      const hasEmailFromYou = youPerson?.email;
      
      if (hasEmailFromYou) {
        // User already provided email in "This is me" - go straight to OTP
        // Store this email in onboardingData if not already there
        if (!onboardingData.email) {
          updateData({ email: hasEmailFromYou });
        }
        
        return (
          <EmailOTPScreen
            onNext={() => nextStep()}
            onBack={prevStep}
            currentStep={4}
            totalSteps={TOTAL_STEPS}
            email={hasEmailFromYou}
          />
        );
      } else {
        // No "This is me" selected - ask for email first
        return (
          <EmailEntryScreen
            onNext={(data) => {
              updateData(data);
              nextStep();
            }}
            onBack={prevStep}
            currentStep={4}
            totalSteps={TOTAL_STEPS}
            initialData={onboardingData}
          />
        );
      }
    }
    
    // Step 5: Email OTP (only if they didn't have email from "This is me")
    if (currentStep === 5) {
      const youPerson = onboardingData.people?.find(p => p.isYou);
      const hasEmailFromYou = youPerson?.email;
      
      if (hasEmailFromYou) {
        // Skip this step - already verified in step 4
        // Go directly to phone entry
        return (
          <PhoneNumberEntryScreen
            onNext={(data) => {
              updateData(data);
              nextStep();
            }}
            onBack={prevStep}
            currentStep={5}
            totalSteps={TOTAL_STEPS}
            initialData={onboardingData}
          />
        );
      } else {
        // Show email OTP for manually entered email
        return (
          <EmailOTPScreen
            onNext={() => nextStep()}
            onBack={prevStep}
            currentStep={5}
            totalSteps={TOTAL_STEPS}
            email={onboardingData.email || ''}
          />
        );
      }
    }
    
    // Step 6: Phone Number Entry
    if (currentStep === 6) {
      return (
        <PhoneNumberEntryScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={6}
          totalSteps={TOTAL_STEPS}
          initialData={onboardingData}
        />
      );
    }
    
    // Step 7: Phone OTP
    if (currentStep === 7) {
      return (
        <PhoneOTPScreen
          onNext={() => nextStep()}
          onBack={prevStep}
          currentStep={7}
          totalSteps={TOTAL_STEPS}
          phone={onboardingData.phone || ''}
        />
      );
    }
    
    // Step 8: Create your password
    if (currentStep === 8) {
      return (
        <CreatePasswordScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={8}
          totalSteps={TOTAL_STEPS}
          initialEmail={onboardingData.email}
        />
      );
    }
    
    // Step 9: Create your passcode
    if (currentStep === 9) {
      return (
        <CreatePasscodeScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={9}
          totalSteps={TOTAL_STEPS}
        />
      );
    }
    
    // Step 10: Tell us about your business (Business Profiling)
    if (currentStep === 10) {
      return (
        <BusinessProfilingScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={10}
          totalSteps={TOTAL_STEPS}
          initialData={onboardingData}
        />
      );
    }
    
    // Step 11: Verify identity (ID Verification)
    if (currentStep === 11) {
      return (
        <IDVerificationScreen
          onNext={(data) => {
            updateData(data);
            nextStep();
          }}
          onBack={prevStep}
          currentStep={11}
          totalSteps={TOTAL_STEPS}
        />
      );
    }
    
    // Step 12: Review your application
    if (currentStep === 12) {
      return (
        <ReviewSubmitScreen
          data={onboardingData}
          onSubmit={() => {
            updateData({
              sortCode: '04-00-75',
              accountNumber: '12345678',
            });
            nextStep();
          }}
          onEdit={(step) => setCurrentStep(step)}
          currentStep={12}
          totalSteps={TOTAL_STEPS}
        />
      );
    }
    
    // Step 13: Success (Celebration)
    if (currentStep === 13) {
      return (
        <CelebrationScreen
          sortCode={onboardingData.sortCode || '04-00-75'}
          accountNumber={onboardingData.accountNumber || '12345678'}
          companyName={onboardingData.companyName || 'Your Business'}
          onContinue={() => goToPhase2()}
        />
      );
    }
  }

  // PHASE 2: Deepen Banking Relationship
  
  // Home
  if (phase2Flow === 'home') {
    return (
      <Round2HomeScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Banking Plan Flow
  if (phase2Flow === 'plan') {
    if (phase2Step === 1) {
      return (
        <RecommendedPlanScreen
          onSelectPlan={() => {
            const recommendedPlan = onboardingData.turnoverBand === '5m+' ? 'Strategy' :
                                   onboardingData.turnoverBand === '1m-5m' ? 'Grow' :
                                   onboardingData.turnoverBand === '250k-1m' ? 'Build' : 'Start';
            updateData({ selectedPlan: recommendedPlan });
            nextPhase2Step();
          }}
          onComparePlans={() => setPhase2Step(2)}
          businessData={onboardingData}
        />
      );
    }

    if (phase2Step === 2) {
      return (
        <PlanComparisonScreen
          onSelectPlan={(plan) => {
            updateData({ selectedPlan: plan });
            setPhase2Step(3);
          }}
          onBack={() => setPhase2Step(1)}
          recommendedPlan={onboardingData.turnoverBand === '5m+' ? 'Strategy' :
                          onboardingData.turnoverBand === '1m-5m' ? 'Grow' :
                          onboardingData.turnoverBand === '250k-1m' ? 'Build' : 'Start'}
        />
      );
    }

    if (phase2Step === 3) {
      return (
        <ToolkitAddonsScreen
          onContinue={(addons) => {
            updateData({ selectedAddons: addons });
            nextPhase2Step();
          }}
          onBack={() => setPhase2Step(1)}
          businessData={onboardingData}
        />
      );
    }

    if (phase2Step === 4) {
      return (
        <PlanConfirmationScreen
          selectedPlan={onboardingData.selectedPlan || 'Start'}
          selectedAddons={onboardingData.selectedAddons || []}
          onContinue={() => {
            markCategoryComplete('plan');
            backToPhase2Home();
          }}
          onModify={() => setPhase2Step(1)}
        />
      );
    }
  }

  // Funding Flow
  if (phase2Flow === 'funding') {
    return (
      <Round2HomeScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
        activeSection="funding"
        onCompleteFunding={() => {
          markCategoryComplete('funding');
          goToDashboard();
        }}
      />
    );
  }

  // Payments
  if (phase2Flow === 'payments') {
    return (
      <PaymentsScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Dashboard
  if (phase2Flow === 'dashboard') {
    return (
      <InsightsScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Propositions
  if (phase2Flow === 'propositions') {
    return (
      <PropositionsScreen
        onNavigate={(screen: string) => {
          if (screen === 'dashboard') {
            goToDashboard();
          } else if (screen === 'home') {
            backToPhase2Home();
          } else {
            backToPhase2Home();
          }
        }}
        businessData={onboardingData}
      />
    );
  }

  // Lending - routes back to Dashboard (home) to show lending content
  if (phase2Flow === 'lending') {
    return (
      <Round2HomeScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
        activeSection="lending"
      />
    );
  }

  // Admin Center
  if (phase2Flow === 'admin') {
    return (
      <Round2HomeScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
        activeSection="admin"
      />
    );
  }

  // Accounts
  if (phase2Flow === 'accounts') {
    return (
      <AccountsScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Cards
  if (phase2Flow === 'cards') {
    return (
      <CardsScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Support
  if (phase2Flow === 'support') {
    return (
      <SupportScreen
        onNavigate={navigatePhase2}
        businessData={onboardingData}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4">Something went wrong</h2>
        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }}
          className="px-6 py-2 bg-primary text-white rounded-full"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}