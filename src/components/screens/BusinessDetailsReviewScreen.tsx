import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { Edit, CheckCircle2 } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface BusinessDetailsReviewScreenProps {
  onNext: (data: any) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: any;
}

export function BusinessDetailsReviewScreen({
  onNext,
  currentStep,
  totalSteps,
  initialData,
}: BusinessDetailsReviewScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    legalName: initialData?.legalName || '',
    businessType: initialData?.businessType || '',
    industry: initialData?.industry || '',
    registeredAddress: initialData?.registeredAddress || '',
    tradingAddress: initialData?.tradingAddress || initialData?.registeredAddress || '',
    postcode: initialData?.postcode || '',
    incorporationDate: initialData?.incorporationDate || '',
  });

  const [useSameAddress, setUseSameAddress] = useState(true);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      tradingAddress: useSameAddress ? formData.registeredAddress : formData.tradingAddress,
    };
    onNext(dataToSubmit);
  };

  const isPrefilled = initialData?.companiesHouseNumber;
  const canSubmit = formData.companyName && formData.businessType && formData.registeredAddress;

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel={isPrefilled ? "Review business details" : "Enter business details"}
      percentComplete={20}
      minutesRemaining={8}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">
            {isPrefilled ? 'Review your business details' : 'Enter your business details'}
          </h2>
          <p className="text-muted-foreground">
            {isPrefilled 
              ? "We've pre-filled this information. Please review and edit if needed."
              : 'Please provide your business information'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
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

          {/* Legal Name (if different) */}
          {isPrefilled && formData.legalName !== formData.companyName && (
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal name (if different)</Label>
              <Input
                id="legalName"
                type="text"
                value={formData.legalName}
                onChange={(e) => updateFormData('legalName', e.target.value)}
              />
            </div>
          )}

          {/* Business Type */}
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

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              type="text"
              value={formData.industry}
              onChange={(e) => updateFormData('industry', e.target.value)}
              placeholder="e.g. Software Development"
            />
          </div>

          {/* Registered Address */}
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

          {/* Postcode */}
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              type="text"
              value={formData.postcode}
              onChange={(e) => updateFormData('postcode', e.target.value)}
            />
          </div>

          {/* Trading Address */}
          <div className="space-y-3">
            <Label>Trading address</Label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sameAddress"
                checked={useSameAddress}
                onChange={(e) => setUseSameAddress(e.target.checked)}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="sameAddress" className="text-sm cursor-pointer">
                Same as registered address
              </label>
            </div>
            {!useSameAddress && (
              <Input
                id="tradingAddress"
                type="text"
                value={formData.tradingAddress}
                onChange={(e) => updateFormData('tradingAddress', e.target.value)}
                placeholder="Enter trading address"
              />
            )}
          </div>

          {/* Incorporation Date */}
          {isPrefilled && (
            <div className="space-y-2">
              <Label htmlFor="incorporationDate">Incorporation date</Label>
              <Input
                id="incorporationDate"
                type="date"
                value={formData.incorporationDate}
                onChange={(e) => updateFormData('incorporationDate', e.target.value)}
              />
            </div>
          )}

          {/* Action Buttons */}
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
        </form>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}