export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      availableForSale

      featuredImage {
        url
        altText
      }

      images(first: 10) {
        nodes {
          url
          altText
        }
      }

      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }

          metafields(identifiers: [
            { namespace: "custom", key: "set_name" },
            { namespace: "custom", key: "composition" }
          ]) {
            namespace
            key
            value
          }
        }
      }
      
       # === МЕТАФІЛД З ПОСИЛАННЯМ НА METAOBJECT Product Attributes ===
      metafield(namespace: "custom", key: "attributes") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
            }
          }
        }
      }

      metafields(identifiers: [
        {namespace: "global", key: "short_description"},
        {namespace: "global", key: "shipping_info"},
        {namespace: "global", key: "return_policy"}
      ]) {
        namespace
        key
        value
      }
    }
  }
`
