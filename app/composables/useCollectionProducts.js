import { useShopify } from '@/composables/useShopify'
import { GET_COLLECTION_PRODUCTS } from '@/graphql/queries/getCollectionProducts'

export const useCollectionProducts = async handle => {
  const { data } = await useAsyncData(`collection-${handle}`, async () => {
    const res = await useShopify(GET_COLLECTION_PRODUCTS, { handle })
    return res?.collectionByHandle || null
  })

  return computed(() => data.value)
}
