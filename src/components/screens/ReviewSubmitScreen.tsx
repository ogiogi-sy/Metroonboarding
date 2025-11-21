import { Button } from '../ui/button';
import { ScreenContainer } from '../ScreenContainer';
import { CheckCircle2, Edit, Building2, User, FileText, Mail, Send, Clock, XCircle, Loader2 } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';
import { useState, useEffect } from 'react';

interface ReviewSubmitScreenProps {
  data: any;
  onSubmit: () => void;
  onEdit: (step: number) => void;
  currentStep: number;
  totalSteps: number;
}

export function ReviewSubmitScreen({ data, onSubmit, onEdit, currentStep, totalSteps }: ReviewSubmitScreenProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track verification statuses for each person
  type VerificationStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';
  const [personStatuses, setPersonStatuses] = useState<Record<string, VerificationStatus>>(() => {
    const initialStatuses: Record<string, VerificationStatus> = {};
    data.people?.forEach((person: any) => {
      // Set "You" person as completed, others as not_started
      initialStatuses[person.id] = person.isYou ? 'completed' : 'not_started';
    });
    return initialStatuses;
  });

  // Simulate real-time status changes for demo
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    data.people?.forEach((person: any, index: number) => {
      if (!person.isYou && personStatuses[person.id] === 'not_started') {
        // After 3 seconds, start verification
        const timer1 = setTimeout(() => {
          setPersonStatuses(prev => ({ ...prev, [person.id]: 'in_progress' }));
          
          // After another 4 seconds, complete verification
          const timer2 = setTimeout(() => {
            setPersonStatuses(prev => ({ ...prev, [person.id]: 'completed' }));
          }, 4000 + (index * 1000)); // Stagger completions
          
          timers.push(timer2);
        }, 3000 + (index * 2000)); // Stagger starts
        
        timers.push(timer1);
      }
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [data.people]);

  const handleNudge = (personId: string, personEmail: string) => {
    // Simulate sending reminder email
    console.log(`Sending nudge email to ${personEmail}`);
    // In a real app, this would trigger an API call
  };

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'not_started':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      case 'in_progress':
        return <Loader2 className="w-4 h-4 text-accent animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusText = (status: VerificationStatus) => {
    switch (status) {
      case 'not_started':
        return 'Not started';
      case 'in_progress':
        return 'In progress';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
    }
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'not_started':
        return 'text-muted-foreground';
      case 'in_progress':
        return 'text-accent';
      case 'completed':
        return 'text-[#16A34A]';
      case 'failed':
        return 'text-primary';
    }
  };

  // Check if all people are verified
  const allPeopleVerified = data.people?.every((person: any) => 
    personStatuses[person.id] === 'completed'
  ) ?? true;

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Review & submit"
      percentComplete={92}
      minutesRemaining={1}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Review your application</h2>
          <p className="text-muted-foreground">
            Please check everything is correct before submitting
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Business Information */}
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <h4>Business details</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(3)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company name</span>
                <span>{data.companyName}</span>
              </div>
              {data.companiesHouseNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Companies House no.</span>
                  <span>{data.companiesHouseNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business type</span>
                <span>{data.businessType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry</span>
                <span>{data.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address</span>
                <span className="text-right">{data.registeredAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Postcode</span>
                <span>{data.postcode}</span>
              </div>
            </div>
          </div>

          {/* People & Roles with Identity Verification */}
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <h4>People & identity verification</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(3)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              {data.people?.map((person: any) => (
                <div key={person.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{person.name}</span>
                      {person.isYou && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">You</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(personStatuses[person.id])}
                      <span className={`text-xs ${getStatusColor(personStatuses[person.id])}`}>
                        {getStatusText(personStatuses[person.id])}
                      </span>
                    </div>
                    {personStatuses[person.id] === 'not_started' && person.email && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNudge(person.id, person.email)}
                        className="h-7 px-2 text-xs"
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Nudge
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
          <p className="text-sm text-muted-foreground">
            By submitting this application, you confirm that the information provided is accurate and complete. 
            You agree to Metro Bank's <a href="#" className="text-accent hover:underline">Terms and Conditions</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Verification Warning */}
        {!allPeopleVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-900 font-medium mb-1">
                  Waiting for identity verification
                </p>
                <p className="text-sm text-amber-800">
                  All people must complete identity verification before you can submit your application.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSaveModal(true)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Save & Exit
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1"
            disabled={isSubmitting || !allPeopleVerified}
          >
            {isSubmitting ? 'Submitting...' : 'Submit application'}
          </Button>
        </div>
      </div>

      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </ScreenContainer>
  );
}