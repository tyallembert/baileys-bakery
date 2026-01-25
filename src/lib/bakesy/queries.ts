export const BAKERY_OFFERINGS_QUERY = `
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
