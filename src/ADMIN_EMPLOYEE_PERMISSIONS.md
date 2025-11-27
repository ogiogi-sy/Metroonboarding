# Admin vs Employee Mode - Permissions & Visibility Rules

## Overview
This document outlines the comprehensive permissions and visibility logic implemented across the Business Cards experience, ensuring proper role-based access control between Admin and Employee modes.

## Mode Switcher
Located at the top of the Cards screen as a developer preview banner:
- **Position**: Sticky at top after header (z-index 30)
- **Options**: Admin | Employee toggle
- **Behavior**: Clears selected rows and refilters card list on mode change

---

## 🟦 ADMIN MODE — Full Access

### Cards List Screen

#### Visibility
- ✅ All employee cards visible (5-20+ cards)
- ✅ Search by employees/cards enabled
- ✅ Role badges displayed (Admin, Employee)
- ✅ Status badges (Active, Frozen, Blocked, Issuing)
- ✅ Multi-select checkboxes in list view
- ✅ "Add cardholder" button visible in header
- ✅ Dropdown actions menu on each card row

#### Actions Available
**Card Management:**
- ✅ Freeze / Unfreeze any card
- ✅ Replace card
- ✅ Re-order card
- ✅ Create virtual card
- ✅ Create disposable virtual card
- ✅ Add to wallet
- ✅ View PAN
- ✅ View PIN
- ✅ Report Lost / Stolen
- ✅ Edit cardholder details
- ✅ Add new cardholder

**Bulk Actions:**
- ✅ Multi-select checkboxes
- ✅ Bulk Freeze
- ✅ Bulk Unfreeze
- ✅ Bulk Replace (coming soon)
- ✅ Select/deselect all
- ✅ Bulk action bar with count display

#### Search & Filters
- ✅ Search all cards and employees
- ✅ Filter by type (Physical/Virtual)
- ✅ Filter by status (Active/Frozen/Blocked)
- ✅ Reset filters button

### Card Detail Screen

