import { ArrowLeft, Plus, GitBranch } from 'lucide-react';
import { useState } from 'react';

interface MandatesEditorScreenProps {
  onNavigate: (screen: string) => void;
  businessData?: any;
}

export function MandatesEditorScreen({ onNavigate, businessData }: MandatesEditorScreenProps) {
  const [paymentThresholds, setPaymentThresholds] = useState({
    low: 5000,
    medium: 10000,
    high: 50000
  });

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
        <h2 className="mb-2" style={{ color: '#001A72' }}>Mandate & Approval Rules</h2>
        <p className="text-sm text-muted-foreground">
          Define who approves what and at which thresholds
        </p>
      </div>

      {/* Payments Section */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h3 className="mb-6" style={{ color: '#001A72' }}>Payments</h3>

        <div className="space-y-6">
          {/* Tier 1 */}
          <div className="p-5 bg-[#F5F7FA] rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="mb-1" style={{ color: '#001A72' }}>Payments under £{paymentThresholds.low.toLocaleString()}</h4>
                <p className="text-sm text-muted-foreground">Low value transactions</p>
              </div>
              <input
                type="number"
                value={paymentThresholds.low}
                onChange={(e) => setPaymentThresholds({ ...paymentThresholds, low: parseInt(e.target.value) })}
                className="w-32 h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="tier1" defaultChecked className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker only (no approval needed)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="tier1" className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + One Approver</span>
              </label>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="p-5 bg-[#E9F2FF] rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="mb-1" style={{ color: '#001A72' }}>
                  Payments £{paymentThresholds.low.toLocaleString()} - £{paymentThresholds.medium.toLocaleString()}
                </h4>
                <p className="text-sm text-muted-foreground">Medium value transactions</p>
              </div>
              <input
                type="number"
                value={paymentThresholds.medium}
                onChange={(e) => setPaymentThresholds({ ...paymentThresholds, medium: parseInt(e.target.value) })}
                className="w-32 h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="tier2" className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + One Approver</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="tier2" defaultChecked className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + Finance Manager approval</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="tier2" className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + Director approval</span>
              </label>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="p-5 bg-accent/5 rounded-xl border-2 border-accent/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="mb-1" style={{ color: '#001A72' }}>
                  Payments over £{paymentThresholds.medium.toLocaleString()}
                </h4>
                <p className="text-sm text-muted-foreground">High value transactions</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="tier3" className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + One Director</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="tier3" defaultChecked className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Maker + Two Directors required</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="tier3" className="w-4 h-4 text-accent" />
                <span className="text-sm" style={{ color: '#001A72' }}>Custom approval chain</span>
              </label>
            </div>

            <button className="inline-flex items-center gap-2 mt-4 px-4 h-10 border border-accent text-accent rounded-full text-sm hover:bg-accent/5 transition-colors">
              <Plus className="w-4 h-4" />
              Add Approval Step
            </button>
          </div>
        </div>
      </div>

      {/* Account Changes Section */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h3 className="mb-6" style={{ color: '#001A72' }}>Account Changes</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Add new payee</p>
              <p className="text-xs text-muted-foreground">Adding beneficiaries to payment list</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Maker + Approver</option>
              <option>Maker + Director</option>
              <option>Two Directors</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Manage integrations</p>
              <p className="text-xs text-muted-foreground">Connecting third-party services</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Admin only</option>
              <option>Admin + Director</option>
              <option>Two Directors</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Update business details</p>
              <p className="text-xs text-muted-foreground">Changing registered information</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Admin only</option>
              <option>Director required</option>
              <option>Two Directors required</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>FX trades</p>
              <p className="text-xs text-muted-foreground">Foreign exchange transactions</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Maker + Approver</option>
              <option>Maker + Director</option>
              <option>Two Directors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Credit Applications Section */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h3 className="mb-6" style={{ color: '#001A72' }}>Credit Applications</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Who can initiate</p>
              <p className="text-xs text-muted-foreground">Start a credit application</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Admin only</option>
              <option>Admin or Finance Manager</option>
              <option>Any team member</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Who must approve draft</p>
              <p className="text-xs text-muted-foreground">Review before submission</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>One Director</option>
              <option>Two Directors</option>
              <option>All Directors</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
            <div>
              <p className="text-sm mb-1" style={{ color: '#001A72' }}>Who provides signature</p>
              <p className="text-xs text-muted-foreground">Final authorization</p>
            </div>
            <select className="h-10 px-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Primary Director</option>
              <option>Any Director</option>
              <option>All Directors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Approval Chain Preview */}
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <GitBranch className="w-5 h-5 text-accent" />
          <h3 style={{ color: '#001A72' }}>Your Approval Chain Preview</h3>
        </div>

        <div className="p-6 bg-[#E9F2FF] rounded-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm" style={{ color: '#0033A0' }}>1</div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#001A72' }}>Payment Maker initiates transaction</p>
                <p className="text-xs text-muted-foreground">Any authorized user</p>
              </div>
            </div>

            <div className="ml-5 h-8 w-px bg-accent/30" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm" style={{ color: '#0033A0' }}>2</div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#001A72' }}>Finance Manager reviews (£5k-£10k)</p>
                <p className="text-xs text-muted-foreground">Automatic routing based on amount</p>
              </div>
            </div>

            <div className="ml-5 h-8 w-px bg-accent/30" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm" style={{ color: '#0033A0' }}>3</div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#001A72' }}>Director approval (over £10k)</p>
                <p className="text-xs text-muted-foreground">Signature required for high-value</p>
              </div>
            </div>

            <div className="ml-5 h-8 w-px bg-accent/30" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">✓</div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#001A72' }}>Payment executed</p>
                <p className="text-xs text-muted-foreground">Processed immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-8 h-12 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors">
          Save Changes
        </button>
        <button 
          onClick={() => onNavigate('team-directors')}
          className="px-8 h-12 border border-border rounded-full hover:border-accent transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
