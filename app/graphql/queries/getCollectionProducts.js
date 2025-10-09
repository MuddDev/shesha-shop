export const GET_COLLECTION_PRODUCTS = `
  query getCollectionProducts($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      image {
        url
      }
      products(first: 12) {
        edges {
          node {
            id
            handle
            title
            vendor
            tags

            # 🖼 Головне зображення (як fallback)
            featuredImage {
              url
            }

            # 🖼 Усі зображення для hover
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }

            # 🎨 Варіанти для свотчів (колір, ціна, картинка)
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  image {
                    url
                  }
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }

            # 💰 Базова ціна (fallback)
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`
