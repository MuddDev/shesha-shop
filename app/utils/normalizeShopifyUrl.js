export const useNormalizeShopifyUrl = () => {
  const config = useRuntimeConfig()
  const shopifyDomain = config.public.shopifyDomain

  const normalizeUrl = url => {
    if (!url) return '/'
    return url.startsWith(`https://${shopifyDomain}`)
      ? url.replace(`https://${shopifyDomain}`, '')
      : url
  }

  return { normalizeUrl }
}
