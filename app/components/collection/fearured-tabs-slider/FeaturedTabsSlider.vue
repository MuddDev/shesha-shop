<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue'
import ProductCardMini from '@/components/collection/ProductCardMini.vue'
import { useCollectionProducts } from '@/composables/useCollectionProducts'

const props = defineProps({
  title: { type: String, default: 'Featured Collection' },
  tabs: {
    type: Array,
    required: true,
    default: () => []
  }
})

const activeTab = ref(props.tabs[0])
const products = ref(null)
const sliderRef = ref(null)

const loadCollection = async handle => {
  const collection = await useCollectionProducts(handle)
  products.value = collection
  await nextTick()
}

await loadCollection(activeTab.value.handle)

const changeTab = async tab => {
  activeTab.value = tab
  await loadCollection(tab.handle)
}

watchEffect(async () => {
  if (activeTab.value) await loadCollection(activeTab.value.handle)
})

const productCount = computed(() => products.value?.products?.edges?.length || 0)
const hasSlider = computed(() => productCount.value > 5)

const scrollNext = () => {
  const el = sliderRef.value
  if (el) el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
}
const scrollPrev = () => {
  const el = sliderRef.value
  if (el) el.scrollBy({ left: -el.clientWidth * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <section class="featured-tabs">
    <div class="container--full">
      <div class="featured-tabs__header">
        <h2>{{ title }}</h2>

        <div
          v-if="tabs?.length"
          class="tabs"
        >
          <button
            v-for="tab in tabs"
            :key="tab.handle"
            :class="['tab', { active: activeTab.handle === tab.handle }]"
            @click="changeTab(tab)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div
        class="featured-tabs__slider"
        v-if="products?.value"
      >
        <button
          v-if="hasSlider"
          class="nav prev"
          @click="scrollPrev"
          aria-label="Scroll left"
        >
          <Icon
            name="mdi:chevron-left"
            size="1.8rem"
          />
        </button>

        <div
          class="slider"
          ref="sliderRef"
          :class="{ 'slider--scrollable': hasSlider }"
        >
          <div
            class="slider__track"
            :class="{ 'slider__track--grid': !hasSlider }"
          >
            <ProductCardMini
              v-for="edge in products.value.products?.edges"
              :key="edge.node.id"
              :product="edge.node"
              class="slider__item"
            />
          </div>
        </div>

        <button
          v-if="hasSlider"
          class="nav next"
          @click="scrollNext"
          aria-label="Scroll right"
        >
          <Icon
            name="mdi:chevron-right"
            size="1.8rem"
          />
        </button>
      </div>

      <div
        v-else
        class="featured-tabs__loading"
      >
        Loading...
      </div>
    </div>
  </section>
</template>
