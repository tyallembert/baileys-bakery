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
