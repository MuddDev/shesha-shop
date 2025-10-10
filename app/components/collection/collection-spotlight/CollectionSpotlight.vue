<script setup>
import { ref } from 'vue'
import { useCollectionProducts } from '@/composables/useCollectionProducts'
import ProductCard from '@/components/collection/ProductCard.vue'

const props = defineProps({
  handle: { type: String, required: true },
  title: { type: String, default: 'Featured Collection' }
})

const collection = await useCollectionProducts(props.handle)
const scrollContainer = ref(null)

const scrollLeft = () => {
  const el = scrollContainer.value
  if (el) el.scrollBy({ left: -el.clientWidth * 0.9, behavior: 'smooth' })
}
const scrollRight = () => {
  const el = scrollContainer.value
  if (el) el.scrollBy({ left: el.clientWidth * 0.9, behavior: 'smooth' })
}
</script>

<template>
  <div
    class="collection-spotlight"
    v-if="collection"
  >
    <div class="container--full">
      <h2 class="collection-spotlight__title">{{ title }}</h2>

      <div class="collection-spotlight__grid">
        <div
          class="collection-spotlight__banner"
          v-if="collection.image"
        >
          <img
            :src="collection.image.url"
            :alt="collection.title"
          />
          <div class="collection-spotlight__overlay">
            <span class="collection-spotlight__tag">Бестселери</span>
            <h3>{{ collection.title }}</h3>
            <p>{{ collection.description }}</p>
            <NuxtLink
              :to="`/collections/${props.handle}`"
              class="btn countdown-btn"
              >Купити Зараз</NuxtLink
            >
          </div>
        </div>

        <div class="collection-spotlight__products-wrapper">
          <button
            class="collection-spotlight__button collection-spotlight__button--prev"
            @click="scrollLeft"
          >
            <Icon
              name="mdi:chevron-left"
              size="1.6rem"
            />
          </button>

          <div
            class="collection-spotlight__products collection-spotlight__products-scroll"
            ref="scrollContainer"
          >
            <ProductCard
              v-for="edge in collection?.products?.edges"
              :key="edge.node.id"
              :product="edge.node"
            />
          </div>

          <button
            class="collection-spotlight__button collection-spotlight__button--next"
            @click="scrollRight"
          >
            <Icon
              name="mdi:chevron-right"
              size="1.6rem"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
