export const useSettings = async () => {
  const { data } = await useAsyncData('settings', () => $fetch('/content/settings.json'))

  const site = computed(() => data.value?.site ?? { name: '', tagline: '' })
  const logo = computed(() => data.value?.logo ?? { image: '', alt: '' })
  const hasImage = computed(() => !!logo.value?.image)
  const announcement = computed(() => data.value?.announcement ?? null)

  return { site, logo, hasImage, announcement }
}
