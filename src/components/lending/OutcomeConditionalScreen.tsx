import { Button } from '../ui/button';
import { Clock, User, FileText, ArrowRight, Calendar } from 'lucide-react';

interface OutcomeConditionalScreenProps {
  reasons: string[];
  onBookCall: () => void;
  onUploadDocs: () => void;
  onExit: () => void;
}

export function OutcomeConditionalScreen({
  reasons,
  onBookCall,
  onUploadDocs,
  onExit,
}: OutcomeConditionalScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="mb-4">You may be eligible for lending</h1>
        <p className="text-muted-foreground">
          A specialist will review your application to provide a final decision
        </p>
      </div>

      {/* Why Manual Review */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h4 className="mb-4">Why we need to review manually</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Your application requires specialist review for one or more of the following reasons:
        </p>
        
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <span className="text-primary">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
        <h4 className="mb-4">Next steps</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div className="pt-1">
              <p className="text-sm mb-1">Book a call with a relationship manager</p>
              <p className="text-xs text-muted-foreground">
                They'll review your application and discuss your lending needs
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div className="pt-1">
              <p className="text-sm mb-1">Provide any additional information</p>
              <p className="text-xs text-muted-foreground">
                Your RM may request supplementary documents or details
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div className="pt-1">
              <p className="text-sm mb-1">Receive your decision</p>
              <p className="text-xs text-muted-foreground">
                Usually within 2-3 business days after your call
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Options */}
      <div className="space-y-3 mb-8">
        {/* Book Call Option */}
        <div className="bg-white border-2 border-border hover:border-accent rounded-xl p-6 group transition-all">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Speak with a relationship manager</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Book a convenient time to discuss your application with a lending specialist
              </p>
            </div>
          </div>
          <Button onClick={onBookCall} className="w-full group/btn">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Book a call</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Upload Docs Option */}
        <div className="bg-white border-2 border-border hover:border-accent rounded-xl p-6 group transition-all">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Upload additional documents</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If you have supporting documents ready, upload them now to expedite your review
              </p>
            </div>
          </div>
          <Button onClick={onUploadDocs} variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Upload documents
          </Button>
        </div>
      </div>

      {/* Continue Later */}
      <div className="text-center">
        <Button variant="ghost" onClick={onExit} className="w-full">
          I'll do this later
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Your application has been saved. You'll receive an email with instructions to continue.
        </p>
      </div>
    </div>
  );
}