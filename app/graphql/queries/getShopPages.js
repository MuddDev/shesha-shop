export const GET_SHOP_PAGES = `
  query getShopPages {
    pages(first: 50) {
      nodes {
        id
        handle
        title
        body
        bodySummary
        onlineStoreUrl
      }
    }
  }
`
