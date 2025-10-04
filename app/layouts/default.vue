<script setup>
import HeaderComponent from '~/components/layout/HeaderComponent.vue'
import FooterComponent from '~/components/layout/FooterComponent.vue'

const { site, logo } = await useSettings()

useHead({
  title: site.value?.name || 'SheshaShop | Рушники преміум якості',
  meta: [
    {
      name: 'description',
      content:
        site.value?.tagline ||
        'Інтернет-магазин рушників та текстилю SheshaShop — турецька якість, український комфорт.'
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: logo.value?.image || '/favicon.png' }]
})
</script>

<template>
  <div class="layout-wrapper">
    <div class="layouts-header">
      <HeaderComponent />
    </div>
    <main class="main">
      <slot />
    </main>
    <div class="layouts-footer">
      <FooterComponent />
    </div>
  </div>
</template>
