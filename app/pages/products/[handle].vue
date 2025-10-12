<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useProductByHandle } from '@/composables/useProductByHandle'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'

const route = useRoute()
const handle = route.params.handle

const product = await useProductByHandle(handle)
const selectedVariant = ref(product.value?.variants?.nodes?.[0] || null)
</script>
<template>
  <section
    v-if="product"
    class="product-page"
  >
    <div class="product-container">
      <div class="product-gallery-wrap">
        <ProductGallery
          :images="product.images.nodes"
          :featured="product.featuredImage"
        />
      </div>

      <div class="product-info-wrap">
        <ProductInfo
          :product="product"
          :variant="selectedVariant"
          @update:variant="selectedVariant = $event"
        />
      </div>
    </div>
  </section>

  <div
    v-else
    class="loading"
  >
    Завантаження продукту...
  </div>
</template>
