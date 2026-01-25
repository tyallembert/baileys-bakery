import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { BakesyOffering, BakesyCategory } from "./types";

export function useBakeryOfferings() {
  const convex = useConvex();

  return useQuery({
    queryKey: ["bakery", "offerings"],
    queryFn: async () => {
      const result = await convex.action(api.bakesy.getOfferings, {});
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  const categories: BakesyCategory[] =
    data?.bakery.categories.filter((cat) => cat.offerings.length > 0) ?? [];

  return { data: categories, ...rest };
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
