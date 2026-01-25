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
