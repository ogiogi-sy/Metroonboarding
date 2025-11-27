import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell,
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
  MessageSquare
} from 'lucide-react';
import { cn } from './ui/utils';
import { MOCK_NOTIFICATIONS, filterNotificationsByRole } from './notifications/mockData';
import { Notification, NotificationCategory } from './notifications/types';
import { UserRole } from './cards/CardPermissionsContext';

interface NotificationsPopoverProps {
  onNavigate: (section: string, params?: any) => void;
  userRole?: UserRole;
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
};

const PRIORITY_COLORS = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-gray-400',
};

export function NotificationsPopover({ onNavigate, userRole = 'admin' }: NotificationsPopoverProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | NotificationCategory>('all');

  // Filter notifications by role
  const notifications = useMemo(
    () => filterNotificationsByRole(MOCK_NOTIFICATIONS, userRole),
    [userRole]
  );

  // Count unread notifications
  const unreadCount = useMemo(
    () => notifications.filter(n => n.status === 'unread').length,
    [notifications]
  );

  // Filter by active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(n => n.category === activeTab);
  }, [notifications, activeTab]);

  // Get only recent notifications (last 5)
  const recentNotifications = filteredNotifications.slice(0, 5);

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const handleViewAll = () => {
    setOpen(false);
    onNavigate('notifications');
  };

  const handleSettingsClick = () => {
    setOpen(false);
    onNavigate('notification-settings');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors relative">
          <Bell className="w-5 h-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#0033A0] rounded-full"></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[420px] p-0 border border-gray-200 rounded-2xl bg-white" 
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-[#0033A0] text-white hover:bg-[#0033A0]">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettingsClick}
              className="h-8 px-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-9 bg-gray-100">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="smart-alerts" className="text-xs">Alerts</TabsTrigger>
              <TabsTrigger value="payments" className="text-xs">Payments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[400px]">
          {recentNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentNotifications.map((notification) => {
                const IconComponent = ICON_MAP[notification.icon as keyof typeof ICON_MAP] || Bell;
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer",
                      notification.status === 'unread' && "bg-blue-50/30"
                    )}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        PRIORITY_COLORS[notification.priority]
                      )}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm text-gray-900 line-clamp-1">{notification.title}</p>
                          {notification.status === 'unread' && (
                            <div className="w-2 h-2 bg-[#0033A0] rounded-full flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                          {notification.summary}
                        </p>
                        <p className="text-xs text-gray-400">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full text-[#0033A0] hover:bg-blue-50"
            onClick={handleViewAll}
          >
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
