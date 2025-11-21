import { useState } from 'react';
import { ArrowLeft, Upload, PenTool, Send } from 'lucide-react';

interface AddDirectorScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function AddDirectorScreen({ onNavigate, businessData }: AddDirectorScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roleType: 'Director',
    dateOfBirth: '',
    homeAddress: '',
    phoneNumber: '',
    mandateParticipation: 'required_major',
    sendVerification: true
  });

  const [signatureMethod, setSignatureMethod] = useState<'upload' | 'draw' | 'send' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onNavigate('team-directors');
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
        <h2 className="mb-2" style={{ color: '#001A72' }}>Add Director</h2>
        <p className="text-sm text-muted-foreground">
          Add a statutory director, PSC, or beneficial owner to your business
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-6" style={{ color: '#001A72' }}>Personal Details</h3>
          
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
                placeholder="e.g. Sarah Mitchell"
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
                placeholder="sarah.mitchell@business.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Role type
              </label>
              <select
                value={formData.roleType}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Director">Director</option>
                <option value="PSC">PSC (Person with Significant Control)</option>
                <option value="UBO">UBO (Ultimate Beneficial Owner)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Date of birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Home address
              </label>
              <textarea
                value={formData.homeAddress}
                onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                className="w-full h-24 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Enter full residential address"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
                Phone number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+44 7700 900000"
                required
              />
            </div>
          </div>
        </div>

        {/* Mandate Participation Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-2" style={{ color: '#001A72' }}>Mandate Participation</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Define when this director's approval is required
          </p>
          
          <div>
            <label className="block text-sm mb-2" style={{ color: '#001A72' }}>
              Approval requirement
            </label>
            <select
              value={formData.mandateParticipation}
              onChange={(e) => setFormData({ ...formData, mandateParticipation: e.target.value })}
              className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="required_major">Required for all major approvals</option>
              <option value="required_threshold">Required for payments above £10,000</option>
              <option value="required_threshold_high">Required for payments above £50,000</option>
              <option value="not_required">Not required</option>
            </select>
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-2" style={{ color: '#001A72' }}>Signature</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Collect a digital signature for mandate purposes
          </p>
          
          <div className="grid md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSignatureMethod('upload')}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                signatureMethod === 'upload' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <Upload className="w-6 h-6 mb-2 text-accent" />
              <p className="text-sm" style={{ color: '#001A72' }}>Upload signature</p>
              <p className="text-xs text-muted-foreground">Image file</p>
            </button>

            <button
              type="button"
              onClick={() => setSignatureMethod('draw')}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                signatureMethod === 'draw' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <PenTool className="w-6 h-6 mb-2 text-accent" />
              <p className="text-sm" style={{ color: '#001A72' }}>Draw signature</p>
              <p className="text-xs text-muted-foreground">Use canvas</p>
            </button>

            <button
              type="button"
              onClick={() => setSignatureMethod('send')}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                signatureMethod === 'send' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <Send className="w-6 h-6 mb-2 text-accent" />
              <p className="text-sm" style={{ color: '#001A72' }}>Send to director</p>
              <p className="text-xs text-muted-foreground">Email request</p>
            </button>
          </div>

          {signatureMethod === 'upload' && (
            <div className="mt-4 p-4 bg-[#F5F7FA] rounded-lg border-2 border-dashed border-border">
              <input type="file" accept="image/*" className="text-sm" />
            </div>
          )}

          {signatureMethod === 'draw' && (
            <div className="mt-4 p-4 bg-[#F5F7FA] rounded-lg">
              <div className="h-32 bg-white border-2 border-dashed border-border rounded flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Signature canvas (implementation needed)</p>
              </div>
            </div>
          )}
        </div>

        {/* Verification Section */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="mb-2" style={{ color: '#001A72' }}>Verification</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Directors may need to complete identity verification for compliance
          </p>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.sendVerification}
              onChange={(e) => setFormData({ ...formData, sendVerification: e.target.checked })}
              className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
            />
            <div>
              <p className="text-sm" style={{ color: '#001A72' }}>Send verification request immediately</p>
              <p className="text-xs text-muted-foreground">
                Director will receive an email with KYC/KYB onboarding link
              </p>
            </div>
          </label>
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
