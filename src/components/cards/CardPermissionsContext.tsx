import React, { createContext, useContext, ReactNode } from 'react';

export type UserRole = 'admin' | 'employee';

export interface CardPermissions {
  // Card list visibility
  canViewAllCards: boolean;
  canViewOnlyOwnCard: boolean;
  
  // Card actions
  canAddCardholder: boolean;
  canEditCardholder: boolean;
  canRemoveCardholder: boolean;
  canFreezeCard: boolean;
  canUnfreezeCard: boolean;
  canReplaceCard: boolean;
  canReorderCard: boolean;
  canCreateVirtualCard: boolean;
  canCreateDisposableCard: boolean;
  canReportLostStolen: boolean;
  
  // Sensitive actions
  canViewPAN: boolean;
  canViewPIN: boolean;
  canAddToWallet: boolean;
  
  // Bulk actions
  canPerformBulkActions: boolean;
  canBulkFreeze: boolean;
  canBulkReplace: boolean;
  canBulkReorder: boolean;
  
  // Tab visibility
  canViewSecurityTab: boolean;
  canViewControlsTab: boolean;
  canViewAlertsTab: boolean;
  canViewTransactionsTab: boolean;
  canViewStatementTab: boolean;
  canViewSubscriptionsTab: boolean;
  canViewRewardsTab: boolean;
  
  // Tab permissions
  canManageControls: boolean;
  canManageLimits: boolean;
  canManageMCCBlocks: boolean;
  canManageAlerts: boolean;
  canCancelSubscriptions: boolean;
  canViewAllRewards: boolean; // vs only own card rewards
  
  // Transaction permissions
  canViewAllTransactions: boolean; // vs only own card transactions
  canConvertToBNPL: boolean;
  
  // Data visibility
  canViewBusinessWideData: boolean;
  canViewCreditLimits: boolean;
  canViewSpendBreakdown: boolean;
  
  // Search and filters
  canSearchAllCards: boolean;
  canFilterByEmployee: boolean;
}

interface CardPermissionsContextValue {
  userRole: UserRole;
  permissions: CardPermissions;
  isOwnCard: (cardholderName: string, currentUser?: string) => boolean;
}

const CardPermissionsContext = createContext<CardPermissionsContextValue | undefined>(undefined);

export function useCardPermissions() {
  const context = useContext(CardPermissionsContext);
  if (!context) {
    throw new Error('useCardPermissions must be used within CardPermissionsProvider');
  }
  return context;
}

interface CardPermissionsProviderProps {
  userRole: UserRole;
  currentUser?: string; // For employee mode, to determine "own card"
  children: ReactNode;
}

export function CardPermissionsProvider({ 
  userRole, 
  currentUser = 'Sarah Johnson', // Default for demo
  children 
}: CardPermissionsProviderProps) {
  
  const isAdmin = userRole === 'admin';
  
  const permissions: CardPermissions = {
    // Card list visibility
    canViewAllCards: isAdmin,
    canViewOnlyOwnCard: !isAdmin,
    
    // Card actions - Admin has full access, Employee has limited
    canAddCardholder: isAdmin,
    canEditCardholder: isAdmin,
    canRemoveCardholder: isAdmin,
    canFreezeCard: true, // Both can freeze
    canUnfreezeCard: true, // Both can unfreeze
    canReplaceCard: isAdmin,
    canReorderCard: isAdmin,
    canCreateVirtualCard: isAdmin,
    canCreateDisposableCard: isAdmin,
    canReportLostStolen: true, // Both can report
    
    // Sensitive actions - Both can view their own card's sensitive data
    canViewPAN: true,
    canViewPIN: true,
    canAddToWallet: true,
    
    // Bulk actions - Admin only
    canPerformBulkActions: isAdmin,
    canBulkFreeze: isAdmin,
    canBulkReplace: isAdmin,
    canBulkReorder: isAdmin,
    
    // Tab visibility
    canViewSecurityTab: true, // Both can view, but different content
    canViewControlsTab: isAdmin, // Admin only
    canViewAlertsTab: true, // Both can view their own alerts
    canViewTransactionsTab: true, // Both can view their own transactions
    canViewStatementTab: isAdmin, // Admin only (unless personal credit card)
    canViewSubscriptionsTab: true, // Both can view
    canViewRewardsTab: true, // Both can view
    
    // Tab permissions
    canManageControls: isAdmin,
    canManageLimits: isAdmin,
    canManageMCCBlocks: isAdmin,
    canManageAlerts: true, // Both can manage their own alerts
    canCancelSubscriptions: isAdmin, // Admin only
    canViewAllRewards: isAdmin, // Admin sees business-wide, Employee sees own
    
    // Transaction permissions
    canViewAllTransactions: isAdmin,
    canConvertToBNPL: !isAdmin, // Only for employee's own transactions
    
    // Data visibility
    canViewBusinessWideData: isAdmin,
    canViewCreditLimits: isAdmin,
    canViewSpendBreakdown: isAdmin,
    
    // Search and filters
    canSearchAllCards: isAdmin,
    canFilterByEmployee: isAdmin,
  };
  
  const isOwnCard = (cardholderName: string, user: string = currentUser) => {
    return cardholderName === user;
  };
  
  const value: CardPermissionsContextValue = {
    userRole,
    permissions,
    isOwnCard,
  };
  
  return (
    <CardPermissionsContext.Provider value={value}>
      {children}
    </CardPermissionsContext.Provider>
  );
}
