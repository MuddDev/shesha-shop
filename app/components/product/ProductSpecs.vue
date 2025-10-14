<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const LABELS_MAP = {
  material: 'Матеріал',
  fabric_type: 'Тип тканини',
  country: 'Країна виробництва',
  purpose: 'Тип виробу / Призначення',
  note: 'Опис / додатково'
}

const specs = computed(() => {
  const fields = props.product?.metafield?.reference?.fields || []
  if (!Array.isArray(fields) || fields.length === 0) return []

  return fields
    .filter(f => f?.value)
    .map(f => ({
      label: LABELS_MAP[f.key] || f.key,
      value: f.value
    }))
})
</script>

<template>
  <div
    v-if="specs.length"
    class="product-specs"
  >
    <h3 class="product-specs__title">Характеристики товару:</h3>
    <ul class="product-specs__list">
      <li
        v-for="(item, i) in specs"
        :key="i"
        class="product-specs__item"
      >
        <span class="product-specs__label">{{ item.label }}:</span>
        <span
          class="product-specs__value"
          v-html="item.value.replace(/\n/g, '<br>')"
        />
      </li>
    </ul>
  </div>
</template>
