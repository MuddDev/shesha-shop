<script setup>
import FeaturedCollections from '~/components/collection/featured/FeaturedCollections.vue'
import PromoGrid from '~/components/promo/promo-grid/PromoGrid.vue'
</script>
<template>
  <section class="featured-collections">
    <FeaturedCollections
      :handles="[
        'rushniki-bili',
        'sale-50',
        'rushniki-banni',
        'rushniki-dlya-nig',
        'rushniki-dlya-golovaruki',
        'skatertyny',
        'pokryvala',
        'rushnyk-khalat',
        'postilna-bilyzna',
        'servetky'
      ]"
    />
  </section>
  <section class="promo">
    <PromoGrid :content="promoSale" />
  </section>
</template>
