export const GET_COLLECTION_PRODUCTS_SMART = `
  query getCollectionProductsSmart($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      title
      description
      image { url }

      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            vendor
            tags
            productType

            featuredImage { url }

            images(first: 5) {
              edges { node { url } }
            }

            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  selectedOptions { name value }
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                }
              }
            }

            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
`
