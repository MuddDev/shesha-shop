<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="about-hero">
    <div class="about-hero__overlay"></div>

    <div class="about-hero__inner container">
      <h1 class="about-hero__title">{{ data.title }}</h1>
      <div class="about-hero__divider"></div>
      <p class="about-hero__subtitle">{{ data.subtitle }}</p>
    </div>
  </section>
</template>
