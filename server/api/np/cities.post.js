export default defineEventHandler(async event => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  event.node.res.setHeader('Cache-Control', 'no-store')

  return await $fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    body: {
      apiKey: config.NP_API_KEY, // <-- ВАЖЛИВО
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: body.query,
        Limit: 20
      }
    }
  })
})