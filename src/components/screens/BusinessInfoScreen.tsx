import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Search, Building2, CheckCircle2, Edit } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface BusinessInfoScreenProps {
  onNext: (data: any) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

// Mock Companies House data
const mockCompaniesData: Record<string, any> = {
  '12345678': {
    companyName: 'Tech Innovations Ltd',
    businessType: 'Private Limited Company',
    industry: 'Software Development',
    registeredAddress: '123 High Street, London',
    postcode: 'SW1A 1AA',
    tradingSince: '2020-01-15',
  },
  '87654321': {
    companyName: 'Metro Solutions Ltd',
    businessType: 'Private Limited Company',
    industry: 'Financial Services',
    registeredAddress: '456 Oxford Street, London',
    postcode: 'W1D 1BS',
    tradingSince: '2019-06-10',
  },
};

export function BusinessInfoScreen({ onNext, currentStep, totalSteps, initialData }: BusinessInfoScreenProps) {
  const [mode, setMode] = useState<'search' | 'autofilled' | 'manual'>('search');
  const [companiesHouseNumber, setCompaniesHouseNumber] = useState(initialData?.companiesHouseNumber || '');
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    businessType: initialData?.businessType || '',
    industry: initialData?.industry || '',
    registeredAddress: initialData?.registeredAddress || '',
    postcode: initialData?.postcode || '',
    tradingSince: initialData?.tradingSince || '',
  });

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const data = mockCompaniesData[companiesHouseNumber];
      if (data) {
        setFormData(data);
        setMode('autofilled');
      } else {
        alert('Company not found. Please enter details manually or try a different Companies House number.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleManualEntry = () => {
    setMode('manual');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      companiesHouseNumber,
      ...formData,
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canSubmit = formData.companyName && formData.businessType && formData.industry && 
                     formData.registeredAddress && formData.postcode;

  // Search Mode
  if (mode === 'search') {
    return (
      <ScreenContainer
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabel="Business details"
        percentComplete={28}
        minutesRemaining={7}
      >
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <h2 className="mb-3">Find your business</h2>
            <p className="text-muted-foreground">
              We'll automatically fill in your business details from Companies House
            </p>
          </div>

          <form onSubmit={handleLookup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyNumber">Companies House number</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="companyNumber"
                  type="text"
                  placeholder="e.g. 12345678"
                  value={companiesHouseNumber}
                  onChange={(e) => setCompaniesHouseNumber(e.target.value)}
                  className="pl-10"
                  maxLength={8}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Try: 12345678 or 87654321 for demo
              </p>
            </div>

            <div className="bg-[#F5F6F8] rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Don't have a Companies House number?</strong><br/>
                You can enter your business details manually instead.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSaveModal(true)}
                className="flex-1"
              >
                Save & Exit
              </Button>
              <Button 
                type="submit"
                disabled={!companiesHouseNumber || loading}
                className="flex-1"
              >
                {loading ? 'Searching...' : 'Find business'}
              </Button>
            </div>

            <button
              type="button"
              onClick={handleManualEntry}
              className="w-full text-sm text-accent hover:underline"
            >
              Enter details manually instead
            </button>
          </form>
        </div>

        <SaveExitModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
        />
      </ScreenContainer>
    );
  }

  // Autofilled or Manual Mode
  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Business details"
      percentComplete={28}
      minutesRemaining={7}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">
            {mode === 'autofilled' ? 'Confirm your business details' : 'Enter your business details'}
          </h2>
          <p className="text-muted-foreground">
            {mode === 'autofilled' 
              ? 'We found your business. Please review and edit if needed.'
              : 'Please provide your business information'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => updateFormData('companyName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business type</Label>
            <Input
              id="businessType"
              type="text"
              value={formData.businessType}
              onChange={(e) => updateFormData('businessType', e.target.value)}
              placeholder="e.g. Private Limited Company"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              type="text"
              value={formData.industry}
              onChange={(e) => updateFormData('industry', e.target.value)}
              placeholder="e.g. Software Development"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registeredAddress">Registered address</Label>
            <Input
              id="registeredAddress"
              type="text"
              value={formData.registeredAddress}
              onChange={(e) => updateFormData('registeredAddress', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              type="text"
              value={formData.postcode}
              onChange={(e) => updateFormData('postcode', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradingSince">Trading since (optional)</Label>
            <Input
              id="tradingSince"
              type="date"
              value={formData.tradingSince}
              onChange={(e) => updateFormData('tradingSince', e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSaveModal(true)}
              className="flex-1"
            >
              Save & Exit
            </Button>
            <Button 
              type="submit"
              disabled={!canSubmit}
              className="flex-1"
            >
              Continue
            </Button>
          </div>

          {mode === 'autofilled' && (
            <button
              type="button"
              onClick={() => setMode('search')}
              className="w-full text-sm text-accent hover:underline"
            >
              Search for a different company
            </button>
          )}
        </form>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}