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
      className="cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 rounded-2xl border-0 shadow-md bg-card group"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg text-primary-800 truncate">
          {product.name}
        </h3>
        <p className="text-accent-600 font-bold mt-1 text-lg">
          {formatPrice(product.priceCents)}
          {product.priceType !== "fixed" && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              / {product.priceType}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
