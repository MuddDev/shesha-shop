export const useNormalizeShopifyUrl = () => {
  const config = useRuntimeConfig()
  const shopifyDomain = config.public.shopifyDomain

  const normalizeUrl = url => {
    if (!url) return '/'

    // 1️⃣ Прибираємо Shopify домен, якщо є
    let clean = url.startsWith(`https://${shopifyDomain}`)
      ? url.replace(`https://${shopifyDomain}`, '')
      : url

    // 2️⃣ Прибираємо /pages/ -> / (бо в Nuxt сторінки лежать у корені)
    if (clean.startsWith('/pages/')) {
      clean = clean.replace('/pages/', '/')
    }

    // 3️⃣ Прибираємо /collections/all, якщо треба редіректити на /collections
    if (clean === '/collections/all') {
      clean = '/collections'
    }

    // 4️⃣ Гарантовано починаємо зі слеша
    if (!clean.startsWith('/')) {
      clean = '/' + clean
    }

    return clean
  }

  return { normalizeUrl }
}
