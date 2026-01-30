# Baileys Bakery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete bakery website with editable content via Convex, product catalog from Bakesy GraphQL, and admin authentication.

**Architecture:** Vite React app with Tailwind 4 + shadcn/ui for styling, Convex for content storage and authentication, TanStack Query for Bakesy API caching, React Router for navigation.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, Convex, Convex Auth, TanStack Query, React Router

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install core dependencies**

```bash
npm install convex @convex-dev/auth @auth/core@0.37.0 react-router @tanstack/react-query tailwindcss @tailwindcss/vite
```

**Step 2: Install shadcn dependencies**

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

**Step 3: Verify installation**

Run: `npm ls convex react-router @tanstack/react-query`
Expected: All packages listed without errors

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install core dependencies for Baileys Bakery"
```

---

## Task 2: Configure Tailwind CSS 4 + Vite

**Files:**
- Modify: `vite.config.ts`
- Modify: `src/index.css`
- Modify: `tsconfig.json`
- Modify: `tsconfig.app.json`

**Step 1: Update vite.config.ts with Tailwind plugin and path alias**

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 2: Update tsconfig.json for path aliases**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Step 3: Update tsconfig.app.json for path aliases**

Add to compilerOptions:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**Step 4: Replace src/index.css with Tailwind + CSS variables**

```css
@import "tailwindcss";

