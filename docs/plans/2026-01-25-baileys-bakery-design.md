# Baileys Bakery Website Design

## Overview

A website for Baileys Bakery, an at-home baker. The site displays editable content managed via Convex and product data fetched from the Bakesy GraphQL API.

**Tech Stack:**
- Frontend: Vite + React 19 + TypeScript
- Backend: Convex (content storage + authentication)
- External API: Bakesy GraphQL (product catalog)
- Styling: Tailwind CSS 4 + shadcn/ui components
- Routing: React Router

## Pages

1. **Home** - Hero banner, about preview, featured products (from Bakesy)
2. **About** - Baker's story, FAQ section
3. **Menu** - Full Bakesy product catalog grouped by categories
4. **Login** - Email/password authentication
5. **Admin** - Content management dashboard (protected)

## Design System

### Color Palette (Dark Blue + Playful)

| Role | Color | Usage |
|------|-------|-------|
| Primary | Deep navy (`#1e3a5f`) | Main brand color, headers |
| Secondary | Soft sky blue (`#7dd3fc`) | Accents, hover states |
| Accent | Warm coral/gold (`#fbbf24`) | CTAs, highlights |
| Background | Off-white/cream (`#fefce8`) | Page backgrounds |
| Text | Dark slate | Body text |

### Playful Elements
- Rounded corners (lg to xl radius) on cards and buttons
- Soft shadows with slight color tint
- Subtle hover animations
- Whimsical touches (wavy dividers, playful icons)

### Theme Customization
All colors defined as CSS variables in Tailwind config. Update one file to change the entire color scheme:

```css
:root {
  --color-primary: 30 58 95;
  --color-secondary: 125 211 252;
  --color-accent: 251 191 36;
  --color-background: 254 252 232;
}
```

## Data Architecture

### Convex Tables

**siteContent** (single document)
```typescript
{
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImageUrl: string;
  aboutPreview: string;    // Short text for Home page
  aboutStory: string;      // Full story for About page
}
```

**faqItems**
```typescript
{
  question: string;
  answer: string;
  order: number;
}
```

**users** (managed by Convex Auth)
```typescript
{
  email: string;
  // Auth fields handled by Convex Auth
}
```

### Convex Functions
- `getSiteContent` - Fetch all editable content
- `updateSiteContent` - Admin updates content (authenticated)
- `listFaqItems` - Get all FAQ items ordered
- `createFaqItem` / `updateFaqItem` / `deleteFaqItem` - FAQ management (authenticated)

## Bakesy GraphQL Integration

### Endpoint
```
POST https://api.bakesy.app/graphql
Headers:
  Content-Type: application/json
  x-app-version: 3.2.11
  x-platform: Web
```

### Query: BakeryOfferings
Fetches all product data for the bakery by slug (`baileys-bakery`).

**Data Extracted:**
- `categories` - Product groupings with nested offerings
- `offerings` - Individual products (name, description, image, price, priceType)
- `cakeFlavors`, `cookieFlavors`, `icings` - Flavor options

### Client Architecture
```
src/lib/bakesy/
  client.ts      // GraphQL client setup
  queries.ts     // Query definitions
  types.ts       // TypeScript types
  hooks.ts       // React hooks (useBakeryOfferings)
```

### Caching
- TanStack Query (React Query) for caching
- Stale time: 5 minutes
- Show cached data while refreshing in background

## Component Structure

### Shared Components
- `Navbar` - Logo, nav links (Home, About, Menu), Login button
- `Footer` - Contact/social links
- `Logo` - Loads from `/public/logo.svg` (easy replacement)
- `ProductCard` - Displays offering with image, name, price
- `ProductModal` - Enlarged view, description, "Order on Bakesy" button

### Page Components

**Home Page:**
1. Hero section - Full-width banner, title, subtitle, CTA button
2. About preview - Short blurb with "Learn More" link
3. Featured products - Grid of 4-6 ProductCards

**About Page:**
1. Story section - Baker's story with optional image
2. FAQ section - Accordion-style expandable questions

**Menu Page:**
1. Category tabs or section headers
2. Product grid per category
3. Click product opens ProductModal

**Admin Page:**
1. Tabbed interface: Content | FAQ
2. Content tab - Form fields for hero/about text
3. FAQ tab - List with add/edit/delete actions

## Project Structure

```
src/
  components/
    ui/              # shadcn components
    layout/          # Navbar, Footer, Logo
    products/        # ProductCard, ProductModal
    admin/           # AdminContentForm, AdminFaqList
  pages/
    Home.tsx
    About.tsx
    Menu.tsx
    Login.tsx
    Admin.tsx
  lib/
    bakesy/          # GraphQL client, queries, hooks, types
    utils.ts         # Helper functions
  convex/
    schema.ts        # Data models
    siteContent.ts   # Content queries/mutations
    faqItems.ts      # FAQ queries/mutations
    auth.ts          # Auth configuration
  App.tsx            # Router setup
  main.tsx           # Entry point
  index.css          # Tailwind + CSS variables

public/
  logo.svg           # Placeholder logo
  logo-dark.svg      # Dark variant (optional)
```

## Logo Replacement

To update the logo:
1. Replace `public/logo.svg` with your logo file
2. Optionally replace `public/logo-dark.svg` for dark backgrounds
3. No code changes required

## Authentication Flow

1. User navigates to `/login`
2. Enters email and password
3. Convex Auth validates credentials
4. On success, redirect to `/admin`
5. Admin routes check auth state, redirect to `/login` if not authenticated

## Implementation Order

1. Set up Tailwind 4 + shadcn/ui + CSS variables
2. Set up Convex with schema and auth
3. Build layout components (Navbar, Footer, Logo)
4. Build Home page with static content
5. Build About page with FAQ accordion
6. Integrate Bakesy GraphQL client
7. Build Menu page with product grid
8. Build ProductCard and ProductModal
9. Connect Home featured section to Bakesy
10. Build Login page with Convex Auth
11. Build Admin page with content forms
12. Connect admin forms to Convex mutations
13. Add route protection for admin
14. Polish animations and responsive design
