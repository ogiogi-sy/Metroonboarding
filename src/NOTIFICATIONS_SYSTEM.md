# Unified Notifications System

## Overview
The Unified Notifications System provides a comprehensive notification feed and settings interface for UK business banking, fully integrated with the existing Metro Bank design system and role-based permissions.

## Files Created

### 1. `/components/notifications/types.ts`
Type definitions for the notification system:
- **NotificationCategory**: 7 categories (smart-alerts, payments, account-health, documents, card-lifecycle, product-marketing, system)
- **NotificationPriority**: critical | high | normal | low
- **NotificationStatus**: unread | read | archived
- **Notification**: Full notification object with metadata, actions, badges
- **NotificationSettings**: Complete settings structure including delivery channels and team routing

### 2. `/components/notifications/mockData.ts`
Sample data and utilities:
- **MOCK_NOTIFICATIONS**: 15 sample notifications across all 7 categories
- **filterNotificationsByRole()**: Filters notifications based on Admin vs Employee role
- **DEFAULT_NOTIFICATION_SETTINGS**: Default configuration for all notification preferences
- Mock action handlers for demonstration purposes

### 3. `/components/notifications/NotificationsScreen.tsx`
Main notifications feed interface featuring:
- Search bar for filtering notifications
- Tabs: All | Alerts | Payments | Documents | System
- Date grouping: Today, Yesterday, This Week, Earlier
- Notification tiles with:
  - Colored icon badges based on priority
  - Category badges
  - Timestamp
  - Summary text
  - Metadata (Amount, Merchant, Account, etc.)
  - Action buttons (Review Transaction, Mark Safe, etc.)
- Unread indicator dots
- "Mark all read" functionality
- Role-based filtering (Admin sees all, Employee sees only relevant)
- Developer mode toggle for switching between Admin/Employee views

### 4. `/components/notifications/NotificationSettingsScreen.tsx`
Comprehensive settings interface with:
- **Smart Alerts & AI Protection** (non-disableable)
  - Security & Fraud Events
  - Delivery Channels (Push, Email, SMS for critical)
  - Team Notification (Admin only): "Also notify all Admins"
  
- **Transaction & Account Activity**
  - Collapsible sections:
    - Payments & Transfers (Inbound, Outbound, Card transactions)
    - Account Health (High-value alerts, Upcoming payments, Low balance)
  - Delivery Channels (Push, Email)
  - Team Routing (Admin only):
    - "Send payroll alerts to Finance Team"
    - "Send card alerts to cardholders only"
  
- **Documents & Operations**
  - Statements & Reports
  - Compliance & Verification
  - Support Case Updates
  - Delivery Channels (Push, Email)
  - Team Routing (Admin only): "Send compliance alerts to primary admin"
  
- **Product & Marketing**
  - Product updates
  - Offers & promotions
  - Surveys & feedback
  - Service announcements

- Save/Cancel actions with change detection

### 5. `/App.tsx` (Updated)
- Added 'notifications' and 'notification-settings' to Phase2Flow type
- Imported NotificationsScreen and NotificationSettingsScreen
- Added routing for both screens

## Notification Category Mapping

All 15 sample notifications map to the 7 required categories:

### 1. Smart Alerts & AI Protection
- Unusual Activity Detected (Critical)
- Failed Login Attempt Blocked (Critical)

### 2. Payments
- Upcoming Payment Requires Attention (High)
- Inbound Payment Received (Normal)
- Failed Transaction (High)
- Salary Batch Processed (Normal - Admin only)

### 3. Account Health
- AI Insight: Cashflow Pattern Change (Normal)

### 4. Documents & Compliance
- New Document Available (Normal)
- Case Update: Ticket #41193 (Normal)
- Verification Document Approved (Normal)

### 5. Card Lifecycle
- Card Limit Updated (Normal)
- Virtual Card Created (Normal)

### 6. Product Updates & Marketing
- New Feature: Enhanced Expense Tracking (Low)
- Feedback Opportunity (Low)

### 7. System & Service Messages
- Open Banking Sync Completed (Normal)

