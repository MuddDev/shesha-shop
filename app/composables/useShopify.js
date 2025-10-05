export const useShopify = async (query, variables = {}) => {
  const config = useRuntimeConfig()

  // базові параметри з .env
  const domain = config.public.shopifyDomain
  const token = config.public.shopifyToken
  const apiVersion = config.public.shopifyApiVersion || '2025-04'

  if (!domain || !token) {
    console.error('❌ Shopify: Missing credentials in .env')
    throw new Error('Missing Shopify credentials')
  }

  // побудова endpoint
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`

  try {
    const res = await $fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: { query, variables }
    })

    // якщо Shopify повернув помилки GraphQL
    if (res.errors) {
      console.error('❌ Shopify GraphQL Errors:', res.errors)
      throw new Error('Shopify GraphQL Error')
    }

    return res.data
  } catch (err) {
    console.error('❌ Shopify request failed:', err)
    throw err
  }
}
