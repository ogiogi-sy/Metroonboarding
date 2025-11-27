import { useState } from 'react';
import { MessageCircle, X, Bot, Phone, Lightbulb, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface HelpWidgetProps {
  currentStep?: number;
  stepLabel?: string;
  onRestart?: () => void;
}

// Contextual tips for each step
const STEP_TIPS: Record<number, string[]> = {
  1: [
    "We connect directly to Companies House for accuracy",
    "Can't find your business? You can enter details manually",
    "Make sure your business is registered with Companies House",
  ],
  2: [
    "Review all details carefully before continuing",
    "You can edit any information that's incorrect",
    "This information comes directly from Companies House",
  ],
  3: [
    "We'll send KYC invitations to all key people",
    "Directors and PSCs are required by regulation",
    "Each person will complete their own verification",
  ],
  4: [
    "We'll use this to keep you updated about your account",
    "This will be your primary login email",
    "Make sure you have access to this email address",
  ],
  5: [
    "Check your email inbox and spam folder",
    "The code is valid for 10 minutes",
    "You can request a new code if needed",
  ],
  6: [
    "We'll use this for security alerts and notifications",
    "Make sure you can receive texts on this number",
    "This helps us keep your account secure",
  ],
  7: [
    "Check your messages for the verification code",
    "The code is valid for 10 minutes",
    "You can request a new code if needed",
  ],
  8: [
    "Use a strong, unique password you haven't used elsewhere",
    "Include a mix of letters, numbers, and symbols",
    "Never share your password with anyone",
  ],
  9: [
    "Your passcode is used for mobile app access",
    "Choose something memorable but not obvious",
    "Don't use sequential numbers like 12345678",
  ],
  10: [
    "Provide your personal details as they appear on your ID",
    "Ensure all information is accurate and current",
    "This helps us verify your identity securely",
  ],
  11: [
    "Ensure your address matches your ID document",
    "This is required for regulatory compliance",
    "All fields must be completed accurately",
  ],
  12: [
    "Review all information carefully before submitting",
    "You can go back to edit any section",
    "Once submitted, you'll get instant account access",
  ],
};

export function HelpWidget({ currentStep, stepLabel, onRestart }: HelpWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const tips = currentStep ? STEP_TIPS[currentStep] || [] : [];

  const handleChatClick = () => {
    setShowChat(true);
  };

  const handleBookCallClick = () => {
    // In a real implementation, this would open a calendar booking widget
    alert('Call booking feature would open here. You can integrate with Calendly or similar.');
  };

  if (showChat) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white border-2 border-accent rounded-2xl w-96 h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-accent text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white">Metro Assistant</h4>
                <p className="text-xs text-white/80">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
            <div className="space-y-4">
              {/* Welcome message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                  <p className="text-sm">
                    Hi! I'm here to help with your business account application. How can I assist you today?
                  </p>
                </div>
              </div>

              {/* Contextual message based on step */}
              {stepLabel && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm">
                      I see you're on the <span className="font-medium">{stepLabel}</span> step. Would you like some help with this?
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:border-accent text-sm"
              />
              <Button size="sm" className="rounded-full px-6">
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Responses are AI-generated and may not be accurate
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Help"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
        )}
      </button>

      {/* Help Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed bottom-24 right-6 z-50 w-96 bg-white border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-4 border-b border-border">
              <h3 className="mb-1">Need help?</h3>
              <p className="text-sm text-muted-foreground">
                We're here to support you through the process
              </p>
            </div>

            {/* Options */}
            <div className="p-4 space-y-2">
              {/* AI Chat */}
              <button
                onClick={handleChatClick}
                className="w-full bg-white hover:bg-accent/5 border border-border hover:border-accent rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">Chat with AI Assistant</h4>
                    <p className="text-xs text-muted-foreground">
                      Get instant answers to your questions
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </button>

              {/* Book a Call */}
              <button
                onClick={handleBookCallClick}
                className="w-full bg-white hover:bg-accent/5 border border-border hover:border-accent rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">Book a Call</h4>
                    <p className="text-xs text-muted-foreground">
                      Speak with a Metro Bank specialist
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </button>

              {/* Contextual Tips */}
              {tips.length > 0 && (
                <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/20 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm mb-1">Tips for this step</h4>
                      <p className="text-xs text-muted-foreground">
                        {stepLabel}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex gap-2 text-xs">
                        <span className="text-[#F59E0B] flex-shrink-0">•</span>
                        <span className="text-foreground/80">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Available 24/7 • Response time: {'<'}1 minute
              </p>
            </div>

            {/* Restart Button - Only show if onRestart is provided */}
            {onRestart && currentStep && currentStep > 1 && (
              <div className="px-4 pb-4">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restart the application? All your progress will be lost.')) {
                      setIsOpen(false);
                      onRestart();
                    }
                  }}
                  className="w-full bg-white hover:bg-destructive/5 border border-border hover:border-destructive rounded-full p-3 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <RotateCcw className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-destructive">Restart Application</h4>
                      <p className="text-xs text-muted-foreground">
                        Clear all progress and start over
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}