# Cards Module - Layout Specification

## Design System Foundation

### Color Palette
- **Primary Blue**: #0033A0 (used for CTAs, active states, links)
- **Primary Blue Hover**: #002b87
- **Background**: #F9FAFB (gray-50)
- **Surface**: #FFFFFF (white cards and panels)
- **Borders**: #E5E7EB (gray-200)
- **Text Primary**: #111827 (gray-900)
- **Text Secondary**: #6B7280 (gray-600)

### Typography
- **Font Family**: Inter (no bold weights allowed)
- **Heading Large**: 28px
- **Heading Medium**: 20px
- **Heading Small**: 18px
- **Body**: 14px
- **Caption**: 13px
- **Small**: 12px

### Spacing System
- **Base unit**: 4px
- **Common spacing**: 16px, 24px, 32px (4px increments)
- **Section padding**: 32px (py-8)
- **Card padding**: 24px (p-6)
- **Component padding**: 16px (p-4)

---

## 1. Cards Overview Screen

### 1.1 Global Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Fraud Alert Banner (conditional)                            │
├─────────────────────────────────────────────────────────────┤
│ Page Header                                                  │
├─────────────────────────────────────────────────────────────┤
│ Filters Bar                                                  │
├─────────────────────────────────────────────────────────────┤
│ Card Grid (Main Content Area)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Fraud Alert Banner (Conditional)
**Location**: Top of page, full-width
**Background**: Red-50 (#FEF2F2)
**Border**: Bottom border, Red-200
**Padding**: 16px vertical, 32px horizontal
**Max Width**: 1280px (centered)

**Content Structure**:
- Left side: Alert icon (AlertTriangle, 20px) + text content
  - Primary text: 14px, Red-900
  - Secondary text: 13px, Red-700
- Right side: "Review Now" CTA button
  - Background: Red-600
  - Text: White, 13px
  - Padding: 8px 16px
  - Border radius: 8px

### 1.3 Page Header
**Background**: White
**Border**: Bottom border, Gray-200
**Padding**: 24px vertical, 32px horizontal
**Max Width**: 1280px (centered)

**Content Structure**:
- Left column:
  - Page title: "Cards" - 28px, Gray-900
  - Subtitle: "Manage all your business debit and credit cards" - 15px, Gray-600
- Right column:
  - "Create Virtual Card" button
    - Background: Primary Blue (#0033A0)
    - Text: White, 14px
    - Icon: Plus icon (16px)
    - Padding: 12px 16px
    - Border radius: 8px
    - Hover: #002b87

### 1.4 Filters Bar
**Background**: White
**Border**: Bottom border, Gray-200
**Padding**: 16px vertical, 32px horizontal
**Max Width**: 1280px (centered)

**Content**: Horizontal flex layout with gap of 16px
Each filter dropdown:
- Label: 12px, Gray-600, margin-bottom 4px
- Select input:
  - Padding: 8px 12px
  - Border: 1px solid Gray-300
  - Border radius: 8px
  - Font size: 13px
  - Focus: 2px ring, Primary Blue

**Filter Options**:
1. Entity filter
2. Card Type filter
3. Status filter

### 1.5 Card Grid
**Background**: Gray-50
**Padding**: 32px
**Max Width**: 1280px (centered)

**Grid Structure**:
- Layout: CSS Grid
- Columns: 
  - Mobile: 1 column
  - Tablet (768px+): 2 columns
  - Desktop (1024px+): 3 columns
- Gap: 24px between cards

---

## 2. Card Tile Component

### 2.1 Card Container
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px
**Hover state**: Border color changes to Primary Blue
**Cursor**: Pointer
**Transition**: All 200ms

### 2.2 Card Visual Section
**Dimensions**: Full width, height 192px
**Border radius**: 8px
**Padding**: 24px
**Text color**: White
**Background**: Linear gradient
  - Physical cards: `linear-gradient(135deg, #0033A0 0%, #002b87 100%)`
  - Virtual cards: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

**Top Row**:
- Left: Entity name (10px, uppercase, tracking-wider, opacity 80%)
- Right: Status pill
  - Active: Green-50 bg, Green-700 text, Green-200 border
  - Frozen: Blue-50 bg, Blue-700 text, Blue-200 border
  - Lost/Blocked: Red-50 bg, Red-700 text, Red-200 border
  - Pending: Amber-50 bg, Amber-700 text, Amber-200 border
  - Padding: 4px 8px
  - Border radius: 4px
  - Font size: 10px

**Bottom Section**:
- Card type: 11px, opacity 80%
- Card number: `•••• •••• •••• 3821` - 20px, letter-spacing 0.2em
- Bottom row:
  - Left: "CARDHOLDER" label (10px, opacity 80%) + Name (13px)
  - Right: Expiry date (11px, opacity 80%)

### 2.3 Quick Actions Row
**Margin top**: 16px
**Layout**: Flex with gap 8px

**Button Styles**:
1. **Freeze/Unfreeze button** (flex-1):
   - Border: Primary Blue
   - Text: Primary Blue, 13px
   - Background: White
   - Hover: Blue-50 background
   - Padding: 8px 12px
   - Border radius: 8px

2. **Icon buttons** (Controls, Replace):
   - Border: Gray-300
   - Icon: Gray-700, 16px
   - Background: White
   - Hover: Gray-50
   - Padding: 8px 12px
   - Border radius: 8px

---

## 3. Card Detail Screen

### 3.1 Overall Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header (with back button)                                   │
├─────────────────────────────────────────────────────────────┤
│ Tab Navigation                                               │
├─────────────────────────────────────────────────────────────┤
│ Tab Content Area                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Header
**Background**: White
**Border**: Bottom border, Gray-200
**Padding**: 24px vertical, 32px horizontal
**Max Width**: 1280px (centered)

**Content**:
- Back button:
  - Text: "Back to Cards"
  - Color: Primary Blue
  - Font size: 14px
  - Icon: ArrowLeft (16px)
  - Margin bottom: 16px
  - Hover: Underline
- Page title: "Card Details" - 28px, Gray-900
- Subtitle: Card type + last 4 digits - 15px, Gray-600

### 3.3 Tab Navigation
**Background**: White
**Border**: Bottom border, Gray-200
**Max Width**: 1280px (centered)
**Padding**: 0 32px

**Tab Structure**:
- Layout: Horizontal flex with gap 32px
- Each tab:
  - Padding: 16px vertical
  - Font size: 14px
  - Border bottom: 2px solid
  - Active state:
    - Border color: Primary Blue
    - Text color: Primary Blue
  - Inactive state:
    - Border color: Transparent
    - Text color: Gray-600
    - Hover: Gray-900
  - Transition: All 200ms

**Tabs**: Overview | Controls | Activity | Services | Management

### 3.4 Content Area
**Background**: Gray-50
**Padding**: 32px
**Max Width**: 1280px (centered)

---

## 4. Overview Tab Layout

### 4.1 Grid Structure
**Layout**: CSS Grid
- Desktop: 2 columns (2fr, 1fr) - main content + sidebar
- Mobile: 1 column (stacked)
- Gap: 32px

### 4.2 Left Column (Main Content)

#### Card Visual Block
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px
**Margin bottom**: 24px

**Card Display**:
- Max width: 400px
- Height: 256px
- Same gradient styling as card tile
- Margin bottom: 24px

**Quick Actions Grid**:
- Columns: 2 on mobile, 5 on desktop
- Gap: 12px
- Buttons:
  - Background: White
  - Border: Gray-300
  - Padding: 12px 16px
  - Border radius: 8px
  - Font size: 13px
  - Icon: 16px
  - Hover: Gray-50
  - Flex: items-center, justify-center, gap 8px

**Actions**: Freeze | View PIN | View PAN | Apple Pay | Replace

#### Recent Activity Block
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px

**Header**:
- Flex: space-between, align-center
- Title: "Recent Activity" - 16px, Gray-900
- Link: "View all Activity" - 13px, Primary Blue with ChevronRight icon

**Transaction List**:
- Layout: Vertical stack, gap 12px
- Each transaction:
  - Padding: 12px
  - Border radius: 8px
  - Hover: Gray-50 background
  - Cursor: pointer
  - Flex: space-between
  - Transition: background 200ms

**Transaction Item Structure**:
- Left side:
  - Avatar circle: 40px, Gray-100 background, merchant initials
  - Merchant name: 14px, Gray-900
  - Category: 12px, Gray-500
- Right side (text-right):
  - Amount: 14px, Gray-900
  - Date: 12px, Gray-500

### 4.3 Right Column (Sidebar)

#### Card Summary Block
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px

**Header**: "Card Summary" - 16px, Gray-900, margin-bottom 16px

**Summary Items**: Vertical stack, gap 16px
Each item:
- Label: 13px, Gray-600, margin-bottom 4px
- Value: 15px, Gray-900

**Items**:
- Daily spend limit
- Per-transaction limit
- Contactless limit
- Cash withdrawal limit
- MCC blocks enabled
- Virtual card available
- Divider (border-top, Gray-200, padding-top 16px)
- Cardholder name
- Card product

---

## 5. Controls Tab Layout

### 5.1 Section Stack
**Layout**: Vertical stack
**Gap**: 32px between sections

### 5.2 Card Status Section
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px

**Header**: "Card Status" - 18px, Gray-900, margin-bottom 16px

**Freeze Toggle Panel**:
- Background: Gray-50
- Padding: 16px
- Border radius: 8px
- Flex: space-between, align-center

**Toggle Switch**:
- Width: 56px (14 * 4)
- Height: 28px (7 * 4)
- Border radius: Full (rounded-full)
- Background: Gray-300 (off), Primary Blue (on)
- Knob: 20px circle, White, transitions transform
- Active state: translateX(28px)

**Report Button**:
- Margin top: 16px
- Full width
- Border: Red-300
- Text: Red-700, 14px
- Background: White
- Hover: Red-50
- Padding: 12px 16px
- Border radius: 8px

### 5.3 Usage Controls Section
**Same container styling as above**

**Header**: "Usage Controls" - 18px, Gray-900, margin-bottom 16px

**Control Items**: Vertical stack, gap 16px
Each item:
- Border: 1px solid Gray-200
- Border radius: 8px
- Padding: 16px
- Flex: space-between, align-center
- Label: 14px, Gray-900, capitalized

Controls list:
- Online transactions
- International transactions
- ATM withdrawals
- Contactless payments
- Chip & PIN availability

### 5.4 Spending Limits Section
**Same container styling**

**Header**: "Spending Limits" - 18px, Gray-900, margin-bottom 16px

**Slider Items**: Vertical stack, gap 24px
Each slider:
- Label: 14px, Gray-700, margin-bottom 8px (includes current value)
- Range input:
  - Width: 100%
  - Height: 8px (h-2)
  - Background: Gray-200
  - Border radius: 8px (rounded-lg)
  - Accent color: Primary Blue
  - Cursor: pointer

**Sliders**:
- Daily spend limit: 0-10,000, step 100
- Per-transaction limit: 0-5,000, step 50
- Cash limit: 0-100%, step 5
- Contactless limit: Number input field

### 5.5 MCC Category Blocks Section
**Same container styling**

**Header**: "Category Blocks" - 18px, Gray-900, margin-bottom 16px

**Grid Layout**:
- Columns: 2 on mobile, 3 on desktop (768px+)
- Gap: 16px

**Category Tile**:
- Padding: 16px
- Border: 2px solid
- Border radius: 8px
- Cursor: pointer
- Text align: left
- Transition: all 200ms
- Blocked state:
  - Border: Red-600
  - Background: Red-50
  - Text: Red-600
- Allowed state:
  - Border: Gray-200
  - Background: White
  - Hover border: Gray-300

**Categories**:
- Gambling
- Cash-like transactions
- Travel
- Entertainment
- Subscriptions
- High-risk merchants

---

## 6. Activity Tab Layout

### 6.1 Filters Section
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px
**Margin bottom**: 24px

**Layout**: Flex with gap 16px

**Search Input**:
- Flex: 1 (takes remaining space)
- Position: relative
- Icon: Search (16px), absolute left-12px, Gray-400
- Input:
  - Padding: 12px 16px 12px 40px
  - Border: Gray-300
  - Border radius: 8px
  - Font size: 14px
  - Placeholder: "Search by merchant or amount..."
  - Focus: 2px ring Primary Blue

**Filter Button**:
- Padding: 12px 16px
- Border: Gray-300
- Background: White
- Hover: Gray-50
- Border radius: 8px
- Icon + text: 14px
- Gap: 8px

### 6.2 Transactions Table
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Overflow**: hidden

**Table Header**:
- Background: Gray-50
- Border bottom: Gray-200
- Padding: 12px 16px (per cell)
- Text: 13px, Gray-600
- Text align: left (except Amount: right)

**Columns**:
1. Merchant (with logo + details)
2. Category
3. Date
4. Status (badges)
5. Amount (right-aligned)

**Table Rows**:
- Border bottom: Gray-100
- Hover: Gray-50 background
- Cursor: pointer
- Transition: background 200ms
- Padding: 16px per cell

**Merchant Cell**:
- Flex: align-center, gap 12px
- Avatar: 40px circle, Gray-100, merchant initials
- Text stack:
  - Name: 14px, Gray-900
  - Reference: 12px, Gray-500

**Category Cell**:
- Pill badge: Gray-100 bg, Gray-700 text, 12px, padding 4px 8px, rounded

**Date Cell**:
- Date: 13px, Gray-700
- Time: 13px, Gray-400, margin-left 8px

**Status Cell**:
- Flex wrap, gap 4px
- Badge styles:
  - Subscription: Purple-50 bg, Purple-700 text, Purple-200 border
  - Disputed: Red-50 bg, Red-700 text, Red-200 border
  - International: Blue-50 bg, Blue-700 text, Blue-200 border
  - Pending: Amber-50 bg, Amber-700 text, Amber-200 border
  - Instalments: Green-50 bg, Green-700 text, Green-200 border
  - Font size: 11px
  - Padding: 4px 8px
  - Border radius: 4px

**Amount Cell**:
- Text align: right
- Font size: 15px
- Color: Gray-900 (negative), Green-600 (positive)

---

## 7. Services Tab Layout

### 7.1 Section Stack
**Layout**: Vertical stack
**Gap**: 32px

### 7.2 BNPL Section
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px

**Header**: "Buy Now, Pay Later" - 18px, Gray-900
**Subtitle**: 14px, Gray-600, margin-bottom 16px

**Transaction List**: Vertical stack, gap 12px
Each item:
- Padding: 16px
- Border: Gray-200
- Border radius: 8px
- Flex: space-between, align-center

**Left side**:
- Merchant: 14px, Gray-900
- Date: 12px, Gray-500

**Right side**:
- Amount: 15px, Gray-900
- Button: "Split into Instalments"
  - Background: Primary Blue
  - Text: White, 13px
  - Padding: 8px 16px
  - Border radius: 8px
  - Hover: #002b87

### 7.3 Rewards & Cashback Section
**Same container styling**

**Header**: Icon (Gift, 20px, Primary Blue) + "Rewards & Cashback" - 18px

**Stats Grid**:
- Columns: 1 on mobile, 3 on desktop (768px+)
- Gap: 16px
- Margin bottom: 24px

**Stat Card**:
- Padding: 16px
- Border radius: 8px
- This month: Green-50 bg, Green-200 border
- Last month: Blue-50 bg, Blue-200 border
- Total: Purple-50 bg, Purple-200 border

**Stat Structure**:
- Label: 13px, colored text (Green/Blue/Purple-600)
- Value: 24px, colored text (Green/Blue/Purple-900)

**Partners Section**:
- Subheader: "Partner Retailers" - 15px, Gray-900
- Grid: 2 columns mobile, 3 desktop
- Gap: 16px

**Partner Card**:
- Padding: 16px
- Border: Gray-200
- Border radius: 8px
- Logo container: 48px square, Gray-100, rounded-lg, margin-bottom 12px
- Name: 14px, Gray-900
- Cashback: 13px, Green-600

### 7.4 Payment Reminders Section
**Same container styling**

**Header**: Icon (Bell, 20px, Primary Blue) + "Payment Reminders" - 18px

**Reminder Items**: Vertical stack, gap 16px
Each item:
- Padding: 16px
- Border: Gray-200
- Border radius: 8px
- Flex: space-between, align-center

**Text stack**:
- Title: 14px, Gray-900
- Description: 13px, Gray-600

**Toggle**: Same styling as Controls section

---

## 8. Management Tab Layout

### 8.1 Card Actions Section
**Background**: White
**Border**: 1px solid Gray-200
**Border radius**: 8px
**Padding**: 24px

**Header**: "Card Actions" - 18px, Gray-900, margin-bottom 16px

**Grid Layout**:
- Columns: 1 on mobile, 2 on desktop (768px+)
- Gap: 16px

**Action Button**:
- Padding: 16px
- Border: Gray-300
- Background: White
- Hover: Gray-50
- Border radius: 8px
- Font size: 14px
- Flex: center items, justify-center, gap 8px
- Icon: 16px

**Buttons**:
- Create Virtual Card
- Create Disposable Card
- Replace Physical Card
- Re-issue Virtual Card

### 8.2 Cardholders Section
**Same container styling**

**Header**: Flex space-between
- Title: "Additional Cardholders" - 18px, Gray-900
- Add button:
  - Background: Primary Blue
  - Text: White, 13px
  - Icon: Plus (16px)
  - Padding: 8px 16px
  - Border radius: 8px
  - Gap: 8px

**Table Container**:
- Border: Gray-200
- Border radius: 8px
- Overflow: hidden

**Table Header**:
- Background: Gray-50
- Border bottom: Gray-200
- Text: 13px, Gray-600
- Padding: 12px 16px

**Columns**: Name | Role | Status | Limit | Actions

**Table Rows**:
- Border bottom: Gray-100
- Padding: 16px per cell

**Name Cell**:
- Name: 14px, Gray-900
- Email: 12px, Gray-500

**Status Cell**:
- Pill badge: Active (Green), Suspended (Gray)

**Actions Cell**:
- Flex: justify-end, gap 8px
- Icon buttons (Settings, Trash)
  - Padding: 8px
  - Hover: Gray-100 background
  - Border radius: 4px
  - Icon: 16px

---

## 9. Transaction Drawer

### 9.1 Drawer Structure
**Position**: Fixed, right side of screen
**Width**: 600px max
**Height**: Full viewport
**Background**: White
**Shadow**: 2xl shadow
**Z-index**: 50
**Overflow**: Auto scroll

**Overlay**: Black with 20% opacity, full screen

### 9.2 Header (Sticky)
**Background**: White
**Border bottom**: Gray-200
**Padding**: 24px 32px
**Flex**: space-between, align-center
**Position**: sticky top-0

**Title**: "Transaction Details" - 20px, Gray-900
**Close button**:
- Padding: 8px
- Hover: Gray-100
- Border radius: 8px
- Icon: X (20px, Gray-600)

### 9.3 Content Area
**Padding**: 24px 32px

#### Merchant Section
**Margin bottom**: 32px

**Merchant Row**:
- Flex: gap 16px, margin-bottom 16px
- Avatar: 64px circle
- Text column (flex-1):
  - Name: 18px, Gray-900
  - Category: 14px, Gray-500
- Amount column (text-right):
  - Amount: 24px, Gray-900 or Green-600
  - Currency: 13px, Gray-500

**Status Badges**: Flex wrap, gap 8px
- Pill style badges (same as table)
- Font size: 12px
- Padding: 4px 12px
- Border radius: full

#### Info Grid
**Margin bottom**: 32px
**Layout**: 2-column grid, gap 24px

**Info Item**:
- Label: 13px, Gray-500, margin-bottom 4px
- Value: 14px, Gray-900

**Items**:
- Date & Time
- Reference
- MCC Code
- Card
- Location (with map preview)

**Map Preview**:
- Width: 100%
- Height: 128px
- Background: Gray-100
- Border radius: 8px
- Flex: center items and text

#### Actions Section
**Margin bottom**: 24px
**Layout**: Vertical stack, gap 12px

**Action Button**:
- Full width
- Padding: 12px 16px
- Border: Gray-300
- Background: White
- Hover: Gray-50
- Border radius: 8px
- Font size: 14px
- Flex: center items, justify-center, gap 8px
- Icon: 16px

**Cancel Subscription** (if applicable):
- Border: Red-300
- Text: Red-700
- Hover: Red-50

#### Notes Section
**Label**: 14px, Gray-700, margin-bottom 8px

**Textarea**:
- Width: 100%
- Padding: 12px 16px
- Border: Gray-300
- Border radius: 8px
- Font size: 14px
- Rows: 3
- Resize: none
- Focus: 2px ring Primary Blue

**Save Button**:
- Margin top: 8px
- Background: Primary Blue
- Text: White, 14px
- Padding: 8px 16px
- Border radius: 8px
- Hover: #002b87

---

## 10. Modal Components

### 10.1 Modal Overlay
**Position**: Fixed, full screen (inset-0)
**Z-index**: 50
**Display**: Flex, center items and content
**Padding**: 16px

**Overlay Background**: Black with 30% opacity

### 10.2 Modal Container
**Position**: Relative
**Width**: 500px max (600px for BNPL)
**Background**: White
**Border radius**: 8px
**Shadow**: 2xl

### 10.3 Modal Header
**Padding**: 20px 24px
**Border bottom**: Gray-200
**Flex**: space-between, align-center

**Left side**: Flex, align-center, gap 12px
- Icon container: 40px circle, Primary Blue/10 background
- Icon: 20px, Primary Blue
- Title: 18px, Gray-900

**Right side**: Close button (same as drawer)

### 10.4 Modal Content
**Padding**: 24px

#### Form Elements
**Label**: 14px, Gray-700, margin-bottom 8px

**Input/Select**:
- Width: 100%
- Padding: 12px 16px
- Border: Gray-300
- Border radius: 8px
- Font size: 14px
- Focus: 2px ring Primary Blue

**Section spacing**: 24px margin-bottom

#### Selection Cards (Virtual/Disposable, BNPL plans)
**Grid**: 2 columns, gap 12px

**Card**:
- Padding: 12px 16px
- Border: 2px solid
- Border radius: 8px
- Cursor: pointer
- Transition: all 200ms
- Selected: Primary Blue border, Blue-50 background
- Unselected: Gray-200 border, hover Gray-300

#### Info Box
**Background**: Blue-50
**Border**: Blue-200
**Padding**: 16px
**Border radius**: 8px
**Font size**: 13px
**Text**: Gray-700
**Margin bottom**: 24px

#### Modal Actions
**Flex**: gap 12px

**Button (Cancel)**:
- Flex: 1
- Padding: 12px 16px
- Border: Gray-300
- Background: White
- Text: Gray-900, 14px
- Hover: Gray-50
- Border radius: 8px

**Button (Primary)**:
- Flex: 1
- Padding: 12px 16px
- Background: Primary Blue
- Text: White, 14px
- Hover: #002b87
- Border radius: 8px

### 10.5 BNPL Modal Specific

#### Payment Schedule Table
**Border**: Gray-200
**Border radius**: 8px
**Overflow**: hidden

**Table Header**:
- Background: Gray-50
- Padding: 8px 16px
- Font size: 12px
- Text: Gray-600
- Flex: space-between

**Table Rows**:
- Padding: 12px 16px
- Border top: Gray-100
- Font size: 13px
- Flex: space-between, align-center

#### Summary Box
**Background**: Blue-50
**Border**: Blue-200
**Padding**: 16px
**Border radius**: 8px
**Margin bottom**: 24px

**Summary Rows**: Vertical stack, gap 8px
- Flex: space-between
- Font size: 13px
- Text: Gray-700

**Total Row**:
- Padding top: 8px
- Border top: Blue-300
- Font size: 14-15px
- Text: Gray-900

### 10.6 Fraud Alert Modal Specific

**Icon container**: Red-100 background, Red-600 icon

**Alert Box**:
- Background: Red-50
- Border: Red-200
- Padding: 16px
- Border radius: 8px
- Margin bottom: 24px

**Alert text**:
- Primary: 14px, Red-900
- Secondary: 13px, Red-700

**Action Buttons Grid**: 2 columns, gap 12px
- "No, it wasn't me": White background, Red-600 border and text, hover Red-50
- "Yes, it was me": Primary Blue background, White text

**Help text**:
- Margin top: 16px
- Text align: center
- Font size: 12px
- Text: Gray-500

---

## 11. Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Full-width cards
- Stacked navigation
- Reduced padding (16px instead of 32px)

### Tablet (768px - 1024px)
- 2-column card grid
- 2-column form layouts maintained
- Side-by-side button groups

### Desktop (1024px+)
- 3-column card grid
- Full multi-column layouts
- Max width: 1280px (centered)
- Optimal spacing and padding

---

## 12. Interactive States

### Hover States
- Cards: Border color → Primary Blue
- Buttons: Background color shift (e.g., White → Gray-50)
- Links: Underline
- Table rows: Background → Gray-50
- Transition: 200ms for all

### Focus States
- Inputs: 2px ring, Primary Blue
- Remove default outline
- Clear visual indication

### Active States
- Tabs: Primary Blue text and bottom border
- Toggles: Primary Blue background when ON
- Selected cards: Primary Blue border + tinted background

### Loading States
- Disabled cursor
- Reduced opacity (60%)
- Optional spinner

### Empty States
- Centered text
- Gray-400 color
- 15px font size
- Optional CTA to clear filters/add items

---

## 13. Animation & Transitions

### Page Transitions
- None (instant swap between views)

### Drawer Animation
- Slide in from right: 300ms ease-out
- Overlay fade in: 200ms

### Modal Animation
- Scale from 95% to 100%: 200ms ease-out
- Overlay fade in: 200ms

### Micro-interactions
- Toggle switch: 200ms transform
- Button hover: 200ms background
- Border color changes: 200ms

### No animations on
- Initial page load
- Data updates
- Filter changes

---

## 14. Z-Index Hierarchy

```
Base content: z-0
Sticky header/tabs: z-10
Dropdown menus: z-20
Modal overlay: z-50
Modal content: z-50
Drawer overlay: z-50
Drawer content: z-50
Toasts/notifications: z-60
```

---

## 15. Accessibility Considerations

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Button vs. link distinction
- Form labels for all inputs
- Table headers properly marked

### Keyboard Navigation
- Tab order follows visual flow
- Enter to activate buttons
- Escape to close modals/drawers
- Arrow keys in dropdowns

### Screen Reader Support
- Alt text for images
- ARIA labels where needed
- Status announcements for dynamic content
- Hidden text for icon-only buttons

### Color Contrast
- All text meets WCAG AA standards
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text
- Status indicators not color-only

---

## 16. Performance Considerations

### Optimization
- Lazy load transaction history
- Virtual scrolling for large lists
- Debounced search input
- Minimize re-renders

### Loading States
- Skeleton screens for cards
- Shimmer effect on placeholders
- Progress indicators for actions

### Data Management
- Paginated transaction lists
- Cached filter states
- Optimistic UI updates

---

This specification provides a complete reference for implementing the Cards module with consistent spacing, typography, colors, and interactions aligned with the Metro Bank design system.
