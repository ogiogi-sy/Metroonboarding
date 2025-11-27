import React from 'react';
import { ArrowLeft, UserCircle, Shield, Activity, Smartphone, AlertTriangle, CheckSquare, Square } from 'lucide-react';

interface TeamMemberDetailScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function TeamMemberDetailScreen({ onNavigate, businessData }: TeamMemberDetailScreenProps) {
  const [isEditingPermissions, setIsEditingPermissions] = React.useState(false);
  const [accessType, setAccessType] = React.useState<'all' | 'specific'>('all');
  const [notifications, setNotifications] = React.useState({
    payments: true,
    statements: false,
    security: true,
    marketing: false
  });

  // Mock data for a team member
  const [member, setMember] = React.useState({
    name: 'Michael Chen',
    role: 'Finance Manager',
    email: 'michael.chen@business.com',
    status: 'Active',
    joinedDate: '10 Jan 2025',
    lastLogin: '2 hours ago',
    permissions: {
      viewAccounts: true,
      initiatePayments: true,
      approvePayments: true,
      manageUsers: false,
      viewLoans: true,
      applyForCredit: false,
      viewStatements: true,
      exportData: true,
      manageCards: false,
      changeBusinessDetails: false
    },
    mandates: {
      participates: true,
      approvalLevel: 'payments_10k',
      threshold: '£10,000'
    },
    devices: [
      { name: 'iPhone 14 Pro', lastUsed: '2 hours ago', location: 'London, UK' },
      { name: 'MacBook Pro', lastUsed: '1 day ago', location: 'London, UK' }
    ]
  });

