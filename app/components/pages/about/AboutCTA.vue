<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="about-cta">
    <div class="about-cta__content container">
      <h2 class="about-cta__title">{{ data.title }}</h2>
      <p class="about-cta__subtitle">{{ data.subtitle }}</p>
      <NuxtLink
        :to="data.buttonLink"
        class="about-cta__btn"
      >
        {{ data.buttonText }}
      </NuxtLink>
    </div>
  </section>
</template>
