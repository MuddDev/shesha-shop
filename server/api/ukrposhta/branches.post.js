export default defineEventHandler(async event => {
  const { city } = await readBody(event)
  const config = useRuntimeConfig()
  event.node.res.setHeader('Cache-Control', 'no-store')

  const response = await $fetch('https://api.ukrposhta.ua/v3/offices/search', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.UKRPOSHTA_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: {
      cityName: city,
      limit: 200
    }
  })

  return response
})
