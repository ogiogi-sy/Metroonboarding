import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ChevronRight, AlertOctagon, Search, Plus, X, Filter, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockFraudAlerts, FraudAlert, TimelineEvent } from '../../data/support';
import { TimelineComponent } from './TimelineComponent';
import { toast } from 'sonner@2.0.3';
import { DisputeModal } from './DisputeModal';

interface FraudSecurityProps {
  onNavigate: (section: string) => void;
}

interface MockTransaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  cardLast4: string;
  location: string;
  status: 'Pending' | 'Cleared';
}

const mockTransactions: MockTransaction[] = [
  {
    id: 'TXN-1001',
    merchant: 'Amazon UK',
    amount: 45.99,
    date: '2025-11-25T14:30:00',
    cardLast4: '4242',
    location: 'Online',
    status: 'Pending',
  },
  {
    id: 'TXN-1002',
    merchant: 'Tesco Extra',
    amount: 124.50,
    date: '2025-11-24T18:15:00',
    cardLast4: '4242',
    location: 'London, UK',
    status: 'Cleared',
  },
  {
    id: 'TXN-1003',
    merchant: 'Uber *Trip',
    amount: 18.20,
    date: '2025-11-24T08:45:00',
    cardLast4: '8899',
    location: 'London, UK',
    status: 'Cleared',
  },
  {
    id: 'TXN-1004',
    merchant: 'Starbucks Coffee',
    amount: 4.80,
    date: '2025-11-23T09:30:00',
    cardLast4: '4242',
    location: 'Manchester, UK',
    status: 'Cleared',
  },
  {
    id: 'TXN-1005',
    merchant: 'Netflix Subscription',
    amount: 15.99,
    date: '2025-11-22T00:00:00',
    cardLast4: '8899',
    location: 'Online',
    status: 'Cleared',
  },
];

export function FraudSecurity({ onNavigate }: FraudSecurityProps) {
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Confirmed':
        return 'bg-red-100 text-red-700';
      case 'Disputed':
        return 'bg-purple-100 text-purple-700';
      case 'Cleared':
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const filteredAlerts = mockFraudAlerts.filter(alert => 
    alert.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock timeline for fraud alerts
  const mockFraudTimeline: TimelineEvent[] = [
    {
      id: '1',
      type: 'Status Changed',
      title: 'Suspicious Activity Detected',
      description: 'Our security system flagged this transaction as unusual.',
      date: '2025-11-24T02:15:00',
      user: 'System',
      icon: 'AlertOctagon'
    },
    {
      id: '2',
      type: 'Message',
      title: 'Alert Created',
      description: 'Fraud alert generated for review.',
      date: '2025-11-24T02:15:05',
      user: 'System',
    }
  ];

  const handleAction = (action: 'safe' | 'fraud') => {
    if (!selectedAlert) return;
    
    toast.success(action === 'safe' ? 'Transaction marked as safe' : 'Transaction confirmed as fraud');
    setShowDrawer(false);
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-1 w-full max-w-[1400px] mx-auto p-8 flex flex-col min-h-0">
          
          <div className="flex items-center justify-end gap-4 mb-8">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 pr-4 rounded-lg border border-border bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <Button
                onClick={() => {
                  setShowDisputeModal(true);
                }}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 text-white gap-2 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Raise a dispute
              </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search alerts..."
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
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Alert ID</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Merchant</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowDrawer(true);
                      }}
                      className="hover:bg-muted/20 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertOctagon className="h-4 w-4 text-orange-500" />
                          <p className="text-sm font-mono" style={{ color: '#001A72' }}>{alert.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium" style={{ color: '#001A72' }}>{alert.merchant}</p>
                        <p className="text-xs text-muted-foreground">{alert.location}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium">{formatAmount(alert.amount)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-muted-foreground">{formatDate(alert.date)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={getStatusColor(alert.status) + ' border-0 text-xs'}>
                          {alert.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        {alert.requiresAction && (
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                            Review
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                   <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No fraud alerts found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {showDrawer && selectedAlert && (
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
                    {selectedAlert.id}
                  </p>
                  <h2 className="text-lg mb-2" style={{ color: '#001A72' }}>
                    {selectedAlert.merchant}
                  </h2>
                  <Badge className={getStatusColor(selectedAlert.status) + ' border-0'}>
                    {selectedAlert.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                 <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-orange-900">Suspicious Activity Detected</h4>
                        <p className="text-sm text-orange-700 mt-1">
                            This transaction was flagged due to unusual location or spending pattern.
                        </p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-border">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Amount</p>
                    <p className="text-lg font-medium" style={{ color: '#001A72' }}>{formatAmount(selectedAlert.amount)}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date & Time</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>{formatDate(selectedAlert.date)}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Card</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>•••• {selectedAlert.cardLast4}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Location</p>
                    <p className="text-sm" style={{ color: '#001A72' }}>{selectedAlert.location}</p>
                </div>
              </div>

              {selectedAlert.requiresAction && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Required Action</p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            className="bg-[#0033A0] hover:bg-[#002b87] text-white"
                            onClick={() => handleAction('safe')}
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Safe
                        </Button>
                        <Button 
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleAction('fraud')}
                        >
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Confirm Fraud
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        Confirming fraud will immediately block the card and start the dispute process.
                    </p>
                  </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Timeline</p>
                <TimelineComponent events={mockFraudTimeline} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Raise Dispute Modal */}
      <DisputeModal
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        availableTransactions={mockTransactions}
        onSubmit={(data) => {
          toast.success('Dispute submitted successfully');
          setShowDisputeModal(false);
        }}
      />
    </>
  );
}
