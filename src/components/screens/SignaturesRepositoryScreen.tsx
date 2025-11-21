import { ArrowLeft, FileSignature, Download, Upload, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface SignaturesRepositoryScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

interface Signature {
  id: string;
  directorName: string;
  role: string;
  status: 'on_file' | 'needed' | 'update_requested';
  dateAdded?: string;
  signatureUrl?: string;
}

const mockSignatures: Signature[] = [
  {
    id: '1',
    directorName: 'Sarah Mitchell',
    role: 'Director',
    status: 'on_file',
    dateAdded: '10 Jan 2025',
    signatureUrl: '#'
  },
  {
    id: '2',
    directorName: 'James Cooper',
    role: 'Director',
    status: 'needed'
  },
  {
    id: '3',
    directorName: 'Emma Thompson',
    role: 'PSC',
    status: 'on_file',
    dateAdded: '08 Jan 2025',
    signatureUrl: '#'
  },
  {
    id: '4',
    directorName: 'Robert Williams',
    role: 'UBO',
    status: 'update_requested',
    dateAdded: '05 Jan 2025',
    signatureUrl: '#'
  }
];

export function SignaturesRepositoryScreen({ onNavigate, businessData }: SignaturesRepositoryScreenProps) {
  const getStatusBadge = (status: Signature['status']) => {
    const badges = {
      on_file: { color: 'bg-[#16A34A]/10 text-[#16A34A]', icon: CheckCircle2, label: 'On file' },
      needed: { color: 'bg-[#EA580C]/10 text-[#EA580C]', icon: AlertCircle, label: 'Needed' },
      update_requested: { color: 'bg-[#0033A0]/10 text-[#0033A0]', icon: AlertCircle, label: 'Update requested' }
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${badge.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="max-w-5xl">
      {/* Back button */}
      <button
        onClick={() => onNavigate('team-directors')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Team & Directors
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileSignature className="w-6 h-6" style={{ color: '#001A72' }} />
          <h2 style={{ color: '#001A72' }}>Signatures Repository</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Store and manage all signatures used for legal mandates and approvals
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E9F2FF] border border-[#0033A0]/20 rounded-xl p-4 mb-8">
        <p className="text-sm" style={{ color: '#001A72' }}>
          All signatures are encrypted and stored securely. They are used for mandate verification and compliance purposes.
        </p>
      </div>

      {/* Signatures List */}
      <div className="space-y-4">
        {mockSignatures.map((signature) => (
          <div 
            key={signature.id}
            className="bg-white border border-border rounded-xl p-6 hover:border-accent transition-colors"
          >
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg text-accent">{signature.directorName.charAt(0)}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="mb-1" style={{ color: '#001A72' }}>{signature.directorName}</h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-[#E9F2FF] text-[#0033A0]">
                        {signature.role}
                      </span>
                      {getStatusBadge(signature.status)}
                    </div>
                  </div>
                </div>

                {signature.status === 'on_file' && signature.signatureUrl ? (
                  <div>
                    {/* Signature Preview */}
                    <div className="mb-4 p-6 bg-[#F5F7FA] rounded-lg border border-border">
                      <div className="h-24 flex items-center justify-center">
                        <p className="text-lg italic text-muted-foreground">
                          {signature.directorName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Added</p>
                        <p className="text-sm" style={{ color: '#001A72' }}>{signature.dateAdded}</p>
                      </div>

                      <div className="flex gap-2">
                        <button className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                          <Upload className="w-4 h-4" />
                          Replace
                        </button>
                      </div>
                    </div>
                  </div>
                ) : signature.status === 'update_requested' ? (
                  <div>
                    {/* Old Signature Preview */}
                    <div className="mb-4 p-6 bg-[#F5F7FA] rounded-lg border border-dashed border-[#EA580C]">
                      <div className="h-24 flex items-center justify-center">
                        <p className="text-lg italic text-muted-foreground opacity-50">
                          {signature.directorName}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#EA580C]/10 rounded-lg mb-4">
                      <p className="text-sm" style={{ color: '#001A72' }}>
                        Update requested - Current signature expires soon or requires refresh
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-2 px-4 h-10 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload New Signature
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                        <Send className="w-4 h-4" />
                        Request from Director
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* No Signature State */}
                    <div className="mb-4 p-6 bg-[#F5F7FA] rounded-lg border-2 border-dashed border-border">
                      <div className="h-24 flex flex-col items-center justify-center text-center">
                        <FileSignature className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No signature on file</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-2 px-4 h-10 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Signature
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                        <Send className="w-4 h-4" />
                        Send Request
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                        Add on Behalf
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signature Requirements Info */}
      <div className="bg-white border border-border rounded-xl p-6 mt-8">
        <h3 className="mb-4" style={{ color: '#001A72' }}>Signature Requirements</h3>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <p>Signatures must be clear and legible</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <p>Accepted formats: PNG, JPG, or drawn digitally</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <p>Signatures are used for mandate verification and high-value approvals</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <p>All signatures are encrypted and stored securely in compliance with UK regulations</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => onNavigate('team-directors')}
          className="px-8 h-12 border border-border rounded-full hover:border-accent transition-colors"
        >
          Back to Team & Directors
        </button>
      </div>
    </div>
  );
}
