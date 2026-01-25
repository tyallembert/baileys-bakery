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
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-12 animate-in fade-in duration-500">
            <div className="h-6 w-24 bg-muted animate-pulse rounded-full mx-auto mb-4" />
            <div className="h-12 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
            <div className="h-1 w-24 bg-muted animate-pulse rounded-full mx-auto" />
          </div>

          {/* Category filter skeleton */}
          <div className="flex justify-center gap-3 mb-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-muted animate-pulse rounded-xl"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-2xl"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary-800 dark:text-primary-100 mb-4">
            Our Menu
          </h1>
          <p className="text-muted-foreground mb-6">
            Unable to load menu. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary-600 hover:bg-primary-500"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const displayedCategories = activeCategory
    ? categories?.filter((c) => c.id === activeCategory)
    : categories;

  return (
    <div className="relative py-24 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-32 w-80 h-80 bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium mb-4">
            Browse Our Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 dark:text-primary-100 mb-4">
            Our Menu
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto rounded-full" />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-xl transition-all duration-300",
              activeCategory === null
                ? "bg-primary-700 hover:bg-primary-600 shadow-lg shadow-primary-700/25"
                : "hover:border-primary-300 dark:hover:border-primary-600"
            )}
          >
            All Items
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-xl transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary-700 hover:bg-primary-600 shadow-lg shadow-primary-700/25"
                  : "hover:border-primary-300 dark:hover:border-primary-600"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products by category */}
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {displayedCategories?.map((category) => (
            <section key={category.id}>
              {!activeCategory && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-800 dark:text-primary-100 mb-2">
                    {category.name}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full" />
                </div>
              )}
              <ProductGrid products={category.offerings} columns={4} />
            </section>
          ))}
        </div>

        {/* Empty state */}
        {(!displayedCategories || displayedCategories.length === 0) && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🧁</span>
            </div>
            <p className="text-muted-foreground text-lg">
              No items available at the moment.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Check back soon for fresh treats!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
