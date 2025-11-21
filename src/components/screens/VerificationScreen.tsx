import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ScreenContainer } from '../ScreenContainer';
import { Shield, CheckCircle2, Camera, Building2, Upload, FileText, X, AlertCircle } from 'lucide-react';

interface VerificationScreenProps {
  onNext: () => void;
  currentStep: number;
  onSaveExit?: () => void;
  initialDocuments?: any[];
  onUpdateDocuments?: (docs: any[]) => void;
}

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
}

export function VerificationScreen({ onNext, currentStep, onSaveExit, initialDocuments, onUpdateDocuments }: VerificationScreenProps) {
  const [uploadPhase, setUploadPhase] = useState<'upload' | 'verify'>('upload');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(initialDocuments || []);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verifying' | 'verified'>('pending');
  const [kybStatus, setKybStatus] = useState<'pending' | 'verifying' | 'verified'>('pending');

  useEffect(() => {
    if (kycStatus === 'verifying') {
      // Simulate KYC verification
      setTimeout(() => {
        setKycStatus('verified');
        setKybStatus('verifying');
      }, 3000);
    }
    
    if (kybStatus === 'verifying') {
      // Simulate KYB verification
      setTimeout(() => {
        setKybStatus('verified');
      }, 2500);
    }
  }, [kycStatus, kybStatus]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        size: `${(file.size / 1024).toFixed(0)} KB`,
      };
      const updatedDocs = [...uploadedDocuments, newDoc];
      setUploadedDocuments(updatedDocs);
      if (onUpdateDocuments) {
        onUpdateDocuments(updatedDocs);
      }
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocs = uploadedDocuments.filter(doc => doc.id !== id);
    setUploadedDocuments(updatedDocs);
    if (onUpdateDocuments) {
      onUpdateDocuments(updatedDocs);
    }
  };

  const handleStartVerification = () => {
    setUploadPhase('verify');
    setKycStatus('verifying');
  };

  const hasPhotoId = uploadedDocuments.some(doc => doc.type === 'Photo ID');
  const hasProofOfAddress = uploadedDocuments.some(doc => doc.type === 'Proof of Address');
  const canProceed = hasPhotoId && hasProofOfAddress;

  const allVerified = kycStatus === 'verified' && kybStatus === 'verified';

  // Upload Phase
  if (uploadPhase === 'upload') {
    return (
      <ScreenContainer
        currentStep={currentStep}
        stepLabel="Upload documents"
        percentComplete={65}
        minutesRemaining={3}
        onSaveExit={onSaveExit}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-[#0057B7]" />
            </div>
            <h2 className="mb-3">Upload your documents</h2>
            <p className="text-gray-600">
              We need a few documents to verify your identity and comply with regulations
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Photo ID Upload */}
            <div className={`border-2 border-dashed rounded-xl p-6 transition-all ${
              hasPhotoId ? 'bg-green-50 border-green-300' : 'bg-white border-gray-300 hover:border-gray-400'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  hasPhotoId ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {hasPhotoId ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Camera className="w-6 h-6 text-[#0057B7]" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">Photo ID *</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a clear photo of your passport, driving licence, or national ID card
                  </p>
                  {!hasPhotoId && (
                    <label className="inline-block">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'Photo ID')}
                        className="hidden"
                      />
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0057B7] text-white rounded-xl cursor-pointer hover:bg-[#004494] transition-colors text-sm">
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
              hasProofOfAddress ? 'bg-green-50 border-green-300' : 'bg-white border-gray-300 hover:border-gray-400'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  hasProofOfAddress ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {hasProofOfAddress ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <FileText className="w-6 h-6 text-[#0057B7]" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">Proof of address *</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Recent utility bill, bank statement, or council tax bill (dated within last 3 months)
                  </p>
                  {!hasProofOfAddress && (
                    <label className="inline-block">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'Proof of Address')}
                        className="hidden"
                      />
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0057B7] text-white rounded-xl cursor-pointer hover:bg-[#004494] transition-colors text-sm">
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
            <div className="mb-8">
              <h3 className="mb-4">Uploaded documents</h3>
              <div className="space-y-3">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#0057B7]" />
                      </div>
                      <div>
                        <p className="text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#0057B7] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="mb-2">Document requirements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0057B7]">•</span>
                    <span>Documents must be clear and readable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0057B7]">•</span>
                    <span>All four corners of the document must be visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0057B7]">•</span>
                    <span>Accepted formats: JPG, PNG, or PDF (max 10MB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0057B7]">•</span>
                    <span>Proof of address must be dated within the last 3 months</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleStartVerification}
            disabled={!canProceed}
            className="w-full h-11 bg-[#0057B7] hover:bg-[#004494]"
          >
            {canProceed ? 'Continue to verification' : 'Upload required documents to continue'}
          </Button>
        </div>
      </ScreenContainer>
    );
  }

  // Verification Phase
  return (
    <ScreenContainer
      currentStep={currentStep}
      stepLabel="Identity verification"
      percentComplete={70}
      minutesRemaining={2}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#0057B7]" />
          </div>
          <h2 className="mb-3">Verifying your documents</h2>
          <p className="text-gray-600">
            We're checking your documents and business details for regulatory compliance
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* KYC Verification Card */}
          <div className={`border rounded-xl p-6 transition-all ${
            kycStatus === 'verified' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                kycStatus === 'verified' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {kycStatus === 'verified' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Camera className="w-6 h-6 text-[#0057B7]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Identity verification (KYC)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {kycStatus === 'pending' && 'Verifying your photo ID and personal details'}
                  {kycStatus === 'verifying' && 'We\'re securely checking your identity documents...'}
                  {kycStatus === 'verified' && 'Your identity has been verified'}
                </p>
                {kycStatus === 'verifying' && (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-[#0057B7] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-600">Verifying... this usually takes under a minute</span>
                  </div>
                )}
                {kycStatus === 'verified' && (
                  <p className="text-sm text-green-700">✓ Verified successfully</p>
                )}
              </div>
            </div>
          </div>

          {/* KYB Verification Card */}
          <div className={`border rounded-xl p-6 transition-all ${
            kybStatus === 'verified' ? 'bg-green-50 border-green-200' : 
            kybStatus === 'verifying' ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                kybStatus === 'verified' ? 'bg-green-100' : 
                kybStatus === 'verifying' ? 'bg-blue-100' : 'bg-gray-200'
              }`}>
                {kybStatus === 'verified' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Building2 className={`w-6 h-6 ${kybStatus === 'verifying' ? 'text-[#0057B7]' : 'text-gray-400'}`} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Business verification (KYB)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {kybStatus === 'pending' && 'Automatic verification of your business details'}
                  {kybStatus === 'verifying' && 'We\'re checking your business information...'}
                  {kybStatus === 'verified' && 'Your business has been verified'}
                </p>
                {kybStatus === 'verifying' && (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-[#0057B7] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-600">Checking business records...</span>
                  </div>
                )}
                {kybStatus === 'verified' && (
                  <p className="text-sm text-green-700">✓ Verified successfully</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {allVerified && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="mb-2">All checks complete!</h3>
              <p className="text-sm text-gray-600">
                Your identity and business have been successfully verified
              </p>
            </div>

            <Button 
              onClick={onNext}
              className="w-full h-11 bg-[#0057B7] hover:bg-[#004494]"
            >
              Continue to review
            </Button>
          </div>
        )}
      </div>
    </ScreenContainer>
  );
}