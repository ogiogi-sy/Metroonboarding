import { X, Download, Share2, Eye, EyeOff, FileText, File, AlertCircle, Receipt, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Document } from '../data/documents';

interface DocumentDrawerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onFilterByAccount?: (account: string) => void;
}

export function DocumentDrawer({ document, isOpen, onClose, onFilterByAccount }: DocumentDrawerProps) {
  if (!document) return null;

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'Statement':
        return <FileText className="h-5 w-5 text-accent" />;
      case 'Tax':
        return <Receipt className="h-5 w-5 text-accent" />;
      case 'Letter':
      case 'Notice':
        return <File className="h-5 w-5 text-accent" />;
      case 'Verification':
        return <CheckCircle2 className="h-5 w-5 text-accent" />;
      case 'Uploaded':
        return <File className="h-5 w-5 text-accent" />;
      default:
        return <FileText className="h-5 w-5 text-accent" />;
    }
  };

  const handleDownload = () => {
    toast.success('Downloading document...');
  };

  const handleShare = () => {
    toast.success('Share with accountant feature coming soon');
  };

  const handleToggleRead = () => {
    const newStatus = document.status === 'Read' ? 'Unread' : 'Read';
    toast.success(`Marked as ${newStatus.toLowerCase()}`);
  };

  const handleViewAllFromAccount = () => {
    if (onFilterByAccount) {
      onFilterByAccount(document.accountNumber);
      onClose();
      toast.success(`Filtered to ${document.account}`);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base" style={{ color: '#001A72' }}>Document Preview</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Document Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                {getDocumentIcon(document.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg mb-0.5" style={{ color: '#001A72' }}>{document.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{document.type}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <Badge className={`${
                    document.status === 'Unread' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-muted text-muted-foreground'
                  } border-0 text-xs`}>
                    {document.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* PDF Preview Placeholder */}
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 aspect-[3/4] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">PDF Preview</p>
                <p className="text-xs text-muted-foreground mt-1">{document.size}</p>
              </div>
            </div>

            {/* Document Metadata */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Document Information</p>
              
              {/* Entity */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Entity</p>
                  <p className="text-sm" style={{ color: '#001A72' }}>{document.entity}</p>
                </div>
              </div>

              {/* Account */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Account</p>
                  <p className="text-sm" style={{ color: '#001A72' }}>
                    {document.account} • {document.accountNumber}
                  </p>
                </div>
              </div>

              {/* Date Created */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Date Created</p>
                  <p className="text-sm" style={{ color: '#001A72' }}>{formatDate(document.date)}</p>
                </div>
              </div>

              {/* File Size */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">File Size</p>
                  <p className="text-sm" style={{ color: '#001A72' }}>{document.size}</p>
                </div>
              </div>

              {/* Document ID */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Document ID</p>
                  <p className="text-sm font-mono" style={{ color: '#001A72' }}>{document.id}</p>
                </div>
              </div>

              {/* Description */}
              {document.description && (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>{document.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Actions</p>

              <Button
                className="w-full justify-start gap-3 h-auto py-3 px-4 bg-accent hover:bg-accent/90 text-white"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
                <span>Share with Accountant</span>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4"
                onClick={handleToggleRead}
              >
                {document.status === 'Read' ? (
                  <>
                    <EyeOff className="h-5 w-5" />
                    <span>Mark as Unread</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-5 w-5" />
                    <span>Mark as Read</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6">
            <button
              onClick={handleViewAllFromAccount}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all documents from this account →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
