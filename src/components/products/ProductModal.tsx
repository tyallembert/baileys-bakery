import { useState } from "react";
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

export default function ProductModal({
  product,
  open,
  onClose,
}: ProductModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const imageUrl =
    product.images[0]?.fullUrl ?? product.image ?? "/placeholder-product.svg";
  const bakesyUrl = `https://bakesy.shop/b/baileys-bakery/${product.slug}`;

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        setImageLoaded(false);
      }
      onClose();
    }}>
      <DialogContent className="max-w-2xl rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-card">
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="aspect-square md:aspect-auto overflow-hidden bg-muted rounded-l-2xl md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none relative min-h-[250px]">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary-200/50 dark:bg-primary-700/50 animate-pulse" />
                  <div className="w-10 h-10 border-4 border-primary-200 dark:border-primary-700 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin" />
                </div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Content side */}
          <div className="p-6 flex flex-col bg-card">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display text-2xl font-bold text-primary-800 dark:text-primary-100">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="text-3xl font-bold text-accent-600 dark:text-accent-400 mt-4">
              {formatPrice(product.priceCents)}
              {product.priceType !== "fixed" && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  / {product.priceType}
                </span>
              )}
            </p>

            {product.description && (
              <p className="text-muted-foreground mt-4 leading-relaxed flex-1">
                {product.description}
              </p>
            )}

            <Button
              asChild
              size="lg"
              className="w-full mt-6 bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold rounded-xl transition-all duration-200 ease-out hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5 active:scale-[0.98]"
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
