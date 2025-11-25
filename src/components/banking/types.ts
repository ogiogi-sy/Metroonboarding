export type EntityType = 'all' | 'acme-ltd' | 'acme-holdings';

export interface Account {
  id: string;
  name: string;
  type: 'Current' | 'Savings' | 'Tax';
  accountNumber: string;
  sortCode: string;
  balance: number;
  currency: string;
  status: 'Active' | 'Frozen' | 'Closed';
  entity: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  merchantName: string;
  merchantLogo?: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  time: string;
  type: 'card' | 'faster_payment' | 'direct_debit' | 'standing_order';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
  balanceAfter?: number;
}
