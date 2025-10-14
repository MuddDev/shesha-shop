<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useProductByHandle } from '@/composables/useProductByHandle'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import CollectionCategory from '~/components/collection/collection-category/CollectionCategory.vue'
import FeaturedTabsSlider from '~/components/collection/fearured-tabs-slider/FeaturedTabsSlider.vue'
import StoreBenefits from '~/components/benefits/StoreBenefits.vue'

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
    <div class="container--full">
      <div class="main-product__section">
        <section class="collection-category__wrapper">
          <CollectionCategory />
        </section>
        <section class="featured-tab">
          <FeaturedTabsSlider
            title="Топ колекція для ванної"
            :tabs="[
              { label: 'Рушник банний', handle: 'rushniki-banni' },
              { label: 'Знижка -25%', handle: 'rushniki-sale-25' }
            ]"
          />
        </section>
        <section class="benefits-box">
          <StoreBenefits />
        </section>
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

<style lang="scss" scoped>
.main-product__section {
  margin-top: 1rem;
}
</style>
