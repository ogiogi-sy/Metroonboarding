import { useState, useEffect } from 'react';
import { ScreenContainer } from '../ScreenContainer';
import { LendingOverviewScreen } from './LendingOverviewScreen';
import { LoanPurposeScreen } from './LoanPurposeScreen';
import { LoanAmountTermScreen } from './LoanAmountTermScreen';
import { ExistingBorrowingScreen, ExistingLoan } from './ExistingBorrowingScreen';
import { FinancialStabilityScreen } from './FinancialStabilityScreen';
import { FinancialQuestionsScreen, FinancialData } from './FinancialQuestionsScreen';
import { OpenBankingScreen } from './OpenBankingScreen';
import { DocumentUploadScreen, DocumentRequirement, UploadedDocument } from './DocumentUploadScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { OutcomeApprovedScreen } from './OutcomeApprovedScreen';
import { OutcomeConditionalScreen } from './OutcomeConditionalScreen';
import { OutcomeDeclinedScreen } from './OutcomeDeclinedScreen';

const LENDING_STORAGE_KEY = 'metro_lending_application_draft';

export interface LendingApplicationData {
  id: string;
  currentStep: LendingStep;
  purpose: string;
  isFacilityMatch: boolean;
  loanAmount: number;
  termMonths: number;
  existingLoans: ExistingLoan[];
  hasStabilityConcerns: boolean;
  financialData: FinancialData | null;
  connectedOpenBanking: boolean;
  uploadedDocuments: UploadedDocument[];
  outcomeType: OutcomeType;
  lastSaved: string;
  progress: number;
}

interface LendingFlowProps {
  onExit?: () => void;
  onComplete?: () => void;
  onNavigate?: (screen: string) => void;
  businessData?: any;
  resumeData?: LendingApplicationData;
}

type LendingStep =
  | 'overview'
  | 'purpose'
  | 'amount-term'
  | 'existing-borrowing'
  | 'stability'
  | 'financial-questions'
  | 'open-banking'
  | 'documents'
  | 'processing'
  | 'outcome';

type OutcomeType = 'approved' | 'conditional' | 'declined' | null;

