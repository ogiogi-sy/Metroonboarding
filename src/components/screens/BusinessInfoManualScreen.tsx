import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Search } from 'lucide-react';

interface BusinessInfoManualScreenProps {
  onNext: (data: any) => void;
  currentStep: number;
  initialData?: any;
  onSaveExit?: () => void;
}

export function BusinessInfoManualScreen({ onNext, currentStep, initialData, onSaveExit }: BusinessInfoManualScreenProps) {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    companiesHouseNumber: initialData?.companiesHouseNumber || '',
    businessType: initialData?.businessType || '',
    industry: initialData?.industry || '',
    tradingSince: initialData?.tradingSince || '',
    registeredAddress: initialData?.registeredAddress || '',
    postcode: initialData?.postcode || '',
  });

  const [addressLookup, setAddressLookup] = useState('');
  const [showAddressResults, setShowAddressResults] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressLookup = () => {
    // Mock address lookup
    setFormData(prev => ({
      ...prev,
      registeredAddress: '123 High Street, London',
      postcode: addressLookup,
    }));
    setShowAddressResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      stepLabel="Business information"
      percentComplete={40}
      minutesRemaining={4}
      onSaveExit={onSaveExit}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-3">Business information</h2>
        <p className="text-gray-600 mb-8">
          Please provide your business details
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="companyName">Company name *</Label>
              <Input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Your Business Ltd"
                required
                className="mt-2 h-11"
              />
            </div>

            <div>
              <Label htmlFor="chNumber">Companies House number</Label>
              <Input
                id="chNumber"
                type="text"
                value={formData.companiesHouseNumber}
                onChange={(e) => handleChange('companiesHouseNumber', e.target.value)}
                placeholder="12345678 (optional)"
                maxLength={8}
                className="mt-2 h-11"
              />
            </div>

            <div>
              <Label htmlFor="businessType">Business type *</Label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                required
                className="mt-2 w-full h-11 px-3 rounded-md border border-gray-300 bg-white text-sm"
              >
                <option value="">Select type</option>
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Public Limited Company">Public Limited Company</option>
                <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                <option value="Sole Trader">Sole Trader</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                required
                className="mt-2 w-full h-11 px-3 rounded-md border border-gray-300 bg-white text-sm"
              >
                <option value="">Select industry</option>
                <option value="Software Development">Software Development</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Retail">Retail</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Construction">Construction</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="tradingSince">Trading since *</Label>
              <Input
                id="tradingSince"
                type="date"
                value={formData.tradingSince}
                onChange={(e) => handleChange('tradingSince', e.target.value)}
                required
                className="mt-2 h-11"
              />
            </div>
          </div>

          {/* Address Lookup */}
          <div className="space-y-4 pt-4 border-t">
            <h3>Registered address</h3>
            
            <div>
              <Label htmlFor="postcodeLookup">Find your address</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="postcodeLookup"
                  type="text"
                  placeholder="Enter postcode"
                  value={addressLookup}
                  onChange={(e) => setAddressLookup(e.target.value.toUpperCase())}
                  className="h-11"
                />
                <Button 
                  type="button"
                  onClick={handleAddressLookup}
                  variant="outline"
                  className="h-11 px-6"
                  disabled={!addressLookup}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Address
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="registeredAddress">Address *</Label>
              <Input
                id="registeredAddress"
                type="text"
                value={formData.registeredAddress}
                onChange={(e) => handleChange('registeredAddress', e.target.value)}
                placeholder="123 High Street, London"
                required
                className="mt-2 h-11"
              />
            </div>

            <div>
              <Label htmlFor="postcode">Postcode *</Label>
              <Input
                id="postcode"
                type="text"
                value={formData.postcode}
                onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
                placeholder="SW1A 1AA"
                required
                className="mt-2 h-11"
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full h-11 bg-[#0057B7] hover:bg-[#004494]"
          >
            Continue
          </Button>
        </form>
      </div>
    </ScreenContainer>
  );
}