import { action } from "./_generated/server";

const BAKESY_API_URL = "https://api.bakesy.app/graphql";
const BAKERY_SLUG = "baileys-bakery";

const BAKERY_OFFERINGS_QUERY = `
  query BakeryOfferings($slug: String, $visit: Boolean) {
    bakery(slug: $slug, visit: $visit) {
      cakeFlavors: offerings(offeringType: cakeFlavor, selected: true) {
        name
        slug
      }
      categories {
        default
        dueDateDisabled
        id
        name
        offerings(selected: true, hidden: false) {
          description
          hidden
          id
          image
          images {
            fullUrl
            id
            key
            thumbnailUrl
          }
          name
          position
          priceCents
          priceType
          slug
        }
        offeringsCount
        pageHeader
        slug
        updatedAt
      }
      cookieFlavors: offerings(offeringType: cookieFlavor, selected: true) {
        name
        slug
      }
      currency {
        flagUrl
        id
      }
      icings: offerings(offeringType: icing, selected: true) {
        name
        slug
      }
      selectedBakedGoods: offerings(
        offeringTypes: [bakedGood, menuItem, presaleItem]
        selected: true
      ) {
        allowHalfDozen
        defaultUnit
        dozenOnly
        id
        minQuantity
        name
        offeringType
        priceCents
        priceType
        slug
        stock
      }
    }
  }
`;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

interface BakesyImage {
  fullUrl: string;
  id: string;
  key: string;
  thumbnailUrl: string;
}

interface BakesyOffering {
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

interface BakesyCategory {
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

interface BakesyFlavor {
  name: string;
  slug: string;
}

interface BakesyBakedGood {
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

interface BakesyCurrency {
  flagUrl: string;
  id: string;
}

interface BakesyBakery {
  cakeFlavors: BakesyFlavor[];
  categories: BakesyCategory[];
  cookieFlavors: BakesyFlavor[];
  currency: BakesyCurrency;
  icings: BakesyFlavor[];
  selectedBakedGoods: BakesyBakedGood[];
}

interface BakeryOfferingsResponse {
  bakery: BakesyBakery;
}

export const getOfferings = action({
  args: {},
  handler: async (): Promise<BakeryOfferingsResponse> => {
    const response = await fetch(BAKESY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-version": "3.2.11",
        "x-platform": "Web",
      },
      body: JSON.stringify({
        query: BAKERY_OFFERINGS_QUERY,
        variables: {
          slug: BAKERY_SLUG,
          visit: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Bakesy API error: ${response.status}`);
    }

    const result: GraphQLResponse<BakeryOfferingsResponse> =
      await response.json();

    if (result.errors?.length) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  },
});
