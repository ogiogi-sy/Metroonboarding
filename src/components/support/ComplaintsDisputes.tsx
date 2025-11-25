import { useState } from 'react';
import { AlertTriangle, Shield, Plus, X, Upload, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockComplaints, mockDisputes, Complaint, Dispute, TimelineEvent } from '../../data/support';
import { TimelineComponent } from './TimelineComponent';
import { toast } from 'sonner@2.0.3';

interface ComplaintsDisputesProps {
  onNavigate: (section: string) => void;
}

const COMPLAINT_CATEGORIES = [
  'Account Issue',
  'Card Issue',
  'Payment Issue',
  'App or Service',
  'Other',
];

const DISPUTE_REASONS = [
  'Fraud',
  'Not Authorized',
  'Goods Not Received',
  'Quality Issue',
  'Duplicate Charge',
];

export function ComplaintsDisputes({ onNavigate }: ComplaintsDisputesProps) {
  const [activeTab, setActiveTab] = useState<'complaints' | 'disputes'>('complaints');
  const [selectedItem, setSelectedItem] = useState<Complaint | Dispute | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newComplaintStep, setNewComplaintStep] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Under Review':
      case 'Under Investigation':
        return 'bg-yellow-100 text-yellow-700';
      case 'Awaiting Info':
        return 'bg-purple-100 text-purple-700';
      case 'Resolved':
      case 'Reimbursed':
        return 'bg-green-100 text-green-700';
      case 'Declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const mockComplaintTimeline: TimelineEvent[] = [
    {
      id: '1',
      type: 'Created',
      title: 'Complaint Submitted',
      description: 'Your complaint has been received',
      date: '2025-11-20T10:30:00',
      user: 'You',
    },
    {
      id: '2',
      type: 'Assigned',
      title: 'Case Assigned',
      description: 'Assigned to Complaints Team',
      date: '2025-11-20T11:00:00',
      user: 'System',
    },
    {
      id: '3',
      type: 'Status Changed',
      title: 'Under Review',
      description: 'Your case is being investigated',
      date: '2025-11-21T09:00:00',
      user: 'Complaints Team',
    },
    {
      id: '4',
      type: 'Message',
      title: 'Additional Information Requested',
      description: 'We need more details about the transaction',
      date: '2025-11-23T14:00:00',
      user: 'Complaints Team',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-[1400px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Complaints & Disputes</h1>
              <p className="text-sm text-muted-foreground">
                Submit and track complaints and transaction disputes
              </p>
            </div>
            
            <Button
              onClick={() => {
                setShowNewModal(true);
                setNewComplaintStep(1);
              }}
              className="bg-accent hover:bg-accent/90 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              New {activeTab === 'complaints' ? 'Complaint' : 'Dispute'}
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'complaints'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Complaints ({mockComplaints.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('disputes')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'disputes'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Disputes ({mockDisputes.length})
              </div>
            </button>
          </div>

          {/* Content */}
          {activeTab === 'complaints' ? (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Case Number</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Category</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Description</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockComplaints.map((complaint) => (
                    <tr
                      key={complaint.caseNumber}
                      onClick={() => {
                        setSelectedItem(complaint);
                        setShowDrawer(true);
                      }}
                      className="hover:bg-muted/20 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-4">
                        <p className="text-sm font-mono" style={{ color: '#001A72' }}>{complaint.caseNumber}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-muted-foreground">{complaint.category}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={getStatusColor(complaint.status) + ' border-0 text-xs'}>
                          {complaint.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-muted-foreground">{formatDate(complaint.date)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {mockDisputes.map((dispute) => (
                <button
                  key={dispute.id}
                  onClick={() => {
                    setSelectedItem(dispute);
                    setShowDrawer(true);
                  }}
                  className="w-full bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{dispute.id}</p>
                      <h3 className="text-lg mb-2" style={{ color: '#001A72' }}>{dispute.merchant}</h3>
                      <Badge className={getStatusColor(dispute.status) + ' border-0'}>
                        {dispute.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xl" style={{ color: '#001A72' }}>{formatAmount(dispute.amount)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dispute.cardLast4 && `Card •••• ${dispute.cardLast4}`}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Reason</p>
                      <p style={{ color: '#001A72' }}>{dispute.reason}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Transaction Date</p>
                      <p style={{ color: '#001A72' }}>{formatDate(dispute.date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Submitted</p>
                      <p style={{ color: '#001A72' }}>{formatDate(dispute.submittedDate)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Complaint/Dispute Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg mb-1" style={{ color: '#001A72' }}>
                  {activeTab === 'complaints' ? 'New Complaint' : 'New Dispute'}
                </h3>
                <p className="text-sm text-muted-foreground">Step {newComplaintStep} of 4</p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeTab === 'complaints' && newComplaintStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Select Category
                  </label>
                  <div className="space-y-2">
                    {COMPLAINT_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setNewComplaintStep(2)}
                        className="w-full px-4 py-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 text-left text-sm transition-all"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {newComplaintStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Please describe your complaint in detail..."
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-none h-32"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setNewComplaintStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={() => setNewComplaintStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {newComplaintStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Attach Evidence (Optional)
                  </label>
                  <button className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 text-center transition-all">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload files</p>
                  </button>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setNewComplaintStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={() => setNewComplaintStep(4)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {newComplaintStep === 4 && (
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm mb-2" style={{ color: '#001A72' }}>Review Your Submission</p>
                  <p className="text-sm text-muted-foreground">
                    Please review the details before submitting. We'll investigate and respond within 5 working days.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setNewComplaintStep(3)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={() => {
                      toast.success('Complaint submitted successfully');
                      setShowNewModal(false);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {showDrawer && selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowDrawer(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {'caseNumber' in selectedItem ? selectedItem.caseNumber : selectedItem.id}
                  </p>
                  <h2 className="text-lg mb-2" style={{ color: '#001A72' }}>
                    {'category' in selectedItem ? selectedItem.category : selectedItem.merchant}
                  </h2>
                  <Badge className={getStatusColor(selectedItem.status) + ' border-0'}>
                    {selectedItem.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                <p className="text-sm" style={{ color: '#001A72' }}>
                  {'description' in selectedItem ? selectedItem.description : `Transaction dispute for ${formatAmount(selectedItem.amount)}`}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Timeline</p>
                <TimelineComponent events={mockComplaintTimeline} />
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => toast.info('Upload evidence')}
                >
                  <Upload className="h-4 w-4" />
                  Upload Evidence
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
