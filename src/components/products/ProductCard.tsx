import { useState } from "react";
import { Eye } from "lucide-react";
import type { BakesyOffering } from "@/lib/bakesy";
import { formatPrice } from "@/lib/bakesy";

interface ProductCardProps {
  product: BakesyOffering;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl =
    product.images[0]?.thumbnailUrl ?? product.image ?? "/placeholder-product.svg";

  return (
    <article
      className="group cursor-pointer transition-[translate] duration-300 ease-in-out hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image container with layered effects */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100/50 dark:bg-primary-900/30 shadow-md transition-shadow duration-300 ease-in-out group-hover:shadow-xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 z-10" />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-primary-200/30 dark:border-primary-700/30" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-primary-400 animate-spin" />
            </div>
          </div>
        )}

        {/* Product image */}
        <img
          src={imageUrl}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`
            h-full w-full object-cover
            transition-[scale,opacity] duration-500 ease-in-out
            group-hover:scale-105
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* View indicator - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-primary-800/95 rounded-full shadow-lg backdrop-blur-sm opacity-0 translate-y-3 transition-[opacity,translate] duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            <Eye className="w-4 h-4 text-primary-700 dark:text-primary-200" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-200">View Details</span>
          </div>
        </div>

        {/* Price badge - top right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="px-3 py-1.5 bg-white/90 dark:bg-primary-800/90 backdrop-blur-sm rounded-full shadow-md transition-[scale] duration-300 ease-in-out group-hover:scale-105">
            <span className="text-sm font-bold text-primary-800 dark:text-primary-100">
              {formatPrice(product.priceCents)}
            </span>
            {product.priceType !== "fixed" && (
              <span className="text-xs font-normal text-muted-foreground ml-0.5">
                /{product.priceType}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="pt-4 px-1">
        <h3 className="font-display font-semibold text-lg text-primary-800 dark:text-primary-100 transition-colors duration-300 ease-in-out group-hover:text-primary-600 dark:group-hover:text-primary-300 line-clamp-2">
          {product.name}
        </h3>

        {/* Subtle decorative underline that expands on hover */}
        <div className="mt-2 h-0.5 w-full rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full origin-left scale-x-[0.15] transition-[scale] duration-500 ease-in-out group-hover:scale-x-100" />
        </div>
      </div>
    </article>
  );
}
