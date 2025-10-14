<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

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
