import { useFeaturedProducts } from "@/lib/bakesy";
import { ProductGrid } from "@/components/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useFeaturedProducts(6);

  if (isLoading) {
    return (
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary-800 mb-12 text-center">
            Featured Treats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-muted rounded-2xl animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
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
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-primary-800 mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          Featured Treats
        </h2>
        <ProductGrid products={products} columns={3} />
        <div className="mt-16 text-center animate-in fade-in duration-700 delay-500">
          <Button
            asChild
            size="lg"
            className="bg-primary-700 hover:bg-primary-600 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Link to="/menu">See Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
