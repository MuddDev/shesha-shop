<script setup>
const props = defineProps({
  items: { type: Array, required: true }
})

const openIndex = ref(null)
const toggle = i => (openIndex.value = openIndex.value === i ? null : i)
</script>

<template>
  <div class="faq-accordion">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="faq-accordion__item"
      :class="{ open: openIndex === i }"
    >
      <button
        class="faq-accordion__question"
        @click="toggle(i)"
      >
        <span>{{ item.q }}</span>
        <Icon
          :name="openIndex === i ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          size="1.25rem"
          mode="svg"
          class="faq-accordion__chevron"
        />
      </button>

      <transition name="faq-slide">
        <div
          v-if="openIndex === i"
          class="faq-accordion__answer"
        >
          <p>{{ item.a }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>
