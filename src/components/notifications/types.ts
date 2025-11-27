export type NotificationCategory = 
  | 'smart-alerts' 
  | 'payments' 
  | 'account-health' 
  | 'documents' 
  | 'card-lifecycle' 
  | 'product-marketing' 
  | 'system';

export type NotificationPriority = 'critical' | 'high' | 'normal' | 'low';

export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface NotificationMetadata {
  amount?: number;
  merchant?: string;
  account?: string;
  reference?: string;
  cardNumber?: string;
  updatedBy?: string;
  [key: string]: any;
}

export interface Notification {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  summary: string;
  timestamp: Date;
  metadata?: NotificationMetadata;
  actions?: NotificationAction[];
  badge?: {
    text: string;
    variant: 'critical' | 'attention' | 'success' | 'info';
  };
  icon?: string;
}

export interface NotificationAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick: () => void;
}

export interface NotificationSettings {
  smartAlerts: {
    fraud: boolean;
    unusualActivity: boolean;
    failedLogin: boolean;
    securityEvents: boolean;
  };
  transactions: {
    payments: boolean;
    inbound: boolean;
    outbound: boolean;
    cardTransactions: boolean;
    directDebits: boolean;
    standingOrders: boolean;
    salary: boolean;
    highValue: boolean;
    upcomingPayments: boolean;
    missedPayments: boolean;
    lowBalance: boolean;
  };
  documents: {
    statements: boolean;
    documentUploads: boolean;
    caseUpdates: boolean;
    kyc: boolean;
    complianceReminders: boolean;
  };
  productMarketing: {
    productUpdates: boolean;
    offers: boolean;
    surveys: boolean;
    announcements: boolean;
  };
  deliveryChannels: {
    push: boolean;
    email: boolean;
    sms: boolean;
    inApp: boolean;
    smsForCritical: boolean;
  };
  teamNotifications?: {
    payrollToFinance: boolean;
    cardToCardholders: boolean;
    complianceToPrimaryAdmin: boolean;
  };
}

export type DateGroup = 'today' | 'yesterday' | 'thisWeek' | 'earlier';
