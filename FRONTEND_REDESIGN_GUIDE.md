# Premium Hotel Frontend Redesign Guide

## 1) Design System

### Color Palette (enforced via CSS tokens in `src/components/global.css`)
- Primary:
  - `--color-primary-950` `#09111d`
  - `--color-primary-900` `#102036`
  - `--color-primary-800` `#162b45`
  - `--color-primary-700` `#1f3a58`
- Secondary / Neutral:
  - `--color-surface-0` `#fffdf8`
  - `--color-surface-50` `#f7f3ea`
  - `--color-surface-100` `#efe8db`
- Accent:
  - `--color-accent-600` `#aa8745`
  - `--color-accent-500` `#c09a5b`
  - `--color-accent-400` `#d8bc86`
- Semantic:
  - `--color-success` `#2f7d64`
  - `--color-danger` `#b85858`

### Typography
- Display: `"Cormorant Garamond"` for editorial/luxury headings.
- Body/UI: `"Manrope"` for clean readability on mobile and desktop.
- Applied globally in `src/index.css`.

### Spacing, Radius, and Motion
- Spacing scale from `--space-1` to `--space-16`.
- Radius scale from `--radius-sm` to `--radius-xl`.
- Motion tokens:
  - `--transition-fast`
  - `--transition-base`

### Reusable UI Primitives
- Buttons:
  - `.btn`
  - `.btn-primary`
  - `.btn-secondary`
  - `.btn-ghost`
- Form feedback:
  - `.form-error`
- Empty-state:
  - `.empty-state`

## 2) Component Breakdown

### Landing Experience
- `HeroComponent.tsx`
  - Premium glass-style navigation
  - Branded hero content
  - Guest-aware actions (`Sign In` vs welcome state)
  - Trust stats section for visual hierarchy and credibility

### Room Listings
- `RoomSliders.tsx`
  - Category section with optional descriptor copy
  - Automatically hides when `rooms.length === 0`
- `RoomCard.tsx`
  - Consistent premium card anatomy:
    - media + badge
    - title + concise description
    - capacity/feature chips
    - price + CTA

### Booking / Checkout
- `RoomCalendarPage.tsx`
  - Two-panel layout (room details + booking panel)
  - Clear selected-date summary
  - Booking-state guards:
    - requires complete date range
    - blocks duplicate booking attempts
    - displays API and calendar overlap errors

### Authentication + Payment Modal
- `LoginPopupComponent.tsx`
  - Single modal system with three states:
    - `loggingIn`
    - `registering`
    - `paying`
  - Shared form control styles and action layout
  - Optional payment callback support for non-booking pages

## 3) Sample Layout Snippets

### Hero CTA and Trust Stats
```tsx
<div className="hero-cta-group">
  <a href="#room-collections" className="btn btn-primary hero-cta">
    Explore Rooms
  </a>
  <button type="button" className="btn btn-ghost hero-cta">
    Create Guest Account
  </button>
</div>
```

### Room Card Footer
```tsx
<div className="room-card-footer">
  <p className="room-card-price">
    <strong>$320</strong> / night
  </p>
  <Link to={`/room/${roomid}`} className="btn btn-primary room-card-select-btn">
    View Room
  </Link>
</div>
```

### Booking Guard Example
```tsx
if (!selectedRange.check_in_date || !selectedRange.check_out_date) {
  setBookingError("Please choose both check-in and check-out dates.");
  return;
}
```

## 4) Suggestions For Improving Existing Structure

1. Move API URL (`http://localhost:5000`) into environment variables (`VITE_API_BASE_URL`) and centralize all HTTP calls in one typed client.
2. Create a dedicated `types/` folder for shared contracts (`Room`, `Booking`, `Guest`) to remove `any` usage.
3. Split home page into section components (`CollectionsSection`, `GuestDashboardSection`, `FooterSection`) for easier maintainability.
4. Add route-level layouts (`MainLayout`, `BookingLayout`) so nav/footer consistency is guaranteed across all pages.
5. Add visual regression snapshots (Playwright/Cypress) for key breakpoints to preserve the premium UI over time.