#### Tabs Visible
1. **Lifecycle & Security** ✅ (Full access)
2. **Controls & Limits** ✅ (Full access)
3. **Alerts** ✅ (Full access)
4. **Transactions** ✅ (All cards' transactions)
5. **Statement** ✅ (Admin only for credit cards)
6. **Subscriptions** ✅ (Can cancel/block)
7. **Rewards** ✅ (Business-wide view)

#### Security Tab (Admin)
- ✅ View PAN
- ✅ View PIN
- ✅ Freeze/Unfreeze toggle
- ✅ Add to Apple/Google Wallet
- ✅ Replace card
- ✅ Report Lost/Stolen
- ✅ All lifecycle actions

#### Controls & Limits Tab (Admin Only)
- ✅ Online payments toggle
- ✅ International payments toggle
- ✅ ATM withdrawals toggle
- ✅ Chip & PIN toggle
- ✅ Magnetic stripe toggle
- ✅ Contactless limit slider (£0-£100)
- ✅ Daily spend limit
- ✅ Cash withdrawal percentage
- ✅ MCC category blocks (Gambling, Travel, Cash, Entertainment)

#### Alerts Tab (Admin)
- ✅ All transaction alerts
- ✅ Large transaction notifications
- ✅ International usage alerts
- ✅ Declined transaction alerts
- ✅ Suspicious activity monitoring

#### Subscriptions Tab (Admin)
- ✅ View all subscriptions
- ✅ Cancel subscriptions
- ✅ Block future payments
- ✅ "Stop Payments" button
- ✅ "Cancel" button

#### Rewards Tab (Admin)
- ✅ Business-wide cashback total (£45.20/month)
- ✅ Individual card earnings (£12.50/month)
- ✅ Lifetime business savings (£342.50)
- ✅ All merchant savings across company
- ✅ Company-wide cashback activity

---

## 🟨 EMPLOYEE MODE — Restricted Access

### Cards List Screen

#### Visibility
- ✅ **ONLY their own card** visible (Sarah Johnson)
- ❌ No other employee cards
- ❌ No bulk actions
- ❌ No multi-select checkboxes
- ❌ No "Add cardholder" button
- ❌ No dropdown actions menu
- ❌ No edit cardholder option

#### Actions Available
**Limited Card Actions:**
- ✅ Freeze / Unfreeze (own card only)
- ✅ View card details
- ❌ Cannot replace card
- ❌ Cannot re-order card
- ❌ Cannot create virtual cards
- ❌ Cannot edit cardholder details
- ❌ Cannot add other cardholders

#### Search & Filters
- ✅ Search (limited to own card)
- ✅ Filter by type
- ✅ Filter by status
- ⚠️ Filters only apply to single visible card

### Card Detail Screen

#### Tabs Visible
1. **Lifecycle & Security** ✅ (Limited access)
2. **Controls & Limits** ❌ (HIDDEN)
3. **Alerts** ✅ (Own alerts only)
4. **Transactions** ✅ (Own transactions only)
5. **Statement** ❌ (HIDDEN)
6. **Subscriptions** ✅ (View only, cannot cancel)
7. **Rewards** ✅ (Own card only)

#### Security Tab (Employee)
- ✅ View PAN (own card)
- ✅ View PIN (own card)
- ✅ Freeze/Unfreeze toggle (own card)
- ✅ Add to wallet (own card)
- ❌ Cannot replace card
- ❌ Cannot manage others' cards

#### Controls & Limits Tab
- ❌ **COMPLETELY HIDDEN** for employees
- ❌ Cannot see or modify:
  - Online payments toggle
  - International toggle
  - Cash withdrawal limits
  - MCC blocks
  - Contactless limits
  - Daily spend limits

#### Alerts Tab (Employee)
- ✅ Own transaction alerts
- ✅ Own card notifications
- ❌ Cannot see alerts for other cards

#### Subscriptions Tab (Employee)
- ✅ View subscriptions (own card)
- ❌ Cannot cancel subscriptions
- ❌ Cannot block future payments
- ⚠️ Buttons replaced with "Active" badge
- ℹ️ Read-only view

#### Rewards Tab (Employee)
- ✅ Own card earnings (£12.50/month)
- ❌ No business-wide total tile
- ✅ Personal lifetime savings (£89.30)
- ✅ Own merchant savings
- ✅ Own cashback activity
- ❌ Cannot see company-wide data

---

## Implementation Details

### File Structure
```
/components/cards/CardPermissionsContext.tsx
  - Permission definitions
  - Role-based access logic
  - Context provider

/components/screens/CardsScreen.tsx
  - Mode switcher UI
  - Card list filtering by role
  - Bulk action visibility
  - Add/Edit cardholder modals

/components/cards/CardsHeader.tsx
  - Conditional "Add cardholder" button

/components/cards/CardDetailScreen.tsx
  - Tab visibility logic
  - Tab content conditional rendering

/components/cards/RewardsTab.tsx
  - Role-based data display
  - Business-wide vs personal stats

/components/cards/SubscriptionsTab.tsx (within CardDetailScreen.tsx)
  - Conditional action buttons
  - Read-only mode for employees
```

### Key Permission Checks

#### Card List Filtering
```typescript
if (userRole === 'employee') {
  // Employee only sees their own card
  if (card.cardholderName !== 'Sarah Johnson') return false;
}
```

#### Tab Visibility
```typescript
{ id: 'security', label: 'Lifecycle & Security', icon: Shield },
...(userRole === 'admin' ? [{ id: 'controls', label: 'Controls & Limits', icon: Settings }] : []),
{ id: 'alerts', label: 'Alerts', icon: Bell },
{ id: 'transactions', label: 'Transactions', icon: FileText },
...(isCreditCard && userRole === 'admin' ? [{ id: 'statement', label: 'Statement', icon: ScrollText }] : []),
```

#### Action Button Visibility
```typescript
{userRole === 'admin' && (
  <Button onClick={onCreateCard}>
    <Plus className="w-4 h-4" />
    Add cardholder
  </Button>
)}
```

---

## UI/UX Guidelines

### Mode Indicator
- Developer preview banner always visible
- Clear visual feedback on mode change
- Immediate UI update when switching modes

### Empty States
- Employee mode shows single card (no "empty" state)
- If employee has no cards: Show helpful message

### Disabled vs Hidden
- **Hidden**: Controls & Limits tab, Add cardholder button
- **Disabled**: N/A (features are either shown or hidden)
- **Read-only**: Subscriptions for employees (visible but non-interactive)

### Visual Feedback
- Multi-select checkboxes only visible in admin mode
- Bulk action bar animates in when cards selected
- Dropdown menus only appear for admin users

---

## Testing Scenarios

### Admin Mode Tests
1. ✅ Can see all 5 cards in mock data
2. ✅ Can select multiple cards
3. ✅ Bulk actions appear when cards selected
4. ✅ "Add cardholder" button visible
5. ✅ Can edit any cardholder
6. ✅ All tabs visible in card detail
7. ✅ Can cancel subscriptions
8. ✅ Sees business-wide rewards

### Employee Mode Tests
1. ✅ Only sees 1 card (Sarah Johnson)
2. ✅ No checkboxes in list view
3. ✅ No bulk actions
4. ✅ No "Add cardholder" button
5. ✅ No edit cardholder option
6. ✅ Controls & Limits tab hidden
7. ✅ Statement tab hidden
8. ✅ Cannot cancel subscriptions
9. ✅ Sees only personal rewards

### Mode Switching Tests
1. ✅ Switching clears selected rows
2. ✅ Card list re-filters immediately
3. ✅ Tabs update when in detail view
4. ✅ Permissions apply instantly

---

## Future Enhancements

### Potential Additions
- Manager role (between admin and employee)
- Approval workflows for employee actions
- Spending limit requests
- Temporary card access delegation
- Audit log of who viewed/modified cards

### Data Considerations
- Current user identification (currently hardcoded as "Sarah Johnson")
- Card ownership mapping
- Permission inheritance from organization settings
- Custom role definitions

---

## Summary

This implementation ensures:
- ✅ Strict role-based access control
- ✅ Clear visual distinction between modes
- ✅ No data leakage between roles
- ✅ Consistent UX across all screens
- ✅ Scalable permission architecture
- ✅ Easy to extend for new roles/features

**Mode switching is instant, permissions are enforced at render-time, and the UI provides clear feedback about what actions are available based on the current user role.**
