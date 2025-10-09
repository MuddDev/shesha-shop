<script setup>
import { useCollectionProducts } from '@/composables/useCollectionProducts'
import ProductCard from '@/components/collection/ProductCard.vue'

const props = defineProps({
  handle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Featured Collection'
  }
})

const collection = await useCollectionProducts(props.handle)
</script>

<template>
  <section
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
              class="btn"
              >Купити Зараз</NuxtLink
            >
          </div>
        </div>
        <div class="collection-spotlight__products">
          <ProductCard
            v-for="edge in collection?.products?.edges"
            :key="edge.node.id"
            :product="edge.node"
          />
        </div>
      </div>
    </div>
  </section>
</template>
