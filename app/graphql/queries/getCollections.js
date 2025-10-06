export const GET_COLLECTION_BY_HANDLE = `
  query getCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      title
      image {
        url
      }
    }
  }
`
