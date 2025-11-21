# Metro Banking Design System Specification

This document serves as the comprehensive design specification for the Metro Banking Business Account Onboarding application. It is intended to be used by developers and designers (including Replic) to faithfully recreate the visual identity and user experience of the application.

## 1. Core Principles

- **Flat Aesthetic**: Minimalist design with no complex gradients or heavy drop shadows.
- **Clean & Accessible**: High contrast, clear hierarchy, and legible typography.
- **"Pill" Shapes**: Buttons and key interactive elements use fully rounded corners.
- **No Bold Fonts**: A strict typography rule enforcing regular weights (400) across all headings and body text to maintain a sleek, modern look.

---

## 2. Typography

**Font Family**: `Inter`
**Weights**: STRICTLY `400` (Regular) for all visible text.
**Fallback**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Type Scale

| Element   | Size (px) | Size (rem) | Line Height | Weight | Color                       |
| :-------- | :-------- | :--------- | :---------- | :----- | :-------------------------- |
| **H1**    | 48px      | 3.0rem     | 1.2         | 400    | Dark Blue (`#001A72`)       |
| **H2**    | 32px      | 2.0rem     | 1.3         | 400    | Dark Blue (`#001A72`)       |
| **H3**    | 24px      | 1.5rem     | 1.4         | 400    | Dark Blue (`#001A72`)       |
| **H4**    | 20px      | 1.25rem    | 1.4         | 400    | Dark Blue (`#001A72`)       |
| **H5**    | 18px      | 1.125rem   | 1.4         | 400    | Dark Blue (`#001A72`)       |
| **Body**  | 16px      | 1.0rem     | 1.6         | 400    | Black/Dark Navy (`#000D45`) |
| **Small** | 14px      | 0.875rem   | 1.5         | 400    | Black/Dark Navy (`#000D45`) |

_Note: All headings use `letter-spacing: -0.01em` for a tighter, more refined look._

---

## 3. Color Palette

### Primary Brand Colors

| Token          | Hex       | Usage                                       |
| :------------- | :-------- | :------------------------------------------ |
| `Primary Blue` | `#0033A0` | Main actions, buttons, active states, links |
| `Dark Blue`    | `#001A72` | Headings, dark backgrounds, gradients       |
| `Primary Red`  | `#E4002B` | Destructive actions, alerts, "Metro" red    |

### Neutrals & Backgrounds

| Token           | Hex       | Usage                                   |
| :-------------- | :-------- | :-------------------------------------- |
| `Background`    | `#FFFFFF` | Page background, cards                  |
| `Light Blue BG` | `#E9F2FF` | Section backgrounds, active list items  |
| `Gray 100`      | `#F5F7FA` | Muted backgrounds, secondary containers |
| `Gray 200`      | `#E2E8F0` | Borders, dividers, input outlines       |
| `Gray 600`      | `#475569` | Secondary text, placeholder text        |
| `Black`         | `#000D45` | Primary body text (Deep Navy)           |

### Semantic Colors

| Token     | Hex       | Usage                                   |
| :-------- | :-------- | :-------------------------------------- |
| `Success` | `#16A34A` | Success messages, completion indicators |
| `Warning` | `#EA580C` | Warnings, attention required            |
| `Error`   | `#B91C1C` | Form errors, destructive warnings       |

---

## 4. Layout & Spacing

### Spacing Scale (8px Grid)

| Token | Value (rem) | Value (px) |
| :---- | :---------- | :--------- |
| `xs`  | 0.5         | 8px        |
| `sm`  | 0.75        | 12px       |
| `md`  | 1.0         | 16px       |
| `lg`  | 1.5         | 24px       |
| `xl`  | 2.0         | 32px       |
| `2xl` | 3.0         | 48px       |
| `3xl` | 6.0         | 96px       |

### Border Radius

| Token          | Value        | Usage                           |
| :------------- | :----------- | :------------------------------ |
| `radius-input` | 0.5rem (8px) | Inputs, small containers        |
| `radius-card`  | 1rem (16px)  | Cards, modals, content sections |
| `radius-pill`  | 9999px       | Buttons, badges, chips          |

### Shadows

- **Card Shadow**: `0px 4px 12px rgba(0, 0, 0, 0.08)` (Used sparingly, mostly for floating elements or cards on white backgrounds)

---

## 5. Component Specifications

### Buttons (`Button.tsx`)

- **Shape**: Pill-shaped (Full rounded corners).
- **Height**: `48px` (h-12).
- **Padding**: `px-8 py-3`.
- **Font Size**: `16px`.
- **Focus**: 2px offset, 2px ring width (color: `Primary Blue`).
- **Variants**:
  - _Primary_: Background `Primary Blue`, Text `White`. Hover: `brightness-110`.
  - _Outline_: Border `1px solid Primary Blue`, Text `Primary Blue`, Background `Transparent`.
  - _Ghost_: Text `Primary Blue`, Background `Transparent`.

### Input Fields (`Input.tsx`)

- **Height**: `48px` (h-12).
- **Background**: `White`.
- **Border**: `1px solid Gray 200 (#E2E8F0)`.
- **Radius**: `8px` (rounded-md).
- **Typography**: `16px` text.
- **Focus State**: Border `Primary Blue`, Ring `2px` solid `Primary Blue` with `20%` opacity.
- **Placeholder**: `Gray 400`.

### Cards

- **Background**: `White`.
- **Border**: `1px solid Gray 200 (#E2E8F0)` OR `None` with Shadow.
- **Radius**: `16px`.
- **Padding**: Typically `24px` or `32px`.

### Navigation & Progress

- **Progress Bars**: `Primary Blue` fill, `Gray 200` track, `h-2` rounded-full.
- **Step Indicators**: Circular, `Primary Blue` when active/completed.

---

## 6. Key User Flows & UI Patterns

### Onboarding Flow (BankSwitchFlow)

The onboarding flow uses a centered "focused" layout or a split layout depending on the step.

- **Container**: Max-width ~600px for forms.
- **Steps**: Clear progression using a custom stepper component.
- **Transitions**: Smooth fade and slide transitions between screens.

### Admin Center

A dashboard-style view with a sidebar or top navigation.

- **Sidebar**: `Dark Blue` or `White` background.
- **Content Area**: `Gray 100` background to differentiate from cards.
- **Switching Service**:
  - **CASS Intro**: Informational screen with `Primary Blue` accents.
  - **Bank Search**: Uses the standard Input component with search icon.
  - **Open Banking vs Manual**: Split cards offering two distinct paths.

### Illustrations & Imagery

- **Style**: Minimalist, flat vector illustrations.
- **Colors**: Should match the `Primary Blue`, `Red`, and `Light Blue` palette.
- **Icons**: `Lucide React` icons, standard size `24px` or `16px` for small UI elements.

---

## 7. CSS/Tailwind Configuration

To reproduce this system, ensure your Tailwind configuration maps to these variables:

```css
:root {
  --primary: 0 33% 160%; /* #0033A0 converted roughly to HSL or maintain Hex */
  --radius: 0.5rem;
}
/* See globals.css for full variable list */
```

_Ref: `styles/globals.css` contains the authoritative source of truth for all CSS variables._