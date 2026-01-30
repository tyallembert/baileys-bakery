// Bailey's Bakery SEO Constants
// Update these values with actual business information

export const SITE_CONFIG = {
  name: "Bailey's Bakery",
  tagline: "Artisan Bakery in Waterbury, Vermont",
  description:
    "Fresh-baked artisan bread, pastries, cakes, and treats made with love in Waterbury, VT. Family-owned bakery serving Vermont since day one.",
  url: "https://baileysbaking.com",
  logo: "/logo.svg",
  ogImage: "/og-image.svg",
  themeColor: "#3D5F63",
} as const;

export const BUSINESS_INFO = {
  name: "Bailey's Bakery",
  legalName: "Bailey's Bakery",
  // TODO: Update with actual address
  address: {
    street: "31 N Main St Apt 2",
    city: "Waterbury",
    state: "Vermont",
    stateCode: "VT",
    zip: "05676",
    country: "United States",
    countryCode: "US",
  },
  // TODO: Update with actual phone
  phone: "(802) 555-0123",
  email: "mchughbailey@gmail.com",
  coordinates: {
    latitude: 44.3378,
    longitude: -72.7567,
  },
  // TODO: Update with actual hours
  openingHours: [
    { days: "Monday-Friday", hours: "7:00 AM - 5:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 4:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
  // Schema.org format for opening hours
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  priceRange: "$$",
  cuisineTypes: ["Bakery", "Pastries", "Cakes", "Artisan Bread"],
  serviceArea: {
    type: "GeoCircle",
    geoMidpoint: {
      latitude: 44.3378,
      longitude: -72.7567,
    },
    geoRadius: "15 mi",
  },
} as const;

export const KEYWORDS = {
  primary: [
    "bakery waterbury vt",
    "waterbury vermont bakery",
    "vermont bakery",
  ],
  secondary: [
    "artisan bread waterbury",
    "custom cakes vermont",
    "bakery near stowe vt",
    "fresh pastries waterbury",
    "wedding cakes vermont",
    "local bakery vermont",
  ],
  all: [
    "bakery waterbury vt",
    "waterbury vermont bakery",
    "vermont bakery",
    "artisan bread waterbury",
    "custom cakes vermont",
    "bakery near stowe vt",
    "fresh pastries waterbury",
    "wedding cakes vermont",
    "local bakery vermont",
  ],
} as const;

export const PAGE_SEO = {
  home: {
    title: "Bailey's Bakery - Artisan Bakery in Waterbury, Vermont",
    description:
      "Fresh-baked artisan bread, pastries, cakes, and treats made with love in Waterbury, VT. Family-owned bakery serving Vermont.",
    keywords: KEYWORDS.all.join(", "),
    canonical: "/",
  },
  about: {
    title: "My Story | Bailey's Bakery - Waterbury, Vermont",
    description:
      "Learn about Bailey's Bakery, a family-owned artisan bakery in Waterbury, Vermont. Discover our passion for fresh-baked goods and community.",
    keywords: "baileys bakery story, waterbury vermont bakery, family bakery vermont, artisan bakery history",
    canonical: "/about",
  },
  menu: {
    title: "Menu - Fresh Baked Goods | Bailey's Bakery",
    description:
      "Browse Menu of fresh-baked breads, pastries, cookies, cakes, and seasonal treats. Handcrafted daily in Waterbury, Vermont.",
    keywords: "bakery menu waterbury, fresh bread vermont, pastries waterbury vt, cakes vermont, cookies bakery",
    canonical: "/menu",
  },
  login: {
    title: "Admin Login | Bailey's Bakery",
    description: "Admin login for Bailey's Bakery website management.",
    keywords: "",
    canonical: "/login",
    noindex: true,
  },
  admin: {
    title: "Dashboard | Bailey's Bakery",
    description: "Admin dashboard for Bailey's Bakery.",
    keywords: "",
    canonical: "/admin",
    noindex: true,
  },
} as const;

export const SOCIAL_LINKS = {
  // TODO: Add actual social media links when available
  facebook: "https://www.facebook.com/bailey.mchugh.7",
  instagram: "https://www.instagram.com/bbaking.etc/",
} as const;
