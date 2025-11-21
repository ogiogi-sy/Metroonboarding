import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScreenContainer } from '../ScreenContainer';
import { User } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface DirectorInfoScreenProps {
  onNext: (data: any) => void;
  currentStep: number;
  totalSteps: number;
}

export function DirectorInfoScreen({ onNext, currentStep, totalSteps }: DirectorInfoScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    nationality: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const canSubmit = formData.firstName && formData.lastName && formData.dateOfBirth && formData.phoneNumber;

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Director information"
      percentComplete={43}
      minutesRemaining={6}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Director information</h2>
          <p className="text-muted-foreground">
            We need details about the main director or business owner
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+44 7700 900000"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData('phoneNumber', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality (optional)</Label>
            <Input
              id="nationality"
              type="text"
              placeholder="e.g. British"
              value={formData.nationality}
              onChange={(e) => updateFormData('nationality', e.target.value)}
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
        </form>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}