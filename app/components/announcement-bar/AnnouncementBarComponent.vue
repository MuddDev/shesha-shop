<script setup>
const content = useContentStore()
await content.fetch('announcement_bar', { eq: { active: true } })
const announcement = content.getOne('announcement_bar')
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
        v-if="announcement"
        class="announcement__link"
        :to="announcement.cta_link"
      >
        {{ announcement.cta_text }}
      </NuxtLink>
    </div>
  </section>
</template>
