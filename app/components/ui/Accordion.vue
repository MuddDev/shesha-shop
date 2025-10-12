<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

// зберігаємо індекс відкритого акордеону
const openIndex = ref(null)

const toggle = index => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion-item"
      :class="{ open: openIndex === index }"
    >
      <button
        class="accordion-header"
        @click="toggle(index)"
        type="button"
      >
        <span>{{ item.title }}</span>
        <svg
          class="chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        v-show="openIndex === index"
        class="accordion-content"
      >
        <div v-html="item.content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border-top: 1px solid #ddd;
  margin-top: 1.5rem;
}

.accordion-item {
  border-bottom: 1px solid #ddd;
  transition: 0.3s ease;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  text-align: left;
}

.accordion-header:hover {
  color: #555;
}

.chevron {
  transition: transform 0.3s ease;
}
.accordion-item.open .chevron {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  padding: 0.8rem 0 1.2rem;
  font-size: 1.4rem;
  color: #444;
  line-height: 1.6;
}

.accordion-content :deep(p) {
  margin: 0.5rem 0;
}
</style>
