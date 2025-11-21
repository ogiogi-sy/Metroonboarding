import { useEffect } from 'react';
import { Loader2, Shield } from 'lucide-react';
import { OBData } from './BankSwitchFlow';

interface OBRedirectScreenProps {
  bankName: string;
  onComplete: (obData: OBData) => void;
}

export function OBRedirectScreen({ bankName, onComplete }: OBRedirectScreenProps) {
  useEffect(() => {
    // Simulate Open Banking redirect and data fetch
    const timer = setTimeout(() => {
      // Mock OB data response
      const mockOBData: OBData = {
        directDebits: 7,
        standingOrders: 3,
        regularIncomingPayers: 4,
        accounts: [
          {
            id: '1',
            nickname: 'Business Current Account',
            sortCode: '20-00-00',
            accountNumber: '12345678',
            balance: '£12,450.00',
            accountType: 'Business Current Account',
          },
        ],
      };
      onComplete(mockOBData);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
            <Shield className="w-12 h-12 text-accent" />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        </div>

        {/* Message */}
        <h2 className="mb-3" style={{ color: '#001A72' }}>
          Connecting to {bankName}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          You're being securely redirected to {bankName} to authorise access to your account information.
        </p>

        {/* Steps */}
        <div className="bg-white border border-border rounded-2xl p-6 text-left max-w-md w-full">
          <p className="text-sm mb-4" style={{ color: '#001A72' }}>
            What happens next:
          </p>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
                1
              </span>
              <span>Log in to your {bankName} account</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
                2
              </span>
              <span>Review and approve the Open Banking consent</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs text-accent">
                3
              </span>
              <span>You'll be redirected back to Metro Bank</span>
            </li>
          </ol>
        </div>

        {/* Security note */}
        <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>This connection is secured by Open Banking standards</span>
        </div>
      </div>
    </div>
  );
}
