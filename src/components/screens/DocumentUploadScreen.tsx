import { useState } from 'react';
import { Button } from '../ui/button';
import { ScreenContainer } from '../ScreenContainer';
import { Upload, FileText, X, CheckCircle2, Camera } from 'lucide-react';
import { SaveExitModal } from '../SaveExitModal';

interface DocumentUploadScreenProps {
  onNext: (data: { uploadedDocuments: UploadedDocument[] }) => void;
  currentStep: number;
  totalSteps: number;
  initialDocuments?: UploadedDocument[];
}

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
}

export function DocumentUploadScreen({ onNext, currentStep, totalSteps, initialDocuments }: DocumentUploadScreenProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(initialDocuments || []);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        size: `${(file.size / 1024).toFixed(0)} KB`,
      };
      setUploadedDocuments(prev => [...prev, newDoc]);
    }
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const hasPhotoId = uploadedDocuments.some(doc => doc.type === 'Photo ID');
  const hasProofOfAddress = uploadedDocuments.some(doc => doc.type === 'Proof of Address');
  const canProceed = hasPhotoId && hasProofOfAddress;

  const handleContinue = () => {
    onNext({ uploadedDocuments });
  };

  return (
    <ScreenContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Upload documents"
      percentComplete={57}
      minutesRemaining={4}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-3">Upload verification documents</h2>
          <p className="text-muted-foreground">
            Quick verification to meet regulatory requirements
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Photo ID Upload */}
          <div className={`border-2 border-dashed rounded-xl p-6 transition-all ${
            hasPhotoId ? 'bg-[#DCFCE7] border-[#16A34A]' : 'bg-white border-border hover:border-accent'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                hasPhotoId ? 'bg-[#16A34A]/10' : 'bg-accent/10'
              }`}>
                {hasPhotoId ? (
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                ) : (
                  <Camera className="w-6 h-6 text-accent" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="mb-2">Photo ID *</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Passport, driving licence, or national ID card
                </p>
                {!hasPhotoId && (
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'Photo ID')}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      Choose file
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Proof of Address Upload */}
          <div className={`border-2 border-dashed rounded-xl p-6 transition-all ${
            hasProofOfAddress ? 'bg-[#DCFCE7] border-[#16A34A]' : 'bg-white border-border hover:border-accent'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                hasProofOfAddress ? 'bg-[#16A34A]/10' : 'bg-accent/10'
              }`}>
                {hasProofOfAddress ? (
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                ) : (
                  <FileText className="w-6 h-6 text-accent" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="mb-2">Proof of address *</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Utility bill or bank statement (within last 3 months)
                </p>
                {!hasProofOfAddress && (
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'Proof of Address')}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      Choose file
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Documents List */}
        {uploadedDocuments.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3">Uploaded documents</h4>
            <div className="space-y-2">
              {uploadedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-1 hover:bg-background rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSaveModal(true)}
            className="flex-1"
          >
            Save & Exit
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!canProceed}
            className="flex-1"
          >
            {canProceed ? 'Continue' : 'Upload required documents'}
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