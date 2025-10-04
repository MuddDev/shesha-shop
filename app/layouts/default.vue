<script setup>
import { useSettingsStore } from '@/stores/settings'
import HeaderComponent from '~/components/layout/HeaderComponent.vue'
import FooterComponent from '~/components/layout/FooterComponent.vue'
import AnnouncementBarComponent from '~/components/announcement-bar/AnnouncementBarComponent.vue'

const settings = useSettingsStore()
await settings.fetchSettings()

useHead({
  title: settings.site.name || 'SheshaShop | Рушники преміум якості',
  meta: [
    {
      name: 'description',
      content:
        settings.site.tagline ||
        'Інтернет-магазин рушників та текстилю SheshaShop — турецька якість, український комфорт.'
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: settings.logo.image || '/favicon.png' }]
})
</script>

<template>
  <div class="layout-wrapper">
    <div class="layouts-announcement"><AnnouncementBarComponent /></div>
    <div class="layouts-header"><HeaderComponent /></div>
    <main class="main"><slot /></main>
    <div class="layouts-footer"><FooterComponent /></div>
  </div>
</template>
