# Metro Banking Design System Guide

## Design Philosophy

A UK business banking onboarding experience following GOV.UK design principles with Metro Banking's bold, modern, trustworthy aesthetic. The design features high-contrast colors, large elegant typography, rounded components, and a clean, flat design approach with NO shadows (except subtle shadows on cards/overlays) and generous white space.

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#0033A0` - Used for primary CTAs, links, icons, and emphasis
- **Primary Red**: `#E4002B` - Used for large decorative icons and brand accents
- **Dark Blue (Titles)**: `#001A72` - Used for all h1, h2, h3 headings

### Semantic Colors
- **Success Green**: `#16A34A` - For success states, verified badges, positive actions
- **Purple (Accent)**: `#9333EA` - For special badges like "Pre-qualified"

### Neutral Colors
- **Background**: `#FFFFFF` (white) for main background
- **Card/Panel Background**: `#F5F6F8` - Light gray for info notices and sections
- **Border**: Light gray borders on inputs and cards
- **Muted Text**: Standard muted-foreground for secondary text

---

## Typography

### Font Family
- **Primary**: Inter font family throughout

### Heading Styles
- **All headings (h1, h2, h3)**: Use color `#001A72` (dark blue)
- **NO bold fonts**: Never use font-weight bold anywhere in the design
- **NO custom font-size classes**: Rely on default HTML element sizing from globals.css
- **NO line-height classes**: Use defaults (e.g., no `leading-tight`, `leading-none`)

### Text Hierarchy
```
h1 - Large page titles (e.g., "You're all set, CompanyName")
h2 - Section headings (e.g., "Complete Setup")
h3 - Card/component titles (e.g., "Banking Plan")
p - Body text with text-muted-foreground for secondary content
```

---

## Border Radius System

### Rounded Corners (No Sharp Edges)
- **Buttons (Primary CTA)**: `rounded-full` (999px) - Pill-shaped buttons
- **Inputs**: `rounded-lg` (8px)
- **Cards**: `rounded-2xl` (16px)
- **Large Cards**: `rounded-3xl` (24px) - For hero sections
- **Badges**: `rounded-full` for status badges, `rounded-md` or `rounded-lg` for smaller badges
- **Icons containers**: `rounded-lg` or `rounded-xl`

---

## Component Styles

### Buttons

**Primary CTA**
```tsx
<Button className="w-full rounded-full bg-[#0033A0] hover:bg-[#0033A0]/90">
  Continue
</Button>
```
- Pill-shaped (rounded-full)
- Primary Blue background
- Full width on forms
- No bold text

**Secondary/Ghost**
```tsx
<Button variant="ghost">
  Skip to Dashboard
</Button>
```

### Inputs

**Text Input**
```tsx
<Input 
  className="rounded-lg border-border" 
  placeholder="Enter company name"
/>
```
- 8px border radius
- Standard border color
- No bold labels

### Cards

**Standard Card**
```tsx
<div className="bg-white border border-border rounded-2xl p-8">
  {/* Content */}
</div>
```
- White background
- 16px border radius
- p-8 padding (generous spacing)
- Light border

**Info Notice Card**
```tsx
<div className="bg-[#F5F6F8] rounded-2xl p-6">
  <div className="flex gap-3">
    <Info className="w-5 h-5 text-[#0033A0] flex-shrink-0" />
    <p className="text-sm text-muted-foreground">
      {/* Info text */}
    </p>
  </div>
</div>
```
- `bg-[#F5F6F8]` background
- Primary Blue icons
- p-6 padding
- text-sm for content
- NO borders

### Badges

**Status Badge**
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-full">
  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
  <span className="text-sm text-[#16A34A]">Account Verified</span>
</div>
```
- Rounded-full
- Semi-transparent background (color/10)
- Matching border (color/20)
- Icon + text combination

**Label Badge**
```tsx
<div className="inline-block px-3 py-1 rounded-full text-xs text-[#0033A0] bg-[#0033A0]/10">
  Recommended
