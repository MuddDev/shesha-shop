<script setup>
import FeaturedCollections from '~/components/collection/featured/FeaturedCollections.vue'
import PromoGrid from '~/components/promo/promo-grid/PromoGrid.vue'
import CollectionSpotlight from '~/components/collection/collection-spotlight/CollectionSpotlight.vue'
import CountDownTimer from '~/components/countdown-timer/CountDownTimer.vue'
import FeaturedTabsSlider from '~/components/collection/fearured-tabs-slider/FeaturedTabsSlider.vue'
import PromoShowcase from '~/components/promo/promo-showcase/PromoShowcase.vue'
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
  <section class="collection-spotlights">
    <CollectionSpotlight
      handle="postilna-bilyzna"
      title="Особлива колекція"
    />
  </section>
  <section class="countdown-outer">
    <CountDownTimer
      title="М’якість, як у SPA, за пів ціни. Встигни схопити свої рушники, поки годинник ще тікає"
      button-text="Перейти до розпродажу"
      button-link="/collections/rushniki-banni"
      end-date="2025-10-31T23:59:59"
      background-image="/images/countdown-bg.webp"
    />
  </section>
  <section class="featured-tab">
    <FeaturedTabsSlider
      title="Новинки для ванної кімнати"
      :tabs="[
        { label: 'Рушники білі', handle: 'rushniki-bili' },
        { label: 'Рушник банний', handle: 'rushniki-banni' },
        { label: 'Знижка -25%', handle: 'rushniki-sale-25' }
      ]"
    />
  </section>
  <section class="promo-showcase__box">
    <PromoShowcase />
  </section>
  <section class="collection-spotlights">
    <CollectionSpotlight
      handle="rushniki-banni"
      title="Топ колекція"
    />
  </section>
</template>
