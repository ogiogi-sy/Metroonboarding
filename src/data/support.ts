// Conversations (Chat)
export interface Conversation {
  id: string;
  type: 'AI' | 'Colleague';
  preview: string;
  linkedTo?: string;
  date: string;
  status: 'Active' | 'Closed';
  unread: boolean;
  assignedTo?: string;
}

export const mockConversations: Conversation[] = [
  {
    id: 'CONV-104',
    type: 'AI',
    preview: 'How do I update my business address?',
    linkedTo: 'Service Request #SR-3028',
    date: '2025-11-24T10:30:00',
    status: 'Active',
    unread: true,
  },
  {
    id: 'CONV-103',
    type: 'Colleague',
    preview: 'Thanks for the clarification on the payment issue',
    linkedTo: 'Service Request #SR-3022',
    date: '2025-11-23T15:45:00',
    status: 'Closed',
    unread: false,
    assignedTo: 'Sarah Mitchell',
  },
  {
    id: 'CONV-102',
    type: 'AI',
    preview: 'What are the fees for international payments?',
    date: '2025-11-22T09:15:00',
    status: 'Closed',
    unread: false,
  },
];

// Secure Messages
export interface SecureMessage {
  id: string;
  subject: string;
  type: 'RM Message' | 'Document Request' | 'Case Update' | 'General';
  preview: string;
  from: string;
  date: string;
  status: 'Unread' | 'Read';
  caseNumber?: string;
  account?: string;
  entity?: string;
  attachments?: number;
}

export const mockSecureMessages: SecureMessage[] = [
  {
    id: 'MSG-501',
    subject: 'Document Required: Proof of Address',
    type: 'Document Request',
    preview: 'We need an updated proof of address for your account verification...',
    from: 'Verification Team',
    date: '2025-11-24T08:00:00',
    status: 'Unread',
    caseNumber: 'SR-3028',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    attachments: 0,
  },
  {
    id: 'MSG-500',
    subject: 'Your Quarterly Review',
    type: 'RM Message',
    preview: 'Hi, I wanted to schedule our quarterly business review...',
    from: 'James Thompson (RM)',
    date: '2025-11-23T14:30:00',
    status: 'Read',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    attachments: 1,
  },
  {
    id: 'MSG-499',
    subject: 'Case Update: Address Change Request',
    type: 'Case Update',
    preview: 'Your address change request has been processed successfully...',
    from: 'Support Team',
    date: '2025-11-22T11:20:00',
    status: 'Read',
    caseNumber: 'SR-3025',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    attachments: 0,
  },
];

// Service Requests
export interface ServiceRequest {
  id: string;
  type: 'Address Change' | 'Mandate Change' | 'Add User' | 'Business Details' | 'Document Request' | 'General Enquiry';
  account: string;
  entity: string;
  status: 'New' | 'In Progress' | 'With Customer' | 'Completed';
  created: string;
  lastUpdated: string;
  description: string;
  assignedTo?: string;
  documents?: number;
}

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'SR-3028',
    type: 'Address Change',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    status: 'In Progress',
    created: '2025-11-20T10:00:00',
    lastUpdated: '2025-11-24T09:15:00',
    description: 'Update registered business address to new office location',
    assignedTo: 'Verifications Team',
    documents: 2,
  },
  {
    id: 'SR-3027',
    type: 'Add User',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    status: 'With Customer',
    created: '2025-11-18T14:30:00',
    lastUpdated: '2025-11-23T16:45:00',
    description: 'Add new authorised user - John Smith',
    assignedTo: 'Account Services',
    documents: 1,
  },
  {
    id: 'SR-3026',
    type: 'Document Request',
    account: 'Business Savings Account',
    entity: 'Acme Ltd',
    status: 'Completed',
    created: '2025-11-15T09:00:00',
    lastUpdated: '2025-11-20T11:30:00',
    description: 'Request statement for tax purposes',
    assignedTo: 'Documents Team',
    documents: 1,
  },
  {
    id: 'SR-3025',
    type: 'Business Details',
    account: 'Business Current Account',
    entity: 'Tech Ventures Ltd',
    status: 'New',
    created: '2025-11-24T08:00:00',
    lastUpdated: '2025-11-24T08:00:00',
    description: 'Update company directors information',
    documents: 0,
  },
];

// Complaints
export interface Complaint {
  caseNumber: string;
  category: 'Account Issue' | 'Card Issue' | 'Payment Issue' | 'App or Service' | 'Other';
  status: 'Submitted' | 'Under Review' | 'Awaiting Info' | 'Resolved';
  date: string;
  lastUpdated: string;
  description: string;
  account?: string;
  entity?: string;
  assignedTo?: string;
  evidence?: number;
}

