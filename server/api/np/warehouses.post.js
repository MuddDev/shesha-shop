export default defineEventHandler(async event => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  return await $fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    body: {
      apiKey: config.NP_API_KEY,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: body.cityRef,
        Limit: 200
      }
    }
  })
})
