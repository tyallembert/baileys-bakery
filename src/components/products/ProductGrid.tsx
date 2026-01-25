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
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 75}ms`, animationFillMode: "backwards" }}
          >
            <ProductCard
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          </div>
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
