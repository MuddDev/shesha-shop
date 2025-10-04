<script setup>
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()
</script>

<template>
  <section
    v-if="settings.announcement"
    class="announcement"
  >
    <div class="announcement-inner container">
      <span class="announcement__title">{{ settings.announcement.title }}</span>
      <h2 class="announcement__message">{{ settings.announcement.message }}</h2>

      <NuxtLink
        v-if="settings.announcement.button"
        class="announcement__link"
        :to="settings.announcement.button.link"
      >
        {{ settings.announcement.button.text }}
      </NuxtLink>
    </div>
  </section>
</template>
