<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: Object, required: false }
})

const details = computed(() => {
  const metafields = props.variant?.metafields || []
  const map = {}
  metafields.forEach(mf => {
    if (mf?.namespace && mf?.key) map[`${mf.namespace}_${mf.key}`] = mf.value
  })

  return {
    name: map['custom_set_name'] || '',
    composition: map['custom_composition'] || ''
  }
})
</script>

<template>
  <div
    v-if="details.name || details.composition"
    class="variant-meta"
  >
    <h3
      v-if="details.name"
      class="variant-meta__title"
    >
      🧺 {{ details.name }}
    </h3>

    <div
      v-if="details.composition"
      class="variant-meta__block"
    >
      <h4 class="variant-meta__label">Склад набору:</h4>
      <p
        class="variant-meta__value"
        v-html="details.composition.replace(/\n/g, '<br>')"
      />
    </div>
  </div>
</template>
