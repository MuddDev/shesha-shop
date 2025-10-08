<script setup>
import announcement from '@/components/announcement-bar/announcement.json'
</script>

<template>
  <section
    v-if="announcement"
    class="announcement"
  >
    <div class="announcement-inner container--full">
      <span class="announcement__title">
        {{ announcement.title }}
      </span>

      <h2 class="announcement__message">
        {{ announcement.message }}
      </h2>

      <NuxtLink
        v-if="announcement.button"
        class="announcement__link"
        :to="announcement.button.link"
      >
        {{ announcement.button.text }}
      </NuxtLink>
    </div>
  </section>
</template>
