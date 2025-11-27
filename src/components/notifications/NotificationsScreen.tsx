import React, { useState, useMemo } from 'react';
import { NavigationSidebar } from '../NavigationSidebar';
import { DashboardHeader } from '../DashboardHeader';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { 
  Search, 
  Settings,
  CheckCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  FileText,
  CreditCard,
  Sparkles,
  RefreshCw,
  ShieldAlert,
  XCircle,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Bell,
  Wallet,
  FolderOpen
} from 'lucide-react';
import { cn } from '../ui/utils';
import { MOCK_NOTIFICATIONS, filterNotificationsByRole } from './mockData';
import { Notification, NotificationCategory, DateGroup } from './types';
import { UserRole } from '../cards/CardPermissionsContext';

interface NotificationsScreenProps {
  onNavigate: (section: string, params?: any) => void;
  businessData: any;
  selectedAccounts?: string[];
  onAccountSelectionChange?: (accountIds: string[]) => void;
  userRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

// Icon mapping
const ICON_MAP = {
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'check-circle': CheckCircle2,
  'file-text': FileText,
  'credit-card': CreditCard,
  'shield-alert': ShieldAlert,
  'x-circle': XCircle,
  'briefcase': Briefcase,
  'trending-up': TrendingUp,
  'refresh-cw': RefreshCw,
  'sparkles': Sparkles,
  'message-square': MessageSquare,
  'bell': Bell,
  'wallet': Wallet,
  'folder-open': FolderOpen,
};

// Date grouping helper
function getDateGroup(date: Date): DateGroup {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const notificationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (notificationDate.getTime() === today.getTime()) return 'today';
  if (notificationDate.getTime() === yesterday.getTime()) return 'yesterday';
  if (notificationDate >= weekAgo) return 'thisWeek';
  return 'earlier';
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function NotificationsScreen({ 
  onNavigate, 
  businessData,
  selectedAccounts = ['1', '2'],
  onAccountSelectionChange,
  userRole = 'admin',
  onRoleChange
}: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | NotificationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Filter by role
  const roleFilteredNotifications = useMemo(() => {
    return filterNotificationsByRole(notifications, userRole);
  }, [notifications, userRole]);

  // Filter by tab
  const tabFilteredNotifications = useMemo(() => {
    if (activeTab === 'all') return roleFilteredNotifications;
    return roleFilteredNotifications.filter(n => n.category === activeTab);
  }, [roleFilteredNotifications, activeTab]);

  // Filter by search
  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return tabFilteredNotifications;
    const query = searchQuery.toLowerCase();
    return tabFilteredNotifications.filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.summary.toLowerCase().includes(query)
    );
  }, [tabFilteredNotifications, searchQuery]);

  // Group by date
  const groupedNotifications = useMemo(() => {
    const groups: Record<DateGroup, Notification[]> = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: [],
    };
    
    filteredNotifications.forEach(notification => {
      const group = getDateGroup(notification.timestamp);
      groups[group].push(notification);
    });
    
    return groups;
  }, [filteredNotifications]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' as const })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'read' as const } : n
    ));
  };

  const unreadCount = useMemo(() => {
    return roleFilteredNotifications.filter(n => n.status === 'unread').length;
  }, [roleFilteredNotifications]);

  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'attention':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIconBackgroundColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-600';
      case 'high':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderNotificationTile = (notification: Notification) => {
    const IconComponent = notification.icon ? ICON_MAP[notification.icon as keyof typeof ICON_MAP] : AlertCircle;
    const isUnread = notification.status === 'unread';

    return (
      <div
        key={notification.id}
        onClick={() => handleNotificationClick(notification.id)}
        className={cn(
          'border border-gray-200 rounded-2xl p-4 bg-white hover:border-gray-300 transition-all cursor-pointer',
          isUnread && 'border-blue-300 bg-blue-50/30'
        )}
      >
        <div className="flex gap-4">
          {/* Icon */}
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
            getIconBackgroundColor(notification.priority)
          )}>
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  'text-[15px] text-[#001A72] mb-1',
                  isUnread && 'font-medium'
                )}>
                  {notification.title}
                </h3>
                {notification.badge && (
                  <Badge className={cn(
                    'text-xs border',
                    getBadgeVariant(notification.badge.variant)
                  )}>
                    {notification.badge.text}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-500">
                  {formatTime(notification.timestamp)}
                </span>
                {isUnread && (
                  <div className="w-2 h-2 rounded-full bg-[#0033A0]" />
                )}
              </div>
            </div>

            <p className="text-[14px] text-gray-600 mb-3 leading-relaxed">
              {notification.summary}
            </p>

            {/* Metadata */}
            {notification.metadata && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-[13px] text-gray-500">
                {notification.metadata.amount !== undefined && (
                  <div>
                    <span className="font-medium">Amount:</span>{' '}
                    {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(notification.metadata.amount)}
                  </div>
                )}
                {notification.metadata.merchant && (
                  <div>
                    <span className="font-medium">Merchant:</span> {notification.metadata.merchant}
                  </div>
                )}
                {notification.metadata.account && (
                  <div>
                    <span className="font-medium">Account:</span> {notification.metadata.account}
                  </div>
                )}
                {notification.metadata.reference && (
                  <div>
                    <span className="font-medium">Ref:</span> {notification.metadata.reference}
                  </div>
                )}
                {notification.metadata.cardNumber && (
                  <div>
                    <span className="font-medium">Card:</span> {notification.metadata.cardNumber}
                  </div>
                )}
                {notification.metadata.updatedBy && (
                  <div className="text-xs text-gray-400">
                    Updated by: {notification.metadata.updatedBy}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {notification.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant === 'primary' ? 'default' : action.variant === 'ghost' ? 'ghost' : 'outline'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick();
                    }}
                    className={cn(
                      'h-8 text-xs',
                      action.variant === 'ghost' && 'text-[#0033A0] hover:text-[#0033A0] hover:bg-blue-50'
                    )}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDateGroup = (group: DateGroup, title: string) => {
    const notificationsInGroup = groupedNotifications[group];
    if (notificationsInGroup.length === 0) return null;

    return (
      <div key={group} className="mb-8">
        <div className="sticky top-0 bg-[#F5F6F8] z-10 py-2 mb-4">
          <h2 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            {title}
          </h2>
        </div>
        <div className="space-y-3">
          {notificationsInGroup.map(renderNotificationTile)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <NavigationSidebar 
        activeSection="notifications"
        onNavigate={onNavigate}
        businessData={businessData}
        selectedAccounts={selectedAccounts}
        onAccountSelectionChange={onAccountSelectionChange}
      />
      
      <main className="flex-1 lg:ml-64">
        <DashboardHeader 
          activeSection="notifications"
          onNavigate={onNavigate}
          businessData={businessData}
          selectedAccounts={selectedAccounts}
          onAccountSelectionChange={onAccountSelectionChange}
          userRole={userRole}
          onRoleChange={onRoleChange}
        />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl text-[#001A72]">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-[#0033A0] text-white border-[#0033A0]">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-[#0033A0] hover:text-[#0033A0] hover:bg-blue-50"
                >
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('notification-settings')}
                  className="border-gray-200"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full mb-6">
            <TabsList className="h-auto p-1 bg-gray-100/50 gap-2 w-full justify-start overflow-x-auto no-scrollbar border border-gray-200 rounded-xl">
              {[
                { id: 'all', label: 'All', icon: MessageSquare },
                { id: 'smart-alerts', label: 'Alerts', icon: Bell },
                { id: 'payments', label: 'Payments', icon: Wallet },
                { id: 'documents', label: 'Documents', icon: FolderOpen },
                { id: 'system', label: 'System', icon: Settings }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 transition-all gap-2 border border-transparent",
                    "data-[state=active]:bg-white data-[state=active]:text-[#0033A0] data-[state=active]:border-gray-200",
                    "hover:text-gray-900 hover:bg-gray-200/50"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg text-[#001A72] mb-2">No notifications</h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'No notifications match your search.' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            <>
              {renderDateGroup('today', 'TODAY')}
              {renderDateGroup('yesterday', 'YESTERDAY')}
              {renderDateGroup('thisWeek', 'THIS WEEK')}
              {renderDateGroup('earlier', 'EARLIER')}
            </>
          )}
        </div>
      </main>
    </div>
  );
}