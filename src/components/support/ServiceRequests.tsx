import { useState } from 'react';
import { Plus, FileText, Users, MapPin, Building2, Mail, HelpCircle, X, Upload, ChevronRight, ArrowLeft, Filter, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockServiceRequests, ServiceRequest, TimelineEvent } from '../../data/support';
import { TimelineComponent } from './TimelineComponent';
import { toast } from 'sonner@2.0.3';

interface ServiceRequestsProps {
  onNavigate: (section: string) => void;
}

const REQUEST_TYPES = [
  { id: 'address', label: 'Address Change', icon: MapPin },
  { id: 'mandate', label: 'Mandate Change', icon: Users },
  { id: 'user', label: 'Add/Remove User', icon: Users },
  { id: 'details', label: 'Business Details', icon: Building2 },
  { id: 'document', label: 'Document Request', icon: FileText },
  { id: 'enquiry', label: 'General Enquiry', icon: Mail },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

export function ServiceRequests({ onNavigate }: ServiceRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'With Customer':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleRequestClick = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setShowDrawer(true);
  };

  const filteredRequests = mockServiceRequests.filter(req => 
    req.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mockTimeline: TimelineEvent[] = [
    {
      id: '1',
      type: 'Created',
      title: 'Request Created',
      description: 'Service request submitted',
      date: '2025-11-20T10:00:00',
      user: 'You',
    },
    {
      id: '2',
      type: 'Assigned',
      title: 'Request Assigned',
      description: 'Assigned to Verifications Team',
      date: '2025-11-20T10:15:00',
      user: 'System',
    },
    {
      id: '3',
      type: 'Status Changed',
      title: 'Status Updated',
      description: 'Status changed to In Progress',
      date: '2025-11-21T09:00:00',
      user: 'Verifications Team',
    },
    {
      id: '4',
      type: 'Document Uploaded',
      title: 'Document Received',
      description: 'Proof of address uploaded',
      date: '2025-11-24T09:15:00',
      user: 'You',
    },
  ];

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-8 pt-4 pb-8 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-8">
            <div className="flex items-center gap-3">
               <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 pr-4 rounded-lg border border-border bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <Button
                onClick={() => setShowNewRequestModal(true)}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 text-white gap-2 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </div>
          </div>

          {/* Mobile Search - Visible only on small screens */}
          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Request List */}
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {filteredRequests.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredRequests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => handleRequestClick(request)}
                    className="w-full p-5 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center gap-4 text-left group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                         <span className="font-medium text-base" style={{ color: '#001A72' }}>{request.type}</span>
                         <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-mono">
                           {request.id}
                         </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2 sm:mb-0">
                        {request.description} • <span className="text-foreground">{request.entity}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto">
                      <div className="flex flex-col items-start sm:items-end">
                         <span className="text-xs text-muted-foreground">Last updated</span>
                         <span className="text-sm text-[#001A72] font-medium">{formatDate(request.lastUpdated)}</span>
                      </div>
                      
                      <Badge className={`${getStatusColor(request.status)} px-3 py-1 rounded-full font-medium w-32 justify-center`}>
                        {request.status}
                      </Badge>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors hidden sm:block" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-[#001A72] mb-1">No requests found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or create a new request.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
         <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowNewRequestModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div className="bg-white rounded-2xl border border-border shadow-xl w-full max-w-2xl pointer-events-auto overflow-hidden">
               <div className="p-6 border-b border-border flex items-center justify-between bg-gray-50/50">
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: '#001A72' }}>New Service Request</h2>
                    <p className="text-sm text-muted-foreground">What can we help you with today?</p>
                  </div>
                  <button
                    onClick={() => setShowNewRequestModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
               </div>
               
               <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {REQUEST_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          toast.success(`Starting ${type.label} request...`);
                          setShowNewRequestModal(false);
                        }}
                        className="flex flex-col items-center p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 hover:shadow-md transition-all group text-center h-full"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-medium text-[#001A72] mb-1">{type.label}</h3>
                        <p className="text-xs text-muted-foreground">Create new request</p>
                      </button>
                    );
                  })}
               </div>
               
               <div className="p-4 bg-gray-50/50 border-t border-border text-center">
                 <p className="text-xs text-muted-foreground">
                   Need urgent help? <button className="text-accent hover:underline font-medium" onClick={() => onNavigate('chat')}>Chat with support</button>
                 </p>
               </div>
            </div>
          </div>
         </>
      )}

      {/* Detail Drawer */}
      {showDrawer && selectedRequest && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[550px] bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border bg-gray-50/50 sticky top-0 z-10">
              <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowDrawer(false)}
                      className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h2 className="text-xl font-semibold" style={{ color: '#001A72' }}>{selectedRequest.type}</h2>
                         <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{selectedRequest.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Created on {formatDate(selectedRequest.created)}</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                   <Badge className={getStatusColor(selectedRequest.status) + ' border text-xs px-3 py-1'}>
                      {selectedRequest.status}
                   </Badge>
                 </div>
              </div>
            </div>

            <div className="p-6 space-y-8 flex-1">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-[#001A72] uppercase tracking-wider mb-3">Description</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                   <p className="text-sm text-foreground leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div>
                <h3 className="text-sm font-medium text-[#001A72] uppercase tracking-wider mb-3">Request Details</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-lg border border-border/50 bg-white">
                      <span className="text-xs text-muted-foreground block mb-1">Entity</span>
                      <span className="text-sm font-medium text-[#001A72]">{selectedRequest.entity}</span>
                   </div>
                   <div className="p-4 rounded-lg border border-border/50 bg-white">
                      <span className="text-xs text-muted-foreground block mb-1">Account</span>
                      <span className="text-sm font-medium text-[#001A72]">{selectedRequest.account}</span>
                   </div>
                   {selectedRequest.assignedTo && (
                     <div className="p-4 rounded-lg border border-border/50 bg-white col-span-2">
                        <span className="text-xs text-muted-foreground block mb-1">Assigned To</span>
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-700 font-bold">
                             {selectedRequest.assignedTo.charAt(0)}
                           </div>
                           <span className="text-sm font-medium text-[#001A72]">{selectedRequest.assignedTo}</span>
                        </div>
                     </div>
                   )}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-medium text-[#001A72] uppercase tracking-wider mb-4">Timeline</h3>
                <TimelineComponent events={mockTimeline} />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-gray-50/50 sticky bottom-0">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-white"
                  onClick={() => toast.info('Upload document')}
                >
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
                <Button
                  variant="destructive"
                  className="w-full gap-2 bg-red-50 text-red-600 hover:bg-red-100 border-red-100 hover:border-red-200"
                  onClick={() => toast.success('Request closed')}
                >
                  <X className="h-4 w-4" />
                  Close Request
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}