import { useShopify } from '@/composables/useShopify'
import { GET_PRODUCT_BY_HANDLE } from '~/graphql/queries/getProductByHandle.js'

export const useProductByHandle = async handle => {
  const { data } = await useAsyncData(`product-${handle}`, async () => {
    const res = await useShopify(GET_PRODUCT_BY_HANDLE, { handle })
    return res?.product || null
  })

  return computed(() => data.value)
}
