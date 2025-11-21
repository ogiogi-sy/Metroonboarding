import { useState } from 'react';
import { CASSIntroScreen } from './CASSIntroScreen';
import { ChooseMethodScreen } from './ChooseMethodScreen';
import { ConnectOldBankScreen } from './ConnectOldBankScreen';
import { SelectOldBankScreen } from './SelectOldBankScreen';
import { OBRedirectScreen } from './OBRedirectScreen';
import { SelectAccountScreen } from './SelectAccountScreen';
import { PreviewOBDataScreen } from './PreviewOBDataScreen';
import { ManualEntryScreen } from './ManualEntryScreen';
import { ChooseSwitchTypeScreen } from './ChooseSwitchTypeScreen';
import { ReviewAuthoriseScreen } from './ReviewAuthoriseScreen';
import { SwitchSubmittedScreen } from './SwitchSubmittedScreen';
import { SwitchTrackerScreen } from './SwitchTrackerScreen';
import { SwitchCompleteScreen } from './SwitchCompleteScreen';

export interface OldAccountData {
  bankName?: string;
  sortCode?: string;
  accountNumber?: string;
  accountName?: string;
  businessName?: string;
  balance?: string;
  accountType?: string;
}

export interface OBData {
  directDebits: number;
  standingOrders: number;
  regularIncomingPayers: number;
  accounts?: Array<{
    id: string;
    nickname: string;
    sortCode: string;
    accountNumber: string;
    balance: string;
    accountType: string;
  }>;
}

export interface SwitchData {
  method: 'openbanking' | 'manual' | null;
  oldAccount: OldAccountData;
  obData?: OBData;
  switchType: 'full' | 'partial' | null;
  switchDate: string | null;
  confirmed: boolean;
  switchReference?: string;
}

interface BankSwitchFlowProps {
  onNavigate: (screen: string) => void;
  businessData: any;
}

