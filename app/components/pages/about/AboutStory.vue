<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="about-story">
    <div class="container about-story__inner">
      <div class="about-story__content">
        <h2 class="about-story__title">{{ data.title }}</h2>
        <p
          class="about-story__text"
          v-html="data.text"
        />
      </div>

      <div class="about-story__image">
        <img
          :src="data.image"
          alt="Наша історія"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
