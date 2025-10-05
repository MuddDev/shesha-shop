export const getMenuByHandleQuery = `
  query getMenuByHandle($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        type
        resourceId
        items {
          id
          title
          url
          type
          resourceId
          items {
            id
            title
            url
            type
            resourceId
          }
        }
      }
    }
  }
`
