import { Helmet } from "@dr.pogodin/react-helmet";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/seo";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_CONFIG.url}/#bakery`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    servesCuisine: BUSINESS_INFO.cuisineTypes,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.stateCode,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.coordinates.latitude,
      longitude: BUSINESS_INFO.coordinates.longitude,
    },
    openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification.map(
      (spec) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: spec.dayOfWeek,
        opens: spec.opens,
        closes: spec.closes,
      })
    ),
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_INFO.serviceArea.geoMidpoint.latitude,
        longitude: BUSINESS_INFO.serviceArea.geoMidpoint.longitude,
      },
      geoRadius: BUSINESS_INFO.serviceArea.geoRadius,
    },
    hasMenu: `${SITE_CONFIG.url}/menu`,
    sameAs: [
      // Add social media URLs when available
    ].filter(Boolean),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
