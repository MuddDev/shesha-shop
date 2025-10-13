<script setup>
import { computed } from 'vue'
import VariantMeta from "~/components/product/VariantMeta.vue";

const props = defineProps({
  product: { type: Object, required: true },
  variant: { type: Object, required: false }
})
const emit = defineEmits(['update:variant'])

const selectedVariant = computed({
  get: () => props.variant || null,
  set: val => emit('update:variant', val)
})


// === Отримуємо список усіх опцій (наприклад Color, Size)
const optionNames = computed(() => {
  const variants = props.product?.variants?.nodes || []
  const names = new Set()
  variants.forEach(v => {
    v.selectedOptions?.forEach(opt => {
      if (opt?.name) names.add(opt.name)
    })
  })
  return Array.from(names)
})

// === Для кожної опції робимо список унікальних значень
const optionsMap = computed(() => {
  const variants = props.product?.variants?.nodes || []
  const map = {}
  variants.forEach(v => {
    v.selectedOptions?.forEach(opt => {
      if (!map[opt.name]) map[opt.name] = new Set()
      map[opt.name].add(opt.value)
    })
  })
  // перетворюємо Set → Array
  for (const key in map) map[key] = Array.from(map[key])
  return map
})

// === Хендлер зміни
const selectOption = (optionName, optionValue) => {
  const variants = props.product?.variants?.nodes || []
  // знайти варіант, який має цю комбінацію
  const found = variants.find(v =>
    v.selectedOptions.some(o => o.name === optionName && o.value === optionValue)
  )
  if (found) emit('update:variant', found)
}
</script>

<template>
  <div class="variant-details">
    <h3 class="variant-details__title">Вибір варіантів:</h3>

    <div
      v-for="optionName in optionNames"
      :key="optionName"
      class="variant-group"
    >
      <label class="variant-label">{{ optionName }}</label>

      <div class="variant-options">
        <button
          v-for="value in optionsMap[optionName]"
          :key="value"
          @click="selectOption(optionName, value)"
          :class="[
            'variant-btn',
            {
              active: variant?.selectedOptions?.some(
                o => o.name === optionName && o.value === value
              )
            }
          ]"
        >
          {{ value }}
        </button>
      </div>


    </div>
    <VariantMeta
        v-if="selectedVariant"
        :variant="selectedVariant"
    />
  </div>
</template>