<script setup>
import { ref, computed } from 'vue'
import VariantDetails from '@/components/product/VariantDetails.vue'
import Accordion from '@/components/ui/Accordion.vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: { type: Object, required: true },
  variant: { type: Object, required: false }
})

const emit = defineEmits(['update:variant'])
const qty = ref(1)
const showFullDesc = ref(false)
const cart = useCartStore()

const selectedVariant = computed({
  get: () => props.variant,
  set: val => emit('update:variant', val)
})

const discountPercent = computed(() => {
  const compare = parseFloat(selectedVariant.value?.compareAtPrice?.amount || 0)
  const price = parseFloat(selectedVariant.value?.price?.amount || 0)
  if (!compare || compare <= price) return 0
  return Math.round(((compare - price) / compare) * 100)
})

const getMeta = key => {
  const metafields = props.product?.metafields
  if (!Array.isArray(metafields)) return ''
  const found = metafields.find(m => m?.key === key)
  return found?.value || ''
}

const addToCart = () => {
  if (!selectedVariant.value) return
  cart.addItem({
    id: selectedVariant.value.id,
    title: props.product.title,
    image: props.product.featuredImage?.url,
    quantity: qty.value,
    price: Number(selectedVariant.value.price?.amount) || 0,
    handle: props.product.handle,
    vendor: props.product.vendor,
    variantOptions: selectedVariant.value.selectedOptions || []
  })
}
</script>

<template>
  <div class="product-info">
    <div class="product-meta">
      <span class="vendor">{{ product.vendor }}</span>
      <span
        class="stock"
        :class="product.availableForSale ? 'in-stock' : 'out-of-stock'"
      >
        <span class="dot"></span>
        {{ product.availableForSale ? 'В наявності' : 'Немає в наявності' }}
      </span>
    </div>

    <h1 class="product-title">{{ product.title }}</h1>

    <div class="product-price">
      <span class="current">{{ selectedVariant.price.amount }} ₴</span>
      <span
        v-if="selectedVariant.compareAtPrice?.amount"
        class="compare"
      >
        {{ selectedVariant.compareAtPrice.amount }} ₴
      </span>
      <span
        v-if="discountPercent"
        class="discount"
        >-{{ discountPercent }}%</span
      >
    </div>

    <div
      v-if="product.variants?.nodes?.some(v => v.selectedOptions?.some(o => o.name === 'Color'))"
      class="variant variant--color"
    >
      <label>Колір:</label>
      <div class="swatches">
        <button
          v-for="variant in product.variants.nodes"
          :key="variant.id"
          v-if="variant.selectedOptions?.some(o => o.name === 'Color')"
          :class="{ active: selectedVariant.id === variant.id }"
          @click="selectedVariant = variant"
        >
          {{ variant.selectedOptions.find(o => o.name === 'Color')?.value }}
        </button>
      </div>
    </div>

    <div
      v-if="product.variants?.nodes?.some(v => v.selectedOptions?.some(o => o.name === 'Size'))"
      class="variant variant--size"
    >
      <label>Розмір:</label>
      <div class="size-options">
        <button
          v-for="variant in product.variants.nodes"
          :key="variant.id"
          v-if="variant.selectedOptions?.some(o => o.name === 'Size')"
          :class="{ active: selectedVariant.id === variant.id }"
          @click="selectedVariant = variant"
        >
          {{ variant.selectedOptions.find(o => o.name === 'Size')?.value }}
        </button>
      </div>
    </div>

    <VariantDetails
      :product="product"
      :variant="selectedVariant"
      @update:variant="selectedVariant = $event"
    />

    <div class="product-actions">
      <div class="qty-control">
        <button
          class="qty-btn"
          @click="qty > 1 ? qty-- : null"
          aria-label="Зменшити кількість"
        >
          −
        </button>
        <input
          class="qty-input"
          min="1"
          v-model="qty"
          @focus="$event.target.select()"
        />
        <button
          class="qty-btn"
          @click="qty++"
          aria-label="Збільшити кількість"
        >
          +
        </button>
      </div>

      <button
        class="add-to-cart"
        @click="addToCart"
      >
        Додати в кошик
      </button>
    </div>

    <div
      v-if="getMeta('short_description')"
      class="product-short"
    >
      <p
        v-html="
          showFullDesc
            ? getMeta('short_description')
            : getMeta('short_description').slice(0, 200) + '...'
        "
      />
      <button
        v-if="getMeta('short_description').length > 200"
        @click="showFullDesc = !showFullDesc"
        class="toggle-desc"
      >
        {{ showFullDesc ? 'Згорнути' : 'Розгорнути' }}
      </button>
    </div>

    <Accordion
      :items="[
        { title: 'Інформація про товар', content: product.descriptionHtml || '' },
        { title: 'Доставка та оплата', content: getMeta('shipping_info') },
        { title: 'Повернення', content: getMeta('return_policy') }
      ]"
    />
  </div>
</template>
