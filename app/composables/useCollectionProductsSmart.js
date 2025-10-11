import { useShopify } from '@/composables/useShopify'
import { GET_COLLECTION_PRODUCTS_SMART } from '@/graphql/queries/getCollectionProductsSmart'

export const useCollectionProductsSmart = async handle => {
  const { data } = await useAsyncData(`collection-${handle}`, async () => {
    const res = await useShopify(GET_COLLECTION_PRODUCTS_SMART, { handle })
    return res?.collectionByHandle || null
  })

  return computed(() => data.value)
}
