<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: { type: Object, required: true }
})

const cart = useCartStore()

// 🧩 Варіанти
const variants = computed(() => props.product.variants?.edges?.map(v => v.node) || [])
const selectedVariant = ref(variants.value[0])

// 🖼 Усі фото
const images = computed(() => props.product.images?.edges?.map(i => i.node.url) || [])
const currentIndex = ref(0)
const currentImage = computed(
  () => images.value[currentIndex.value] || '/images/image-placeholder.webp'
)

// ⏩ навігація слайдера
const nextImage = () => {
  if (!images.value.length) return
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
const prevImage = () => {
  if (!images.value.length) return
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

// 💰 Ціна
const price = computed(
  () => selectedVariant.value?.price?.amount || props.product.priceRange?.minVariantPrice?.amount
)
const currency = computed(
  () =>
    selectedVariant.value?.price?.currencyCode ||
    props.product.priceRange?.minVariantPrice?.currencyCode
)

// 🎨 Колір
const colorName = computed(() => {
  const colorOpt = selectedVariant.value?.selectedOptions?.find(o =>
    ['Color', 'Колір'].includes(o.name)
  )
  return colorOpt?.value || ''
})

// 🛒 Додати в кошик
const addToCart = () => {
  if (!selectedVariant.value) return

  cart.addItem({
    id: selectedVariant.value.id,
    title: props.product.title,
    price: Number(price.value),
    image: currentImage.value,
    quantity: 1,
    handle: props.product.handle,
    vendor: props.product.vendor,
    variantOptions: selectedVariant.value.selectedOptions
  })
}
</script>

<template>
  <div class="product-card">
    <NuxtLink
      :to="`/products/${product.handle}`"
      class="product-card__link"
    >
      <div class="product-card__image">
        <img
          :src="currentImage"
          :alt="product.title"
          loading="lazy"
        />

        <button
          v-if="images.length > 1"
          class="nav prev"
          @click.prevent.stop="prevImage"
        >
          <Icon
            name="mdi:chevron-left"
            size="1.4rem"
          />
        </button>
        <button
          v-if="images.length > 1"
          class="nav next"
          @click.prevent.stop="nextImage"
        >
          <Icon
            name="mdi:chevron-right"
            size="1.4rem"
          />
        </button>

        <div
          v-if="images.length > 1"
          class="dots"
        >
          <span
            v-for="(img, i) in images"
            :key="i"
            :class="['dot', { active: currentIndex === i }]"
            @click.prevent.stop="currentIndex = i"
          ></span>
        </div>
      </div>

      <div class="product-card__info">
        <p class="product-card__vendor">{{ product.vendor }}</p>
        <h3 class="product-card__title">{{ product.title }}</h3>

        <div class="product-card__rating">
          <Icon
            v-for="n in 5"
            :key="n"
            name="mdi:star"
            size="1rem"
            :class="['star', { active: n <= 4 }]"
          />
        </div>

        <p
          v-if="colorName"
          class="product-card__color"
        >
          {{ colorName }}
        </p>

        <div class="product-card__bottom">
          <p class="product-card__price">{{ price }} {{ currency }}</p>
          <button
            class="product-card__add"
            @click.prevent.stop="addToCart"
          >
            <Icon
              name="mdi:cart-plus"
              size="1.1rem"
            />
          </button>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
