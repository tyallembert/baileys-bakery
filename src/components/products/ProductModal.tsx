import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
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
    product.images[0]?.fullUrl ?? product.image ?? "/placeholder-product.png";
  const bakesyUrl = `https://bakesy.shop/b/baileys-bakery/products/${product.slug}`;

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        setImageLoaded(false);
      }
      onClose();
    }}>
      <DialogContent showCloseButton={false} className="w-[calc(100%-2rem)] sm:w-[90vw] lg:w-[50vw] max-w-5xl rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-primary-800 dark:bg-primary-900">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-primary-700/80 hover:bg-primary-600 text-primary-200 hover:text-white flex items-center justify-center transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="aspect-square md:aspect-auto overflow-hidden bg-primary-700/50 relative min-h-[300px] md:min-h-[400px]">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-primary-700/50 flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-primary-500/30" />
                  <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-primary-300 animate-spin" />
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
          <div className="p-8 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display text-2xl font-bold text-white">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="text-3xl font-bold text-accent-400 mt-4">
              {formatPrice(product.priceCents)}
              {product.priceType !== "fixed" && (
                <span className="text-base font-normal text-primary-300 ml-2">
                  / {product.priceType}
                </span>
              )}
            </p>

            {product.description && (
              <p className="text-primary-200 mt-4 leading-relaxed flex-1">
                {product.description}
              </p>
            )}

            <Button
              asChild
              size="lg"
              className="w-full mt-6 bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold rounded-xl transition-all duration-200 ease-out hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <a href={bakesyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <span>Order on Bakesy</span>
                <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
