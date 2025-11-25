import { MessageSquare, FileText, Calendar, AlertTriangle, Shield, Plus, ChevronRight, ChevronDown, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockActivityFeed, mockServiceRequests, mockComplaints, mockAppointments, mockConversations, mockDisputes } from '../../data/support';
import { useState } from 'react';

interface SupportLandingProps {
  onNavigate: (section: string) => void;
}

export function SupportLanding({ onNavigate }: SupportLandingProps) {
  const [showRecentUpdates, setShowRecentUpdates] = useState(false);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openRequests = mockServiceRequests.filter(r => r.status !== 'Completed').length;
  const activeConversations = mockConversations.filter(c => c.status === 'Active').length;
  const unresolvedDisputes = mockDisputes.filter(d => d.status !== 'Reimbursed' && d.status !== 'Declined').length;
  const nextAppointment = mockAppointments.find(a => a.status === 'Scheduled' && new Date(a.date) > new Date());

  const quickActions = [
    {
      id: 'chat',
      label: 'Start a Chat',
      description: 'Get instant help',
      icon: MessageSquare,
      color: 'bg-accent/10 text-accent',
      route: 'chat',
    },
    {
      id: 'request',
      label: 'New Request',
      description: 'Service requests',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      route: 'requests',
    },
    {
      id: 'appointment',
      label: 'Book Appointment',
      description: 'Meet a specialist',
      icon: Calendar,
      color: 'bg-green-100 text-green-600',
      route: 'appointments',
    },
    {
      id: 'complaint',
      label: 'Report Issue',
      description: 'Complaints & disputes',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
      route: 'complaints',
    },
    {
      id: 'fraud',
      label: 'Fraud Alert',
      description: 'Review transactions',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      route: 'fraud',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2" style={{ color: '#001A72' }}>Support Center</h1>
          <p className="text-sm text-muted-foreground">
            Get help when you need it — track requests, resolve issues, and connect with specialists
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Quick Actions</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.route)}
                  className="bg-white rounded-xl border border-border p-4 hover:border-accent hover:shadow-md transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm mb-0.5" style={{ color: '#001A72' }}>{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Items - Central Area */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Active Items</h2>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Open Requests */}
            <button
              onClick={() => onNavigate('requests')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{openRequests}</p>
                <p className="text-sm text-muted-foreground mb-1">Open Service Requests</p>
                <p className="text-xs text-muted-foreground">
                  {openRequests} request{openRequests !== 1 ? 's' : ''} in progress
                </p>
              </div>
            </button>

            {/* Active Conversations */}
            <button
              onClick={() => onNavigate('chat')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{activeConversations}</p>
                <p className="text-sm text-muted-foreground mb-1">Active Conversations</p>
                <p className="text-xs text-muted-foreground">
                  {activeConversations} ongoing chat{activeConversations !== 1 ? 's' : ''}
                </p>
              </div>
            </button>

            {/* Unresolved Disputes */}
            <button
              onClick={() => onNavigate('complaints')}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl mb-2" style={{ color: '#001A72' }}>{unresolvedDisputes}</p>
                <p className="text-sm text-muted-foreground mb-1">Active Disputes</p>
                <p className="text-xs text-muted-foreground">
                  {unresolvedDisputes > 0 ? `${unresolvedDisputes} under investigation` : 'No active disputes'}
                </p>
              </div>
            </button>
          </div>

          {/* Next Appointment - Full Width */}
          {nextAppointment && (
            <div
              onClick={() => onNavigate('appointments')}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/30 p-6 mt-6 cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-0 text-xs">Upcoming</Badge>
                      <p className="text-xs text-muted-foreground">Next Appointment</p>
                    </div>
                    <p className="text-lg mb-3" style={{ color: '#001A72' }}>{nextAppointment.reason}</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(nextAppointment.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">With {nextAppointment.adviser}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{nextAppointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          )}
        </div>

        {/* Recent Updates - Collapsible */}
        <div>
          <button
            onClick={() => setShowRecentUpdates(!showRecentUpdates)}
            className="flex items-center gap-3 mb-4 w-full group"
          >
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Recent Updates</h2>
            <div className="h-px bg-border flex-1" />
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showRecentUpdates ? 'rotate-180' : ''}`} />
          </button>

          {showRecentUpdates && (
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="space-y-1">
                {mockActivityFeed.slice(0, 8).map((activity) => (
                  <button
                    key={activity.id}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors group flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === 'Document' ? 'bg-purple-100' :
                      activity.type === 'Case Update' ? 'bg-blue-100' :
                      activity.type === 'Appointment' ? 'bg-green-100' :
                      activity.type === 'Chat Message' ? 'bg-accent/10' :
                      'bg-red-100'
                    }`}>
                      {activity.type === 'Document' && <FileText className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'Case Update' && <FileText className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'Appointment' && <Calendar className="h-4 w-4 text-green-600" />}
                      {activity.type === 'Chat Message' && <MessageSquare className="h-4 w-4 text-accent" />}
                      {activity.type === 'Fraud Alert' && <Shield className="h-4 w-4 text-red-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="text-sm truncate" style={{ color: '#001A72' }}>{activity.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                      {activity.linkedTo && (
                        <Badge variant="outline" className="text-[10px] mt-2">
                          {activity.linkedTo}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}