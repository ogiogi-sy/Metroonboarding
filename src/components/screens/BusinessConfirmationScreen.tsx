import { useState } from 'react';
import { Button } from '../ui/button';
import { SplitLayout } from '../SplitLayout';
import { Building2, MapPin, Calendar, Users, CheckCircle2, Edit } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface BusinessConfirmationScreenProps {
  businessData: any;
  onConfirm: () => void;
  onEdit: () => void;
  onSearchAgain: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export function BusinessConfirmationScreen({
  businessData,
  onConfirm,
  onEdit,
  onSearchAgain,
  onBack,
  currentStep,
  totalSteps,
}: BusinessConfirmationScreenProps) {
  const [showSaveExitModal, setShowSaveExitModal] = useState(false);

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Business information"
      percentComplete={25}
      minutesRemaining={8}
      onBack={onBack}
      leftHeading="Companies House verification"
      leftDescription="We verify all businesses against the official registry to meet FCA regulatory requirements and speed up your application."
      leftIcon={Building2}
    >
      <div className="mb-8">
        <h2 className="mb-3">Confirm these details</h2>
        <p className="text-muted-foreground">
          Review the information below and confirm it matches your business
        </p>
      </div>

      {/* Business Details Card */}
      <div className="bg-white border border-border rounded-2xl p-8 mb-6">
        {/* Company Name & Number Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-[28px] text-foreground">
              {businessData.legalName || businessData.companyName}
            </h3>
            <div className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 ${
              businessData.businessStatus === 'Active'
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : 'bg-muted text-muted-foreground'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              {businessData.businessStatus || 'ACTIVE'}
            </div>
          </div>
          <p className="text-muted-foreground">
            #{businessData.companiesHouseNumber}
          </p>
        </div>

        {/* Registered Address */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Registered address
              </p>
              <p className="text-foreground">
                {businessData.registeredAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Incorporation Date */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex gap-4">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Incorporated on
              </p>
              <p className="text-foreground">
                {businessData.incorporationDate 
                  ? new Date(businessData.incorporationDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Directors & Officers */}
        {businessData.officers && businessData.officers.length > 0 && (
          <div>
            <div className="flex gap-4">
              <Users className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
                  Current directors
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {businessData.officers.map((officer: any, index: number) => {
                    // Get initials from name
                    const nameParts = officer.name.split(' ');
                    const initials = nameParts.length >= 2
                      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
                      : officer.name.substring(0, 2);
                    
                    return (
                      <div key={index} className="flex items-center gap-3 bg-blue-tint rounded-lg p-3">
                        {/* Avatar with initials */}
                        <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">{initials.toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground truncate">{officer.name}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            {officer.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          onClick={onConfirm}
          className="w-full h-12"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          This is my business — Continue
        </Button>
        
        <div className="grid sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onEdit}
            className="border"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit details
          </Button>
          <Button
            variant="outline"
            onClick={onSearchAgain}
            className="border"
          >
            Search again
          </Button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-[#F5F6F8] rounded-lg p-6">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#001A72] mb-1">What happens next:</p>
            <p className="text-sm text-muted-foreground">
              We'll pre-fill your application with this information. You can review and edit any details in the next step.
            </p>
          </div>
        </div>
      </div>
    </SplitLayout>
  );
}