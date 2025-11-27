import { Notification } from './types';
import { toast } from 'sonner@2.0.3';

// Helper to create dates relative to now
const now = new Date();
const today = (hours: number, minutes: number = 0) => {
  const date = new Date(now);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const yesterday = (hours: number, minutes: number = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() - 1);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const daysAgo = (days: number, hours: number = 12, minutes: number = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Mock action handlers
const handleReviewTransaction = () => toast.info('Opening transaction details...');
const handleTopUp = () => toast.info('Opening top-up flow...');
const handleMarkSafe = () => toast.success('Marked as safe');
const handleViewTransaction = () => toast.info('Viewing transaction...');
const handleViewStatement = () => toast.info('Opening statement...');
const handleSecureAccount = () => toast.info('Opening security settings...');
const handleRetryPayment = () => toast.info('Retrying payment...');
const handleTransferFunds = () => toast.info('Opening transfer...');
const handleViewUpdate = () => toast.info('Viewing case update...');
const handleViewTeam = () => toast.info('Opening team & directors...');
const handleViewCashflow = () => toast.info('Opening cashflow forecast...');
const handleViewPayroll = () => toast.info('Viewing payroll summary...');
const handleViewScheduled = () => toast.info('Viewing scheduled payments...');
const handleViewCardSettings = () => toast.info('Opening card settings...');

export const MOCK_NOTIFICATIONS: Notification[] = [
  // TODAY - Smart Alerts & AI Protection
  {
    id: '1',
    category: 'smart-alerts',
    priority: 'critical',
    status: 'unread',
    title: 'Unusual Activity Detected',
    summary: 'We\'ve detected a card-not-present transaction that differs from your usual spending pattern.',
    timestamp: today(7, 42),
    metadata: {
      amount: 3248.60,
      merchant: 'Vantage Cloud Services',
      account: 'Main Business Account',
    },
    badge: {
      text: 'Critical Alert',
      variant: 'critical',
    },
    icon: 'alert-triangle',
    actions: [
      { label: 'Review Transaction', variant: 'primary', onClick: handleReviewTransaction },
      { label: 'Mark Safe', variant: 'ghost', onClick: handleMarkSafe },
    ],
  },
  
  // TODAY - Payments
  {
    id: '2',
    category: 'payments',
    priority: 'high',
    status: 'unread',
    title: 'Upcoming Payment Requires Attention',
    summary: 'A scheduled payment of £12,000 to SupplyCo UK is due tomorrow. Your balance may not be sufficient.',
    timestamp: today(7, 10),
    metadata: {
      amount: 12000,
      merchant: 'SupplyCo UK',
    },
    badge: {
      text: 'Attention Needed',
      variant: 'attention',
    },
    icon: 'alert-circle',
    actions: [
      { label: 'Top Up', variant: 'primary', onClick: handleTopUp },
      { label: 'View Scheduled Payments', variant: 'ghost', onClick: handleViewScheduled },
    ],
  },

  // TODAY - Payments
  {
    id: '3',
    category: 'payments',
    priority: 'normal',
    status: 'unread',
    title: 'Inbound Payment Received',
    summary: 'Your client BrightWave Media has paid £4,500.00 into your Client Receivables Account.',
    timestamp: today(6, 48),
    metadata: {
      amount: 4500.00,
      reference: 'INV-2901',
    },
    badge: {
      text: 'Payment',
      variant: 'success',
    },
    icon: 'check-circle',
    actions: [
      { label: 'View Transaction', variant: 'ghost', onClick: handleViewTransaction },
    ],
  },

  // TODAY - Documents
  {
    id: '4',
    category: 'documents',
    priority: 'normal',
    status: 'unread',
    title: 'New Document Available',
    summary: 'Your October Monthly Statement for Main Business Account is now available.',
    timestamp: today(6, 2),
    badge: {
      text: 'Document',
      variant: 'info',
    },
    icon: 'file-text',
    actions: [
      { label: 'View Statement', variant: 'ghost', onClick: handleViewStatement },
    ],
  },

  // TODAY - Card Lifecycle
  {
    id: '5',
    category: 'card-lifecycle',
    priority: 'normal',
    status: 'unread',
    title: 'Card Limit Updated',
    summary: 'Your spending limit for Corporate Card •••• 3249 has been updated to £15,000.',
    timestamp: today(5, 15),
    metadata: {
      cardNumber: '•••• 3249',
      updatedBy: 'Jasmine Patel (Account Admin)',
    },
    badge: {
      text: 'Card Update',
      variant: 'info',
    },
    icon: 'credit-card',
    actions: [
      { label: 'View Card Settings', variant: 'ghost', onClick: handleViewCardSettings },
    ],
  },

  // YESTERDAY - Smart Alerts
  {
    id: '6',
    category: 'smart-alerts',
    priority: 'critical',
    status: 'unread',
    title: 'Failed Login Attempt Blocked',
    summary: 'We blocked an attempted login from a new device located in Germany.',
    timestamp: yesterday(23, 14),
    badge: {
      text: 'Attention Needed',
      variant: 'attention',
    },
    icon: 'shield-alert',
    actions: [
      { label: 'Secure Your Account', variant: 'primary', onClick: handleSecureAccount },
    ],
  },

  // YESTERDAY - Payments
  {
    id: '7',
    category: 'payments',
    priority: 'high',
    status: 'read',
    title: 'Failed Transaction',
    summary: 'A payment of £1,800.00 to Metro Office Supplies has failed due to insufficient funds.',
    timestamp: yesterday(18, 36),
    metadata: {
      amount: 1800.00,
      merchant: 'Metro Office Supplies',
    },
    badge: {
      text: 'Attention Needed',
      variant: 'attention',
    },
    icon: 'x-circle',
    actions: [
      { label: 'Retry Payment', variant: 'primary', onClick: handleRetryPayment },
      { label: 'Transfer Funds', variant: 'ghost', onClick: handleTransferFunds },
    ],
  },

  // YESTERDAY - Documents
  {
    id: '8',
    category: 'documents',
    priority: 'normal',
    status: 'read',
    title: 'Case Update: Ticket #41193',
    summary: 'Your case regarding "Locked Payment Approval Workflow" has been updated by our support team.',
    timestamp: yesterday(16, 12),
    badge: {
      text: 'Support',
      variant: 'info',
    },
    icon: 'briefcase',
    actions: [
      { label: 'View Update', variant: 'ghost', onClick: handleViewUpdate },
    ],
  },

  // YESTERDAY - Documents
  {
    id: '9',
    category: 'documents',
    priority: 'normal',
    status: 'read',
    title: 'Verification Document Approved',
    summary: 'The Proof of Address for director Marco Rinaldi has been successfully verified.',
    timestamp: yesterday(14, 5),
    badge: {
      text: 'Compliance',
      variant: 'success',
    },
    icon: 'check-circle',
    actions: [
      { label: 'View Team & Directors', variant: 'ghost', onClick: handleViewTeam },
    ],
  },

  // YESTERDAY - Account Health
  {
    id: '10',
    category: 'account-health',
    priority: 'normal',
    status: 'read',
    title: 'AI Insight: Cashflow Pattern Change',
    summary: 'We\'ve noticed higher-than-usual outgoing transfers this week. Your forecasted available balance for Friday is £3,900 lower than usual.',
    timestamp: yesterday(13, 41),
    badge: {
      text: 'AI Insight',
      variant: 'info',
    },
    icon: 'trending-up',
    actions: [
      { label: 'View Cashflow Forecast', variant: 'ghost', onClick: handleViewCashflow },
    ],
  },

  // YESTERDAY - Payments (Payroll - Admin only)
  {
    id: '11',
    category: 'payments',
    priority: 'normal',
    status: 'read',
    title: 'Salary Batch Processed',
    summary: 'Your scheduled payroll run (36 employees, £102,240 total) has been successfully processed.',
    timestamp: yesterday(12, 59),
    badge: {
      text: 'Payroll',
      variant: 'success',
    },
    icon: 'check-circle',
    actions: [
      { label: 'View Payroll Summary', variant: 'ghost', onClick: handleViewPayroll },
    ],
  },

  // THIS WEEK - System
  {
    id: '12',
    category: 'system',
    priority: 'normal',
    status: 'read',
    title: 'Open Banking Sync Completed',
    summary: 'Your connected external account (HSBC Business Account) has been successfully synced.',
    timestamp: daysAgo(2, 11, 48),
    badge: {
      text: 'System',
      variant: 'info',
    },
    icon: 'refresh-cw',
  },

  // THIS WEEK - Product & Marketing
  {
    id: '13',
    category: 'product-marketing',
    priority: 'low',
    status: 'read',
    title: 'New Feature: Enhanced Expense Tracking',
    summary: 'Track your business expenses more easily with our new categorization tool and receipt scanning.',
    timestamp: daysAgo(3, 10, 15),
    badge: {
      text: 'Product Update',
      variant: 'info',
    },
    icon: 'sparkles',
  },

  // EARLIER
  {
    id: '14',
    category: 'card-lifecycle',
    priority: 'normal',
    status: 'read',
    title: 'Virtual Card Created',
    summary: 'A new virtual card has been issued for Marketing Team with a £5,000 limit.',
    timestamp: daysAgo(9, 15, 22),
    badge: {
      text: 'Card Update',
      variant: 'info',
    },
    icon: 'credit-card',
  },

  // EARLIER
  {
    id: '15',
    category: 'product-marketing',
    priority: 'low',
    status: 'read',
    title: 'Feedback Opportunity',
    summary: 'We\'d love to hear about your experience with Metro Bank. Take our 2-minute survey.',
    timestamp: daysAgo(12, 9, 30),
    badge: {
      text: 'Survey',
      variant: 'info',
    },
    icon: 'message-square',
  },
];

// Filter notifications based on user role
export function filterNotificationsByRole(
  notifications: Notification[], 
  userRole: 'admin' | 'employee',
  currentUser: string = 'Sarah Johnson'
): Notification[] {
  if (userRole === 'admin') {
    return notifications; // Admin sees all
  }
  
  // Employee only sees notifications relevant to them
  return notifications.filter(notification => {
    // Exclude payroll and business-wide financial insights
    if (notification.id === '11') return false; // Salary Batch (payroll)
    if (notification.id === '10') return false; // AI Cashflow insight (business-wide)
    
    // Exclude compliance/verification unless about them
    if (notification.id === '9') return false; // Document approval for director
    
    // Include card notifications only if it's their card
    if (notification.category === 'card-lifecycle') {
      // For demo purposes, assume Sarah Johnson's card is 3249
      if (notification.id === '5' && currentUser === 'Sarah Johnson') {
        return true;
      }
      return false;
    }
    
    return true;
  });
}

export const DEFAULT_NOTIFICATION_SETTINGS = {
  smartAlerts: {
    fraud: true,
    unusualActivity: true,
    failedLogin: true,
    securityEvents: true,
  },
  transactions: {
    payments: true,
    inbound: true,
    outbound: true,
    cardTransactions: true,
    directDebits: true,
    standingOrders: true,
    salary: true,
    highValue: true,
    upcomingPayments: true,
    missedPayments: true,
    lowBalance: true,
  },
  documents: {
    statements: true,
    documentUploads: true,
    caseUpdates: true,
    kyc: true,
    complianceReminders: true,
  },
  productMarketing: {
    productUpdates: true,
    offers: false,
    surveys: false,
    announcements: true,
  },
  deliveryChannels: {
    push: true,
    email: true,
    sms: false,
    inApp: true,
    smsForCritical: true,
  },
  teamNotifications: {
    payrollToFinance: true,
    cardToCardholders: true,
    complianceToPrimaryAdmin: true,
  },
};
