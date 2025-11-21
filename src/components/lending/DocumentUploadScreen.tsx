import { Button } from '../ui/button';
import { useState } from 'react';
import { ArrowRight, Upload, CheckCircle2, FileText, AlertCircle, X } from 'lucide-react';

interface DocumentUploadScreenProps {
  onContinue: (documents: UploadedDocument[]) => void;
  onBack: () => void;
  requiredDocuments: DocumentRequirement[];
  skippedOpenBanking: boolean;
}

export interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
}

export interface UploadedDocument {
  requirementId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
}

export function DocumentUploadScreen({
  onContinue,
  onBack,
  requiredDocuments,
  skippedOpenBanking,
}: DocumentUploadScreenProps) {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);

  const handleFileSelect = (requirementId: string, file: File) => {
    const newDoc: UploadedDocument = {
      requirementId,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
    };

    // Remove any existing upload for this requirement
    setUploadedDocs((prev) => [
      ...prev.filter((doc) => doc.requirementId !== requirementId),
      newDoc,
    ]);
  };

  const handleRemove = (requirementId: string) => {
    setUploadedDocs((prev) => prev.filter((doc) => doc.requirementId !== requirementId));
  };

  const isRequirementMet = (requirementId: string) => {
    // Companies House accounts are pre-fetched, so consider them automatically satisfied
    if (requirementId === 'accounts') {
      return true;
    }
    return uploadedDocs.some((doc) => doc.requirementId === requirementId);
  };

  const allRequiredUploaded = requiredDocuments
    .filter((req) => req.required)
    .every((req) => isRequirementMet(req.id));
  
  // Calculate total documents including pre-fetched ones
  const totalDocumentsComplete = requiredDocuments.filter(req => isRequirementMet(req.id)).length;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Upload your documents</h2>
        <p className="text-sm text-muted-foreground">
          {skippedOpenBanking
            ? 'Please upload the required documents to verify your business financials'
            : 'We need a few additional documents to complete your assessment'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border border-border rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm">Upload progress</h4>
          <span className="text-sm text-muted-foreground">
            {totalDocumentsComplete} / {requiredDocuments.length} documents
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent rounded-full h-2 transition-all"
            style={{
              width: `${(totalDocumentsComplete / requiredDocuments.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Document Requirements */}
      <div className="space-y-4 mb-8">
        {requiredDocuments.map((requirement) => {
          const uploaded = uploadedDocs.find((doc) => doc.requirementId === requirement.id);
          const isUploaded = !!uploaded;

          return (
            <div
              key={requirement.id}
              className={`bg-white border-2 rounded-xl p-6 transition-all ${
                isUploaded ? 'border-[#16A34A]' : 'border-border'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUploaded ? 'bg-[#DCFCE7]' : 'bg-muted'
                  }`}
                >
                  {isUploaded ? (
                    <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                  ) : (
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{requirement.title}</h4>
                    {requirement.required && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {requirement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Accepted formats: {requirement.acceptedFormats.join(', ')}
                  </p>
                </div>
              </div>

              {/* Show pre-fetched Companies House document if this is the accounts requirement */}
              {requirement.id === 'accounts' && !isUploaded && (
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-900">Annual_Accounts_2024.pdf</p>
                          <p className="text-xs text-blue-600">2.3 MB</p>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                        From Companies House
                      </span>
                    </div>
                    <p className="text-xs text-blue-700">
                      We've automatically retrieved your latest filed accounts
                    </p>
                  </div>
                  
                  <label className="block">
                    <input
                      type="file"
                      accept={requirement.acceptedFormats.map((f) => `.${f}`).join(',')}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(requirement.id, file);
                      }}
                      className="hidden"
                    />
                    <div className="border border-dashed border-border hover:border-accent rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-accent/5">
                      <p className="text-xs text-muted-foreground">
                        Or click to upload a different version
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Show uploaded document if user uploaded their own */}
              {isUploaded && uploaded ? (
                <div className="bg-[#DCFCE7] border border-[#16A34A]/20 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#16A34A]" />
                    <div>
                      <p className="text-sm text-[#16A34A]">{uploaded.fileName}</p>
                      <p className="text-xs text-[#16A34A]/70">
                        {formatFileSize(uploaded.fileSize)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(requirement.id)}
                    className="text-[#16A34A] hover:text-[#16A34A]/70 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : requirement.id !== 'accounts' && !isUploaded ? (
                /* Show standard upload interface for non-accounts documents */
                <label className="block">
                  <input
                    type="file"
                    accept={requirement.acceptedFormats.map((f) => `.${f}`).join(',')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(requirement.id, file);
                    }}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-border hover:border-accent rounded-lg p-4 text-center cursor-pointer transition-all hover:bg-accent/5">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Max file size: 10MB
                    </p>
                  </div>
                </label>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-[#F5F6F8] rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#0033A0] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm mb-1">Document tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure all documents are clear and legible</li>
              <li>• Statements should show all transactions (not redacted)</li>
              <li>• Most recent accounts filed with Companies House</li>
              <li>• All pages of multi-page documents should be included</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12">
          Back
        </Button>
        <Button
          onClick={() => onContinue(uploadedDocs)}
          disabled={!allRequiredUploaded}
          className="flex-1 h-12 group"
        >
          <span>Continue to review</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}