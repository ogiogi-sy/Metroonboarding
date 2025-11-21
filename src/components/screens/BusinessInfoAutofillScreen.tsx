import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Search, Building2, MapPin, Briefcase, CheckCircle2, Info } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface BusinessInfoAutofillScreenProps {
  onNext: (data: any) => void;
  currentStep: number;
  onSaveExit?: () => void;
}

// Mock Companies House data
const mockCompaniesData: Record<string, any> = {
  '12345678': {
    companyName: 'Your Business Ltd',
    businessType: 'Private Limited Company',
    industry: 'Software Development',
    registeredAddress: '123 High Street, London',
    postcode: 'SW1A 1AA',
    tradingSince: '2020-01-15',
  },
  '87654321': {
    companyName: 'Metro Innovations Ltd',
    businessType: 'Private Limited Company',
    industry: 'Financial Services',
    registeredAddress: '456 Oxford Street, London',
    postcode: 'W1D 1BS',
    tradingSince: '2019-06-10',
  },
};

export function BusinessInfoAutofillScreen({ onNext, currentStep, onSaveExit }: BusinessInfoAutofillScreenProps) {
  const [companiesHouseNumber, setCompaniesHouseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundData, setFoundData] = useState<any>(null);
  const [error, setError] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const data = mockCompaniesData[companiesHouseNumber];
      if (data) {
        setFoundData(data);
      } else {
        setError('Company not found. Please check the number or enter details manually.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleUseDetails = () => {
    onNext({
      companiesHouseNumber,
      ...foundData,
      useAutofill: true,
    });
  };

  const handleManualEntry = () => {
    onNext({
      companiesHouseNumber: '',
      useAutofill: false,
    });
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      stepLabel="Business information"
      percentComplete={35}
      minutesRemaining={5}
      onSaveExit={onSaveExit}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-3">Tell us about your business</h2>
        <p className="text-gray-600 mb-8">
          We'll fetch your details from Companies House to save you time
        </p>

        {!foundData ? (
          <div className="space-y-6">
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <Label htmlFor="chNumber">Companies House registration number</Label>
                <div className="flex gap-3 mt-2">
                  <div className="relative flex-1">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="chNumber"
                      type="text"
                      placeholder="12345678"
                      value={companiesHouseNumber}
                      onChange={(e) => setCompaniesHouseNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
                      maxLength={8}
                      className="pl-10 h-11"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={companiesHouseNumber.length !== 8 || loading}
                    className="bg-[#0057B7] hover:bg-[#004494] h-11 px-6"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Find Company
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex items-start gap-2 mt-2 text-xs text-gray-500">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Data securely fetched from Companies House (GOV.UK). 
                    Try <strong>12345678</strong> or <strong>87654321</strong> as examples.
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                  {error}
                </div>
              )}
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button 
              variant="outline"
              onClick={handleManualEntry}
              className="w-full h-11"
            >
              Enter details manually
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success State */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-900">
                  <strong>Company found!</strong> We've pre-filled your details below.
                </p>
              </div>
            </div>

            {/* Autofilled Data Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-[#0057B7]" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{foundData.companyName}</h3>
                  <p className="text-sm text-gray-600">
                    Companies House No. {companiesHouseNumber}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Business Type</p>
                  <p className="text-sm">{foundData.businessType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Industry</p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <p className="text-sm">{foundData.industry}</p>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Registered Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{foundData.registeredAddress}, {foundData.postcode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowSaveModal(true)}
                className="flex-1 h-11"
              >
                Save & Exit
              </Button>
              <Button 
                onClick={handleUseDetails}
                className="flex-1 bg-[#0057B7] hover:bg-[#004494] h-11"
              >
                Use these details
              </Button>
            </div>

            <Button 
              variant="ghost"
              onClick={handleManualEntry}
              className="w-full h-11"
            >
              Enter manually instead
            </Button>

            <button
              onClick={() => {
                setFoundData(null);
                setCompaniesHouseNumber('');
                setError('');
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-900"
            >
              Search for a different company
            </button>
          </div>
        )}
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}