</div>
```

---

## Layout Patterns

### Split Layout (Form Pages)

**Desktop**: 
- Left side: ~1/3 width - Context/communication with large Metro red icon
- Right side: ~2/3 width - Main form content

**Mobile**: 
- Only show main content section (right side)
- Hide left sidebar

```tsx
<div className="min-h-screen bg-background lg:grid lg:grid-cols-[400px,1fr]">
  {/* Left Sidebar - Hidden on mobile */}
  <div className="hidden lg:flex flex-col justify-between p-12 bg-white border-r border-border">
    <div className="w-16 h-16 text-[#E4002B]">
      <IconComponent className="w-full h-full" />
    </div>
    <div>
      <h2 className="text-[#001A72] mb-4">Context Title</h2>
      <p className="text-muted-foreground">Description</p>
    </div>
  </div>
  
  {/* Main Content */}
  <div className="flex items-center justify-center p-6">
    {/* Form content */}
  </div>
</div>
```

### Centered Layout (Success Pages)

```tsx
<div className="min-h-screen bg-background">
  <div className="max-w-7xl mx-auto px-6 py-20">
    {/* Content */}
  </div>
</div>
```

### Two-Column Grid

```tsx
<div className="grid lg:grid-cols-2 gap-16 items-center">
  <div>{/* Left content */}</div>
  <div>{/* Right content */}</div>
</div>
```

---

## Spacing System

### Generous White Space
- Use `gap-6` to `gap-16` for grid gaps
- Use `mb-6` to `mb-8` for section spacing
- Use `p-6` to `p-8` for card padding
- Use `py-20` for page padding

### Component Spacing
- Icon containers: `w-10 h-10` to `w-16 h-16` depending on prominence
- Icon sizes: `w-5 h-5` (standard), `w-6 h-6` (larger emphasis)
- Button padding: Default from shadcn, full width on forms

---

## Icons

### Icon Usage
- **Library**: lucide-react
- **Left Sidebar**: Large Metro red (#E4002B) icons, 64px size
- **Info notices**: Primary Blue (#0033A0) icons
- **Success states**: Green (#16A34A) icons
- **Card icons**: Primary Blue with light background

**Example Pattern**
```tsx
<div className="w-12 h-12 bg-[#0033A0]/10 rounded-xl flex items-center justify-center">
  <Grid3x3 className="w-6 h-6 text-[#0033A0]" />
</div>
```

---

## Design Principles

### DO's ✅
- Use generous white space and padding
- Use rounded corners on all components (no sharp edges)
- Use high contrast for readability
- Left-align text content in forms
- Use color `#001A72` for all headings
- Use pill-shaped buttons (rounded-full)
- Use flat design (no shadows except on cards/overlays)
- Use large decorative icons in Metro red (#E4002B)
- Keep typography clean without bold fonts

### DON'Ts ❌
- Never use bold fonts (font-bold, font-semibold, font-medium)
- Never use custom font-size classes (text-2xl, text-3xl, etc.) unless specifically needed
- Never use line-height classes (leading-tight, leading-none, etc.)
- Never use shadows except subtle ones on cards and overlays
- Never use sharp corners (always round)
- Never center-align form content (keep left-aligned)
- Never use colors outside the defined palette

---

## Application Progress Component

Shows segmented steps with current progress:

```tsx
<ApplicationProgress 
  currentStep={3} 
  totalSteps={13} 
  label="Business Details"
/>
```

Displays as: "Step 3 of 13 • Business Details"

---

## Example Screens

### Form Screen Pattern
1. Left sidebar with large Metro red icon + context
2. Right main content with form
3. ApplicationProgress at top of form
4. Info notices using bg-[#F5F6F8]
5. Primary blue pill button at bottom
6. HelpWidget in bottom right

### Celebration Screen Pattern
1. Status badge (Account Verified)
2. Large h1 heading with company name highlighted
3. Two-column: Left text, Right card visual
4. Account details overlay on card
5. Setup cards in 4-column grid
6. Clean, spacious layout

---

## Technical Implementation

### Tailwind v4.0
- Using CSS variables in `/styles/globals.css`
- No `tailwind.config.js` file
- Default typography tokens in globals.css

### Component Library
- shadcn/ui components from `/components/ui`
- Custom components in `/components`
- Import format: `import { Button } from './components/ui/button'`

### Responsive Approach
- Mobile-first
- Hide left sidebar on mobile (`hidden lg:flex`)
- Stack grids on mobile, side-by-side on desktop
- Maintain generous spacing across breakpoints

---

## Brand Voice

**Tone**: Professional, trustworthy, modern, efficient
**Language**: Clear, direct, no jargon
**Approach**: Guide users through complex processes with confidence and clarity

---

This design system creates a cohesive, professional UK banking experience that feels modern, trustworthy, and easy to navigate.