export function BankSwitchFlow({ onNavigate, businessData }: BankSwitchFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<
    | 'intro'
    | 'choose-method'
    | 'connect-ob'
    | 'select-bank'
    | 'ob-redirect'
    | 'select-account'
    | 'preview-ob'
    | 'manual-entry'
    | 'choose-switch-type'
    | 'review-authorise'
    | 'switch-submitted'
    | 'switch-tracker'
    | 'switch-complete'
  >('intro');

  const [switchData, setSwitchData] = useState<SwitchData>({
    method: null,
    oldAccount: {},
    switchType: null,
    switchDate: null,
    confirmed: false,
  });

  const updateSwitchData = (data: Partial<SwitchData>) => {
    setSwitchData((prev) => ({ ...prev, ...data }));
  };

  const handleBack = () => {
    onNavigate('admin');
  };

  // Screen 1: CASS Intro
  if (currentScreen === 'intro') {
    return (
      <CASSIntroScreen
        onStart={() => setCurrentScreen('choose-method')}
        onBack={handleBack}
      />
    );
  }

  // Screen 2: Choose Method
  if (currentScreen === 'choose-method') {
    return (
      <ChooseMethodScreen
        onContinue={(method) => {
          updateSwitchData({ method });
          if (method === 'openbanking') {
            setCurrentScreen('connect-ob');
          } else {
            setCurrentScreen('manual-entry');
          }
        }}
        onBack={() => setCurrentScreen('intro')}
      />
    );
  }

  // Branch A: Open Banking Path
  if (currentScreen === 'connect-ob') {
    return (
      <ConnectOldBankScreen
        onContinue={() => setCurrentScreen('select-bank')}
        onManual={() => {
          updateSwitchData({ method: 'manual' });
          setCurrentScreen('manual-entry');
        }}
        onBack={() => setCurrentScreen('choose-method')}
      />
    );
  }

  if (currentScreen === 'select-bank') {
    return (
      <SelectOldBankScreen
        onSelectBank={(bankName) => {
          updateSwitchData({ oldAccount: { ...switchData.oldAccount, bankName } });
          setCurrentScreen('ob-redirect');
        }}
        onBack={() => setCurrentScreen('connect-ob')}
      />
    );
  }

  if (currentScreen === 'ob-redirect') {
    return (
      <OBRedirectScreen
        bankName={switchData.oldAccount.bankName || ''}
        onComplete={(obData) => {
          updateSwitchData({ obData });
          // If multiple accounts, go to select account screen
          if (obData.accounts && obData.accounts.length > 1) {
            setCurrentScreen('select-account');
          } else if (obData.accounts && obData.accounts.length === 1) {
            // Auto-select the only account
            const account = obData.accounts[0];
            updateSwitchData({
              oldAccount: {
                ...switchData.oldAccount,
                sortCode: account.sortCode,
                accountNumber: account.accountNumber,
                accountName: account.nickname,
                balance: account.balance,
                accountType: account.accountType,
              },
            });
            setCurrentScreen('preview-ob');
          } else {
            setCurrentScreen('preview-ob');
          }
        }}
      />
    );
  }

  if (currentScreen === 'select-account') {
    return (
      <SelectAccountScreen
        accounts={switchData.obData?.accounts || []}
        onSelectAccount={(account) => {
          updateSwitchData({
            oldAccount: {
              ...switchData.oldAccount,
              sortCode: account.sortCode,
              accountNumber: account.accountNumber,
              accountName: account.nickname,
              balance: account.balance,
              accountType: account.accountType,
            },
          });
          setCurrentScreen('preview-ob');
        }}
        onBack={() => setCurrentScreen('select-bank')}
      />
    );
  }

  if (currentScreen === 'preview-ob') {
    return (
      <PreviewOBDataScreen
        oldAccount={switchData.oldAccount}
        obData={switchData.obData}
        onContinue={() => setCurrentScreen('choose-switch-type')}
        onEdit={() => setCurrentScreen('manual-entry')}
        onBack={() => setCurrentScreen('select-bank')}
      />
    );
  }

  // Branch B: Manual Path
  if (currentScreen === 'manual-entry') {
    return (
      <ManualEntryScreen
        initialData={switchData.oldAccount}
        onContinue={(accountData) => {
          updateSwitchData({ oldAccount: accountData });
          setCurrentScreen('choose-switch-type');
        }}
        onBack={() => setCurrentScreen('choose-method')}
      />
    );
  }

  // Common Flow
  if (currentScreen === 'choose-switch-type') {
    return (
      <ChooseSwitchTypeScreen
        onContinue={(switchType, switchDate) => {
          updateSwitchData({ switchType, switchDate });
          setCurrentScreen('review-authorise');
        }}
        onBack={() =>
          switchData.method === 'openbanking'
            ? setCurrentScreen('preview-ob')
            : setCurrentScreen('manual-entry')
        }
      />
    );
  }

  if (currentScreen === 'review-authorise') {
    return (
      <ReviewAuthoriseScreen
        switchData={switchData}
        businessData={businessData}
        onSubmit={() => {
          const reference = 'SW' + Date.now().toString().slice(-8);
          updateSwitchData({ confirmed: true, switchReference: reference });
          setCurrentScreen('switch-submitted');
        }}
        onBack={() => setCurrentScreen('choose-switch-type')}
      />
    );
  }

  if (currentScreen === 'switch-submitted') {
    return (
      <SwitchSubmittedScreen
        switchData={switchData}
        onViewTracker={() => setCurrentScreen('switch-tracker')}
        onBackToHome={() => onNavigate('home')}
      />
    );
  }

  if (currentScreen === 'switch-tracker') {
    return (
      <SwitchTrackerScreen
        switchData={switchData}
        onComplete={() => setCurrentScreen('switch-complete')}
        onBackToHome={() => onNavigate('home')}
      />
    );
  }

  if (currentScreen === 'switch-complete') {
    return (
      <SwitchCompleteScreen
        switchData={switchData}
        businessData={businessData}
        onBackToHome={() => onNavigate('home')}
      />
    );
  }

  return null;
}
