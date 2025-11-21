import { Button } from '../ui/button';
import { XCircle, User, Download, Lightbulb, ArrowRight } from 'lucide-react';

interface OutcomeDeclinedScreenProps {
  reasons: string[];
  canSpeakToRM: boolean;
  onSpeakToRM?: () => void;
  onDownloadSummary: () => void;
  onExit: () => void;
}

export function OutcomeDeclinedScreen({
  reasons,
  canSpeakToRM,
  onSpeakToRM,
  onDownloadSummary,
  onExit,
}: OutcomeDeclinedScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-6">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="mb-4">Unable to approve at this time</h1>
        <p className="text-muted-foreground">
          Unfortunately, we're unable to offer you a business loan right now
        </p>
      </div>

      {/* Reasons */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h4 className="mb-4">Why we couldn't approve your application</h4>
        
        <ul className="space-y-3">
          {reasons.map((reason, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-destructive mt-1">•</span>
              <span className="text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improve Eligibility Tips */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-[#F59E0B] flex-shrink-0" />
          <div>
            <h4 className="mb-2">How to improve your eligibility</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-[#F59E0B]">•</span>
                <span>Build your business turnover and maintain stable revenue</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F59E0B]">•</span>
                <span>Reduce existing debt and improve your debt-to-income ratio</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F59E0B]">•</span>
                <span>Ensure your business accounts are up to date</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F59E0B]">•</span>
                <span>Maintain healthy cashflow and avoid overdrafts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F59E0B]">•</span>
                <span>Build a longer trading history if you're a new business</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Options */}
      <div className="space-y-3 mb-8">
        {/* Speak to RM (if eligible) */}
        {canSpeakToRM && onSpeakToRM && (
          <div className="bg-white border-2 border-border rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">Speak to a relationship manager</h4>
                <p className="text-sm text-muted-foreground">
                  Discuss your circumstances and explore alternative options
                </p>
              </div>
            </div>
            <Button onClick={onSpeakToRM} className="w-full group">
              <span>Contact relationship manager</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Download Summary */}
        <div className="bg-white border-2 border-border rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Download assessment summary</h4>
              <p className="text-sm text-muted-foreground">
                Get a detailed breakdown of your application assessment
              </p>
            </div>
          </div>
          <Button onClick={onDownloadSummary} variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download summary
          </Button>
        </div>
      </div>

      {/* Alternative Options */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
        <h4 className="mb-3">Other ways we can help</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Overdraft facilities for short-term cashflow needs</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Invoice financing to unlock working capital</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Business credit cards for flexible spending</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span>Financial planning support to strengthen your position</span>
          </li>
        </ul>
      </div>

      {/* Exit Button */}
      <div className="text-center">
        <Button onClick={onExit} variant="outline" className="w-full h-12">
          Return to dashboard
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          You can reapply after 6 months or when your circumstances improve
        </p>
      </div>
    </div>
  );
}