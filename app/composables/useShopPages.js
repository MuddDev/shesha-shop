import { useShopify } from '@/composables/useShopify'
import { GET_SHOP_PAGES } from '~/graphql/queries/getShopPages.js'

export const useShopPages = async () => {
  const { data } = await useAsyncData('shop-pages', async () => {
    const res = await useShopify(GET_SHOP_PAGES)
    console.log('🧩 Pages:', res?.pages?.nodes)
    return res?.pages?.nodes || []
  })

  return computed(() => data.value)
}