  const togglePermission = (key: keyof typeof member.permissions) => {
    setMember(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  const activityLog = [
    { date: '21 Nov 2025, 14:30', action: 'Approved payment to supplier', type: 'success' },
    { date: '21 Nov 2025, 09:15', action: 'Logged in from iPhone', type: 'info' },
    { date: '20 Nov 2025, 16:45', action: 'Initiated payment for £8,500', type: 'info' },
    { date: '20 Nov 2025, 11:20', action: 'Exported statement data', type: 'info' },
    { date: '19 Nov 2025, 10:00', action: 'Logged in from MacBook', type: 'info' }
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
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#E9F2FF] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl text-[#0033A0]">{member.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="mb-1" style={{ color: '#001A72' }}>{member.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#E9F2FF] text-[#0033A0]">
                  {member.role}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#16A34A]/10 text-[#16A34A]">
                  {member.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Joined {member.joinedDate}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-6 h-10 border border-[#EA580C] text-[#EA580C] rounded-full text-sm hover:bg-[#EA580C]/5 transition-colors">
              Suspend
            </button>
            <button className="px-6 h-10 border border-[#B91C1C] text-[#B91C1C] rounded-full text-sm hover:bg-[#B91C1C]/5 transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Role & Permissions */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <h3 style={{ color: '#001A72' }}>Role & Permissions</h3>
          </div>
          <button 
            onClick={() => setIsEditingPermissions(!isEditingPermissions)}
            className={`px-4 h-10 border rounded-full text-sm transition-colors ${
              isEditingPermissions 
                ? 'bg-accent text-white border-accent' 
                : 'border-border hover:border-accent'
            }`}
          >
            {isEditingPermissions ? 'Done Editing' : 'Edit Permissions'}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
            Role
          </label>
          <select
            value={member.role}
            disabled={!isEditingPermissions}
            onChange={(e) => setMember({...member, role: e.target.value})}
            className="w-full max-w-md h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="Admin">Admin</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Payment Approver">Payment Approver</option>
            <option value="Payment Maker">Payment Maker</option>
            <option value="Viewer">Viewer</option>
            <option value="Custom">Custom Role</option>
          </select>
        </div>

        <div>
          <p className="text-sm mb-4" style={{ color: '#001A72' }}>
            {isEditingPermissions ? 'Customize Permissions:' : 'Current Permissions:'}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(member.permissions).map(([key, value]) => (
              <div 
                key={key} 
                onClick={() => isEditingPermissions && togglePermission(key as keyof typeof member.permissions)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isEditingPermissions ? 'cursor-pointer hover:bg-gray-50' : ''
                } ${value ? 'bg-[#E9F2FF]' : 'bg-[#F5F7FA]'}`}
              >
                {isEditingPermissions ? (
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    value ? 'bg-accent border-accent text-white' : 'bg-white border-gray-300'
                  }`}>
                    {value && <CheckSquare className="w-3.5 h-3.5" />}
                  </div>
                ) : (
                  <div className={`w-2 h-2 rounded-full ${value ? 'bg-[#16A34A]' : 'bg-[#475569]'}`} />
                )}
                
                <p className={`text-sm ${value ? 'text-[#001A72]' : 'text-muted-foreground'}`}>
                  {key === 'viewAccounts' && 'View accounts'}
                  {key === 'initiatePayments' && 'Initiate payments'}
                  {key === 'approvePayments' && 'Approve payments'}
                  {key === 'manageUsers' && 'Manage users'}
                  {key === 'viewLoans' && 'View loans / credit'}
                  {key === 'applyForCredit' && 'Apply for credit'}
                  {key === 'viewStatements' && 'View statements'}
                  {key === 'exportData' && 'Export data'}
                  {key === 'manageCards' && 'Manage cards'}
                  {key === 'changeBusinessDetails' && 'Change business details'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Access Control */}
        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="text-sm font-medium mb-4" style={{ color: '#001A72' }}>Data Access Control</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                id="access-all" 
                name="accessType" 
                checked={accessType === 'all'} 
                onChange={() => setAccessType('all')}
                disabled={!isEditingPermissions}
                className="w-4 h-4 text-accent"
              />
              <label htmlFor="access-all" className="text-sm text-foreground">
                All Accounts (Current & Future)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                id="access-specific" 
                name="accessType" 
                checked={accessType === 'specific'} 
                onChange={() => setAccessType('specific')}
                disabled={!isEditingPermissions}
                className="w-4 h-4 text-accent"
              />
              <label htmlFor="access-specific" className="text-sm text-foreground">
                Specific Accounts Only
              </label>
            </div>
            
            {accessType === 'specific' && (
              <div className="ml-7 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked disabled={!isEditingPermissions} className="rounded border-gray-300 text-accent" />
                  <span className="text-sm">Main Operating Account (***9921)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" disabled={!isEditingPermissions} className="rounded border-gray-300 text-accent" />
                  <span className="text-sm">Savings Account (***8821)</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Notification Control */}
        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="text-sm font-medium mb-4" style={{ color: '#001A72' }}>Notifications</h4>
          <div className="grid sm:grid-cols-2 gap-4">
             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">Payment Approvals</span>
                <div 
                  onClick={() => isEditingPermissions && setNotifications(p => ({...p, payments: !p.payments}))}
                  className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${notifications.payments ? 'bg-accent' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.payments ? 'translate-x-5' : ''}`} />
                </div>
             </label>

             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">Statements Ready</span>
                <div 
                  onClick={() => isEditingPermissions && setNotifications(p => ({...p, statements: !p.statements}))}
                  className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${notifications.statements ? 'bg-accent' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.statements ? 'translate-x-5' : ''}`} />
                </div>
             </label>

             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">Security Alerts</span>
                <div 
                  onClick={() => isEditingPermissions && setNotifications(p => ({...p, security: !p.security}))}
                  className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${notifications.security ? 'bg-accent' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.security ? 'translate-x-5' : ''}`} />
                </div>
             </label>

             <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">Marketing</span>
                <div 
                  onClick={() => isEditingPermissions && setNotifications(p => ({...p, marketing: !p.marketing}))}
                  className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${notifications.marketing ? 'bg-accent' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications.marketing ? 'translate-x-5' : ''}`} />
                </div>
             </label>
          </div>
        </div>
      </div>

      {/* Mandates */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ color: '#001A72' }}>Mandates</h3>
          <button 
            onClick={() => onNavigate('mandates-editor')}
            className="px-4 h-10 border border-border rounded-full text-sm hover:border-accent transition-colors"
          >
            Edit Rules
          </button>
        </div>

        {member.mandates.participates ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <p className="text-sm" style={{ color: '#001A72' }}>Participates in approval chains</p>
            </div>

            <div className="p-4 bg-[#E9F2FF] rounded-lg">
              <p className="text-sm mb-2" style={{ color: '#001A72' }}>Approval Authority</p>
              <p className="text-sm text-muted-foreground">
                Can approve payments up to {member.mandates.threshold}
              </p>
            </div>

            <div className="p-4 bg-[#F5F7FA] rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Multi-step approval rules</p>
              <ul className="text-sm space-y-1" style={{ color: '#001A72' }}>
                <li>• Payments under £5,000: Single approval</li>
                <li>• Payments £5,000-£10,000: This user can approve</li>
                <li>• Payments over £10,000: Director approval required</li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            This user does not participate in approval chains
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Security */}
        <div className="bg-white border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Smartphone className="w-5 h-5 text-accent" />
            <h3 style={{ color: '#001A72' }}>Security</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Last Login</p>
              <p className="text-sm" style={{ color: '#001A72' }}>{member.lastLogin}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Devices</p>
              <div className="space-y-2">
                {member.devices.map((device, index) => (
                  <div key={index} className="p-3 bg-[#F5F7FA] rounded-lg">
                    <p className="text-sm mb-1" style={{ color: '#001A72' }}>{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Last used {device.lastUsed} • {device.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <button className="w-full h-10 border border-[#EA580C] text-[#EA580C] rounded-full text-sm hover:bg-[#EA580C]/5 transition-colors">
                Force Logout All Devices
              </button>
              <button className="w-full h-10 border border-border rounded-full text-sm hover:border-accent transition-colors">
                Reset Access
              </button>
            </div>
          </div>
        </div>

        {/* Activity Log Preview */}
        <div className="bg-white border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-accent" />
            <h3 style={{ color: '#001A72' }}>Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {activityLog.slice(0, 5).map((log, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
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

          <button className="w-full h-10 mt-4 border border-border rounded-full text-sm hover:border-accent transition-colors">
            View Full Activity Log
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-8 h-12 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors">
          Save Changes
        </button>
        <button className="px-6 h-12 border border-border rounded-full hover:border-accent transition-colors">
          Resend Invite
        </button>
        <button 
          onClick={() => onNavigate('team-directors')}
          className="px-6 h-12 border border-border rounded-full hover:border-accent transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
