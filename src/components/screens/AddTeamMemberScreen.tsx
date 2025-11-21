import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface AddTeamMemberScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function AddTeamMemberScreen({ onNavigate, businessData }: AddTeamMemberScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Finance Manager',
    participateInMandates: false,
    mandateRule: ''
  });

  const [customPermissions, setCustomPermissions] = useState({
    viewAccounts: true,
    initiatePayments: false,
    approvePayments: false,
    manageUsers: false,
    viewLoans: true,
    applyForCredit: false,
    viewStatements: true,
    exportData: false,
    manageCards: false,
    changeBusinessDetails: false
  });

  const isCustomRole = formData.role === 'Custom';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('team-directors');
  };

  const togglePermission = (key: keyof typeof customPermissions) => {
    setCustomPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl">
      {/* Back button */}
      <button
        onClick={() => onNavigate('team-add-selector')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2" style={{ color: '#001A72' }}>Add Team Member</h2>
        <p className="text-sm text-muted-foreground">
          Add an operational user and assign their permissions
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-6" style={{ color: '#001A72' }}>Basic Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Full name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g. Michael Chen"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="michael.chen@business.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Role & Permissions Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-2" style={{ color: '#001A72' }}>Role & Permissions</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Assign a predefined role or create a custom permission set
          </p>
          
          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Admin">Admin</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Payment Approver">Payment Approver</option>
              <option value="Payment Maker">Payment Maker</option>
              <option value="Viewer">Viewer</option>
              <option value="Custom">Custom Role</option>
            </select>
          </div>

          {/* Role descriptions */}
          {!isCustomRole && (
            <div className="p-4 bg-[#E9F2FF] rounded-lg">
              <p className="text-sm" style={{ color: '#001A72' }}>
                {formData.role === 'Admin' && 'Full access to all features and settings'}
                {formData.role === 'Finance Manager' && 'Can view accounts, manage payments, and export data'}
                {formData.role === 'Payment Approver' && 'Can approve payments initiated by makers'}
                {formData.role === 'Payment Maker' && 'Can initiate payments that require approval'}
                {formData.role === 'Viewer' && 'Read-only access to accounts and statements'}
              </p>
            </div>
          )}

          {/* Custom Permissions */}
          {isCustomRole && (
            <div className="space-y-3 mt-6">
              <p className="text-sm mb-4" style={{ color: '#001A72' }}>Select permissions for this user:</p>
              
              {Object.entries(customPermissions).map(([key, value]) => (
                <label 
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => togglePermission(key as keyof typeof customPermissions)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      value ? 'bg-accent border-accent' : 'border-border'
                    }`}>
                      {value && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#001A72' }}>
                      {key === 'viewAccounts' && 'Can view accounts'}
                      {key === 'initiatePayments' && 'Can initiate payments'}
                      {key === 'approvePayments' && 'Can approve payments'}
                      {key === 'manageUsers' && 'Can manage users'}
                      {key === 'viewLoans' && 'Can view loans / credit'}
                      {key === 'applyForCredit' && 'Can apply for credit'}
                      {key === 'viewStatements' && 'Can view statements'}
                      {key === 'exportData' && 'Can export data'}
                      {key === 'manageCards' && 'Can manage cards'}
                      {key === 'changeBusinessDetails' && 'Can change business details'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Mandate Rules Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-2" style={{ color: '#001A72' }}>Mandate Rules</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Define if this user participates in approval chains
          </p>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.participateInMandates}
                onChange={(e) => setFormData({ ...formData, participateInMandates: e.target.checked })}
                className="mt-0.5 w-5 h-5 rounded border-border text-accent focus:ring-accent"
              />
              <div>
                <p className="text-sm" style={{ color: '#001A72' }}>This user participates in approval chains</p>
                <p className="text-xs text-muted-foreground">
                  User can approve transactions based on rules you set
                </p>
              </div>
            </label>

            {formData.participateInMandates && (
              <div className="ml-8">
                <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                  Approval authority
                </label>
                <select
                  value={formData.mandateRule}
                  onChange={(e) => setFormData({ ...formData, mandateRule: e.target.value })}
                  className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select approval level...</option>
                  <option value="payments_5k">Can approve payments up to £5,000</option>
                  <option value="payments_10k">Can approve payments up to £10,000</option>
                  <option value="payments_50k">Can approve payments up to £50,000</option>
                  <option value="payments_unlimited">Can approve any payment amount</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-8 h-12 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors"
          >
            Send Invite
          </button>
          <button
            type="button"
            onClick={() => onNavigate('team-add-selector')}
            className="px-8 h-12 border border-border rounded-full hover:border-accent transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