## Design System Compliance

All components strictly follow the Metro Bank design system:

### Components Used
- ✅ **Badge**: For category and priority indicators
- ✅ **Button**: All actions use primary, outline, and ghost variants
- ✅ **Tabs**: For filtering notifications (All, Alerts, Payments, Documents, System)
- ✅ **Input**: Search bar with icon
- ✅ **Switch**: Toggle controls for notification preferences
- ✅ **Checkbox**: Delivery channel selections
- ✅ **Label**: Form labels throughout
- ✅ **Collapsible**: Expandable settings sections
- ✅ **Card** (via border styling): All notification tiles and settings sections
- ✅ **NavigationSidebar**: Reused from existing screens
- ✅ **DashboardHeader**: Reused from existing screens

### Design Principles Followed
- ✅ **No drop shadows**: All cards use `border border-gray-200` with `rounded-2xl`
- ✅ **Flat aesthetic**: Clean, minimal design with subtle hover states
- ✅ **Pill buttons**: Action buttons use default button styling (already pill-shaped)
- ✅ **Typography**: No custom font sizes or weights - uses default typography scale
- ✅ **Color palette**: Uses only Metro Bank colors (Primary Blue `#0033A0`, Dark Blue `#001A72`, Red `#E4002B`, semantic colors)
- ✅ **Spacing**: Follows 8px grid system
- ✅ **Icons**: All from lucide-react

## Mode Awareness (Admin vs Employee)

### Employee View
- Only sees notifications related to their card/activity
- Excludes:
  - Payroll notifications (Salary Batch Processed)
  - Business-wide financial insights (Cashflow Pattern Change)
  - Compliance alerts unless affecting them (Director document verification)
  - Card notifications unless it's their card
- No team-based routing options in settings
- Cannot configure business-wide notification preferences

### Admin View
- Sees ALL notifications across business accounts
- Full access to:
  - All notification categories
  - Team-based routing in settings
  - Compliance, payroll, and system notifications
  - Business-wide insights
- Team notification routing options:
  - "Also notify all Admins" for security alerts
  - "Send payroll alerts to Finance Team"
  - "Send card alerts to cardholders only"
  - "Send compliance alerts to primary admin"

## Responsive Design

Both screens are fully responsive:
- Mobile: Stacks content vertically, tabs scroll horizontally
- Tablet: Optimized layout with appropriate breakpoints
- Desktop: Full layout with sidebar navigation
- Uses existing responsive patterns from design system
- Search bar and filters adapt to screen size

## Navigation Integration

The notifications system integrates seamlessly with existing navigation:

1. **From any screen**: Navigate to 'notifications' via sidebar or header
2. **From notifications feed**: Click "Settings" button to go to 'notification-settings'
3. **From notification settings**: Click "Back to Notifications" to return to feed
4. **Navigation menu (Developer Tool)**: Both screens accessible from navigation menu

## Access Instructions

To view the Notifications System:

1. Navigate to the Navigation Menu (Step 0 in the app)
2. Go to Phase 2 sections
3. Select "Notifications" to see the feed
4. Click "Settings" button to access notification preferences
5. Toggle between Admin/Employee mode using the Developer Preview Mode toggle at the top

Alternatively, use the navigation sidebar from any Phase 2 screen and select the notifications icon.

## Technical Implementation Details

- **State Management**: Uses React useState hooks, consistent with existing screens
- **Role Filtering**: `filterNotificationsByRole()` function dynamically filters based on user role
- **Date Grouping**: Helper function `getDateGroup()` organizes notifications by time periods
- **Change Detection**: Settings screen tracks changes for Save/Cancel functionality
- **Toast Notifications**: Uses sonner@2.0.3 for action feedback
- **TypeScript**: Fully typed with comprehensive interfaces

## Future Enhancements (Not Implemented)

The system is designed to be extensible for:
- Real-time notification delivery (WebSocket/Server-Sent Events)
- Notification archiving
- Per-category delivery channel customization
- Multi-select role-based routing with team picker
- Notification history and audit log
- Push notification permissions API integration
- Email/SMS template customization
