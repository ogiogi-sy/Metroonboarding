import { useState } from 'react';
import { Plus, X, Upload, Search, Building2, CreditCard, Banknote, Smartphone, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockComplaints, Complaint, TimelineEvent } from '../../data/support';
import { TimelineComponent } from './TimelineComponent';
import { toast } from 'sonner@2.0.3';

interface ComplaintsDisputesProps {
  onNavigate: (section: string) => void;
}

const COMPLAINT_TYPES = [
  { id: 'account', label: 'Account Issue', icon: Building2 },
  { id: 'card', label: 'Card Issue', icon: CreditCard },
  { id: 'payment', label: 'Payment Issue', icon: Banknote },
  { id: 'app', label: 'App or Service', icon: Smartphone },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

export function ComplaintsDisputes({ onNavigate }: ComplaintsDisputesProps) {
  const [selectedItem, setSelectedItem] = useState<Complaint | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newComplaintStep, setNewComplaintStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredComplaints = mockComplaints.filter(complaint => 
    complaint.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="h-full flex flex-col">
        <div className="flex-1 w-full max-w-[1400px] mx-auto p-8 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-end gap-4 mb-8">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 pr-4 rounded-lg border border-border bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            <Button
              onClick={() => {
                setShowNewModal(true);
                setNewComplaintStep(1);
              }}
              className="h-10 rounded-lg bg-accent hover:bg-accent/90 text-white gap-2 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              New Complaint
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Content */}
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
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No complaints found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Complaint Modal */}
      {showNewModal && (
        <>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowNewModal(false)} />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div className={`bg-white rounded-2xl border border-border shadow-xl w-full pointer-events-auto overflow-hidden flex flex-col max-h-[90vh] ${newComplaintStep === 1 ? 'max-w-2xl' : 'max-w-md'}`}>
             <div className="p-6 border-b border-border flex items-center justify-between bg-gray-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: '#001A72' }}>New Complaint</h2>
                  <p className="text-sm text-muted-foreground">
                    {newComplaintStep === 1 ? 'Select a category for your complaint' : `Step ${newComplaintStep} of 4`}
                  </p>
                </div>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
             </div>

             <div className="p-6 overflow-y-auto">
               {newComplaintStep === 1 && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                   {COMPLAINT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setNewComplaintStep(2)}
                          className="flex flex-col items-center p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 hover:shadow-md transition-all group text-center h-full"
                        >
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-6 w-6 text-accent" />
                          </div>
                          <h3 className="font-medium text-[#001A72] mb-1">{type.label}</h3>
                          <p className="text-xs text-muted-foreground">Start new claim</p>
                        </button>
                      );
                    })}
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
                       className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-accent/20"
                     />
                   </div>
                   <div className="flex gap-3 pt-2">
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
                   <div className="flex gap-3 pt-2">
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
                   <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                     <p className="text-sm font-medium mb-2" style={{ color: '#001A72' }}>Review Your Submission</p>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       Please review the details before submitting. We'll investigate and respond within 5 working days.
                     </p>
                   </div>
                   <div className="flex gap-3 pt-2">
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
        </div>
        </>
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
                    {selectedItem.caseNumber}
                  </p>
                  <h2 className="text-lg mb-2" style={{ color: '#001A72' }}>
                    {selectedItem.category}
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
                  {selectedItem.description}
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