@theme {
  /* Primary: Deep navy blue */
  --color-primary-50: oklch(0.97 0.01 250);
  --color-primary-100: oklch(0.93 0.02 250);
  --color-primary-200: oklch(0.85 0.04 250);
  --color-primary-300: oklch(0.75 0.08 250);
  --color-primary-400: oklch(0.60 0.12 250);
  --color-primary-500: oklch(0.45 0.14 250);
  --color-primary-600: oklch(0.35 0.14 250);
  --color-primary-700: oklch(0.30 0.12 250);
  --color-primary-800: oklch(0.25 0.10 250);
  --color-primary-900: oklch(0.20 0.08 250);

  /* Secondary: Soft sky blue */
  --color-secondary-50: oklch(0.98 0.01 220);
  --color-secondary-100: oklch(0.95 0.03 220);
  --color-secondary-200: oklch(0.90 0.06 220);
  --color-secondary-300: oklch(0.82 0.10 220);
  --color-secondary-400: oklch(0.72 0.14 220);
  --color-secondary-500: oklch(0.65 0.15 220);

  /* Accent: Warm gold */
  --color-accent-400: oklch(0.82 0.16 85);
  --color-accent-500: oklch(0.75 0.18 85);
  --color-accent-600: oklch(0.68 0.18 85);

  /* Background: Warm cream */
  --color-background: oklch(0.99 0.01 95);
  --color-foreground: oklch(0.20 0.02 250);

  /* Card/Surface */
  --color-card: oklch(1.00 0 0);
  --color-card-foreground: oklch(0.20 0.02 250);

  /* Muted */
  --color-muted: oklch(0.96 0.01 250);
  --color-muted-foreground: oklch(0.50 0.02 250);

  /* Border */
  --color-border: oklch(0.90 0.02 250);

  /* Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
```

**Step 5: Delete src/App.css (no longer needed)**

```bash
rm src/App.css
```

**Step 6: Verify Tailwind works**

Run: `npm run dev`
Expected: App starts without errors

**Step 7: Commit**

```bash
git add vite.config.ts tsconfig.json tsconfig.app.json src/index.css
git commit -m "feat: configure Tailwind CSS 4 with custom color theme"
```

---

## Task 3: Initialize shadcn/ui

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`

**Step 1: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Step 2: Create src/lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 3: Create directory structure**

```bash
mkdir -p src/components/ui src/components/layout src/components/products src/components/admin src/lib src/hooks src/pages
```

**Step 4: Install shadcn button component**

```bash
npx shadcn@latest add button
```

**Step 5: Install additional shadcn components**

```bash
npx shadcn@latest add card input label dialog accordion tabs textarea
```

**Step 6: Commit**

```bash
git add components.json src/lib/utils.ts src/components/ui
git commit -m "feat: initialize shadcn/ui with core components"
```

---

## Task 4: Initialize Convex

**Files:**
- Create: `convex/schema.ts`
- Create: `convex/auth.ts`
- Create: `convex/siteContent.ts`
- Create: `convex/faqItems.ts`
- Modify: `src/main.tsx`

**Step 1: Initialize Convex project**

```bash
npx convex dev --once
```

Follow prompts to create a new Convex project named "baileys-bakery"

**Step 2: Create convex/schema.ts**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  siteContent: defineTable({
    heroTitle: v.string(),
    heroSubtitle: v.string(),
    heroCtaText: v.string(),
    heroCtaLink: v.string(),
    heroImageUrl: v.string(),
    aboutPreview: v.string(),
    aboutStory: v.string(),
  }),

  faqItems: defineTable({
    question: v.string(),
    answer: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
});
```

**Step 3: Create convex/auth.ts**

```typescript
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});
```

**Step 4: Create convex/http.ts for auth routes**

```typescript
import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

export default http;
```

**Step 5: Create convex/siteContent.ts**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const content = await ctx.db.query("siteContent").first();
    return content;
  },
});

export const upsert = mutation({
  args: {
    heroTitle: v.string(),
    heroSubtitle: v.string(),
    heroCtaText: v.string(),
    heroCtaLink: v.string(),
    heroImageUrl: v.string(),
    aboutPreview: v.string(),
    aboutStory: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existing = await ctx.db.query("siteContent").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("siteContent", args);
    }
  },
});
```

**Step 6: Create convex/faqItems.ts**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("faqItems")
      .withIndex("by_order")
      .collect();
  },
});

export const create = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("faqItems", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("faqItems"),
    question: v.string(),
    answer: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("faqItems") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
  },
});
```

**Step 7: Update src/main.tsx**

```typescript
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </React.StrictMode>
);
```

**Step 8: Run convex dev to push schema**

```bash
npx convex dev --once
```

**Step 9: Commit**

```bash
git add convex src/main.tsx .env.local
git commit -m "feat: initialize Convex with schema, auth, and content mutations"
```

---

## Task 5: Set Up React Router

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/Menu.tsx`
- Create: `src/pages/Login.tsx`
- Create: `src/pages/Admin.tsx`

**Step 1: Create placeholder pages**

Create `src/pages/Home.tsx`:
```typescript
export default function Home() {
  return <div className="p-8">Home Page</div>;
}
```

Create `src/pages/About.tsx`:
```typescript
export default function About() {
  return <div className="p-8">About Page</div>;
}
```

Create `src/pages/Menu.tsx`:
```typescript
export default function Menu() {
  return <div className="p-8">Menu Page</div>;
}
```

Create `src/pages/Login.tsx`:
```typescript
export default function Login() {
  return <div className="p-8">Login Page</div>;
}
```

Create `src/pages/Admin.tsx`:
```typescript
export default function Admin() {
  return <div className="p-8">Admin Page</div>;
}
```

**Step 2: Update src/App.tsx with router**

```typescript
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Menu from "@/pages/Menu";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "menu", element: <Menu /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

**Step 3: Create placeholder Navbar**

Create `src/components/layout/Navbar.tsx`:
```typescript
import { Link } from "react-router";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-primary-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="font-bold text-xl">Baileys Bakery</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-secondary-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-secondary-300 transition-colors">About</Link>
          <Link to="/menu" className="hover:text-secondary-300 transition-colors">Menu</Link>
          <Link to="/login" className="hover:text-secondary-300 transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
}
```

**Step 4: Create placeholder Footer**

Create `src/components/layout/Footer.tsx`:
```typescript
export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary-300">
          &copy; {new Date().getFullYear()} Baileys Bakery. Made with love.
        </p>
      </div>
    </footer>
  );
}
```

**Step 5: Create Logo component**

Create `src/components/layout/Logo.tsx`:
```typescript
interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="Baileys Bakery"
      className={className}
    />
  );
}
```

**Step 6: Create placeholder logo SVG**

Create `public/logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="45" fill="#1e3a5f"/>
  <text x="50" y="62" font-family="serif" font-size="40" fill="#fbbf24" text-anchor="middle">B</text>
</svg>
```

**Step 7: Verify routing works**

Run: `npm run dev`
Navigate to each route and verify pages render

**Step 8: Commit**

```bash
git add src/App.tsx src/pages src/components/layout public/logo.svg
git commit -m "feat: set up React Router with layout and placeholder pages"
```

---

## Task 6: Build Bakesy GraphQL Client

**Files:**
- Create: `src/lib/bakesy/types.ts`
- Create: `src/lib/bakesy/client.ts`
- Create: `src/lib/bakesy/queries.ts`
- Create: `src/lib/bakesy/hooks.ts`

**Step 1: Create src/lib/bakesy/types.ts**

```typescript
export interface BakesyImage {
  fullUrl: string;
  id: string;
  key: string;
  thumbnailUrl: string;
}

export interface BakesyOffering {
  description: string | null;
  hidden: boolean;
  id: string;
  image: string | null;
  images: BakesyImage[];
  name: string;
  position: number;
  priceCents: number;
  priceType: string;
  slug: string;
}

export interface BakesyCategory {
  default: boolean;
  dueDateDisabled: boolean;
  id: string;
  name: string;
  offerings: BakesyOffering[];
  offeringsCount: number;
  pageHeader: string | null;
  slug: string;
  updatedAt: string;
}

export interface BakesyFlavor {
  name: string;
  slug: string;
}

export interface BakesyBakedGood {
  allowHalfDozen: boolean;
  defaultUnit: string | null;
  dozenOnly: boolean;
  id: string;
  minQuantity: number | null;
  name: string;
  offeringType: string;
  priceCents: number;
  priceType: string;
  slug: string;
  stock: number | null;
}

export interface BakesyCurrency {
  flagUrl: string;
  id: string;
}

export interface BakesyBakery {
  cakeFlavors: BakesyFlavor[];
  categories: BakesyCategory[];
  cookieFlavors: BakesyFlavor[];
  currency: BakesyCurrency;
  icings: BakesyFlavor[];
  selectedBakedGoods: BakesyBakedGood[];
}

export interface BakeryOfferingsResponse {
  bakery: BakesyBakery;
}
```

**Step 2: Create src/lib/bakesy/client.ts**

```typescript
const BAKESY_API_URL = "https://api.bakesy.app/graphql";
const BAKERY_SLUG = "baileys-bakery";

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchBakesy<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(BAKESY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-version": "3.2.11",
      "x-platform": "Web",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Bakesy API error: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}

export { BAKERY_SLUG };
```

**Step 3: Create src/lib/bakesy/queries.ts**

```typescript
export const BAKERY_OFFERINGS_QUERY = `
  query BakeryOfferings($slug: String, $visit: Boolean) {
    bakery(slug: $slug, visit: $visit) {
      cakeFlavors: offerings(offeringType: cakeFlavor, selected: true) {
        name
        slug
      }
      categories {
        default
        dueDateDisabled
        id
        name
        offerings(selected: true, hidden: false) {
          description
          hidden
          id
          image
          images {
            fullUrl
            id
            key
            thumbnailUrl
          }
          name
          position
          priceCents
          priceType
          slug
        }
        offeringsCount
        pageHeader
        slug
        updatedAt
      }
      cookieFlavors: offerings(offeringType: cookieFlavor, selected: true) {
        name
        slug
      }
      currency {
        flagUrl
        id
      }
      icings: offerings(offeringType: icing, selected: true) {
        name
        slug
      }
      selectedBakedGoods: offerings(
        offeringTypes: [bakedGood, menuItem, presaleItem]
        selected: true
      ) {
        allowHalfDozen
        defaultUnit
        dozenOnly
        id
        minQuantity
        name
        offeringType
        priceCents
        priceType
        slug
        stock
      }
    }
  }
`;
```

**Step 4: Create src/lib/bakesy/hooks.ts**

```typescript
import { useQuery } from "@tanstack/react-query";
import { fetchBakesy, BAKERY_SLUG } from "./client";
import { BAKERY_OFFERINGS_QUERY } from "./queries";
import type { BakeryOfferingsResponse, BakesyOffering, BakesyCategory } from "./types";

export function useBakeryOfferings() {
  return useQuery({
    queryKey: ["bakery", "offerings", BAKERY_SLUG],
    queryFn: () =>
      fetchBakesy<BakeryOfferingsResponse>(BAKERY_OFFERINGS_QUERY, {
        slug: BAKERY_SLUG,
        visit: false,
      }),
  });
}

export function useFeaturedProducts(limit = 6) {
  const { data, ...rest } = useBakeryOfferings();

  const featured: BakesyOffering[] = [];
  if (data?.bakery.categories) {
    for (const category of data.bakery.categories) {
      for (const offering of category.offerings) {
        if (featured.length >= limit) break;
        featured.push(offering);
      }
      if (featured.length >= limit) break;
    }
  }

  return { data: featured, ...rest };
}

export function useCategoriesWithProducts() {
  const { data, ...rest } = useBakeryOfferings();

  const categories: BakesyCategory[] = data?.bakery.categories.filter(
    (cat) => cat.offerings.length > 0
  ) ?? [];

  return { data: categories, ...rest };
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
```

**Step 5: Create barrel export**

Create `src/lib/bakesy/index.ts`:
```typescript
export * from "./types";
export * from "./client";
export * from "./queries";
export * from "./hooks";
```

**Step 6: Verify Bakesy integration**

Add temporary test to Home.tsx and check browser console:
```typescript
import { useBakeryOfferings } from "@/lib/bakesy";

export default function Home() {
  const { data, isLoading, error } = useBakeryOfferings();
  console.log({ data, isLoading, error });
  return <div className="p-8">Home Page</div>;
}
```

Run: `npm run dev`
Expected: Console shows Bakesy data

**Step 7: Commit**

```bash
git add src/lib/bakesy
git commit -m "feat: implement Bakesy GraphQL client with React Query hooks"
```

---

## Task 7: Build Product Components

**Files:**
- Create: `src/components/products/ProductCard.tsx`
- Create: `src/components/products/ProductModal.tsx`
- Create: `src/components/products/ProductGrid.tsx`

**Step 1: Create ProductCard component**

Create `src/components/products/ProductCard.tsx`:
```typescript
import { Card, CardContent } from "@/components/ui/card";
import type { BakesyOffering } from "@/lib/bakesy";
import { formatPrice } from "@/lib/bakesy";

interface ProductCardProps {
  product: BakesyOffering;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const imageUrl = product.images[0]?.thumbnailUrl ?? product.image ?? "/placeholder-product.svg";

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-primary-800 truncate">
          {product.name}
        </h3>
        <p className="text-accent-600 font-bold mt-1">
          {formatPrice(product.priceCents)}
          {product.priceType !== "fixed" && <span className="text-sm font-normal text-muted-foreground"> / {product.priceType}</span>}
        </p>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Create ProductModal component**

Create `src/components/products/ProductModal.tsx`:
```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { BakesyOffering } from "@/lib/bakesy";
import { formatPrice } from "@/lib/bakesy";

interface ProductModalProps {
  product: BakesyOffering | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  if (!product) return null;

  const imageUrl = product.images[0]?.fullUrl ?? product.image ?? "/placeholder-product.svg";
  const bakesyUrl = `https://baileys-bakery.bakesy.app/offerings/${product.slug}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-800">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-2xl font-bold text-accent-600 mb-4">
              {formatPrice(product.priceCents)}
              {product.priceType !== "fixed" && (
                <span className="text-base font-normal text-muted-foreground">
                  {" "}/ {product.priceType}
                </span>
              )}
            </p>

            {product.description && (
              <p className="text-muted-foreground mb-6 flex-1">
                {product.description}
              </p>
            )}

            <Button
              asChild
              className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold rounded-xl"
            >
              <a href={bakesyUrl} target="_blank" rel="noopener noreferrer">
                Order on Bakesy
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Step 3: Create ProductGrid component**

Create `src/components/products/ProductGrid.tsx`:
```typescript
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import type { BakesyOffering } from "@/lib/bakesy";

interface ProductGridProps {
  products: BakesyOffering[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<BakesyOffering | null>(null);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
```

**Step 4: Create placeholder product image**

Create `public/placeholder-product.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" fill="#f0f4f8"/>
  <circle cx="100" cy="85" r="35" fill="#cbd5e1"/>
  <ellipse cx="100" cy="140" rx="50" ry="20" fill="#cbd5e1"/>
</svg>
```

**Step 5: Create barrel export**

Create `src/components/products/index.ts`:
```typescript
export { default as ProductCard } from "./ProductCard";
export { default as ProductModal } from "./ProductModal";
export { default as ProductGrid } from "./ProductGrid";
```

**Step 6: Commit**

```bash
git add src/components/products public/placeholder-product.svg
git commit -m "feat: build product card, modal, and grid components"
```

---

## Task 8: Build Home Page

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/AboutPreview.tsx`
- Create: `src/components/home/FeaturedProducts.tsx`

**Step 1: Create Hero component**

Create `src/components/home/Hero.tsx`:
```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  const content = useQuery(api.siteContent.get);

  const title = content?.heroTitle ?? "Welcome to Baileys Bakery";
  const subtitle = content?.heroSubtitle ?? "Homemade treats baked with love";
  const ctaText = content?.heroCtaText ?? "View Menu";
  const ctaLink = content?.heroCtaLink ?? "/menu";

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-primary-200 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold text-lg px-8 py-6 rounded-xl"
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z"
            fill="var(--color-background)"
          />
        </svg>
      </div>
    </section>
  );
}
```

**Step 2: Create AboutPreview component**

Create `src/components/home/AboutPreview.tsx`:
```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AboutPreview() {
  const content = useQuery(api.siteContent.get);

  const preview = content?.aboutPreview ??
    "At Baileys Bakery, every treat is made from scratch with the finest ingredients and a whole lot of love. From birthday cakes to holiday cookies, we're here to make your celebrations sweeter.";

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary-800 mb-6">
          About the Baker
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {preview}
        </p>
        <Button
          asChild
          variant="outline"
          className="border-primary-600 text-primary-700 hover:bg-primary-50 rounded-xl"
        >
          <Link to="/about">Learn More About Us</Link>
        </Button>
      </div>
    </section>
  );
}
```

**Step 3: Create FeaturedProducts component**

Create `src/components/home/FeaturedProducts.tsx`:
```typescript
import { useFeaturedProducts } from "@/lib/bakesy";
import { ProductGrid } from "@/components/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useFeaturedProducts(6);

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 mb-10 text-center">
            Featured Treats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products.length) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-primary-800 mb-10 text-center">
          Featured Treats
        </h2>
        <ProductGrid products={products} columns={3} />
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-700 hover:bg-primary-800 rounded-xl"
          >
            <Link to="/menu">See Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Update Home page**

Update `src/pages/Home.tsx`:
```typescript
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProducts />
    </>
  );
}
```

**Step 5: Verify Home page renders**

Run: `npm run dev`
Expected: Home page shows hero, about preview, and featured products from Bakesy

**Step 6: Commit**

```bash
git add src/pages/Home.tsx src/components/home
git commit -m "feat: build Home page with hero, about preview, and featured products"
```

---

## Task 9: Build About Page

**Files:**
- Modify: `src/pages/About.tsx`
- Create: `src/components/about/Story.tsx`
- Create: `src/components/about/FAQ.tsx`

**Step 1: Create Story component**

Create `src/components/about/Story.tsx`:
```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Story() {
  const content = useQuery(api.siteContent.get);

  const story = content?.aboutStory ??
    `Baileys Bakery started in my home kitchen with a simple dream: to share the joy of homemade baked goods with my community.

Every recipe has been perfected over years of baking for family and friends. What started as birthday cakes for neighbors has grown into a beloved local bakery serving celebrations big and small.

I believe that the best baked goods come from quality ingredients, time-tested recipes, and most importantly, love. Every cake, cookie, and pastry that leaves my kitchen is made with the same care I'd put into treats for my own family.

Thank you for letting me be part of your special moments.`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-800 mb-8 text-center">
          Our Story
        </h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          {story.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create FAQ component**

Create `src/components/about/FAQ.tsx`:
```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFaqs = [
  {
    _id: "1",
    question: "How do I place an order?",
    answer: "You can browse Menu and place orders directly through our Bakesy shop. Simply click on any item and select 'Order on Bakesy' to get started.",
    order: 1,
  },
  {
    _id: "2",
    question: "How much notice do you need for orders?",
    answer: "We typically need at least 48-72 hours notice for most orders. For custom cakes or large orders, please give us at least one week's notice.",
    order: 2,
  },
  {
    _id: "3",
    question: "Do you offer delivery?",
    answer: "We offer local pickup and delivery within a 15-mile radius. Delivery fees vary based on distance. Please contact us for specific delivery arrangements.",
    order: 3,
  },
  {
    _id: "4",
    question: "Can you accommodate dietary restrictions?",
    answer: "Yes! We offer select items that can be made gluten-free or dairy-free. Please mention any allergies or dietary needs when placing your order.",
    order: 4,
  },
];

export default function FAQ() {
  const faqItems = useQuery(api.faqItems.list);
  const faqs = faqItems?.length ? faqItems : defaultFaqs;

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-primary-800 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq._id}
              value={faq._id}
              className="bg-card rounded-xl px-6 border-none shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-primary-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

**Step 3: Update About page**

Update `src/pages/About.tsx`:
```typescript
import Story from "@/components/about/Story";
import FAQ from "@/components/about/FAQ";

export default function About() {
  return (
    <>
      <Story />
      <FAQ />
    </>
  );
}
```

**Step 4: Verify About page renders**

Run: `npm run dev`
Navigate to /about
Expected: Story and FAQ sections display

**Step 5: Commit**

```bash
git add src/pages/About.tsx src/components/about
git commit -m "feat: build About page with story and FAQ sections"
```

---

## Task 10: Build Menu Page

**Files:**
- Modify: `src/pages/Menu.tsx`

**Step 1: Update Menu page**

Update `src/pages/Menu.tsx`:
```typescript
import { useState } from "react";
import { useCategoriesWithProducts } from "@/lib/bakesy";
import { ProductGrid } from "@/components/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Menu() {
  const { data: categories, isLoading, error } = useCategoriesWithProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-800 mb-10 text-center">
            Menu
          </h1>
          <div className="flex justify-center gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">Menu</h1>
        <p className="text-muted-foreground">
          Unable to load menu. Please try again later.
        </p>
      </div>
    );
  }

  const displayedCategories = activeCategory
    ? categories.filter((c) => c.id === activeCategory)
    : categories;

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-800 mb-10 text-center">
          Menu
        </h1>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-xl",
              activeCategory === null && "bg-primary-700 hover:bg-primary-800"
            )}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-xl",
                activeCategory === category.id && "bg-primary-700 hover:bg-primary-800"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products by category */}
        <div className="space-y-16">
          {displayedCategories.map((category) => (
            <section key={category.id}>
              {!activeCategory && (
                <h2 className="text-2xl font-bold text-primary-800 mb-6">
                  {category.name}
                </h2>
              )}
              <ProductGrid products={category.offerings} columns={4} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify Menu page renders**

Run: `npm run dev`
Navigate to /menu
Expected: Categories with filter buttons and product grids display

**Step 3: Commit**

```bash
git add src/pages/Menu.tsx
git commit -m "feat: build Menu page with category filters and product grid"
```

---

## Task 11: Build Login Page

**Files:**
- Modify: `src/pages/Login.tsx`

**Step 1: Update Login page**

Update `src/pages/Login.tsx`:
```typescript
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("flow", flow);

    try {
      await signIn("password", formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary-800">
            {flow === "signIn" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {flow === "signIn"
              ? "Sign in to manage your bakery content"
              : "Create an admin account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="rounded-xl"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary-700 hover:bg-primary-800 rounded-xl"
              disabled={submitting}
            >
              {submitting ? "Please wait..." : flow === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              className="text-sm text-primary-600 hover:underline"
            >
              {flow === "signIn"
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Verify Login page renders**

Run: `npm run dev`
Navigate to /login
Expected: Login form displays with email/password fields

**Step 3: Commit**

```bash
git add src/pages/Login.tsx
git commit -m "feat: build Login page with email/password authentication"
```

---

## Task 12: Build Admin Page

**Files:**
- Modify: `src/pages/Admin.tsx`
- Create: `src/components/admin/ContentForm.tsx`
- Create: `src/components/admin/FaqManager.tsx`

**Step 1: Create ContentForm component**

Create `src/components/admin/ContentForm.tsx`:
```typescript
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContentForm() {
  const content = useQuery(api.siteContent.get);
  const upsert = useMutation(api.siteContent.upsert);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroCtaText: "",
    heroCtaLink: "",
    heroImageUrl: "",
    aboutPreview: "",
    aboutStory: "",
  });

  useEffect(() => {
    if (content) {
      setForm({
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        heroCtaText: content.heroCtaText,
        heroCtaLink: content.heroCtaLink,
        heroImageUrl: content.heroImageUrl,
        aboutPreview: content.aboutPreview,
        aboutStory: content.aboutStory,
      });
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await upsert(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-800">Hero Section</h3>

        <div className="space-y-2">
          <Label htmlFor="heroTitle">Title</Label>
          <Input
            id="heroTitle"
            value={form.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            placeholder="Welcome to Baileys Bakery"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroSubtitle">Subtitle</Label>
          <Input
            id="heroSubtitle"
            value={form.heroSubtitle}
            onChange={(e) => updateField("heroSubtitle", e.target.value)}
            placeholder="Homemade treats baked with love"
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="heroCtaText">Button Text</Label>
            <Input
              id="heroCtaText"
              value={form.heroCtaText}
              onChange={(e) => updateField("heroCtaText", e.target.value)}
              placeholder="View Menu"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroCtaLink">Button Link</Label>
            <Input
              id="heroCtaLink"
              value={form.heroCtaLink}
              onChange={(e) => updateField("heroCtaLink", e.target.value)}
              placeholder="/menu"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroImageUrl">Hero Image URL (optional)</Label>
          <Input
            id="heroImageUrl"
            value={form.heroImageUrl}
            onChange={(e) => updateField("heroImageUrl", e.target.value)}
            placeholder="https://..."
            className="rounded-xl"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-800">About Section</h3>

        <div className="space-y-2">
          <Label htmlFor="aboutPreview">About Preview (shown on Home page)</Label>
          <Textarea
            id="aboutPreview"
            value={form.aboutPreview}
            onChange={(e) => updateField("aboutPreview", e.target.value)}
            placeholder="A short description for the home page..."
            rows={3}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutStory">Full Story (shown on About page)</Label>
          <Textarea
            id="aboutStory"
            value={form.aboutStory}
            onChange={(e) => updateField("aboutStory", e.target.value)}
            placeholder="The full story of your bakery..."
            rows={8}
            className="rounded-xl"
          />
          <p className="text-sm text-muted-foreground">
            Separate paragraphs with blank lines.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={saving}
          className="bg-primary-700 hover:bg-primary-800 rounded-xl"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {saved && (
          <span className="text-sm text-green-600">Changes saved!</span>
        )}
      </div>
    </form>
  );
}
```

**Step 2: Create FaqManager component**

Create `src/components/admin/FaqManager.tsx`:
```typescript
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface FaqItem {
  _id: Id<"faqItems">;
  question: string;
  answer: string;
  order: number;
}

export default function FaqManager() {
  const faqItems = useQuery(api.faqItems.list) ?? [];
  const createFaq = useMutation(api.faqItems.create);
  const updateFaq = useMutation(api.faqItems.update);
  const removeFaq = useMutation(api.faqItems.remove);

  const [editingId, setEditingId] = useState<Id<"faqItems"> | "new" | null>(null);
  const [form, setForm] = useState({ question: "", answer: "" });

  const startCreate = () => {
    setEditingId("new");
    setForm({ question: "", answer: "" });
  };

  const startEdit = (faq: FaqItem) => {
    setEditingId(faq._id);
    setForm({ question: faq.question, answer: faq.answer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ question: "", answer: "" });
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;

    if (editingId === "new") {
      await createFaq({
        question: form.question,
        answer: form.answer,
        order: faqItems.length,
      });
    } else if (editingId) {
      const faq = faqItems.find((f) => f._id === editingId);
      if (faq) {
        await updateFaq({
          id: editingId,
          question: form.question,
          answer: form.answer,
          order: faq.order,
        });
      }
    }
    cancelEdit();
  };

  const handleDelete = async (id: Id<"faqItems">) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await removeFaq({ id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary-800">FAQ Items</h3>
        <Button
          onClick={startCreate}
          disabled={editingId !== null}
          className="bg-primary-700 hover:bg-primary-800 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqItems.map((faq) => (
          <Card key={faq._id} className="rounded-xl">
            <CardContent className="p-4">
              {editingId === faq._id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      value={form.answer}
                      onChange={(e) => setForm({ ...form, answer: e.target.value })}
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="rounded-xl">
                      Save
                    </Button>
                    <Button variant="outline" onClick={cancelEdit} className="rounded-xl">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground mt-1 cursor-grab" />
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-800">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(faq)}
                      className="rounded-xl"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(faq._id)}
                      className="rounded-xl text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {editingId === "new" && (
          <Card className="rounded-xl border-dashed">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="What is your question?"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Provide the answer..."
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="rounded-xl">
                  Add FAQ
                </Button>
                <Button variant="outline" onClick={cancelEdit} className="rounded-xl">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {faqItems.length === 0 && editingId !== "new" && (
          <p className="text-center text-muted-foreground py-8">
            No FAQ items yet. Click "Add FAQ" to create one.
          </p>
        )}
      </div>
    </div>
  );
}
```

**Step 3: Update Admin page**

Update `src/pages/Admin.tsx`:
```typescript
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Navigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContentForm from "@/components/admin/ContentForm";
import FaqManager from "@/components/admin/FaqManager";

export default function Admin() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-800">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="rounded-xl"
          >
            Sign Out
          </Button>
        </div>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Manage Site Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="mb-6">
                <TabsTrigger value="content" className="rounded-lg">
                  Site Content
                </TabsTrigger>
                <TabsTrigger value="faq" className="rounded-lg">
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <ContentForm />
              </TabsContent>

              <TabsContent value="faq">
                <FaqManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

**Step 4: Verify Admin page renders**

Run: `npm run dev`
Sign up for an account at /login
Navigate to /admin
Expected: Admin dashboard with content and FAQ tabs

**Step 5: Commit**

```bash
git add src/pages/Admin.tsx src/components/admin
git commit -m "feat: build Admin page with content editor and FAQ manager"
```

---

## Task 13: Update Navbar with Auth State

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Update Navbar with auth-aware navigation**

Update `src/components/layout/Navbar.tsx`:
```typescript
import { Link } from "react-router";
import { useConvexAuth } from "convex/react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <nav className="bg-primary-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="font-bold text-xl">Baileys Bakery</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-secondary-300 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-secondary-300 transition-colors">
            About
          </Link>
          <Link to="/menu" className="hover:text-secondary-300 transition-colors">
            Menu
          </Link>
          {isAuthenticated ? (
            <Button
              asChild
              variant="secondary"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-xl"
            >
              <Link to="/admin">Admin</Link>
            </Button>
          ) : (
            <Link to="/login" className="hover:text-secondary-300 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Verify navigation updates based on auth**

Run: `npm run dev`
Expected: Shows "Login" when logged out, "Admin" button when logged in

**Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: update Navbar with auth-aware navigation"
```

---

## Task 14: Seed Initial Content

**Files:**
- Create: `convex/seed.ts`

**Step 1: Create seed function**

Create `convex/seed.ts`:
```typescript
import { mutation } from "./_generated/server";

export const seedContent = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if content already exists
    const existing = await ctx.db.query("siteContent").first();
    if (existing) {
      return { message: "Content already seeded" };
    }

    // Seed site content
    await ctx.db.insert("siteContent", {
      heroTitle: "Welcome to Baileys Bakery",
      heroSubtitle: "Homemade treats baked with love, right from my kitchen to your table",
      heroCtaText: "View Menu",
      heroCtaLink: "/menu",
      heroImageUrl: "",
      aboutPreview: "At Baileys Bakery, every treat is made from scratch with the finest ingredients and a whole lot of love. From birthday cakes to holiday cookies, we're here to make your celebrations sweeter.",
      aboutStory: `Baileys Bakery started in my home kitchen with a simple dream: to share the joy of homemade baked goods with my community.

Every recipe has been perfected over years of baking for family and friends. What started as birthday cakes for neighbors has grown into a beloved local bakery serving celebrations big and small.

I believe that the best baked goods come from quality ingredients, time-tested recipes, and most importantly, love. Every cake, cookie, and pastry that leaves my kitchen is made with the same care I'd put into treats for my own family.

Thank you for letting me be part of your special moments.`,
    });

    // Seed FAQ items
    const faqs = [
      {
        question: "How do I place an order?",
        answer: "You can browse Menu and place orders directly through our Bakesy shop. Simply click on any item and select 'Order on Bakesy' to get started.",
        order: 0,
      },
      {
        question: "How much notice do you need for orders?",
        answer: "We typically need at least 48-72 hours notice for most orders. For custom cakes or large orders, please give us at least one week's notice.",
        order: 1,
      },
      {
        question: "Do you offer delivery?",
        answer: "We offer local pickup and delivery within a 15-mile radius. Delivery fees vary based on distance. Please contact us for specific delivery arrangements.",
        order: 2,
      },
      {
        question: "Can you accommodate dietary restrictions?",
        answer: "Yes! We offer select items that can be made gluten-free or dairy-free. Please mention any allergies or dietary needs when placing your order.",
        order: 3,
      },
    ];

    for (const faq of faqs) {
      await ctx.db.insert("faqItems", faq);
    }

    return { message: "Content seeded successfully" };
  },
});
```

**Step 2: Push and run seed**

```bash
npx convex dev --once
```

Then in browser console or via Convex dashboard, run the seed mutation.

**Step 3: Commit**

```bash
git add convex/seed.ts
git commit -m "feat: add seed function for initial content"
```

---

## Task 15: Final Polish and Testing

**Files:**
- Various touch-ups

**Step 1: Run type check**

```bash
npm run build
```

Fix any TypeScript errors.

**Step 2: Test all pages**

- Home: Hero, about preview, featured products load
- About: Story and FAQ display
- Menu: Categories filter, products display, modal works
- Login: Can sign up and sign in
- Admin: Can edit content and FAQ items

**Step 3: Test responsive design**

Check all pages at mobile widths.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final polish and testing complete"
```

---

## Summary

This plan implements a complete Baileys Bakery website with:

1. **Tailwind CSS 4** + **shadcn/ui** for styling with custom dark blue theme
2. **Convex** for backend with authentication and content storage
3. **Bakesy GraphQL** integration for product catalog
4. **React Router** for navigation
5. **TanStack Query** for API caching

**Pages:**
- Home (Hero + About Preview + Featured Products)
- About (Story + FAQ)
- Menu (Category filters + Product grid + Modal)
- Login (Email/password auth)
- Admin (Content editor + FAQ manager)

**Easy customization:**
- Replace `public/logo.svg` to update logo
- Modify CSS variables in `src/index.css` to change colors
- All content editable via Admin dashboard
