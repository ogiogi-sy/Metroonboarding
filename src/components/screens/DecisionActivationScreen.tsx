import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ScreenContainer } from '../ScreenContainer';
import { 
  PartyPopper, 
  CheckCircle2, 
  Clock, 
  Users, 
  Link2, 
  Wallet, 
  Bell,
  Calendar,
  FileText
} from 'lucide-react';

interface DecisionActivationScreenProps {
  decisionType: 'instant_approval' | 'manual_review';
  currentStep: number;
}

export function DecisionActivationScreen({ decisionType, currentStep }: DecisionActivationScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [checklist, setChecklist] = useState({
    inviteTeam: false,
    connectAccounting: false,
    depositFunds: false,
    setAlerts: false,
  });

  useEffect(() => {
    if (decisionType === 'instant_approval') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [decisionType]);

  const toggleChecklistItem = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;
  const totalItems = Object.keys(checklist).length;
  const allComplete = completedItems === totalItems;

  if (decisionType === 'instant_approval') {
    return (
      <ScreenContainer
        currentStep={currentStep}
        stepLabel="Account setup"
        percentComplete={100}
        minutesRemaining={0}
        showProgress={false}
      >
        <div className="max-w-2xl mx-auto">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{
                      backgroundColor: ['#0057B7', '#E60028', '#FFD700', '#00C853'][Math.floor(Math.random() * 4)],
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="mb-4">Congratulations! 🎉</h1>
            <p className="text-gray-600 mb-2">
              Your business account has been approved
            </p>
            <p className="text-sm text-gray-500">
              Account number: <strong>12-34-56 · 12345678</strong>
            </p>
          </div>

          {/* Activation Checklist */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="mb-1">Get started with your account</h3>
                <p className="text-sm text-gray-600">
                  {completedItems} of {totalItems} completed
                </p>
              </div>
              <div className="text-2xl">{allComplete ? '🎉' : '📋'}</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div 
                className="h-full bg-[#0057B7] rounded-full transition-all duration-500"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              />
            </div>

            <div className="space-y-3">
              <ChecklistItem
                icon={<Users className="w-5 h-5" />}
                title="Invite team members"
                description="Add colleagues who need access"
                completed={checklist.inviteTeam}
                onClick={() => toggleChecklistItem('inviteTeam')}
              />
              <ChecklistItem
                icon={<Link2 className="w-5 h-5" />}
                title="Connect accounting software"
                description="Sync with Xero, QuickBooks, or FreeAgent"
                completed={checklist.connectAccounting}
                onClick={() => toggleChecklistItem('connectAccounting')}
              />
              <ChecklistItem
                icon={<Wallet className="w-5 h-5" />}
                title="Make your first deposit"
                description="Transfer funds to start using your account"
                completed={checklist.depositFunds}
                onClick={() => toggleChecklistItem('depositFunds')}
              />
              <ChecklistItem
                icon={<Bell className="w-5 h-5" />}
                title="Set up notifications"
                description="Get alerts for transactions and payments"
                completed={checklist.setAlerts}
                onClick={() => toggleChecklistItem('setAlerts')}
              />
            </div>
          </div>

          {/* Relationship Manager Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0057B7] rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Book an intro call</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your dedicated Relationship Manager is ready to help you get the most from your account
                </p>
                <Button variant="outline" size="sm">
                  Schedule a call
                </Button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-[#0057B7] hover:bg-[#004494] h-11">
              Go to dashboard
            </Button>
            <Button variant="outline" className="flex-1 h-11">
              Download mobile app
            </Button>
          </div>

          {allComplete && (
            <div className="mt-6 text-center bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-900">
                ✨ <strong>You're all set — welcome aboard!</strong>
              </p>
            </div>
          )}
        </div>
      </ScreenContainer>
    );
  }

  // Manual Review State
  return (
    <ScreenContainer
      currentStep={currentStep}
      stepLabel="Under review"
      percentComplete={95}
      minutesRemaining={0}
      showProgress={false}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#0057B7]" />
          </div>
          <h2 className="mb-4">Thanks for your application</h2>
          <p className="text-gray-600">
            We need a bit more time to review your details
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#0057B7]">1</span>
              </div>
              <div>
                <p className="mb-1">Our team will review your application</p>
                <p className="text-sm text-gray-600">This typically takes 1-2 business hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#0057B7]">2</span>
              </div>
              <div>
                <p className="mb-1">We may contact you for additional information</p>
                <p className="text-sm text-gray-600">Check your email at {'{your-email}'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[#0057B7]">3</span>
              </div>
              <div>
                <p className="mb-1">You'll receive a decision within 24 hours</p>
                <p className="text-sm text-gray-600">We'll email you as soon as we have an update</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#0057B7] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-2">Additional documents</h4>
              <p className="text-sm text-gray-600 mb-4">
                If we need any additional documents, we'll let you know by email. 
                Having these ready can speed up the review:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Proof of business address (utility bill or bank statement)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Recent business bank statements (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#0057B7] hover:bg-[#004494] h-11">
          Return to homepage
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? Contact us at <a href="mailto:support@example.com" className="text-[#0057B7] hover:underline">support@example.com</a>
        </p>
      </div>
    </ScreenContainer>
  );
}

function ChecklistItem({ 
  icon, 
  title, 
  description, 
  completed, 
  onClick 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  completed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
        completed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : icon}
      </div>
      <div className="flex-1 pt-1">
        <h4 className={`mb-1 ${completed ? 'line-through text-gray-500' : ''}`}>
          {title}
        </h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}
