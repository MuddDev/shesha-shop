<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: { type: Object, required: true }
})

const cart = useCartStore()

const images = computed(() => props.product.images?.edges?.map(i => i.node.url) || [])
const currentImage = ref(images.value[0] || props.product.featuredImage?.url)
const hoverImage = computed(() => images.value[1] || currentImage.value)

const variants = computed(() => props.product.variants?.edges?.map(v => v.node) || [])
const defaultVariant = variants.value[0]

const price = computed(
  () => defaultVariant?.price?.amount || props.product.priceRange?.minVariantPrice?.amount || '—'
)
const compareAt = computed(() => defaultVariant?.compareAtPrice?.amount || null)
const currency = computed(
  () =>
    defaultVariant?.price?.currencyCode ||
    props.product.priceRange?.minVariantPrice?.currencyCode ||
    ''
)

const discountPercent = computed(() => {
  if (!compareAt.value || !price.value || Number(compareAt.value) <= Number(price.value))
    return null
  const diff = ((compareAt.value - price.value) / compareAt.value) * 100
  return Math.round(diff)
})

const colors = computed(
  () =>
    variants.value
      .map(v => v.selectedOptions.find(o => ['Color', 'Колір'].includes(o.name))?.value)
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i) // унікальні
)

const sizes = computed(() =>
  variants.value
    .map(v => v.selectedOptions.find(o => ['Size', 'Розмір'].includes(o.name))?.value)
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
)

const selectedColor = ref(colors.value[0] || null)
const selectedSize = ref(sizes.value[0] || null)

const activeVariant = computed(() => {
  return (
    variants.value.find(v => {
      const color = v.selectedOptions.find(o => ['Color', 'Колір'].includes(o.name))?.value
      const size = v.selectedOptions.find(o => ['Size', 'Розмір'].includes(o.name))?.value
      return color === selectedColor.value && size === selectedSize.value
    }) || defaultVariant
  )
})

watch(selectedColor, () => {
  const image = activeVariant.value?.image?.url
  if (image) currentImage.value = image
})

const addToCart = () => {
  cart.addItem({
    id: activeVariant.value.id,
    title: props.product.title,
    price: Number(activeVariant.value.price?.amount) || 0,
    image: currentImage.value,
    quantity: 1,
    handle: props.product.handle,
    vendor: props.product.vendor,
    variantOptions: activeVariant.value.selectedOptions || []
  })
}
</script>

<template>
  <div class="product-mini">
    <NuxtLink
      :to="`/products/${product.handle}`"
      class="product-mini__link"
    >
      <div class="product-mini__image">
        <img
          :src="currentImage"
          :alt="product.title"
          class="front"
          loading="lazy"
        />
        <img
          v-if="hoverImage && hoverImage !== currentImage"
          :src="hoverImage"
          :alt="`${product.title} hover`"
          class="back"
          loading="lazy"
        />
        <div
          v-if="discountPercent"
          class="discount-label"
        >
          -{{ discountPercent }}%
        </div>
      </div>

      <div class="product-mini__info">
        <p class="vendor">{{ product.vendor }}</p>
        <h3 class="title">{{ product.title }}</h3>

        <div
          v-if="colors.length"
          class="options colors"
        >
          <button
            v-for="(color, i) in colors"
            :key="i"
            :class="{ active: color === selectedColor }"
            @click.prevent.stop="selectedColor = color"
            :style="{ backgroundColor: color.toLowerCase() }"
            :title="color"
          ></button>
        </div>

        <div
          v-if="sizes.length"
          class="options sizes"
        >
          <button
            v-for="(size, i) in sizes"
            :key="i"
            :class="{ active: size === selectedSize }"
            @click.prevent.stop="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>

        <div class="bottom">
          <div class="price-box">
            <p class="price-current">{{ price }} {{ currency }}</p>
            <p
              v-if="compareAt && discountPercent"
              class="price-old"
            >
              {{ compareAt }} {{ currency }}
            </p>
          </div>

          <button
            class="add"
            @click.prevent.stop="addToCart"
          >
            <Icon
              name="mdi:cart-plus"
              size="1rem"
            />
          </button>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
