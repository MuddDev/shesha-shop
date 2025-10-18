import { useShopify } from '@/composables/useShopify.js'
import { GET_COLLECTION_BY_HANDLE } from '@/graphql/queries/getCollections'

export const useCollections = async (handles = []) => {
  if (!handles.length) return []

  const promises = handles.map(handle => useShopify(GET_COLLECTION_BY_HANDLE, { handle }))

  const results = await Promise.all(promises)

  return results.map(res => res?.collectionByHandle).filter(Boolean)
}
