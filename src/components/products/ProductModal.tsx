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
  if (!product) return null;

  const imageUrl =
    product.images[0]?.fullUrl ?? product.image ?? "/placeholder-product.svg";
  const bakesyUrl = `https://baileys-bakery.bakesy.app/offerings/${product.slug}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content side */}
          <div className="p-6 flex flex-col">
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
