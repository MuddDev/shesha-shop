import { useShopify } from '@/composables/useShopify'
import { getMenuByHandleQuery } from '@/graphql/queries/getMenuByHandle'

export const useShopifyMenu = async (handle = 'main-menu') => {
  try {
    const data = await useShopify(getMenuByHandleQuery, { handle })

    if (!data?.menu) {
      console.warn(`⚠️ Меню з handle "${handle}" не знайдено`)
      return []
    }

    return data.menu.items
  } catch (err) {
    console.error('❌ Помилка завантаження меню Shopify:', err)
    return []
  }
}
