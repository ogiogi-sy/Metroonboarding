import { Shield, UserPlus, CheckCircle2, AlertCircle, Clock, FileSignature } from 'lucide-react';

interface TeamDirectorsScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

interface Director {
  id: string;
  name: string;
  role: 'Director' | 'UBO' | 'PSC';
  verificationStatus: 'verified' | 'verification_required' | 'pending' | 'action_needed';
  mandateRequirement: 'required' | 'optional';
  signatureStatus: 'on_file' | 'needed' | 'update_requested';
  email: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Finance Manager' | 'Payment Approver' | 'Payment Maker' | 'Viewer' | 'Custom';
  permissions: 'Make' | 'Approve' | 'View';
  status: 'Active' | 'Invited' | 'Suspended';
  lastLogin?: string;
}

const mockDirectors: Director[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Director',
    verificationStatus: 'verified',
    mandateRequirement: 'required',
    signatureStatus: 'on_file',
    email: 'sarah.mitchell@business.com'
  },
  {
    id: '2',
    name: 'James Cooper',
    role: 'Director',
    verificationStatus: 'verification_required',
    mandateRequirement: 'required',
    signatureStatus: 'needed',
    email: 'james.cooper@business.com'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'PSC',
    verificationStatus: 'pending',
    mandateRequirement: 'optional',
    signatureStatus: 'on_file',
    email: 'emma.thompson@business.com'
  }
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Michael Chen',
    email: 'michael.chen@business.com',
    role: 'Finance Manager',
    permissions: 'Approve',
    status: 'Active',
    lastLogin: '2 hours ago'
  },
  {
    id: '2',
    name: 'Lucy Davies',
    email: 'lucy.davies@business.com',
    role: 'Payment Maker',
    permissions: 'Make',
    status: 'Active',
    lastLogin: '1 day ago'
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'robert.wilson@business.com',
    role: 'Viewer',
    permissions: 'View',
    status: 'Invited',
    lastLogin: undefined
  }
];

export function TeamDirectorsScreen({ onNavigate, businessData }: TeamDirectorsScreenProps) {
  const getVerificationBadge = (status: Director['verificationStatus']) => {
    const badges = {
      verified: { color: 'bg-[#16A34A]/10 text-[#16A34A]', icon: CheckCircle2, label: 'Verified' },
      verification_required: { color: 'bg-[#EA580C]/10 text-[#EA580C]', icon: AlertCircle, label: 'Verification Required' },
      pending: { color: 'bg-[#0033A0]/10 text-[#0033A0]', icon: Clock, label: 'Pending' },
      action_needed: { color: 'bg-[#B91C1C]/10 text-[#B91C1C]', icon: AlertCircle, label: 'Action Needed' }
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

  const getStatusBadge = (status: TeamMember['status']) => {
    const badges = {
      Active: 'bg-[#16A34A]/10 text-[#16A34A]',
      Invited: 'bg-[#0033A0]/10 text-[#0033A0]',
      Suspended: 'bg-[#475569]/10 text-[#475569]'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${badges[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="mb-2" style={{ color: '#001A72' }}>Team & Directors</h2>
          <p className="text-sm text-muted-foreground">
            Manage roles, mandates, approvals, verification, and access
          </p>
        </div>
        <button
          onClick={() => onNavigate('team-add-selector')}
          className="inline-flex items-center gap-2 px-6 h-12 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Add User or Director
        </button>
      </div>

      {/* Directors Section */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" style={{ color: '#001A72' }} />
          <h3 style={{ color: '#001A72' }}>Directors</h3>
        </div>

        <div className="space-y-3">
          {mockDirectors.map((director) => (
            <div 
              key={director.id}
              className="bg-white border border-border rounded-xl p-5 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between">
                {/* Left: Avatar + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-accent">{director.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 style={{ color: '#001A72' }}>{director.name}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#E9F2FF] text-[#0033A0]">
                        {director.role}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{director.email}</p>
                    
                    <div className="flex items-center gap-3">
                      {getVerificationBadge(director.verificationStatus)}
                      {director.signatureStatus === 'on_file' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#16A34A]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Signature on file
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Button */}
                <button
                  onClick={() => onNavigate('director-detail')}
                  className="px-5 h-10 border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-colors flex-shrink-0"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div>
        <div className="mb-4">
          <h3 style={{ color: '#001A72' }}>Team Members</h3>
        </div>

        <div className="space-y-3">
          {mockTeamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white border border-border rounded-xl p-5 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between">
                {/* Left: Avatar + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-[#E9F2FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-[#0033A0]">{member.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 style={{ color: '#001A72' }}>{member.name}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#E9F2FF] text-[#0033A0]">
                        {member.role}
                      </span>
                      {getStatusBadge(member.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>

                {/* Right: Action Button */}
                <button
                  onClick={() => onNavigate('team-member-detail')}
                  className="px-5 h-10 border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-colors flex-shrink-0"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}