export function LendingFlow({ onExit, onComplete, onNavigate, businessData, resumeData }: LendingFlowProps) {
  const [currentStep, setCurrentStep] = useState<LendingStep>(resumeData?.currentStep || 'overview');
  const [outcomeType, setOutcomeType] = useState<OutcomeType>(resumeData?.outcomeType || null);

  // Application data
  const [purpose, setPurpose] = useState(resumeData?.purpose || '');
  const [isFacilityMatch, setIsFacilityMatch] = useState(resumeData?.isFacilityMatch || false);
  const [loanAmount, setLoanAmount] = useState(resumeData?.loanAmount || 0);
  const [termMonths, setTermMonths] = useState(resumeData?.termMonths || 0);
  const [existingLoans, setExistingLoans] = useState<ExistingLoan[]>(resumeData?.existingLoans || []);
  const [hasStabilityConcerns, setHasStabilityConcerns] = useState(resumeData?.hasStabilityConcerns || false);
  const [financialData, setFinancialData] = useState<FinancialData | null>(resumeData?.financialData || null);
  const [connectedOpenBanking, setConnectedOpenBanking] = useState(resumeData?.connectedOpenBanking || false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(resumeData?.uploadedDocuments || []);

  // Auto-save progress whenever state changes (except on overview and outcome steps)
  useEffect(() => {
    if (currentStep !== 'overview' && currentStep !== 'outcome') {
      const applicationData: LendingApplicationData = {
        id: '12345', // Unique ID for the application
        currentStep,
        purpose,
        isFacilityMatch,
        loanAmount,
        termMonths,
        existingLoans,
        hasStabilityConcerns,
        financialData,
        connectedOpenBanking,
        uploadedDocuments,
        outcomeType,
        lastSaved: new Date().toISOString(),
        progress: getStepInfo().percent,
      };
      localStorage.setItem(LENDING_STORAGE_KEY, JSON.stringify(applicationData));
    }
  }, [currentStep, purpose, loanAmount, termMonths, existingLoans, hasStabilityConcerns, financialData, connectedOpenBanking, uploadedDocuments]);

  // Clear saved data on completion
  useEffect(() => {
    if (currentStep === 'outcome' && outcomeType === 'approved') {
      // Clear the draft when application is approved and completed
      const clearOnComplete = () => {
        localStorage.removeItem(LENDING_STORAGE_KEY);
      };
      // Add a small delay to ensure it's cleared after user accepts
      return clearOnComplete;
    }
  }, [currentStep, outcomeType]);

  // Mock document requirements (would be dynamic based on application)
  const documentRequirements: DocumentRequirement[] = connectedOpenBanking
    ? [
        {
          id: 'accounts',
          title: 'Most recent filed accounts',
          description: 'Your latest accounts filed with Companies House',
          required: true,
          acceptedFormats: ['pdf', 'jpg', 'png'],
        },
      ]
    : [
        {
          id: 'bank-statements',
          title: 'Last 3 months bank statements',
          description: 'Recent business bank statements showing all transactions',
          required: true,
          acceptedFormats: ['pdf', 'csv', 'jpg', 'png'],
        },
        {
          id: 'accounts',
          title: 'Most recent filed accounts',
          description: 'Your latest accounts filed with Companies House',
          required: true,
          acceptedFormats: ['pdf', 'jpg', 'png'],
        },
        {
          id: 'management-accounts',
          title: 'Management accounts',
          description: 'If filed accounts are more than 5 months old',
          required: false,
          acceptedFormats: ['pdf', 'xlsx', 'csv'],
        },
      ];

  const handleSaveExit = () => {
    // In a real app, save progress to localStorage or backend
    const applicationData: LendingApplicationData = {
      id: '12345', // Unique ID for the application
      currentStep,
      purpose,
      isFacilityMatch,
      loanAmount,
      termMonths,
      existingLoans,
      hasStabilityConcerns,
      financialData,
      connectedOpenBanking,
      uploadedDocuments,
      outcomeType,
      lastSaved: new Date().toISOString(),
      progress: getStepInfo().percent,
    };
    localStorage.setItem(LENDING_STORAGE_KEY, JSON.stringify(applicationData));
    onExit && onExit();
  };

  const getStepInfo = () => {
    const stepMap: Record<LendingStep, { step: number; label: string; percent: number }> = {
      'overview': { step: 1, label: 'Overview', percent: 0 },
      'purpose': { step: 2, label: 'Loan Purpose', percent: 10 },
      'amount-term': { step: 3, label: 'Loan Amount & Term', percent: 20 },
      'existing-borrowing': { step: 4, label: 'Existing Borrowing', percent: 30 },
      'stability': { step: 5, label: 'Financial Stability', percent: 40 },
      'financial-questions': { step: 6, label: 'Financial Questions', percent: 50 },
      'open-banking': { step: 7, label: 'Open Banking', percent: 60 },
      'documents': { step: 8, label: 'Document Upload', percent: 70 },
      'processing': { step: 9, label: 'Processing', percent: 85 },
      'outcome': { step: 10, label: 'Decision', percent: 100 },
    };
    return stepMap[currentStep];
  };

  const stepInfo = getStepInfo();

  // Simulate outcome determination (would be done by backend)
  const determineOutcome = (): OutcomeType => {
    // Mock logic - in reality this would be based on credit scoring
    if (financialData && financialData.annualTurnover > 100000 && !hasStabilityConcerns) {
      return 'approved';
    } else if (financialData && financialData.annualTurnover > 50000) {
      return 'conditional';
    }
    return 'declined';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'overview':
        return (
          <LendingOverviewScreen
            onStart={() => setCurrentStep('purpose')}
            onLearnMore={() => alert('Learn more about loan products would open here')}
          />
        );

      case 'purpose':
        return (
          <LoanPurposeScreen
            onContinue={(p, _, facilityMatch) => {
              setPurpose(p);
              setIsFacilityMatch(facilityMatch || false);
              setCurrentStep('amount-term');
            }}
            onBack={() => setCurrentStep('overview')}
          />
        );

      case 'amount-term':
        return (
          <LoanAmountTermScreen
            onContinue={(amount, term) => {
              setLoanAmount(amount);
              setTermMonths(term);
              setCurrentStep('existing-borrowing');
            }}
            onBack={() => setCurrentStep('purpose')}
          />
        );

      case 'existing-borrowing':
        return (
          <ExistingBorrowingScreen
            onContinue={(loans) => {
              setExistingLoans(loans);
              setCurrentStep('stability');
            }}
            onBack={() => setCurrentStep('amount-term')}
            isFacilityMatch={isFacilityMatch}
          />
        );

      case 'stability':
        return (
          <FinancialStabilityScreen
            onContinue={(hasConcerns) => {
              setHasStabilityConcerns(hasConcerns);
              setCurrentStep('financial-questions');
            }}
            onBack={() => setCurrentStep('existing-borrowing')}
          />
        );

      case 'financial-questions':
        return (
          <FinancialQuestionsScreen
            onContinue={(data) => {
              setFinancialData(data);
              setCurrentStep('open-banking');
            }}
            onBack={() => setCurrentStep('stability')}
          />
        );

      case 'open-banking':
        return (
          <OpenBankingScreen
            onConnect={() => {
              setConnectedOpenBanking(true);
              alert('Open Banking connection would happen here via a third-party provider');
              setCurrentStep('documents');
            }}
            onSkip={() => {
              setConnectedOpenBanking(false);
              setCurrentStep('documents');
            }}
            onBack={() => setCurrentStep('financial-questions')}
          />
        );

      case 'documents':
        return (
          <DocumentUploadScreen
            onContinue={(docs) => {
              setUploadedDocuments(docs);
              setCurrentStep('processing');
            }}
            onBack={() => setCurrentStep('open-banking')}
            requiredDocuments={documentRequirements}
            skippedOpenBanking={!connectedOpenBanking}
          />
        );

      case 'processing':
        return (
          <ProcessingScreen
            onComplete={() => {
              const outcome = determineOutcome();
              setOutcomeType(outcome);
              setCurrentStep('outcome');
            }}
          />
        );

      case 'outcome':
        if (outcomeType === 'approved') {
          return (
            <OutcomeApprovedScreen
              minAmount={Math.floor(loanAmount * 0.5)}
              maxAmount={loanAmount}
              indicativeAPR={0.075}
              termMonths={termMonths}
              onAccept={(finalAmount) => {
                alert(`Loan accepted: £${finalAmount}. Contract signing would follow.`);
                onComplete && onComplete();
              }}
              onDecline={onExit && onExit}
            />
          );
        } else if (outcomeType === 'conditional') {
          return (
            <OutcomeConditionalScreen
              reasons={[
                'Seasonal revenue pattern requires specialist review',
                'Loan amount is above automated approval threshold',
                'Additional verification needed for industry sector',
              ]}
              onBookCall={() => alert('Calendar booking would open here')}
              onUploadDocs={() => setCurrentStep('documents')}
              onExit={onExit && onExit}
            />
          );
        } else {
          return (
            <OutcomeDeclinedScreen
              reasons={[
                'Annual turnover below minimum threshold for requested amount',
                'High debt-to-income ratio from existing borrowing',
                'Insufficient trading history',
              ]}
              canSpeakToRM={true}
              onSpeakToRM={() => alert('RM contact would open here')}
              onDownloadSummary={() => alert('PDF download would trigger here')}
              onExit={onExit && onExit}
            />
          );
        }

      default:
        return null;
    }
  };

  // Don't show ScreenContainer for certain steps
  if (currentStep === 'overview' || currentStep === 'processing' || currentStep === 'outcome') {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        {renderStep()}
      </div>
    );
  }

  return (
    <ScreenContainer
      currentStep={stepInfo.step}
      totalSteps={10}
      stepLabel={stepInfo.label}
      percentComplete={stepInfo.percent}
      minutesRemaining={Math.max(1, Math.ceil((100 - stepInfo.percent) / 20))}
      onSaveExit={handleSaveExit}
      flowType="lending"
    >
      {renderStep()}
    </ScreenContainer>
  );
}