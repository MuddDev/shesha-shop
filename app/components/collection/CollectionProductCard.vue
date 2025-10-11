<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: { type: Object, required: true }
})

const cart = useCartStore()

const images = computed(() => props.product.images?.edges?.map(i => i.node.url) || [])
const currentImage = computed(() => images.value[0] || props.product.featuredImage?.url)
const hoverImage = computed(() => images.value[1] || currentImage.value)

const variant = computed(() => props.product.variants?.edges?.[0]?.node)
const price = computed(
  () => variant.value?.price?.amount || props.product.priceRange?.minVariantPrice?.amount || '—'
)
const compareAt = computed(() => variant.value?.compareAtPrice?.amount || null)
const currency = computed(
  () =>
    variant.value?.price?.currencyCode ||
    props.product.priceRange?.minVariantPrice?.currencyCode ||
    ''
)

const discountPercent = computed(() => {
  if (!compareAt.value || !price.value || Number(compareAt.value) <= Number(price.value))
    return null
  const diff = ((compareAt.value - price.value) / compareAt.value) * 100
  return Math.round(diff)
})

const colorName = computed(() => {
  const variantNode = props.product.variants?.edges?.[0]?.node
  const colorOpt = variantNode?.selectedOptions?.find(o => ['Color', 'Колір'].includes(o.name))
  return colorOpt?.value || ''
})

const addToCart = () => {
  cart.addItem({
    id: props.product.id,
    title: props.product.title,
    price: Number(price.value),
    image: currentImage.value,
    quantity: 1,
    handle: props.product.handle,
    vendor: props.product.vendor
  })
}
</script>

<template>
  <div class="collection-product">
    <NuxtLink
      :to="`/products/${product.handle}`"
      class="collection-product__link"
    >
      <div class="collection-product__image">
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
        <div
          v-else-if="product.tags?.includes('sale')"
          class="badge"
        >
          sale
        </div>
      </div>

      <div class="collection-product__info">
        <p class="vendor">{{ product.vendor }}</p>
        <h3 class="title">{{ product.title }}</h3>

        <div class="rating">
          <Icon
            v-for="n in 5"
            :key="n"
            name="mdi:star"
            size="0.9rem"
            :class="['star', { active: n <= 4 }]"
          />
        </div>

        <p
          v-if="colorName"
          class="color"
        >
          {{ colorName }}
        </p>

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
            aria-label="Додати в кошик"
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