export const mockComplaints: Complaint[] = [
  {
    caseNumber: 'CMP-112',
    category: 'Card Issue',
    status: 'Awaiting Info',
    date: '2025-11-20T10:30:00',
    lastUpdated: '2025-11-23T14:00:00',
    description: 'Card payment declined despite sufficient funds',
    account: 'Business Current Account',
    entity: 'Acme Ltd',
    assignedTo: 'Complaints Team',
    evidence: 2,
  },
  {
    caseNumber: 'CMP-111',
    category: 'Payment Issue',
    status: 'Under Review',
    date: '2025-11-18T09:15:00',
    lastUpdated: '2025-11-22T11:30:00',
    description: 'International payment delayed by 5 days',
    account: 'Business Current Account',
    entity: 'Tech Ventures Ltd',
    assignedTo: 'Payments Resolution',
    evidence: 1,
  },
];

// Disputes
export interface Dispute {
  id: string;
  transactionId: string;
  merchant: string;
  amount: number;
  date: string;
  reason: 'Fraud' | 'Not Authorized' | 'Goods Not Received' | 'Quality Issue' | 'Duplicate Charge';
  status: 'Submitted' | 'Under Investigation' | 'Reimbursed' | 'Declined';
  submittedDate: string;
  lastUpdated: string;
  investigator?: string;
  evidence?: number;
  cardLast4?: string;
}

export const mockDisputes: Dispute[] = [
  {
    id: 'DSP-225',
    transactionId: 'TXN-89023',
    merchant: 'Suspicious Online Store',
    amount: 1250.00,
    date: '2025-11-22T18:30:00',
    reason: 'Not Authorized',
    status: 'Under Investigation',
    submittedDate: '2025-11-23T09:00:00',
    lastUpdated: '2025-11-24T10:15:00',
    investigator: 'Fraud Team',
    evidence: 3,
    cardLast4: '4242',
  },
];

// Fraud Alerts
export interface FraudAlert {
  id: string;
  transactionId: string;
  merchant: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Disputed' | 'Cleared';
  requiresAction: boolean;
  cardLast4?: string;
  location?: string;
}

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'FRD-445',
    transactionId: 'TXN-89024',
    merchant: 'AWS UK',
    amount: 932.00,
    date: '2025-11-24T02:15:00',
    status: 'Pending',
    requiresAction: true,
    cardLast4: '4242',
    location: 'Online',
  },
];

// Appointments
export interface Appointment {
  id: string;
  reason: string;
  type: 'Branch' | 'Phone' | 'Video';
  date: string;
  duration: number; // minutes
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  location?: string;
  adviser?: string;
  notes?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: 'APT-332',
    reason: 'Lending Support',
    type: 'Branch',
    date: '2025-11-25T15:00:00',
    duration: 60,
    status: 'Scheduled',
    location: 'Metro Bank - Holborn',
    adviser: 'Sarah Mitchell',
    notes: 'Discuss business loan options',
  },
  {
    id: 'APT-331',
    reason: 'General Business Banking',
    type: 'Phone',
    date: '2025-11-20T10:00:00',
    duration: 30,
    status: 'Completed',
    adviser: 'James Thompson',
    notes: 'Quarterly review completed',
  },
];

// Activity Feed
export interface ActivityItem {
  id: string;
  type: 'Document' | 'Case Update' | 'Appointment' | 'Chat Message' | 'Fraud Alert';
  title: string;
  description: string;
  date: string;
  linkedTo?: string;
}

export const mockActivityFeed: ActivityItem[] = [
  {
    id: 'ACT-101',
    type: 'Document',
    title: 'Document Received',
    description: 'Proof of address uploaded for SR-3028',
    date: '2025-11-24T10:30:00',
    linkedTo: 'SR-3028',
  },
  {
    id: 'ACT-100',
    type: 'Case Update',
    title: 'Case Updated',
    description: 'CMP-112 status changed to Awaiting Info',
    date: '2025-11-23T14:00:00',
    linkedTo: 'CMP-112',
  },
  {
    id: 'ACT-099',
    type: 'Appointment',
    title: 'Appointment Confirmed',
    description: 'Meeting with Sarah Mitchell scheduled for tomorrow',
    date: '2025-11-23T11:20:00',
    linkedTo: 'APT-332',
  },
  {
    id: 'ACT-098',
    type: 'Chat Message',
    title: 'New Message',
    description: 'Response received from Support Team',
    date: '2025-11-23T09:45:00',
    linkedTo: 'CONV-103',
  },
  {
    id: 'ACT-097',
    type: 'Fraud Alert',
    title: 'Fraud Alert Triggered',
    description: 'Suspicious transaction detected - £932',
    date: '2025-11-24T02:15:00',
    linkedTo: 'FRD-445',
  },
];

// Timeline Events
export interface TimelineEvent {
  id: string;
  type: 'Created' | 'Updated' | 'Document Uploaded' | 'Assigned' | 'Status Changed' | 'Message' | 'Completed';
  title: string;
  description?: string;
  date: string;
  user?: string;
  icon?: string;
}
