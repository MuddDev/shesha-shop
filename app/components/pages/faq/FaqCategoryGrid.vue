<script setup>
import FaqAccordion from '~/components/pages/faq/FaqAccordion.vue'

const props = defineProps({
  categories: { type: Array, required: true }
})
</script>

<template>
  <div class="faq-grid container">
    <div
      v-for="(cat, i) in categories"
      :key="i"
      class="faq-card"
    >
      <header class="faq-card__header">
        <Icon
          :name="cat.icon"
          mode="svg"
          size="1.5rem"
          class="faq-card__icon"
        />
        <h2 class="faq-card__title">{{ cat.title }}</h2>
      </header>

      <FaqAccordion :items="cat.items" />
    </div>
  </div>
</template>
