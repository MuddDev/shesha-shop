import { useShopify } from '@/composables/useShopify.js'
import { GET_COLLECTION_BY_HANDLE } from '@/graphql/queries/getCollections'

export const useCollections = async handles => {
  const collectionsData = []

  for (const handle of handles) {
    const res = await useShopify(GET_COLLECTION_BY_HANDLE, { handle })
    if (res?.collectionByHandle) {
      collectionsData.push(res.collectionByHandle)
    }
  }

  return collectionsData
}
