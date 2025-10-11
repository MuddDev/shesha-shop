<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionProductsSmart } from '@/composables/useCollectionProductsSmart'
import CollectionProductCard from '@/components/collection/CollectionProductCard.vue'

/* =========================================================
 🧩 ТЕКСТИ — для легкого перекладу або кастомізації
========================================================= */
const LABELS = {
  filters: 'Фільтри',
  color: 'Колір',
  size: 'Розмір',
  price: 'Ціна',
  priceLow: 'Найнижча',
  priceHigh: 'Найвища',
  noProducts: 'Немає товарів за вибраними фільтрами.'
}

/* =========================================================
 🔗 ROUTE + COLLECTION
========================================================= */
const route = useRoute()
const handle = route.params.handle
const { value: baseCollection } = await useCollectionProductsSmart(handle)

/* =========================================================
 ⚙️ STATE
========================================================= */
const isFilterOpen = ref(false)
const filters = ref({
  colors: [],
  sizes: [],
  price: null
})

/* =========================================================
 🎨 ДИНАМІЧНІ ФІЛЬТРИ
========================================================= */
const availableColors = computed(() => {
  const colors = new Set()
  baseCollection?.products?.edges?.forEach(({ node }) => {
    node.variants?.edges?.forEach(({ node: v }) => {
      v.selectedOptions?.forEach(opt => {
        if (opt.name.toLowerCase().includes('color') || opt.name.toLowerCase().includes('колір')) {
          colors.add(opt.value)
        }
      })
    })
  })
  return Array.from(colors)
})

const availableSizes = computed(() => {
  const sizes = new Set()
  baseCollection?.products?.edges?.forEach(({ node }) => {
    node.variants?.edges?.forEach(({ node: v }) => {
      v.selectedOptions?.forEach(opt => {
        if (opt.name.toLowerCase().includes('size') || opt.name.toLowerCase().includes('розмір')) {
          sizes.add(opt.value)
        }
      })
    })
  })
  return Array.from(sizes)
})

/* =========================================================
 🧠 ФІЛЬТРАЦІЯ ТОВАРІВ
========================================================= */
const filteredProducts = computed(() => {
  let products = baseCollection?.products?.edges || []

  if (filters.value.colors.length) {
    products = products.filter(({ node }) =>
      node.variants?.edges?.some(({ node: v }) =>
        v.selectedOptions?.some(
          opt =>
            (opt.name.toLowerCase().includes('color') ||
              opt.name.toLowerCase().includes('колір')) &&
            filters.value.colors.includes(opt.value)
        )
      )
    )
  }

  if (filters.value.sizes.length) {
    products = products.filter(({ node }) =>
      node.variants?.edges?.some(({ node: v }) =>
        v.selectedOptions?.some(
          opt =>
            (opt.name.toLowerCase().includes('size') ||
              opt.name.toLowerCase().includes('розмір')) &&
            filters.value.sizes.includes(opt.value)
        )
      )
    )
  }

  if (filters.value.price === 'low') {
    products = [...products].sort(
      (a, b) =>
        Number(a.node.priceRange.minVariantPrice.amount) -
        Number(b.node.priceRange.minVariantPrice.amount)
    )
  } else if (filters.value.price === 'high') {
    products = [...products].sort(
      (a, b) =>
        Number(b.node.priceRange.minVariantPrice.amount) -
        Number(a.node.priceRange.minVariantPrice.amount)
    )
  }

  return products
})

/* =========================================================
 🧩 ЛОГІКА ФІЛЬТРІВ
========================================================= */
const toggleFilter = (type, value) => {
  const arr = filters.value[type]
  filters.value[type] = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
}
</script>

<template>
  <section
    v-if="baseCollection"
    class="collection-page"
  >
    <div class="container--full">
      <!-- 🏷 Header -->
      <header class="collection-header">
        <h1>{{ baseCollection.title }}</h1>
        <p v-if="baseCollection.description">{{ baseCollection.description }}</p>
      </header>

      <!-- ⚙️ Layout -->
      <div class="collection-layout">
        <!-- Sidebar -->
        <aside
          class="collection-sidebar"
          :class="{ open: isFilterOpen }"
        >
          <div class="sidebar-header">
            <h3>{{ LABELS.filters }}</h3>
            <button @click="isFilterOpen = false">✕</button>
          </div>

          <!-- Колір -->
          <div
            class="filter-group"
            v-if="availableColors.length"
          >
            <h4>{{ LABELS.color }}</h4>
            <label
              v-for="color in availableColors"
              :key="color"
            >
              <input
                type="checkbox"
                :value="color"
                @change="toggleFilter('colors', color)"
                :checked="filters.colors.includes(color)"
              />
              {{ color }}
            </label>
          </div>

          <!-- Розмір -->
          <div
            class="filter-group"
            v-if="availableSizes.length"
          >
            <h4>{{ LABELS.size }}</h4>
            <label
              v-for="size in availableSizes"
              :key="size"
            >
              <input
                type="checkbox"
                :value="size"
                @change="toggleFilter('sizes', size)"
                :checked="filters.sizes.includes(size)"
              />
              {{ size }}
            </label>
          </div>

          <!-- Ціна -->
          <div class="filter-group">
            <h4>{{ LABELS.price }}</h4>
            <button
              @click="filters.price = 'low'"
              :class="{ active: filters.price === 'low' }"
            >
              {{ LABELS.priceLow }}
            </button>
            <button
              @click="filters.price = 'high'"
              :class="{ active: filters.price === 'high' }"
            >
              {{ LABELS.priceHigh }}
            </button>
          </div>
        </aside>

        <!-- 🛍️ Products -->
        <div class="collection-products">
          <button
            class="filter-toggle"
            @click="isFilterOpen = true"
          >
            <Icon name="mdi:filter-outline" /> {{ LABELS.filters }}
          </button>

          <div
            v-if="!filteredProducts.length"
            class="no-products"
          >
            {{ LABELS.noProducts }}
          </div>

          <div
            v-else
            class="collection-products-grid"
          >
            <CollectionProductCard
              v-for="edge in filteredProducts"
              :key="edge.node.id"
              :product="edge.node"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
