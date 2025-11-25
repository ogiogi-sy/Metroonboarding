import { useState } from 'react';
import { Plus, FileText, Users, MapPin, Building2, Mail, HelpCircle, X, Upload, ChevronRight } from 'lucide-react';
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

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'With Customer':
        return 'bg-purple-100 text-purple-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
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

  const handleRequestClick = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setShowDrawer(true);
  };

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

  const columns = [
    { id: 'New', title: 'New', requests: mockServiceRequests.filter(r => r.status === 'New') },
    { id: 'In Progress', title: 'In Progress', requests: mockServiceRequests.filter(r => r.status === 'In Progress') },
    { id: 'With Customer', title: 'With Customer', requests: mockServiceRequests.filter(r => r.status === 'With Customer') },
    { id: 'Completed', title: 'Completed', requests: mockServiceRequests.filter(r => r.status === 'Completed') },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-[1600px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Service Requests</h1>
              <p className="text-sm text-muted-foreground">
                Manage address changes, mandates, documents, and more
              </p>
            </div>
            
            <Button
              onClick={() => setShowNewRequestModal(true)}
              className="bg-accent hover:bg-accent/90 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>

          {/* New Request Type Grid */}
          {showNewRequestModal && (
            <div className="bg-white rounded-xl border border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg" style={{ color: '#001A72' }}>Select Request Type</h2>
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {REQUEST_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        toast.success(`Starting ${type.label} request...`);
                        setShowNewRequestModal(false);
                      }}
                      className="p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-center group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <p className="text-sm" style={{ color: '#001A72' }}>{type.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <div key={column.id} className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm uppercase tracking-wide text-muted-foreground">{column.title}</h3>
                  <Badge variant="secondary">{column.requests.length}</Badge>
                </div>
                <div className="space-y-3">
                  {column.requests.map((request) => (
                    <button
                      key={request.id}
                      onClick={() => handleRequestClick(request)}
                      className="w-full bg-white rounded-xl border border-border p-4 hover:border-accent hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(request.status) + ' border-0 text-xs'}>
                          {request.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{request.id}</p>
                      </div>
                      <p className="text-sm mb-2" style={{ color: '#001A72' }}>{request.type}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{request.description}</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Account</span>
                          <span style={{ color: '#001A72' }}>{request.account}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Entity</span>
                          <span style={{ color: '#001A72' }}>{request.entity}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Created</span>
                          <span style={{ color: '#001A72' }}>{formatDate(request.created)}</span>
                        </div>
                      </div>
                      {request.documents && request.documents > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <FileText className="h-3 w-3" />
                          <span>{request.documents} document{request.documents !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {showDrawer && selectedRequest && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{selectedRequest.id}</p>
                  <h2 className="text-lg mb-2" style={{ color: '#001A72' }}>{selectedRequest.type}</h2>
                  <Badge className={getStatusColor(selectedRequest.status) + ' border-0'}>
                    {selectedRequest.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                <p className="text-sm" style={{ color: '#001A72' }}>{selectedRequest.description}</p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Request Details</p>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Entity</span>
                    <span style={{ color: '#001A72' }}>{selectedRequest.entity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account</span>
                    <span style={{ color: '#001A72' }}>{selectedRequest.account}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span style={{ color: '#001A72' }}>{formatDate(selectedRequest.created)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span style={{ color: '#001A72' }}>{formatDate(selectedRequest.lastUpdated)}</span>
                  </div>
                  {selectedRequest.assignedTo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assigned To</span>
                      <span style={{ color: '#001A72' }}>{selectedRequest.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Timeline</p>
                <TimelineComponent events={mockTimeline} />
              </div>

              {/* Actions */}
              <div className="space-y-3 border-t border-border pt-6">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => toast.info('Upload document')}
                >
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
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
