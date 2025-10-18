<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="about-values">
    <div class="container">
      <h2 class="about-values__title">Наші цінності</h2>

      <div class="about-values__grid">
        <div
          v-for="(item, i) in data"
          :key="i"
          class="about-values__item"
        >
          <div class="about-values__icon-wrap">
            <Icon
              :name="item.icon"
              size="3rem"
              class="about-values__icon"
            />
          </div>
          <h3 class="about-values__name">{{ item.title }}</h3>
          <p class="about-values__text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
