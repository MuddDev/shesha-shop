<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductCardMini from '@/components/collection/ProductCardMini.vue'
import { useCollectionProducts } from '@/composables/useCollectionProducts'

// props
const props = defineProps({
  title: { type: String, default: 'Featured Collection' },
  tabs: { type: Array, required: true, default: () => [] }
})

const activeTab = ref(props.tabs[0])
const products = ref(null)

// FIX: loadCollection правильно працює з computed()
const loadCollection = async (handle) => {
  try {
    const comp = await useCollectionProducts(handle)
    const data = comp.value     // беремо значення computed

    if (data?.products?.edges) {
      products.value = data     // це collectionByHandle
    } else {
      console.warn("Unexpected structure:", data)
      products.value = { products: { edges: [] } }
    }

  } catch (e) {
    console.error('FeaturedTabs load error', e)
    products.value = { products: { edges: [] } }
  }
}

onMounted(() => {
  if (activeTab.value?.handle) {
    loadCollection(activeTab.value.handle)
  }
})

const changeTab = (tab) => {
  activeTab.value = tab
  loadCollection(tab.handle)
}

// FIX: тепер продукт-edges гарантовано працює
const productEdges = computed(() => {
  return products.value?.products?.edges ?? []
})

// UI logic
const trackRef = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)

const scrollNext = () => {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelector('.featured-slider__item')
  const cardWidth = card?.offsetWidth || 300
  track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' })
}

const scrollPrev = () => {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelector('.featured-slider__item')
  const cardWidth = card?.offsetWidth || 300
  track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' })
}

const updateScrollState = () => {
  const track = trackRef.value
  if (!track) return
  const scrollLeft = track.scrollLeft
  const maxScrollLeft = track.scrollWidth - track.clientWidth

  isAtStart.value = scrollLeft <= 0
  isAtEnd.value = scrollLeft >= maxScrollLeft - 1
}

onMounted(() => {
  const track = trackRef.value
  if (track) track.addEventListener('scroll', updateScrollState)
})
</script>

<template>
  <section class="featured-slider">
    <div class="container--full">
      <div class="featured-slider__header">
        <h2>{{ title }}</h2>

        <div v-if="tabs?.length" class="featured-slider__tabs">
          <button
              v-for="tab in tabs"
              :key="tab.handle"
              :class="['featured-slider__tab', { active: activeTab.handle === tab.handle }]"
              @click="changeTab(tab)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="featured-slider__body">
        <!-- SCROLL LEFT -->
        <button
            class="featured-slider__button featured-slider__button--prev"
            :class="{ 'is-disabled': isAtStart }"
            @click="scrollPrev"
            :disabled="isAtStart"
            aria-label="Scroll left"
        >
          <Icon name="mdi:chevron-left" size="1.6rem" />
        </button>

        <!-- TRACK -->
        <div class="featured-slider__wrapper">
          <div class="featured-slider__track" ref="trackRef">
            <ProductCardMini
                v-for="edge in productEdges"
                :key="edge.node.id"
                :product="edge.node"
                class="featured-slider__item"
            />
          </div>
        </div>

        <!-- SCROLL RIGHT -->
        <button
            class="featured-slider__button featured-slider__button--next"
            :class="{ 'is-disabled': isAtEnd }"
            @click="scrollNext"
            aria-label="Scroll right"
            :disabled="isAtEnd"
        >
          <Icon name="mdi:chevron-right" size="1.6rem" />
        </button>

      </div>
    </div>
  </section>
</template>