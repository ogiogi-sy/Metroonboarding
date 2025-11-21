import { ArrowLeft, Shield, CheckCircle2, FileSignature, Activity, Edit3 } from 'lucide-react';

interface DirectorDetailScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function DirectorDetailScreen({ onNavigate, businessData }: DirectorDetailScreenProps) {
  // Mock data for a director
  const director = {
    name: 'Sarah Mitchell',
    role: 'Director',
    email: 'sarah.mitchell@business.com',
    phone: '+44 7700 900123',
    dateOfBirth: '15/03/1985',
    address: '42 High Street, London, SW1A 1AA',
    verificationStatus: 'verified',
    lastVerified: '15 Jan 2025',
    verificationAttempts: 1,
    mandateRules: [
      { category: 'Payments over £10,000', required: true, threshold: '£10,000' },
      { category: 'New payee approvals', required: true, threshold: 'All' },
      { category: 'Account changes', required: true, threshold: 'All' },
      { category: 'Credit applications', required: true, threshold: 'All' }
    ],
    signatureStatus: 'on_file',
    signatureDate: '10 Jan 2025'
  };

  const activityLog = [
    { date: '15 Jan 2025', action: 'Verification completed', type: 'success' },
    { date: '12 Jan 2025', action: 'Signature added', type: 'success' },
    { date: '10 Jan 2025', action: 'Mandate rules updated', type: 'info' },
    { date: '08 Jan 2025', action: 'Verification request sent', type: 'info' },
    { date: '05 Jan 2025', action: 'Director added', type: 'info' }
  ];

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
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl text-accent">{director.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="mb-1" style={{ color: '#001A72' }}>{director.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#E9F2FF] text-[#0033A0]">
                  {director.role}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#16A34A]/10 text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{director.email}</p>
            </div>
          </div>
          <button className="px-6 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
            Request Verification Again
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Identity & Verification */}
        <div className="bg-white border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h3 style={{ color: '#001A72' }}>Identity & Verification</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <p className="text-sm" style={{ color: '#001A72' }}>Verified</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Last Verified</p>
              <p className="text-sm" style={{ color: '#001A72' }}>{director.lastVerified}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Verification Attempts</p>
              <p className="text-sm" style={{ color: '#001A72' }}>{director.verificationAttempts}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Personal Details</p>
              <div className="text-sm space-y-1" style={{ color: '#001A72' }}>
                <p>DOB: {director.dateOfBirth}</p>
                <p>Phone: {director.phone}</p>
                <p className="text-xs text-muted-foreground">{director.address}</p>
              </div>
            </div>

            <button className="w-full h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
              View Verification Details
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="bg-white border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileSignature className="w-5 h-5 text-accent" />
            <h3 style={{ color: '#001A72' }}>Signature</h3>
          </div>

          <div className="space-y-4">
            <div className="h-32 bg-[#F5F7FA] rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground italic">
                  {director.signatureStatus === 'on_file' ? 'Signature on file' : 'No signature'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <p className="text-sm" style={{ color: '#001A72' }}>Signature on file</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Added</p>
              <p className="text-sm" style={{ color: '#001A72' }}>{director.signatureDate}</p>
            </div>

            <div className="space-y-2">
              <button className="w-full h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                Upload New Signature
              </button>
              <button className="w-full h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                Request Signature from Director
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandate & Approval Rules */}
      <div className="bg-white border border-border rounded-xl p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ color: '#001A72' }}>Mandate & Approval Rules</h3>
          <button 
            onClick={() => onNavigate('mandates-editor')}
            className="inline-flex items-center gap-2 px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Manage Rules
          </button>
        </div>

        <div className="space-y-3">
          {director.mandateRules.map((rule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
              <div>
                <p className="text-sm mb-1" style={{ color: '#001A72' }}>{rule.category}</p>
                <p className="text-xs text-muted-foreground">Threshold: {rule.threshold}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                rule.required 
                  ? 'bg-[#16A34A]/10 text-[#16A34A]' 
                  : 'bg-[#475569]/10 text-[#475569]'
              }`}>
                {rule.required ? 'Required' : 'Optional'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white border border-border rounded-xl p-6 mt-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-accent" />
          <h3 style={{ color: '#001A72' }}>Activity Log</h3>
          <span className="text-sm text-muted-foreground">({activityLog.length} items)</span>
        </div>

        <div className="space-y-3">
          {activityLog.map((log, index) => (
            <div key={index} className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                log.type === 'success' ? 'bg-[#16A34A]' : 'bg-[#0033A0]'
              }`} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#001A72' }}>{log.action}</p>
                <p className="text-xs text-muted-foreground">{log.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="px-8 h-12 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors">
          Edit Role
        </button>
        <button 
          onClick={() => onNavigate('team-directors')}
          className="px-8 h-12 border border-border rounded-full hover:border-accent transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
