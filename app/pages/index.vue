<script setup>
import FeaturedCollections from '~/components/collection/featured/FeaturedCollections.vue'
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
        'rushniki-bili',
        'rushniki-bili',
        'rushniki-bili',
        'rushniki-bili',
        'rushniki-bili'
      ]"
    />
  </section>
</template>