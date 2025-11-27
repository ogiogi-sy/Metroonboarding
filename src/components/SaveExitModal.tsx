import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, QrCode, Mail, CheckCircle2 } from 'lucide-react';

interface SaveExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveExitModal({ isOpen, onClose }: SaveExitModalProps) {
  const [selectedOption, setSelectedOption] = useState<'qr' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setTimeout(() => {
      setEmailSent(true);
    }, 500);
  };

  const handleClose = () => {
    setSelectedOption(null);
    setEmail('');
    setEmailSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl max-w-md w-full mx-4 p-6 border border-border">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        {!selectedOption ? (
          <>
            <h3 className="mb-2">Save your progress</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Choose how you'd like to continue your application later
            </p>

            <div className="space-y-3">
              {/* QR Code Option */}
              <button
                onClick={() => setSelectedOption('qr')}
                className="w-full p-4 border border-border rounded-full hover:border-accent hover:bg-blue-tint transition-colors text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-tint rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10">
                    <QrCode className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">Continue in store</h4>
                    <p className="text-sm text-muted-foreground">
                      Scan QR code to continue on your mobile device
                    </p>
                  </div>
                </div>
              </button>

              {/* Email Option */}
              <button
                onClick={() => setSelectedOption('email')}
                className="w-full p-4 border border-border rounded-full hover:border-accent hover:bg-blue-tint transition-colors text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-tint rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">Email me a link</h4>
                    <p className="text-sm text-muted-foreground">
                      Get a secure link to continue later
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Your progress is automatically saved. You can also just close this window and return anytime.
              </p>
            </div>
          </>
        ) : selectedOption === 'qr' ? (
          <>
            <button
              onClick={() => setSelectedOption(null)}
              className="text-sm text-accent hover:underline mb-4"
            >
              ← Back
            </button>
            
            <h3 className="mb-2">Scan to continue</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Scan this QR code with your mobile device to continue your application
            </p>

            {/* QR Code - Using a placeholder, in production would use a QR library */}
            <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
              <div className="w-full aspect-square bg-muted flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">QR Code</p>
                  <p className="text-xs text-muted-foreground mt-2 px-4">
                    In production, this would be a scannable QR code linking to: {currentUrl}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full"
            >
              Done
            </Button>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedOption(null)}
              className="text-sm text-accent hover:underline mb-4"
            >
              ← Back
            </button>

            {!emailSent ? (
              <>
                <h3 className="mb-2">Email me a link</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll send you a secure link to continue your application
                </p>

                <form onSubmit={handleSendEmail} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedOption(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!email}
                    >
                      Send link
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
                  </div>
                  <h3 className="mb-2">Email sent!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    We've sent a link to <strong>{email}</strong>. Click the link in your email to continue your application.
                  </p>
                  <Button onClick={handleClose} className="w-full">
                    Done
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}