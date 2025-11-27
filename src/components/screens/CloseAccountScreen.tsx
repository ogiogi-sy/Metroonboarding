import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Lock, CreditCard, PauseCircle, Download, HelpCircle, ArrowRight, CheckCircle2, Banknote, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';

interface CloseAccountScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

type Step = 'warning' | 'checklist' | 'confirmation' | 'decision' | 'close-process' | 'switch-process' | 'completion';

export function CloseAccountScreen({ onNavigate, businessData }: CloseAccountScreenProps) {
  const [step, setStep] = useState<Step>('warning');
  const [accountNameInput, setAccountNameInput] = useState('');
  const [closureReason, setClosureReason] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const businessName = businessData?.companyName || "Acme Corp Ltd";

  // Step 1: Warning + Alternatives
  if (step === 'warning') {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => onNavigate('admin')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Center
        </button>

        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="p-8 border-b border-border bg-red-50/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#001A72] mb-2">
                  Are you sure you want to leave?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Closing your account is permanent. You'll lose access to your transaction history, statements, and any active integrations.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <div className="mt-0.5 text-[#0033A0]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-[#0033A0] mb-1">Thinking of switching banks?</h3>
                <p className="text-sm text-blue-800/80">
                  If you're switching to another bank using the Current Account Switch Service (CASS), <span className="font-semibold">please start the process from your new bank</span>. This ensures all your payments are transferred automatically and the switch guarantee applies.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Alternatives to closing</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <PauseCircle className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">Freeze Account temporarily</span>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Pause all activity without closing. Re-activate anytime.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">Downgrade Plan</span>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Switch to a free plan to reduce monthly costs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={() => onNavigate('admin')}
                className="px-6 h-12 bg-[#0033A0] text-white rounded-full hover:bg-[#002b87] transition-colors font-medium"
              >
                Keep my account open
              </button>
              <button
                onClick={() => setStep('checklist')}
                className="px-6 h-12 text-red-600 hover:bg-red-50 rounded-full transition-colors font-medium"
              >
                I still want to proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Checklist Before Closure
  if (step === 'checklist') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-gray-400">Step 1 of 3</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="font-medium text-[#0033A0]">Pre-closure Checklist</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[#001A72] mb-6">Before you continue</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="text-amber-600 shrink-0 mt-1">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-amber-900 mb-1">Outstanding Balance</h3>
                <p className="text-sm text-amber-800">
                  Your account balance must be £0.00 before it can be closed. Please transfer any remaining funds to another account.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Download Statements</p>
                  <p className="text-xs text-gray-500">We recommend exporting your full transaction history for your records.</p>
                </div>
                <button className="text-sm text-[#0033A0] font-medium hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> Export
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Cancel Active Direct Debits</p>
                  <p className="text-xs text-gray-500">You have 3 active Direct Debits. Please move these to your new provider.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Disconnect Integrations</p>
                  <p className="text-xs text-gray-500">Xero and Quickbooks are currently connected to this account.</p>
                </div>
              </div>
            </div>
          </div>

          <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-[#0033A0] rounded border-gray-300"
              checked={confirmationChecked}
              onChange={(e) => setConfirmationChecked(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I understand that I am responsible for clearing any outstanding balances and cancelling recurring payments.
            </span>
          </label>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep('warning')}
              className="px-6 h-12 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep('confirmation')}
              disabled={!confirmationChecked}
              className="px-8 h-12 bg-[#0033A0] text-white rounded-full hover:bg-[#002b87] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Identity Confirmation
  if (step === 'confirmation') {
    return (
      <div className="max-w-xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-gray-400">Step 2 of 3</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="font-medium text-[#0033A0]">Identity Confirmation</span>
        </div>

        <div className="bg-white border border-border rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#0033A0]" />
            </div>
            <h2 className="text-xl font-semibold text-[#001A72] mb-2">Confirm your identity</h2>
            <p className="text-sm text-gray-600">
              To prevent accidental closure, please verify your request.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your business name to confirm
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={businessName}
                  value={accountNameInput}
                  onChange={(e) => setAccountNameInput(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0033A0] focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Please type <span className="font-semibold select-all">{businessName}</span> exactly.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
               <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0" />
               <p className="text-xs text-blue-800">
                 We may also send a verification code to your registered mobile number (+44 •••• ••• 921) upon final submission.
               </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep('checklist')}
                className="px-6 h-12 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('decision')}
                disabled={accountNameInput !== businessName}
                className="px-8 h-12 bg-[#0033A0] text-white rounded-full hover:bg-[#002b87] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Closure / Switch Path Decision
  if (step === 'decision') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-gray-400">Step 3 of 3</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="font-medium text-[#0033A0]">Final Step</span>
        </div>

        <h2 className="text-2xl font-semibold text-[#001A72] mb-6">How would you like to proceed?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Close Account Path */}
          <button
            onClick={() => setStep('completion')}
            className="text-left bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#0033A0] transition-all group relative"
          >
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowRight className="w-6 h-6 text-[#0033A0]" />
            </div>
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#001A72] mb-2">Close my account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Permanently close this account. Any remaining funds must be transferred out first.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Account access removed immediately
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Final statement sent via email
              </li>
            </ul>
            <span className="text-sm font-medium text-red-600 group-hover:underline">Select this option</span>
          </button>

          {/* Switch Path (CASS Info) */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 relative">
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6">
              <RefreshCw className="w-7 h-7 text-[#0033A0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#001A72] mb-2">Switching to another bank?</h3>
            <p className="text-sm text-gray-600 mb-4">
              To use the <span className="font-semibold">Current Account Switch Service (CASS)</span>, you must initiate the switch from your <strong>new bank</strong>.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Do not close your account manually if switching.</p>
              <p className="text-xs text-gray-500">
                Your new bank will handle the closure, transfer your balance, and move your payees automatically within 7 working days.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-[#0033A0] font-medium cursor-pointer hover:underline">
              <HelpCircle className="w-4 h-4" />
              Read the CASS Guarantee
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <button
              onClick={() => setStep('confirmation')}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Go Back
            </button>
        </div>
      </div>
    );
  }

  // Step 5: Completion
  if (step === 'completion') {
    return (
      <div className="max-w-xl mx-auto text-center pt-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-[#001A72] mb-4">Request Submitted</h2>
        <p className="text-gray-600 mb-8">
          We've received your request to close your account. A confirmation email has been sent to <span className="font-medium text-gray-900">admin@acmecorp.com</span>.
        </p>

        <div className="bg-white border border-border rounded-xl p-6 text-left mb-8">
          <h3 className="text-sm font-medium text-[#001A72] mb-4">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-medium">1</div>
              Our team will perform final checks (usually within 24 hours).
            </li>
            <li className="flex gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-medium">2</div>
              You'll receive a final statement document for your records.
            </li>
            <li className="flex gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-medium">3</div>
              Your account access will be revoked once processed.
            </li>
          </ul>
        </div>

        <button
          onClick={() => onNavigate('admin')}
          className="px-8 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return null;
}