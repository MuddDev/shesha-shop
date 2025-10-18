<script setup>
import { useRequestURL } from '#app'
import FeaturedCollections from '~/components/collection/featured/FeaturedCollections.vue'
import PromoGrid from '~/components/promo/promo-grid/PromoGrid.vue'
import CollectionSpotlight from '~/components/collection/collection-spotlight/CollectionSpotlight.vue'
import CountDownTimer from '~/components/countdown-timer/CountDownTimer.vue'
import FeaturedTabsSlider from '~/components/collection/fearured-tabs-slider/FeaturedTabsSlider.vue'
import PromoShowcase from '~/components/promo/promo-showcase/PromoShowcase.vue'
import CollectionCategory from '~/components/collection/collection-category/CollectionCategory.vue'
import StoreBenefits from '~/components/benefits/StoreBenefits.vue'
import promoSale from '@/data/promo-home.json'
const url = useRequestURL()
const baseUrl = url.origin || 'https://shesha-shop.pages.dev'

const TITLE = 'Текстиль для дому — рушники, халати, постільна білизна | SheshaShop'
const DESCRIPTION =
  'SheshaShop — магазин домашнього текстилю. Рушники, халати, постільна білизна, скатертини та інші товари з натуральних матеріалів. Комфорт і стиль у кожній деталі вашого дому.'

useHead({
  title: TITLE,
  meta: [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: TITLE },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:image', content: '/images/og-home.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: TITLE },
    { name: 'twitter:description', content: DESCRIPTION },
    { name: 'robots', content: 'index, follow, max-image-preview:large' }
  ],
  link: [{ rel: 'canonical', href: baseUrl }]
})
</script>
<template>
  <h1 class="visually-hidden">Текстиль для дому — рушники, халати, постільна білизна</h1>
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
      end-date="2025-12-31T23:59:59"
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
</template>
<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}
</style>
